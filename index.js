const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const teams = require('./routes/teams');
const riders = require('./routes/riders');
const races = require('./routes/races');
const results = require('./routes/results');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

console.log('Application Name:', config.get('name'));
console.log('Environment:', app.get('env'));

app.use('/', home);
app.use('/api/teams', teams);
app.use('/api/riders', riders);
app.use('/api/races', races);
app.use('/api/results', results);

app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
