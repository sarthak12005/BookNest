const User = require('../Users/schema/users.schema');
const { generateHashPass, compareHashPass } = require('../../lib/bcrypt');
const { generateToken } = require('../../lib/jwt');
const jwt = require('jsonwebtoken');
const { BadRequestException, InternalServerError } = require('../../utils/errorResponse');
const UserService = require('../Users/users.service');
const { ApiSuccessResponse } = require('../../utils/ApiSuccessResponse');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const response = await UserService.login({ email, password });

  res.cookie('jwt', response.token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax', // ✅ FIXED
    secure: process.env.NODE_ENV === 'deployment',
  });

  return ApiSuccessResponse(res, 200, 'User login Successfully', {
    token: response.token,
    _id: response.user._id,
    email: response.user.email,
    user: response.user
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    const user = await UserService.register({
      fullName,
      email,
      username,
      password,
    });

    return ApiSuccessResponse(res, 201, 'User Created Successfully', {
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    console.error('Error registering user:', err);

    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      errors: err.errors || [],
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({ message: 'Invalid user token: ID missing' });
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found for this token' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('FATAL: Server error in getMe:', error);
    res.status(500).json({ message: 'Server encountered a critical error when fetching user.' });
  }
};

exports.logout = async (req, res) => {
  try {
    console.log("request come here");
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server encountered a critical error when logout user.' });
  }
}
