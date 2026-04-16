const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌳 Parent Category (for subcategories)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
      index: true,
    },

    level: {
      type: Number,
      default: 0, // 0 = main category, 1 = subcategory
    },

    // 📊 Status Control
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    // 📌 Sorting
    sortOrder: {
      type: Number,
      default: 0,
    },

    // 🔍 SEO
    metaTitle: String,
    metaDescription: String,

    // 🧠 Optional: track usage
    productCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


// 🔥 UNIQUE NAME PER LEVEL (IMPORTANT)
categorySchema.index(
  { name: 1, parent: 1 },
  { unique: true }
);


// 🔥 AUTO SLUG
categorySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});


module.exports = mongoose.model('Category', categorySchema);