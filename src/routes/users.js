var express = require('express');
var router = express.Router();
var { signToken, verifyToken } = require('../utils/auth.js');

var pool = require('../query.js');

router.post('/login', (req, res) => {

  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [req.body.email, req.body.password],
    (error, results) => {

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

router.post("/verify/:token", (req, res) => {
  const data = verifyToken(req.params.token)

  res.json({
    data: data
  })
})

router.post('/register', (req, res) => {
  pool.query(
    `INSERT INTO users(email, gender, password) VALUES($1, $2, $3)`,
    [req.body.email, req.body.gender, req.body.password],
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
