const User = require('../models/User');
const { generateHashPass, compareHashPass } = require('../lib/bcrypt');
const { generateToken } = require('../lib/jwt');


exports.loginUser = async (req, res) => {
     const { email, password } = req.body;

     console.log('the email is : ' + email);
     console.log('the password is : ' + password);
}

exports.registerUser = async (req, res) => {
     try {
          const { fullName, email, username, password } = req.body;

          console.log(fullName, email, username, password);

          if (!fullName || !email || !username || !password) {   // this statement checks that if we have a null or empty value present in the body
               return res.status(400).json({ message: "Credentials Required" }); // the 400 status code is used for bad request 
          }

          const existingUser = await User.findOne({ email }); // this method is used to find that the user is already present in the database

          if (existingUser) {
               return res.status(409).json({ message: "This email is already exits" });
          }

          const hashpass = await generateHashPass(password);

          const user = new User({
               fullName,
               email,
               password: hashpass,
               username
          });

          if (!user) {
               return res.status(400).json({ message: "User not Created" });
          }

          await user.save();

          res.status(200).json({ message: "User Created Successfullly", user });


     } catch (err) {
          console.log("error in Registering user", err);
          res.status(500).json({ message: "Internal Server Error", err });
     }
}

