const swaggerJsdoc = require('swagger-jsdoc');

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

module.exports = specs;
