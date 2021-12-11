'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const getWeatherData = require('./routehandlers/weather.js');
const getMovieData = require('./routehandlers/movie.js');
const app = express();

app.use(cors());

const PORT = process.env.PORT

app.get('/test', function (request, response) {
    response.send('test works');
})

app.get('/weather-data', getWeatherData);
app.get('/movie-data', getMovieData);

app.get('/*', function (request, response) {
    response.status(404).send('error loading request');
})

app.listen(PORT, () => console.log('server is listening on ', PORT));