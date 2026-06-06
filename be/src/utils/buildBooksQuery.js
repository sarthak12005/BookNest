const mongoose = require('mongoose');

const buildBookQuery = (filters) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    language,
    status,
    isFeatured,
    minRating,
    inStock,
    newArrival = false, // ✅ added
  } = filters;

  const query = {
    isDeleted: false,
  };

  // 🔍 Search
  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },


      {
        description: {
          $regex: search,
          $options: 'i',
        },
      },

      {
        shortDescription: {
          $regex: search,
          $options: 'i',
        },
      },

      {
        tags: {
          $regex: search,
          $options: 'i',
        },
      },

      {
        searchKeywords: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }

  // 📚 Category
  if (category) {
    query.category = new mongoose.Types.ObjectId(category);
  }

  // 💰 Price
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = minPrice;
    }

    if (maxPrice) {
      query.price.$lte = maxPrice;
    }
  }

  // 🌍 Language
  if (language) {
    query.language = language;
  }

  // 📊 Status
  if (status) {
    query.status = status;
  }

  // ⭐ Featured
  if (isFeatured !== undefined) {
    query.isFeatured = isFeatured;
  }

  // ⭐ Rating
  if (minRating) {
    query.averageRating = {
      $gte: minRating,
    };
  }

  // 📦 Stock
  if (inStock === true) {
    query.stock = {
      $gt: 0,
    };
  }

  // 🆕 New Arrival
  if (newArrival === 'true' || newArrival === true) {
    const twoAndHalfDaysAgo = new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000);

    query.createdAt = {
      $gte: twoAndHalfDaysAgo,
    };
  }

  return query;
};

module.exports = buildBookQuery;
