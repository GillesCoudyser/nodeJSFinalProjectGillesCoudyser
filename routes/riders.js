const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { riders, teams, results, getNextId } = require('../data/motogp');

router.get('/', (req, res) => {
    res.send(riders);
});

router.get('/:id', (req, res) => {
    const rider = riders.find(r => r.id === parseInt(req.params.id));
    if (!rider) return res.status(404).send('Rider with given ID not found');

    res.send(rider);
});

router.post('/', (req, res) => {
    const result = validateRider(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const team = teams.find(t => t.id === req.body.teamId);
    if (!team) return res.status(400).send('Team with given ID not found');

    const numberExists = riders.some(r => r.number === req.body.number);
    if (numberExists) return res.status(400).send('Rider number already exists');

    const rider = {
        id: getNextId(riders),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        country: req.body.country,
        teamId: req.body.teamId
    };

    riders.push(rider);
    res.status(201).send(rider);
});

router.put('/:id', (req, res) => {
    const rider = riders.find(r => r.id === parseInt(req.params.id));
    if (!rider) return res.status(404).send('Rider with given ID not found');

    const result = validateRider(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const team = teams.find(t => t.id === req.body.teamId);
    if (!team) return res.status(400).send('Team with given ID not found');

    const numberExists = riders.some(r => r.number === req.body.number && r.id !== rider.id);
    if (numberExists) return res.status(400).send('Rider number already exists');

    rider.firstName = req.body.firstName;
    rider.lastName = req.body.lastName;
    rider.number = req.body.number;
    rider.country = req.body.country;
    rider.teamId = req.body.teamId;

    res.send(rider);
});

router.delete('/:id', (req, res) => {
    const rider = riders.find(r => r.id === parseInt(req.params.id));
    if (!rider) return res.status(404).send('Rider with given ID not found');

    const riderHasResults = results.some(r => r.riderId === rider.id);
    if (riderHasResults) return res.status(400).send('Rider still has results');

    const index = riders.indexOf(rider);
    riders.splice(index, 1);

    res.send(rider);
});

function validateRider(rider) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        number: Joi.number().integer().min(1).max(99).required(),
        country: Joi.string().min(2).max(50).required(),
        teamId: Joi.number().integer().min(1).required()
    });

    return schema.validate(rider);
}

module.exports = router;
