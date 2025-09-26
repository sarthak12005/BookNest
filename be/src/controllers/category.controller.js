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

        let url = "";
        try {
            const result = await cloudinary.uploader.upload(file);
             url = result.secure_url;
            console.log("the file url is: ", url);
        } catch (err) {
            console.log("error in uploading image", err);
        }

        const newCategory = new Category({
            category_name,
            image: url,
            description
        });

        if (!newCategory) {
            return res.status(400).json({ message: "Error in creating category" });
        }

        await newCategory.save();
        res.status(201).json({ message: "Category Added Successfully", newCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}