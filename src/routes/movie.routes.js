var express = require('express');
var movieRouter = express.Router();
var auth = require('../middleware/authMiddleware.js');
const movieController = require('../controllers/movie.controller.js');

movieRouter.get('/api/movies', auth, movieController.getAllMovies);
movieRouter.get('/api/movies/:id', auth, movieController.getMovieById);
movieRouter.post('/api/movies', auth, movieController.createMovie);
movieRouter.put('/api/movies/:id', auth, movieController.updateMovieById);
movieRouter.delete('/api/movies/:id', auth, movieController.deleteMovieById);


module.exports = movieRouter;