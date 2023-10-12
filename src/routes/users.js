/**
 * @openapi
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - id
 *          - email
 *          - gender
 *          - password
 *          - role
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto generated id of the movie
 *          email:
 *            type: string
 *            description: your email
 *          gender:
 *            type: string
 *            description: tour gender
 *          password:
 *            type: string
 *            description: Your password
 *          role:
 *            type: string
 *            description: Your role
 *        example:
 *          id: 1
 *          email: kevinmpandoh@gmail.com
 *          gender: Male
 *          password: 123
 *          role: Construction Worker
 *          
 */

/**
 * @openapi
 * tags:
 *    name: Users
 *    description: The user managing API
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get all Users.
 *         content: 
 *           application/json:
 *            schema:
 *              type: array
 *              items:
 *                 type: string
 *       500:
 *        description: Some server error
 * 
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref/'#/components/schemas/User
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: some server errors
 * 
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: some server errors
 *     
 */



var express = require('express');
var router = express.Router();
var { signToken, verifyToken } = require('../utils/auth.js');

var pool = require('../config/query.js');

router.post('/login', (req, res) => {

  // res.send("OK")

  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [req.body.email, req.body.password],
    (error, results) => {

      // res.json(results.rows[0])

      if (error) {
        throw error;
      } else {
        const token = signToken(results.rows[0]);
        res.json({
          token: token,
        });
      }
    }
  ); 
});

router.post('/register', (req, res) => {
  pool.query(
    `INSERT INTO users(id, email, gender, password, role) VALUES($1, $2, $3, $4, $5)`,
    [req.body.id, req.body.email, req.body.gender, req.body.password, req.body.role],
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

router.get('/', (req, res) => {
  pool.query(
    `SELECT * FROM users ${
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

module.exports = router;
