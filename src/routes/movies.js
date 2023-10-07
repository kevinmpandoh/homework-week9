/**
 * @openapi
 * components:
 *    schemas:
 *      Movie:
 *        type: object
 *        required:
 *          - id
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
 *        example:
 *          id: 1
 *          title: Naruto
 *          genres: Action
 *          year: 2001
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
 * /movies/{id}:
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
 * movies/{id}:
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
        res.status(403).json({
          "message": "Tidak bisa di akses"
        })
      }
      res.json(results.rows);
    }
  );
});



router.get('/:id', auth, (req, res) => {
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

router.post('/', auth, (req, res) => {
  //   console.log(req.body);
  pool.query(
    `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4);`,
    [req.body.id, req.body.title, req.body.genres, req.body.year],
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

router.delete('/:id', auth, (req, res) => {
  //   console.log(req.body);
  pool.query(
    `DELETE FROM movies WHERE id = $1`,
    [req.params.id],
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

router.put('/:id',auth,(req, res) => {

  pool.query(
    `UPDATE movies SET year = $1 WHERE id = $2`,
    [req.body.year, req.params.id],
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
