const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    comment: String,
    rating: { type: Number, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

const Review = model('Review', reviewSchema);

module.exports = Review;