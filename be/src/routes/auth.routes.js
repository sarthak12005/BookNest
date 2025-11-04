const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getMe} = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');


router.post('/login', loginUser);
router.post('/signup', registerUser);
router.get('/me',authMiddleware, getMe);



module.exports = router;

