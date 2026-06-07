const mongoose = require("mongoose");

exports.getAllBooksAggregationPipeline = (
  query,
  skip,
  sort,
  limit = 10,
  userId = null
) => {

  const aggregationPipeline = [

    // 🔍 Match
    {
      $match: query,
    },

    // 📚 Category lookup
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },

    // unwind category
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },

    // ✍️ Author lookup
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },

    // unwind author
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },

  ];

  // ❤️ Wishlist Logic
  if (userId) {
    aggregationPipeline.push(

      // lookup user
      {
        $lookup: {
          from: "users",
          let: {
            bookId: "$_id",
          },
          pipeline: [

            {
              $match: {
                _id: new mongoose.Types.ObjectId(userId),
              },
            },

            {
              $project: {
                wishlist: 1,
              },
            },

          ],
          as: "userData",
        },
      },

      // add wishlisted field
      {
        $addFields: {

          wishlisted: {
            $in: [
              "$_id",
              {
                $ifNull: [
                  {
                    $arrayElemAt: [
                      "$userData.wishlist",
                      0,
                    ],
                  },
                  [],
                ],
              },
            ],
          },

        },
      }

    );

  } else {

    aggregationPipeline.push({

      $addFields: {
        wishlisted: false,
      },

    });

  }

  // sorting
  aggregationPipeline.push(
    {
      $sort: sort,
    },

    {
      $skip: skip,
    },

    {
      $limit: limit,
    },

    // projection
    {
      $project: {

        title: 1,
        slug: 1,
        author: { $ifNull: ["$author.name", "Unknown Author"] },
        shortDescription: 1,
        price: 1,
        discountPrice: 1,
        averageRating: 1,
        totalReviews: 1,
        coverImages: 1,
        stock: 1,
        soldCount: 1,
        viewCount: 1,
        status: 1,
        isFeatured: 1,
        createdAt: 1,

        // ❤️ wishlist
        wishlisted: 1,

        // category
        "category._id": 1,
        "category.name": 1,

      },
    }
  );

  return aggregationPipeline;
};

exports.getSingleBookAggregationPipeline = (
  bookId,
  userId = null
) => {

  const aggregationPipeline = [

    // =========================
    // MATCH BOOK
    // =========================
    {
      $match: {
        _id: new mongoose.Types.ObjectId(bookId),

        status: "published",

        isDeleted: false,
      },
    },

    // =========================
    // CATEGORY LOOKUP
    // =========================
    {
      $lookup: {
        from: "categories",

        localField: "category",

        foreignField: "_id",

        as: "category",
      },
    },

    // category unwind
    {
      $unwind: {
        path: "$category",

        preserveNullAndEmptyArrays: true,
      },
    },

    // =========================
    // AUTHOR LOOKUP
    // =========================
    {
      $lookup: {
        from: "authors",

        localField: "author",

        foreignField: "_id",

        as: "author",
      },
    },

    // author unwind
    {
      $unwind: {
        path: "$author",

        preserveNullAndEmptyArrays: true,
      },
    },

  ];

  // =========================
  // WISHLIST LOGIC
  // =========================
  if (userId) {

    aggregationPipeline.push(

      // user lookup
      {
        $lookup: {
          from: "users",

          let: {
            bookId: "$_id",
          },

          pipeline: [

            {
              $match: {
                _id: new mongoose.Types.ObjectId(userId),
              },
            },

            {
              $project: {
                wishlist: 1,
              },
            },

          ],

          as: "userData",
        },
      },

      // add wishlisted field
      {
        $addFields: {

          wishlisted: {
            $in: [
              "$_id",

              {
                $ifNull: [

                  {
                    $arrayElemAt: [
                      "$userData.wishlist",
                      0,
                    ],
                  },

                  [],
                ],
              },
            ],
          },

        },
      }

    );

  } else {

    aggregationPipeline.push({

      $addFields: {
        wishlisted: false,
      },

    });

  }

  // =========================
  // LIMIT
  // =========================
  aggregationPipeline.push({

    $limit: 1,

  });

  // =========================
  // FINAL PROJECTION
  // =========================
  aggregationPipeline.push({

    $project: {

      // BOOK
      title: 1,
      slug: 1,
      shortDescription: 1,
      description: 1,

      price: 1,
      discountPrice: 1,

      averageRating: 1,
      totalReviews: 1,

      coverImages: 1,

      stock: 1,
      soldCount: 1,
      viewCount: 1,

      language: 1,
      publisher: 1,

      pages: 1,
      publishedDate: 1,

      isbn: 1,

      tags: 1,

      status: 1,

      isFeatured: 1,

      createdAt: 1,

      // ❤️ wishlist
      wishlisted: 1,

      // =====================
      // CATEGORY
      // =====================
      category: {

        _id: "$category._id",

        name: "$category.name",

        slug: "$category.slug",

      },

      // =====================
      // AUTHOR
      // =====================
      author: {

        _id: "$author._id",

        name: "$author.name",

        slug: "$author.slug",

        image: "$author.image",

        bio: "$author.bio",

        followersCount: "$author.followersCount",

        averageRating: "$author.averageRating",

        totalBooks: "$author.totalBooks",

        genres: "$author.genres",

        nationality: "$author.nationality",

        isFeatured: "$author.isFeatured",

      },

    },

  });

  return aggregationPipeline;

};