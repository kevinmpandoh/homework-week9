/**
 * @openapi
 * components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *          - id
 *          - title
 *          - genres
 *          - year
 */

/**
 * @openapi
 * tags:
 *    name: Movies
 *    description: Managing API Movie
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Get all Movies.
 *         content: 
 *           aplication/json
 *       500:
 *        description: Some server error
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
