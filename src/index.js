var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: "This is a simple CRUD API aplication made with Express and documented with Swagger",
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/movies.js'],
}

const specs = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use(morgan('common'));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Require the Router we defined in movies.js
var movies = require('./routes/movies.js');
var users = require('./routes/users.js');

//Use the Router on the sub route /movies
app.use('/movies', movies);
app.use('/users', users);

app.listen(3000);
