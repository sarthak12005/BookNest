const { ApiSuccessResponse } = require('../../utils/ApiSuccessResponse');
const bookService = require('./books.service');


exports.addBook = async (req, res) => {
  const body = req.body;

  const { userId } = req.user;

  const response = await bookService.addBook(body, userId);

  return ApiSuccessResponse(res, 201, 'New Book added successfully', {
    _id: response.data._id,
    title: response.data.title,
  });
};

// exports.getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();

//     if (!books) {
//       return res.status(404).json({ message: 'No books found' });
//     }

//     res.status(200).json(books);
//   } catch (error) {
//     console.error('error in fetching books', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.getBookById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: 'Book ID is required' });
//     }

//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     res.status(200).json({ message: 'Book fetched successfully', book });
//   } catch (err) {
//     console.error('error in fetching book by id', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

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
