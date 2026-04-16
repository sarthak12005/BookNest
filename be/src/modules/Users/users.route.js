const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const permission = require('../middlewares/permissionMiddleware');
const { getUsers, createUser, getUserById } = require('../controllers/user.controller');
const router = express.Router();

router.use(authMiddleware)

router.get('/user',permission('manage', 'all'), cache('Users'), getUsers);
router.post('/user', permission('manage','all'), createUser);
router.get('/user/:id', permission('manage', 'all'), getUserById);
