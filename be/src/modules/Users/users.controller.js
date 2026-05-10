const { addToWishList } = require('./users.service');
const { ApiSuccessResponse } = require('../../utils/ApiSuccessResponse');
// TODO: THIS FEATURE IS FOR ADMIN SO WE HAVE TO MOVE THIS TO ADMIN CONTROLLER
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find()
//         if (!users) {
//             return res.status(404).json({ message: "Users not found" });
//         }

//         res.status(200).json({ message: "Users Fetched Successfully", users });
//     } catch (err) {
//         console.log("error in fetching users", err);
//         res.status(500).json({ message: "Internal server error", err });
//     }
// }

// TODO: THIS FEATURE IS NEED SO MUCH IMPROVEMENT THERE WE HAVE TO DO
// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).json({ message: 'User id required' });
//     }

//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User fetched successfully', user });
//   } catch (err) {
//     console.log('error in fetching users', err);
//     res.status(500).json({ message: 'Internal server error', err });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password, username } = req.body;

//     if (!name || !email || !password || !username)
//       return res.status(400).json({ message: 'Credentials Required' });

//     const hashPass = generateHashPass(password);

//     const user = new User({
//       email,
//       password: hashPass,
//       username,
//       fullName: name,
//     });
//   } catch (error) {}
// };

exports.addToWishlist = async (req, res) => {
  const { bookId } = req.params;
  
  const response = await addToWishList(bookId, req.user.userId);

  return ApiSuccessResponse(res, 200, response.message, {wishlisted: response.wishlisted});
};
