const express = require('express');
const router = express.Router();
const { addBook } = require('../controllers/book.controller');

router.post('/book', addBook);


module.exports = router;