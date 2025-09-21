const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

