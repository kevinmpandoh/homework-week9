/**
 * @openapi
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
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
 *          role: Admin
 *          
 */

/**
 * @openapi
 * tags:
 *    name: Users
 *    description: The user managing API
 * /api/users:
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
 * /api/users/register:
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
 * /api/users/login:
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
var userRouter = express.Router();
const userController = require('../controllers/user.controller.js')

userRouter.get('/api/users', userController.getAllUsers);
userRouter.post('/api/users/login', userController.userLogin);
userRouter.post('/api/users/register', userController.userRegister);

module.exports = userRouter;