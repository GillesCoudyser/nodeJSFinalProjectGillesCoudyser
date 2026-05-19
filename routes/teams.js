const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { teams, riders, getNextId } = require('../data/motogp');

router.get('/', (req, res) => {
    res.send(teams);
});

router.get('/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    if (!team) return res.status(404).send('Team with given ID not found');

    res.send(team);
});

router.post('/', (req, res) => {
    const result = validateTeam(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const team = {
        id: getNextId(teams),
        name: req.body.name,
        country: req.body.country,
        manufacturer: req.body.manufacturer
    };

    teams.push(team);
    res.status(201).send(team);
});

router.put('/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    if (!team) return res.status(404).send('Team with given ID not found');

    const result = validateTeam(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    team.name = req.body.name;
    team.country = req.body.country;
    team.manufacturer = req.body.manufacturer;

    res.send(team);
});

router.delete('/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    if (!team) return res.status(404).send('Team with given ID not found');

    const teamHasRiders = riders.some(r => r.teamId === team.id);
    if (teamHasRiders) return res.status(400).send('Team still has riders');

    const index = teams.indexOf(team);
    teams.splice(index, 1);

    res.send(team);
});

function validateTeam(team) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(80).required(),
        country: Joi.string().min(2).max(50).required(),
        manufacturer: Joi.string().min(2).max(50).required()
    });

    return schema.validate(team);
}

module.exports = router;
