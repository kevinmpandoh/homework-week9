const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const specs = require('./swagger')
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const movieRouter = require('./src/routes/movie.routes')
const userRouter = require('./src/routes/user.routes')
require('dotenv').config();

app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(movieRouter) 
app.use(userRouter)
app.use(express.json);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}`)
})
