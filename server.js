'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
// const weatherData = require('./data/weather.json')
const app = express();

app.use(cors());

const PORT = process.env.PORT

app.get('/test', function (request, response) {
    response.send('test works');
})

app.get('/weather-data', async function getWeatherData(request, response) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`
    try {
        let weatherData = await axios.get(url);
        let finalWeatherData = weatherData.data.data.map(dataPoint => new ReturnWeatherData(dataPoint));
        response.send(finalWeatherData);
    } catch (e) {
        console.log(e);
        response.status(500).send('server error');
    }
});

app.get('/movie-data', async function getMovieData(request, response) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.query}`
    const imageUrl = 'https://image.tmdb.org/t/p/original/'
    try {
        let movieData = await axios.get(url);
        let finalMovieData = movieData.data.results.map(dataObject => new ReturnMovieData(dataObject, imageUrl));
        response.send(finalMovieData);
    } catch (e) {
        console.log(e);
    }
})

app.get('/*', function (request, response) {
    response.status(404).send('error loading request');
})

class ReturnWeatherData {
    constructor(serverSideData) {
        this.date = serverSideData.datetime,
            this.desc = `High: ${serverSideData.max_temp}°C Low: ${serverSideData.low_temp}°C, with ${serverSideData.weather.description.toLowerCase()}`
    }
}

class ReturnMovieData {
    constructor(serverSideData, imageUrl) {
        this.title = serverSideData.title,
            this.overview = serverSideData.overview,
            this.avgVotes = serverSideData.vote_average,
            this.ttlVotes = serverSideData.vote_count,
            this.image_url = imageUrl + serverSideData.poster_path,
            this.popularity = serverSideData.popularity,
            this.releaseDate = serverSideData.release_date
    }
}
app.listen(PORT, () => console.log('server is listening on ', PORT));