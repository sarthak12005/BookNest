const User = require('../models/User');
const { generateHashPass, compareHashPass } = require('../lib/bcrypt');
const { generateToken } = require('../lib/jwt');


exports.loginUser = async (req, res) => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               return res.status(400).json({ message: "Credentials required" });
          }

          const user = await User.findOne({ email });

          if (!user) {
               return res.status(404).json({ message: "User not found " });
          }

          const validated = await compareHashPass(password, user.password);

          if (!validated) { 
               return res.status(401).json({ message: "incorrect password or Email" });
          }

          const token = await generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

          if (!token) {
               return res.status(404).json({ message: "Failed to generate token " });
          }

          res.status(200).json({ message: "User login Successfully", user, token });

     } catch (err) {
          console.log("Error in login user", err);
          res.status(500).json({ message: "Internal Server Error" });
     }
}

exports.registerUser = async (req, res) => {
     try {
          const { fullName, email, username, password } = req.body;

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

exports.getMe = async (req, res) => {
     try {
          const userId = req.user.userId;
          const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");
          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json({ message: "User found successfully", user });
     } catch (error) {
          console.log("error in fetching me: ", error);
          res.status(500).json({message: "Internal Server error", error});
     }
}

