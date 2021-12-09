'use strict';

const axios = require('axios');

async function getWeatherData(request, response) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`
    try {
        let weatherData = await axios.get(url);
        let finalWeatherData = weatherData.data.data.map(dataPoint => new ReturnWeatherData(dataPoint));
        response.send(finalWeatherData);
    } catch (e) {
        response.status(500).send('server error');
    }
};

class ReturnWeatherData {
    constructor(serverSideData) {
        this.date = serverSideData.datetime,
            this.desc = `High: ${serverSideData.max_temp}°C Low: ${serverSideData.low_temp}°C, with ${serverSideData.weather.description.toLowerCase()}`
    }
}

module.exports = getWeatherData;