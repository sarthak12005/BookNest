const { Types } = require('mongoose');
const Category = require('./schemas/categories.schema');

exports.findCategoryById = async (categoryId) =>  {
    const category = await Category.findOne({
        _id: new Types.ObjectId(categoryId),
        isDeleted: false,
        isActive: true,
    });

    return category;
}