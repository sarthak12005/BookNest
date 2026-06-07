const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
  addBook,
  getBookById,
  getAllBooks,
  updateBook,
  deleteBookById,
  getAllNewArrivals,
  getAllAuthors,
} = require('./books.controller');

const permission = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');
const createBookZodSchema = require('./zod/create-book.zod');
const updateBookZodSchema = require('./zod/update-book.zod');
const validate = require('../../middlewares/validate.middleware');
const cache = require('../../middlewares/cache.middleware');
const getBooksQueryZodSchema = require('./zod/get-books.zod');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');

router.post(
  '/',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.CREATE_BOOK),
  validate(createBookZodSchema, 'body'),
  addBook
);

router.get(
  '/',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.READ_BOOKS),
  validate(getBooksQueryZodSchema, 'query'),
  cache({
    keyPrefix: 'books',
    ttl: 8,
  }),
  getAllBooks
);

router.get(
  '/new-arrivals',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.READ_BOOKS),
  validate(getBooksQueryZodSchema, 'query'),
  cache({
    keyPrefix: 'books',
    ttl: 8,
  }),
  getAllNewArrivals
);

router.get(
  '/authors',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.READ_BOOKS),
  getAllAuthors
);

router.get(
  '/:bookId',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.READ_BOOKS),
  validate(IdParamsSchema('bookId'), 'params'),
  cache({
    keyPrefix: 'books',
    ttl: 8
  }),
  getBookById
);

router.patch(
  '/:bookId',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.UPDATE_BOOK),
  validate(IdParamsSchema('bookId'), 'params'),
  validate(updateBookZodSchema, 'body'),
  updateBook
);

router.delete(
  '/:bookId',
  authMiddleware,
  permission.checkPermission(PERMISSION_COLLECTION.DELETE_BOOK),
  validate(IdParamsSchema('bookId'), 'params'),
  deleteBookById
);

module.exports = router;

