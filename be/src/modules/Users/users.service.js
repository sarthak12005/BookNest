const {
  InternalServerError,
  BadRequestException,
  NotFoundException,
  throwBadRequestException,
  throwUnauthorizedException,
  throwNotFoundException,
} = require('../../utils/errorResponse');
const UserRepo = require('./users.repo');
const RoleRepo = require('../Roles/roles.repo');
const { compareHashPass } = require('../../lib/bcrypt');
const jwt = require('jsonwebtoken');
const bookRepo = require('../Books/books.repo');
const { toObjectIdOrThrow } = require('../../common/helper/toObjectId');

exports.register = async ({ fullName, email, username, password }) => {
  const existingUser = await UserRepo.checkEmailorUsername(email, username);

  if (existingUser) {
    throw {
      statusCode: 400,
      message: 'User already exists!',
      errors: [
        {
          field: 'email or username',
          message: 'Email or Username already exists',
        },
      ],
    };
  }

  const userRole = await RoleRepo.findByRoleCode('USER');

  if (!userRole) {
    throw {
      statusCode: 404,
      message: 'Role not found',
      errors: [],
    };
  }

  const user = await UserRepo.create({
    email,
    username,
    password,
    fullName,
    roleId: userRole._id,
  });

  if (!user) {
    throw {
      statusCode: 400,
      message: 'User creation failed',
      errors: [],
    };
  }

  return user;
};

exports.login = async ({ email, password }) => {
  try {
    const user = await UserRepo.findByEmail(email);

    if (!user) {
      throwBadRequestException('User not found', [
        { field: 'email', message: 'user not exists with this email' },
      ]);
    }

    const isValid = await compareHashPass(password, user.password);

    if (!isValid) {
      throwUnauthorizedException('Unauthorized', [
        {
          field: 'password',
          message: 'Invalid Credentials',
        },
      ]);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    if (!token) {
      throw {
        statusCode: 500,
        message: 'Token generation failed',
        errors: [],
      };
    }

    return {
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  } catch (error) {
    throw error; // ✅ pass to controller
  }
};

exports.addToWishList = async (bookId, userId) => {
  // convert into ObjectId
  const bookObjectId = await toObjectIdOrThrow(bookId);

  // find the book exits with the bookId
  const bookExits = await bookRepo.getBookById(bookId);

  if (!bookExits) {
    throwNotFoundException("Book not found", [
        {
          field: "bookId",
          message: "Book not exists"
        }
     ])
  }

  // find user
  const user = await UserRepo.findUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // check already exists
  const alreadyWishlisted = user.wishlist.some((id) => id.toString() === bookId);

  let updatedUser;
  let message;
  let wishlisted;

  // remove from wishlist
  if (alreadyWishlisted) {
    updatedUser = await UserRepo.removeFromWishlist(userId, bookObjectId);
    updateBook = await bookRepo.handleWishListCount(bookId, -1);  

    message = 'Book removed from wishlist';

    wishlisted = false;
  }

  // add to wishlist
  else {
    updatedUser = await UserRepo.addToWishlist(userId, bookObjectId);
    updateBook = await bookRepo.handleWishListCount(bookId, 1);

    message = 'Book added to wishlist';

    wishlisted = true;
  }

  return {
    message,
    wishlisted,
    wishlistCount: updatedUser.wishlist.length,
  };
};
