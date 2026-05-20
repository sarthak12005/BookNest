const { default: mongoose } = require('mongoose');
const { getAllBooksAggregationPipeline, getSingleBookAggregationPipeline } = require('./books.aggregation');
const Book = require('./schemas/books.schema');
const { toObjectIdOrThrow } = require('../../common/helper/toObjectId');

exports.findOneBook = async (filter) => {
  const book = await Book.findOne({
    ...filter,
    isDeleted: false,
  });

  return book;
};

exports.createBook = async (body) => {
  const book = await Book.create(body);
  return book;
};

exports.getBooks = async ({ query, sort, skip, limit = 10, userId }) => {
  const pipeline = getAllBooksAggregationPipeline(query, skip, sort, limit, userId);

  const books = await Book.aggregate(pipeline);

  const totalBooks = await Book.countDocuments(query);

  return {
    books,
    totalBooks,
  };
};

exports.checkBookExists = async (bookId) => {
  const bookObjectId = await toObjectIdOrThrow(bookId);
  const book = await Book.findOne({ _id: bookObjectId, isDeleted: false });
  return book;
};

exports.handleWishListCount = async (bookId, incBy = 1) => {
  const bookObjectId = await toObjectIdOrThrow(bookId);

  const book = await Book.findOneAndUpdate(
    {
      _id: bookObjectId,
      isDeleted: false,
    },
    {
      $inc: {
        wishlistCount: incBy,
      },
    },
    {
      new: true,
    }
  );

  return book;
};

exports.updateVeiwCount = async (bookId, incBy = 1) => {
  const bookObjectId = await toObjectIdOrThrow(bookId);
  const book = await Book.findOneAndUpdate(
    {
      _id: bookObjectId,
      isDeleted: false,
    },
    {
      $inc: {
        viewCount: incBy,
      },
    },
    {
      new: true,
    }
  );

  return book;
}

exports.getBookById = async (bookId, userId) =>  {
  const pipeline = getSingleBookAggregationPipeline(bookId, userId);
  const book = await Book.aggregate(pipeline);
  return book[0] || null;
}
