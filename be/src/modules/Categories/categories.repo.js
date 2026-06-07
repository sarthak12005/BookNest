const { Types } = require('mongoose');
const Category = require('./schemas/categories.schema');

exports.createCategory = async (data) => {
  return await Category.create(data);
};

exports.findCategoryById = async (categoryId, includeInactive = false) => {
  const filter = {
    _id: new Types.ObjectId(categoryId),
    isDeleted: false,
  };
  if (!includeInactive) {
    filter.isActive = true;
  }
  return await Category.findOne(filter);
};

exports.findCategoryByNameAndParent = async (name, parentId = null) => {
  return await Category.findOne({
    name,
    parent: parentId ? new Types.ObjectId(parentId) : null,
    isDeleted: false,
  });
};

exports.getCategories = async ({ filter, sort, skip, limit }) => {
  const [categories, total] = await Promise.all([
    Category.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Category.countDocuments(filter),
  ]);

  return {
    categories,
    total,
  };
};

exports.updateCategory = async (id, updateData) => {
  return await Category.findOneAndUpdate(
    { _id: new Types.ObjectId(id), isDeleted: false },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

exports.deleteCategory = async (id) => {
  return await Category.findOneAndUpdate(
    { _id: new Types.ObjectId(id), isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
};