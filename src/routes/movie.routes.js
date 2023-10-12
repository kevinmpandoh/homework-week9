/**
 * @openapi
 * components:
 *    schemas:
 *      Movie:
 *        type: object
 *        required:
 *          - title
 *          - genre
 *          - year
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto generated id of the movie
 *          title:
 *            type: string
 *            description: The title of your movie
 *          genre:
 *            type: string
 *            description: The genre of your movie
 *          year:
 *            type: string
 *            description: The year of your movie
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 *        example:
 *          id: 1
 *          title: Naruto
 *          genres: Action
 *          year: 2001
 *          createdAt: 2023-10-12
 *          updatedAt: 2023-10-13
 *          
 */

/**
 * @openapi
 * tags:
 *    name: Movies
 *    description: The movie managing API
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Get all Movies.
 *         content: 
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *       500:
 *        description: Some server error
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: some server error
 * 
 * /api/movies/{id}:
 *    get:
 *     summary: Get the book by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the movie id
 *     responses:
 *       200:
 *         description: The book response by id.
 *         content: 
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *       400:
 *        description: The movie was not found
 * api/movies/{id}:
 *   put:
 *     summary: update the movie by the id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The book was updated
 *         content:
 *           aplication/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 * 
 *     responses:
 *       200:
 *         description: The movie was deleted
 *       404:
 *         description: The movie was not found
 */

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