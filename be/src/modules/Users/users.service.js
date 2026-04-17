const {ApiSuccessResponse} = require('../../utils/ApiSuccessResponse');
const { InternalServerError, BadRequestException, NotFoundException, throwBadRequestException, throwUnauthorizedException } = require('../../utils/errorResponse');
const UserRepo = require('./users.repo');
const RoleRepo = require('../Roles/roles.repo');
const { compareHashPass } = require('../../lib/bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ fullName, email, username, password }) => {

    const existingUser = await UserRepo.checkEmailorUsername(email, username);

    if (existingUser) {
        throw {
            statusCode: 400,
            message: "Validation Error",
            errors: [
                {
                    field: "email or username",
                    message: "Email or Username already exists",
                }
            ]
        };
    }

    const userRole = await RoleRepo.findByRoleCode("USER");

    if (!userRole) {
        throw {
            statusCode: 404,
            message: "Role not found",
            errors: []
        };
    }

    const user = await UserRepo.create({
        email,
        username,
        password,
        fullName,
        roleId: userRole._id
    });

    if (!user) {
        throw {
            statusCode: 400,
            message: "User creation failed",
            errors: []
        };
    }

    return user;
};

exports.login = async ({ email, password }) => {
    try {
        const user = await UserRepo.findByEmail(email);

        if (!user) {
            throwBadRequestException("User not found", [{ field: email, message: "user not exists with this email" }]);
        }

        const isValid = await compareHashPass(password, user.password);

        if (!isValid) {
            throwUnauthorizedException(
                "Unauthorized",
                [
                    {
                        field: "password",
                        message: "Invalid Credentials",
                    },
                ],
            );
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        if (!token) {
            throw {
                statusCode: 500,
                message: "Token generation failed",
                errors: [],
            };
        }
        // ✅ return to controller
        return {
            token,
            user: {
                _id: user._id,
                email: user.email,
            },
        };

    } catch (error) {
        throw error; // ✅ pass to controller
    }
};