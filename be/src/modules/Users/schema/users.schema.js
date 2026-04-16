const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        profilePic: {
            type: String,
            default: '',
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },

        // 🧠 Account Status
        isVerified: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        blocked: {
            type: Boolean,
            default: false,
        },

        deleted: {
            type: Boolean,
            default: false,
        },

        // 🔐 Security Tracking
        lastLogin: Date,
        loginAttempts: {
            type: Number,
            default: 0,
        },

        // 🛒 Relations
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        },

        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book', // ✅ FIXED
            },
        ],

        purchasedBooks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
        ],
        
        bio: {
            type: String,
            maxlength: 200,
        },
    },
    { timestamps: true }
);


// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// 🔐 Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', userSchema);