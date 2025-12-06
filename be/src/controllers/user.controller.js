const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }

        res.status(200).json({ message: "Users Fetched Successfully", users });
    } catch (err) {
        console.log("error in fetching users", err);
        res.status(500).json({ message: "Internal server error", err });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User id required" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User fetched successfully", user })
    } catch (err) {
        console.log("error in fetching users", err);
        res.status(500).json({ message: "Internal server error", err });
    }
}

exports.createUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

