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
