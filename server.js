'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
// const weatherData = require('./data/weather.json')
const app = express();

app.use(cors());

// const PORT = process.env.PORT

app.get('/test', function (request, response) {
    response.send('test works');
})

app.get('/weather-data', async function getWeatherData(request, response) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`
    try {
        let weatherData = await axios.get(url);
        let finalClientData = weatherData.data.data.map(dataPoint => new ReturnData(dataPoint));
        response.send(finalClientData);
    } catch (e) {
        console.log(e);
        response.status(500).send('server error');
    }
});

app.get('/*', function (request, response) {
    response.status(404).send('error loading request');
})

class ReturnData {
    constructor(serverSideData) {
        this.date = serverSideData.datetime,
            this.desc = `High: ${serverSideData.max_temp}°C Low: ${serverSideData.low_temp}°C, with ${serverSideData.weather.description.toLowerCase()}`
    }
}

// app.listen(PORT, () => console.log('server is listening on ', PORT))