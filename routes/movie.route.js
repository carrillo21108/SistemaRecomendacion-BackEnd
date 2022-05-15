var express = require('express');
var movieController = require('../controllers/movie.controller');

var api = express.Router();

api.post('/createMovie',movieController.create);

module.exports = api;