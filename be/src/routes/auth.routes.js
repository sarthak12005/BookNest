const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getMe} = require('../controllers/auth.controller');


router.post('/login', loginUser);
router.post('/signup', registerUser);
router.get('/me', getMe);



module.exports = router;
