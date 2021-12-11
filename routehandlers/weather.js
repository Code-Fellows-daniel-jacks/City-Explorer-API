'use strict';

const axios = require('axios');

const cache = require('./cache.js');

async function getWeatherData(request, response) {

    const { lat, lon } = request.query;
    const cache_id = lat + lon;
    const DateObj = new Date;
    const hours = DateObj.getHours();
    const date = DateObj.getDate();

    if (cache.weather[cache_id]) {
        if (cache.weather[cache_id].time !== hours) {
            delete cache.weather[cache_id];
        }
        if (cache.date !== date) {
            cache.weather = {};
        }
    }

    if (cache.weather[cache_id]) {
        console.log('cache hit');
        response.status(200).send(cache.weather[cache_id].data);
        return;
    }

    try {
        console.log('cache miss');
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`
        const weatherData = await axios.get(url);
        const finalWeatherData = weatherData.data.data.map(dataPoint => new Weather(dataPoint));
        cache.weather[cache_id] = { data: finalWeatherData, time: hours };
        cache.date = date;
        response.send(finalWeatherData);
    } catch (e) {
        response.status(500).send('server error');
    }
};

class Weather {
    constructor(serverSideData) {
        this.date = serverSideData.datetime,
            this.desc = `High: ${serverSideData.max_temp}°C Low: ${serverSideData.low_temp}°C, with ${serverSideData.weather.description.toLowerCase()}`
    }
}

module.exports = getWeatherData;