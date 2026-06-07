const {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
} = require('../../utils/ApiSuccessResponse');
const { throwNotFoundException } = require('../../utils/errorResponse');
const bookService = require('./books.service');
const createBookZodSchema = require('./zod/create-book.zod');
const updateBookZodSchema = require('./zod/update-book.zod');
const getBooksQueryZodSchema = require('./zod/get-books.zod');

exports.addBook = async (req, res) => {
  const body = createBookZodSchema.parse(req.body);

  const { userId } = req.user;

  const response = await bookService.addBook(body, userId);

  return ApiSuccessResponse(res, 201, 'New Book added successfully', {
    _id: response.data._id,
    title: response.data.title,
  });
};

exports.getAllBooks = async (req, res) => {
  const query = getBooksQueryZodSchema.parse(req.query);
  const { userId } = req.user;

  const response = await bookService.getBooks(query, userId);

  if (!response.data.length) {
    return throwNotFoundException('No books found', [
      {
        field: 'books',
        message: 'No books found',
      },
    ]);
  }

  return ApiPaginationSuccessResponse(
    res,
    200,
    'Fetched books successfully',
    response.data,
    response.pagination
  );
};
exports.getAllNewArrivals = async (req, res) => {
  const query = getBooksQueryZodSchema.parse(req.query);
  const { userId } = req.user;

  const response = await bookService.getBooks({ ...query}, userId);

  if (!response.data.length) {
    return throwNotFoundException('No books found', [
      {
        field: 'books',
        message: 'No books found',
      },
    ]);
  }

  return ApiPaginationSuccessResponse(
    res,
    200,
    'Fetched books successfully',
    response.data,
    response.pagination
  );
};

exports.getBookById = async (req, res) => {
  console.log("request come here");
  const { bookId } = req.params;
  const book = await bookService.getBookById(bookId, req.user.userId.toString());
  return ApiSuccessResponse(res, 200, 'book fetched successfully', book);
};

exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  const body = updateBookZodSchema.parse(req.body);
  const response = await bookService.updateBook(bookId, body);
  return ApiSuccessResponse(res, 200, 'Book updated successfully', response.data);
};

exports.deleteBookById = async (req, res) => {
  const { bookId } = req.params;
  const response = await bookService.deleteBook(bookId);
  return ApiSuccessResponse(res, 200, 'Book deleted successfully', response.data);
};

exports.getAllAuthors = async (req, res) => {
  const authors = await bookService.getAllAuthors();
  return ApiSuccessResponse(res, 200, 'Fetched authors successfully', authors);
};

