var express = require('express');
var movieController = require('../controllers/movie.controller');

var api = express.Router();

api.post('/createMovie',movieController.create);
api.post('/inGenre',movieController.genre);
api.get('/getMovies',movieController.getMovies);
api.post('/genreRecommendation',movieController.genreRecommendation);
api.post('/userRecommendation',movieController.userRecommendation);

module.exports = api;