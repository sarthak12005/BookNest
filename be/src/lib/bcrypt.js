const bcrypt = require('bcryptjs');

exports.generateHashPass = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(pass, salt);
    return hashpass;
};


exports.compareHashPass = async (pass, userPass) => {
    const validatePassword = await bcrypt.compare(pass, userPass);
    return validatePassword;
};