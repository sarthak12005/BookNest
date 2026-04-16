const { email } = require('zod');
const User = require('./schema/users.schema');

exports.create = async ({ fullName, email, username, password, roleId }) => {
    const user = await User.create({
        fullName,
        email,
        username,
        password,
        role: roleId
    });
    return user;
}

exports.checkEmailorUsername = async (email, username) => {
    const user = await User.findOne({
        $or: [{ email }, { username }],
        deleted: false
    });
    return user;
}

exports.findByEmail = async (email) => {
    const user = await User.findOne({ email, deleted: false })
    .select("+password");

    return user;
}