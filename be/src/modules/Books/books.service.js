const Book = require('./schemas/books.schema');
const bookRepo = require('./books.repo');
const categoryRepo = require('../Categories/categories.repo')
const { throwBadRequestException, throwNotFoundException } = require('../../utils/errorResponse');
const { Types } = require('mongoose');
const buildBookQuery = require('../../utils/buildBooksQuery');
const id = require('zod/v4/locales/id.cjs');
const { getSingleBookAggregationPipeline } = require('./books.aggregation');
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

exports.getBooks = async (filters,userId) => {

  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  // build mongo query
  const query = buildBookQuery(filters);

  // sorting
  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  // pagination
  const skip = (page - 1) * limit;

  // repository call
  const {
    books,
    totalBooks,
  } = await bookRepo.getBooks({
    query,
    sort,
    skip,
    limit,
    userId
  });

  // total pages
  const totalPages = Math.ceil(
    totalBooks / limit
  );

  // pagination object
  const pagination = {
    total: totalBooks,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return {
    message: "Books fetched successfully",
    data: books,
    pagination,
  };
};

exports.getBookById = async (id, userId) => {
   try {

    console.log(
      "before check the ", id, userId
    )
     const checkBook = await bookRepo.checkBookExists(id);

     if (!checkBook) {
        throwNotFoundException("Book not found");
     }

     console.log("checked the book exists and available")

    const book = await bookRepo.getBookById(id, userId);

    if (!book) {
       throwNotFoundException("Book not found");
    }

    console.log("after fetching the book: ", book);

    const updateCount = await bookRepo.updateVeiwCount(id);

    if (!updateCount) {
       throwBadRequestException("failed to update count");
    }

    return book;
   } catch (error) {
     throw error;
   }
}
