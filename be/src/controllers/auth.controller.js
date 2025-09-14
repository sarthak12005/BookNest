const User = require('../models/User');
const {generateHashPass,compareHashPass} = require('../lib/bcrypt');
const {generateToken} = require('../lib/jwt');


exports.loginUser = async (req, res) => {
     const {email, password} = req.body;

     console.log('the email is : ' + email);
     console.log('the password is : ' + password);
}

