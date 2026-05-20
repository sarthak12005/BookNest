const {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
} = require('../../utils/ApiSuccessResponse');
const { throwNotFoundException } = require('../../utils/errorResponse');
const bookService = require('./books.service');
const createBookZodSchema = require('./zod/create-book.zod');
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
  const { bookId } = req.params;
  const book = await bookService.getBookById(bookId, req.user.userId.toString());
  return ApiSuccessResponse(res, 200, 'book fetched successfully', book);
};

// exports.deleteBookById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: 'Book ID is required' });
//     }

//     const book = await Book.findByIdAndDelete(id);

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.status(200).json({ message: 'Book deleted successfully', book });
//   } catch (error) {
//     console.error('error in deleting book by id', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
