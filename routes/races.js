const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { races, results, getNextId } = require('../data/motogp');

router.get('/', (req, res) => {
    res.send(races);
});

router.get('/:id', (req, res) => {
    const race = races.find(r => r.id === parseInt(req.params.id));
    if (!race) return res.status(404).send('Race with given ID not found');

    res.send(race);
});

router.post('/', (req, res) => {
    const result = validateRace(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const roundExists = races.some(r => r.round === req.body.round);
    if (roundExists) return res.status(400).send('Race round already exists');

    const race = {
        id: getNextId(races),
        name: req.body.name,
        round: req.body.round,
        date: req.body.date,
        status: req.body.status,
        circuit: req.body.circuit
    };

    races.push(race);
    res.status(201).send(race);
});

router.put('/:id', (req, res) => {
    const race = races.find(r => r.id === parseInt(req.params.id));
    if (!race) return res.status(404).send('Race with given ID not found');

    const result = validateRace(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const roundExists = races.some(r => r.round === req.body.round && r.id !== race.id);
    if (roundExists) return res.status(400).send('Race round already exists');

    race.name = req.body.name;
    race.round = req.body.round;
    race.date = req.body.date;
    race.status = req.body.status;
    race.circuit = req.body.circuit;

    res.send(race);
});

router.delete('/:id', (req, res) => {
    const race = races.find(r => r.id === parseInt(req.params.id));
    if (!race) return res.status(404).send('Race with given ID not found');

    const raceHasResults = results.some(r => r.raceId === race.id);
    if (raceHasResults) return res.status(400).send('Race still has results');

    const index = races.indexOf(race);
    races.splice(index, 1);

    res.send(race);
});

function validateRace(race) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(80).required(),
        round: Joi.number().integer().min(1).max(30).required(),
        date: Joi.string().isoDate().required(),
        status: Joi.string().valid('planned', 'completed', 'cancelled').required(),
        circuit: Joi.object({
            name: Joi.string().min(3).max(80).required(),
            country: Joi.string().min(2).max(50).required(),
            lengthKm: Joi.number().min(1).max(10).required()
        }).required()
    });

    return schema.validate(race);
}

module.exports = router;
