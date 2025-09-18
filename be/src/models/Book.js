const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String, // you can also link to an Author collection
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
        sparse: true // allows some books without ISBN
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
    // category & tags
    category: {
        type: String, // Or use ObjectId if you want a separate Category collection
    },
    tags: [String], // Array of keywords
    // Store / Inventory
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
    // Extra
    coverImage: {
        type: String // URL or file path
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

    // Timestamps
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;