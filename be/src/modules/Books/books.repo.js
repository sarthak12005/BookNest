const Book = require('./schemas/books.schema');


exports.findOneBook = async (filter) => {
    const book = await Book.findOne({
        ...filter,
        isDeleted: false,
    });

    return book;
}

exports.createBook = async (body) => {
    const book = await Book.create(body);
    return book;
}