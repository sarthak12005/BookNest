const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const { addBook, getBookById, getAllBooks, deleteBookById} = require('../controllers/book.controller');
const { cache } = require('../middlewares/cache.middleware');

router.use(authMiddleware);

router.post('/book', addBook);
router.get('/books', cache('books'), getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/book/:id', deleteBookById);


module.exports = router;
