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
        type: [String], default: []
    },
    userFaviourite: {
        type: [String], default: []
    },
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
    country : {
        type: String, default: ''
    },
    purchasedBooks: {
        tyep: [String], default: []
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;