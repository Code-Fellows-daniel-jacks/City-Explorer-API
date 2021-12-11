'use strict';

const axios = require('axios');

const cache = require('./cache.js');

async function getMovieData(request, response) {

    const { query } = request.query;
    const DateObj = new Date;
    const hours = DateObj.getHours();
    const date = DateObj.getDate();

    if (cache.movies[query]) {
        if (cache.movies[query].time !== hours) {
            delete cache.movies[query];
        }
        if (cache.date !== date) {
            cache.movies = {};
        }
    }

    if (cache.movies[query]) {
        console.log('cache hit');
        response.status(200).send(cache.movies[query].data);
        return
    }

    try {
        console.log('cache miss');
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.query}`
        const imageUrl = 'https://image.tmdb.org/t/p/original/'
        const movieData = await axios.get(url);
        const finalMovieData = movieData.data.results.map(dataObject => new Movie(dataObject, imageUrl));
        cache.movies[query] = { data: finalMovieData, time: hours };
        response.status(200).send(finalMovieData);
    } catch (e) {
        response.status(500).send('server error');
    }
};

class Movie {
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

module.exports = getMovieData;