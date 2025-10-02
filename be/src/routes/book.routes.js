const express = require('express');
const router = express.Router();
const { addBook, getBookById, getAllBooks, deleteBookById } = require('../controllers/book.controller');

router.post('/book', addBook);
router.get('/books', getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/book/:id', deleteBookById);


module.exports = router;