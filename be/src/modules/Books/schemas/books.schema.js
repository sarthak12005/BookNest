const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: "Author"
    },

    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      maxlength: 200,
    },

    isbn: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    publisher: String,

    publicationDate: Date,

    language: {
      type: String,
      default: 'English',
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    tags: [
      {
        type: String,
        index: true,
      },
    ],

    // 💰 Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: 'Discount price must be less than or equal to price',
      },
    },

    currency: {
      type: String,
      default: 'INR',
    },

    // 📦 Inventory
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    // 📸 Media
    coverImages: [
      {
        type: String,
        required: true,
      },
    ],

    pdfUrl: String,

    pages: Number,

    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    wishlistCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ⭐ Ratings (optimized)
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // 📊 Status Control
    status: {
      type: String,
      enum: ['draft', 'published', 'out_of_stock'],
      default: 'draft',
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
       type: mongoose.Types.ObjectId,
       ref: "User",
    },

    // 🔍 SEO
    metaTitle: String,
    metaDescription: String,

    // 🧠 Search optimization
    searchKeywords: [String],
  },
  { timestamps: true }
);

// 🔥 TEXT SEARCH INDEX
bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text',
  tags: 'text',
});

// 🔥 AUTO SLUG GENERATION
bookSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
