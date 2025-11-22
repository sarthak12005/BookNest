const Book = require('../models/Book');
const cloudinary = require('../config/Cloudinary');

exports.addBook = async (req, res) => {
    try {
        const { title, author, description, isbn, publisher, publicationDate, language, category, price, discountPrice, stock, available, coverImages, pdfUrl, pages } = req.body;

        if (!title || !author || !category || !price || !coverImages) {
            return res.status(400).json({ message: "Credentials required" });
        }

        const existingBook = await Book.findOne({ title, isbn });

        if (existingBook) {
            return res.status(429).json({ message: "Book Already Exists" });
        }

        const newBook = new Book({
            title,
            author,
            description,
            isbn,
            publisher,
            publicationDate,
            language,
            category,
            price,
            discountPrice,
            stock,
            available,
            coverImages,
            pdfUrl,
            pages
        });

        if (!newBook) {
            return res.status(400).json({ message: "Error in creating book" });
        }

        await newBook.save();
        res.status(201).json({ message: "Book Added Successfully", newBook });
    } catch (error) {
        console.error("error in adding book", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        
        if (!books) {
            return res.status(404).json({ message: "No books found" });
        }

        res.status(200).json(books);
    } catch (error) {
        console.error("error in fetching books", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getBookById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({message: "Book fetched successfully", book});
 
    } catch (err) {
        console.error("error in fetching book by id", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.deleteBookById = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({message: "Book deleted successfully", book});
    } catch (error) {
        console.error("error in deleting book by id", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


