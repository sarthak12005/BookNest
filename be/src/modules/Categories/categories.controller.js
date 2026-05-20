const Category = require('./schemas/categories.schema');
const cloudinary = require('../../config/Cloudinary');
const { ApiPaginationSuccessResponse } = require('../../utils/ApiSuccessResponse');
const { toObjectIdOrThrow } = require('../../common/helper/toObjectId');
const { Types } = require('mongoose');

exports.addCategory = async (req, res) => {
  try {
    const { category_name, file, description } = req.body;

    if (!category_name || !file || !description) {
      return res.status(400).json({ message: 'Credentials required' });
    }

    const existingCategory = await Category.findOne({ category_name });

    if (existingCategory) {
      return res.status(429).json({ message: 'Category Already Exists' });
    }

    let url = '';
    try {
      const result = await cloudinary.uploader.upload(file);
      url = result.secure_url;
      console.log('the file url is: ', url);
    } catch (err) {
      console.log('error in uploading image', err);
    }

    const newCategory = new Category({
      category_name,
      image: url,
      description,
    });

    if (!newCategory) {
      return res.status(400).json({ message: 'Error in creating category' });
    }

    await newCategory.save();
    res.status(201).json({ message: 'Category Added Successfully', newCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    // 👉 get from query (already validated via Zod ideally)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // 👉 filter
    const filter = { isDeleted: false, isActive: true };

    // 👉 fetch data + count in parallel
    const [categories, total] = await Promise.all([
      Category.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 }) // optional sorting
        .skip(skip)
        .limit(limit),

      Category.countDocuments(filter),
    ]);

    // 👉 calculate pagination meta
    const totalPages = Math.ceil(total / limit);

    const pagination = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
    return ApiPaginationSuccessResponse(
      res,
      200,
      'Categories fetched successfully',
      categories,
      pagination
    );
  } catch (error) {
    console.error('Error in fetching categories:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = await toObjectIdOrThrow(id);
    const category = await Category.findById(_id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found ' });
    }

    res.status(200).json({ message: 'Category Found', category });
  } catch (error) {
    console.log('error in fetching category by id: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: new Types.ObjectId(id), isDeleted: false },
      { isDeleted: true },
      { runValidators: true, new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found ' });
    }

    res.status(200).json({ message: 'Category Deleted Successfully', category });
  } catch (error) {
    console.log('error in deleting category by id: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
