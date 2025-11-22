const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const { addBook, getBookById, getAllBooks, deleteBookById} = require('../controllers/book.controller');

router.use(authMiddleware);

router.post('/book', addBook);
router.get('/books', getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/book/:id', deleteBookById);


module.exports = router;
