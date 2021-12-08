'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json')
const app = express();

app.use(cors());

const PORT = process.env.PORT

app.get('/test', function (request, response) {
    response.send('test works');
})

class ReturnData {
    constructor(serverSideData) {
        this.date = serverSideData.datetime,
            this.desc = `High: ${serverSideData.max_temp}°C Low: ${serverSideData.low_temp}°C, with ${serverSideData.weather.description.toLowerCase()}`
    }
}

app.get('/weather-data', function getWeatherData(request, response) {
    let queriedData = weatherData.find(city => city.city_name.toLowerCase() === request.query.city_name.toLowerCase());
    let finalClientData = queriedData.data.map(dataPoint => new ReturnData(dataPoint));
    response.send(finalClientData);
})

app.listen(PORT, () => console.log('server is listening on ', PORT))