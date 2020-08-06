const express = require('express');
const routes = express.Router();

const requireDir = require('require-dir');
const controllers = requireDir('./controllers');
const validators = requireDir('./validators');

routes.get('/dev', controllers.DevController.index);
routes.post('/dev', controllers.DevController.create);
routes.post('/dev/:devId/like', validators.LikeValidator.create, controllers.LikeController.create);
routes.post('/dev/:devId/dislike', validators.LikeValidator.create, controllers.DislikeController.create);

module.exports = routes;