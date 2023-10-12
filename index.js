var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const movieRouter = require('./src/routes/movie.routes')
const userRouter = require('./src/routes/user.routes')

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
    apis: ['./src/routes/*.js'],
}

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var movies = require('./src/routes/movies.js');
// var users = require('./src/routes/users.js');

// app.use('/movies', movies);
app.use('/users', users);
app.use(movieRouter)
app.use(userRouter)
app.use(express.json);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}`)
})
