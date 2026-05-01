const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
  addBook,
  getBookById,
  getAllBooks,
  deleteBookById,
} = require('../controllers/book.controller');
const { cache } = require('../../middlewares/cache.middleware');
const permission = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');



router.post(
  '/book',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.SYSTEM_ALL),
  validate(searchingCategoryZodSchema, 'query'),
  addBook
);

router.get('/books', cache('books'), getAllBooks);
router.get('/book/:id', getBookById);
router.delete('/book/:id', permission('manage', 'all'), deleteBookById);

module.exports = router;
