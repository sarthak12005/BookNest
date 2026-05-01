const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },

    // 🔥 SNAPSHOT DATA (CRITICAL)
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: Number,
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    coverImage: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    items: [orderItemSchema],

    // 💰 Pricing Breakdown
    totalItems: Number,

    subtotal: {
      type: Number,
      required: true,
    },

    totalDiscount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: 'INR',
    },

    // 📍 ADDRESS SNAPSHOT (VERY IMPORTANT)
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    // 💳 PAYMENT INFO
    payment: {
      method: {
        type: String,
        enum: ['COD', 'ONLINE'],
        required: true,
      },

      status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded'],
        default: 'pending',
        index: true,
      },

      transactionId: String,
      paymentGateway: String,
      paidAt: Date,
    },

    // 📦 ORDER STATUS FLOW
    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'packed',
        'shipped',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'returned',
      ],
      default: 'pending',
      index: true,
    },

    // 📦 Tracking
    trackingId: String,
    courierPartner: String,

    // ⏱ Dates
    orderedAt: {
      type: Date,
      default: Date.now,
    },

    deliveredAt: Date,
    cancelledAt: Date,

    // 🔁 Flags
    isCancelled: {
      type: Boolean,
      default: false,
    },

    isReturned: {
      type: Boolean,
      default: false,
    },

    // 🧠 Notes
    orderNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
