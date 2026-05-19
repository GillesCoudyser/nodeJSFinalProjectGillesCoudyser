const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { results, races, riders, teams, getNextId } = require('../data/motogp');

router.get('/', (req, res) => {
    res.send(results);
});

router.get('/race/:raceId', (req, res) => {
    const race = races.find(r => r.id === parseInt(req.params.raceId));
    if (!race) return res.status(404).send('Race with given ID not found');

    const raceResults = results.filter(r => r.raceId === race.id);
    res.send(raceResults);
});

router.get('/:id', (req, res) => {
    const result = results.find(r => r.id === parseInt(req.params.id));
    if (!result) return res.status(404).send('Result with given ID not found');

    res.send(result);
});

router.post('/', (req, res) => {
    const validation = validateResult(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);

    const linkError = validateResultLinks(req.body);
    if (linkError) return res.status(400).send(linkError);

    const positionExists = results.some(r => r.raceId === req.body.raceId && r.position === req.body.position);
    if (positionExists) return res.status(400).send('Position already exists for this race');

    const riderExists = results.some(r => r.raceId === req.body.raceId && r.riderId === req.body.riderId);
    if (riderExists) return res.status(400).send('Rider already has a result for this race');

    const result = {
        id: getNextId(results),
        raceId: req.body.raceId,
        riderId: req.body.riderId,
        teamId: req.body.teamId,
        position: req.body.position,
        points: req.body.points
    };

    results.push(result);
    res.status(201).send(result);
});

router.put('/:id', (req, res) => {
    const result = results.find(r => r.id === parseInt(req.params.id));
    if (!result) return res.status(404).send('Result with given ID not found');

    const validation = validateResult(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);

    const linkError = validateResultLinks(req.body);
    if (linkError) return res.status(400).send(linkError);

    const positionExists = results.some(r => {
        return r.raceId === req.body.raceId && r.position === req.body.position && r.id !== result.id;
    });
    if (positionExists) return res.status(400).send('Position already exists for this race');

    const riderExists = results.some(r => {
        return r.raceId === req.body.raceId && r.riderId === req.body.riderId && r.id !== result.id;
    });
    if (riderExists) return res.status(400).send('Rider already has a result for this race');

    result.raceId = req.body.raceId;
    result.riderId = req.body.riderId;
    result.teamId = req.body.teamId;
    result.position = req.body.position;
    result.points = req.body.points;

    res.send(result);
});

router.delete('/:id', (req, res) => {
    const result = results.find(r => r.id === parseInt(req.params.id));
    if (!result) return res.status(404).send('Result with given ID not found');

    const index = results.indexOf(result);
    results.splice(index, 1);

    res.send(result);
});

function validateResult(result) {
    const schema = Joi.object({
        raceId: Joi.number().integer().min(1).required(),
        riderId: Joi.number().integer().min(1).required(),
        teamId: Joi.number().integer().min(1).required(),
        position: Joi.number().integer().min(1).max(30).required(),
        points: Joi.number().integer().min(0).max(37).required()
    });

    return schema.validate(result);
}

function validateResultLinks(result) {
    const race = races.find(r => r.id === result.raceId);
    if (!race) return 'Race with given ID not found';

    const rider = riders.find(r => r.id === result.riderId);
    if (!rider) return 'Rider with given ID not found';

    const team = teams.find(t => t.id === result.teamId);
    if (!team) return 'Team with given ID not found';

    if (rider.teamId !== team.id) return 'Rider does not belong to this team';

    return null;
}

module.exports = router;
