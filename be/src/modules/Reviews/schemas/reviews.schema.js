const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    // ✅ Verified Purchase
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 👍 Helpful system
    helpfulVotes: {
      type: Number,
      default: 0,
    },

    // 🚫 Moderation
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
      index: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: Date,

    // 🗑 Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// 🔥 PREVENT DUPLICATE REVIEWS
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);