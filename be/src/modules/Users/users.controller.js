const { addToWishList, getWishlist, getUsersList, getUserDetails, updateUser, deleteUser } = require('./users.service');
const { ApiSuccessResponse, ApiPaginationSuccessResponse } = require('../../utils/ApiSuccessResponse');
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

exports.getWishlist = async (req, res) => {
  const wishlist = await getWishlist(req.user.userId);
  return ApiSuccessResponse(res, 200, 'Wishlist fetched successfully', wishlist);
};

exports.getUsers = async (req, res) => {
  const query = req.query;
  const result = await getUsersList(query);
  return ApiPaginationSuccessResponse(res, 200, 'Users fetched successfully', result.users, result.pagination);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserDetails(id);
  return ApiSuccessResponse(res, 200, 'User fetched successfully', user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  return ApiSuccessResponse(res, 200, 'User updated successfully', updatedUser);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  return ApiSuccessResponse(res, 200, 'User deleted successfully', deletedUser);
};

exports.getMyProfile = async (req, res) => {
  const user = await getUserDetails(req.user.userId);
  return ApiSuccessResponse(res, 200, 'Profile fetched successfully', user);
};

exports.updateMyProfile = async (req, res) => {
  const updatedUser = await updateUser(req.user.userId, req.body);
  return ApiSuccessResponse(res, 200, 'Profile updated successfully', updatedUser);
};


