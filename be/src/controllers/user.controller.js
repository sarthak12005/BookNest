const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {

    } catch (err) {
        console.log("error in fetching users", err);
        res.status(500).json({message:"Internal server error", err});
    }
}

exports.getUserById = async (req, res) => {
    
}

exports.createUser = async (req, res) => {

}

