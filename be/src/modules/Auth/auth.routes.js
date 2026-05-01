const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe, logout } = require('./auth.controller');
const validate = require('../../middlewares/validate.middleware');
const registerUserSchema = require('../Users/zod/register.zod');
const loginZodSchema = require('../Users/zod/login.zod');
const { authMiddleware } = require('../../middlewares/authMiddleware');

router.post('/login', validate(loginZodSchema, 'body'), loginUser);
router.post('/register', validate(registerUserSchema, 'body'), registerUser);
router.get('/me', authMiddleware, getMe);
router.post('/logout', logout);

module.exports = router;
