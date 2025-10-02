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

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({ message: "No Category Found" });
        }

        res.status(200).json({ message: "Categorys fetched successfully", categories });

    } catch (error) {
        console.error("error in fetching categories", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found " });
        }

        res.status(200).json({ message: "Category Found", category });
    } catch (error) {
        console.log("error in fetching category by id: ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

exports.deleteCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({message: "Category not found "});
        }

        res.status(200).json({message: "Category Deleted Successfully", category});
    } catch (error) {
        console.log("error in deleting category by id: ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


