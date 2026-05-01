const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },

    // 🧠 SNAPSHOT (VERY IMPORTANT)
    title: String,
    price: Number,
    discountPrice: Number,
    coverImage: String,

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one cart per user
      index: true,
    },

    items: [cartItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    // 📊 Cart State
    status: {
      type: String,
      enum: ['active', 'ordered', 'abandoned'],
      default: 'active',
      index: true,
    },

    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// 🔥 AUTO CALCULATE TOTALS
cartSchema.pre('save', function (next) {
  let totalItems = 0;
  let totalAmount = 0;
  let totalDiscount = 0;

  this.items.forEach((item) => {
    totalItems += item.quantity;

    const itemPrice = item.discountPrice || item.price;
    totalAmount += itemPrice * item.quantity;

    if (item.discountPrice) {
      totalDiscount += (item.price - item.discountPrice) * item.quantity;
    }
  });

  this.totalItems = totalItems;
  this.totalAmount = totalAmount;
  this.totalDiscount = totalDiscount;

  next();
});

module.exports = mongoose.model('Cart', cartSchema);
