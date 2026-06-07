const { email } = require('zod');
const User = require('./schema/users.schema');
const { toObjectIdOrThrow } = require('../../common/helper/toObjectId');

exports.create = async ({ fullName, email, username, password, roleId }) => {
  const user = await User.create({
    fullName,
    email,
    username,
    password,
    role: roleId,
  });
  return user;
};

exports.checkEmailorUsername = async (email, username) => {
  const user = await User.findOne({
    $or: [{ email }, { username }],
    deleted: false,
  });
  return user;
};

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email, deleted: false }).select('+password');
  return user;
};


exports.findUserById = async (userId) => {

  const user_id = await toObjectIdOrThrow(userId);

  return await User.findOne({_id: user_id, deleted: false});

};

exports.addToWishlist = async (
  userId,
  bookId
) => {

  const user_id = await toObjectIdOrThrow(userId);
  const book_id = await toObjectIdOrThrow(bookId);

  return await User.findOneAndUpdate(
    {_id: user_id, deleted: false},
    {
      $addToSet: {
        wishlist: book_id,
      },
    },
    {
      new: true,
    }
  );

};

exports.removeFromWishlist = async (
  userId,
  bookId
) => {

  const user_id = await toObjectIdOrThrow(userId);
  const book_id = await toObjectIdOrThrow(bookId);

  return await User.findOneAndUpdate(
    {_id: user_id, deleted: false},
    {
      $pull: {
        wishlist: book_id,
      },
    },
    {
      new: true,
    }
  );

};

exports.getWishlist = async (userId) => {
  const user_id = await toObjectIdOrThrow(userId);
  const user = await User.findOne({ _id: user_id, deleted: false })
    .populate('wishlist');
  return user ? user.wishlist : [];
};

