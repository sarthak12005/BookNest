const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    bio: {
      type: String,
      default: '',
      maxlength: 3000,
    },

    image: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },

    socialLinks: {
      twitter: String,
      instagram: String,
      linkedin: String,
      youtube: String,
    },

    genres: [
      {
        type: String,
        trim: true,
      },
    ],

    nationality: {
      type: String,
      trim: true,
      default: '',
    },

    bornDate: {
      type: Date,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    totalBooks: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },

    followersCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Author', authorSchema);
