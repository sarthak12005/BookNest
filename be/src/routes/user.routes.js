const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const permission = require('../middlewares/permissionMiddleware');
const { getUsers } = require('../controllers/user.controller');
const router = express.Router();

router.use(authMiddleware)

router.get('/user',permission('manage', 'all'), cache('Users'), getUsers);

