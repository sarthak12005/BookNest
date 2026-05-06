const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
  addBook,
  getBookById,
  getAllBooks,
  deleteBookById,
} = require('./books.controller');
const { cache } = require('../../middlewares/cache.middleware');
const permission = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');
const createBookZodSchema = require('./zod/create-book.zod');



router.post(
  '/book',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.SYSTEM_ALL),
  validate(createBookZodSchema, 'body'),
  addBook
);

router.get('/books', cache('books'), getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/book/:id', permission('manage', 'all'), deleteBookById);

module.exports = router;
