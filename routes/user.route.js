var express = require('express');
var userController = require('../controllers/user.controller');

var api = express.Router();

api.post('/login',userController.login);
api.post('/createUser',userController.create);
api.post('/inLikeMovie',userController.like);

module.exports = api;