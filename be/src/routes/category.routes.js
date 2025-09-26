const Category = require('../models/Category');
const cloudinary = require('../config/Cloudinary');


exports.addCategory = async (req, res) => {
    try {
        const { category_name, file, description } = req.body;

        if (!category_name || !file || !description) {
            return res.status(400).json({ message: "Credentials required" });
        }

        const existingCategory = await Category.findOne({ category_name });

        if (existingCategory) {
            return res.status(429).json({ message: "Category Already Exists" });
        }

        try {
            const result = await cloudinary.uploader.upload(file);
            const url = result.secure_url;
            console.log("the file url is: ", url);
        } catch (err) {
            console.log("error in uploading image", err);
        }

        


    } catch (err) {

    }
}