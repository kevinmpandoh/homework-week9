/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *     type: object
 *     required:
 *      - title
 *      - genres
 *      - year
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the book
 *      title:
 *        type: string
 *        description: The title of your movies
 *      genres:
 *        type: string
 *        description: the movie genres
 *      year:
 *        type: string
 *        description: the movie year
 *    example:
 *      id: 12
 *      title: Naruto
 *      genres: Cartoon
 *      year: 2000
 */

/**
 * @swagger
 * tags:
 *    name: Movies
 *    description: The Movies managing API
 * /movies:
 *    post:
 *      summary: Create a new movie
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *       responses:
 *        200:
 *          description: The created movie.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        500:
 *          description: Some server error
 */

var express = require('express');
var router = express.Router();
var pool = require('../query.js');
var auth = require('../middleware/authMiddleware.js');

router.get('/', auth, (req, res) => {
  pool.query(
    `SELECT * FROM movies ${
      req.query.limit ? 'LIMIT ' + req.query.limit : ''
    } `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});



router.get('/:id', (req, res) => {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.post('/', (req, res) => {
  //   console.log(req.body);
  pool.query(
    `INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3);`,
    [req.body.title, req.body.genres, req.body.year],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  //   console.log(req.body);
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    }
  );
});

router.put('/:id', (req, res) => {
  //   console.log(req.body);
  pool.query(
    `UPDATE movies SET year = "${req.body.year}" WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: 'success',
      });
    }
  );
});

//export this router to use in our index.js
module.exports = router;
