const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    profilePic: {
        type: String, default: ''
    },
    userCart: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    },
    userFaviourite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    bio: {
        type: String, default: ''
    },
    localAddress: {
        type: String, default: ''
    },
    city: {
        type: String, default: ''
    },
    state: {
        type: String, default: ''
    },
    country: {
        type: String, default: ''
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    purchasedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    blocked: {
        type: Boolean,
        default: false
    }


});


const User = mongoose.model('User', userSchema);

module.exports = User;