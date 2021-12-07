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


app.get('/weather-data', function getWeatherData(request, response) {
    response.send(weatherData[0]);
})

// class LocationData {
//     constructor(obj) {
//         this.searchQuery = obj.
//             this.lat = obj.data
//     }
// }














app.listen(PORT, () => console.log('server is listening on ', PORT))