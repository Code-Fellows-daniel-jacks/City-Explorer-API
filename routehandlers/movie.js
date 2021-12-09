'use strict';

const axios = require('axios');

async function getMovieData(request, response) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.query}`
    const imageUrl = 'https://image.tmdb.org/t/p/original/'
    try {
        let movieData = await axios.get(url);
        let finalMovieData = movieData.data.results.map(dataObject => new ReturnMovieData(dataObject, imageUrl));
        response.send(finalMovieData);
    } catch (e) {
        response.status(500).send('server error');
    }
};

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

module.exports = getMovieData;