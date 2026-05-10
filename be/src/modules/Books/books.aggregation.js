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
        author: 1,
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