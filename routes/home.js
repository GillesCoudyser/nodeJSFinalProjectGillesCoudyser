const express = require('express');
const config = require('config');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: config.get('name'),
        message: 'MotoGP Championship API',
        endpoints: [
            'GET /api/teams',
            'GET /api/riders',
            'GET /api/races',
            'GET /api/results'
        ]
    });
});

module.exports = router;
