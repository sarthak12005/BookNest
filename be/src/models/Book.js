const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true 
    },
    publisher: {
        type: String
    },
    publicationDate: {
        type: Date
    },
    language: {
        type: String,
        default: "English"
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    coverImages: {
        type: [String],
    },
    pdfUrl: {
        type: String,
    },
    pages: {
        type: Number
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            comment: String,
            rating: { type: Number, min: 1, max: 5 },
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);


module.exports = Book;
