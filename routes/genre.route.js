var express = require('express');
var genreController = require('../controllers/genre.controller');

var api = express.Router();

api.post('/createGenre',genreController.create);

module.exports = api;