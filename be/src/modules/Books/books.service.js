const Book = require('./schemas/books.schema');
const bookRepo = require('./books.repo');
const categoryRepo = require('../Categories/categories.repo')
const { throwBadRequestException, throwNotFoundException } = require('../../utils/errorResponse');
const { Types } = require('mongoose');
exports.addBook = async (body, userId) => {
  try {

    // normalize values
    const normalizedTitle = body.title.trim();
    const normalizedIsbn = body.isbn.trim();

    // check existing book
    const existingBook = await bookRepo.findOneBook({
      $or: [
        { title: normalizedTitle },
        { isbn: normalizedIsbn },
      ],
    });

    if (existingBook) {
      throwBadRequestException("Book already exists", [
        {
          field: "title/isbn",
          message: "Book already exists with this title or ISBN",
        },
      ]);
    }

    // validate category
    const categoryExists = await categoryRepo.findCategoryById(
      body.category
    );

    if (!categoryExists) {
      throwNotFoundException("Category not found", [
        {
          field: "category",
          message: "Category does not exist",
        },
      ]);
    }

    // create payload
    const payload = {
      ...body,
      title: normalizedTitle,
      isbn: normalizedIsbn,
      category: new Types.ObjectId(body.category),
      createdBy: userId,
    };

    // create book
    const newBook = await bookRepo.createBook(payload);

    return {
      success: true,
      message: "Book created successfully",
      data: newBook,
    };

  } catch (error) {
    throw error;
  }
};
