const { Types } = require('mongoose');
const cloudinary = require('../../config/Cloudinary');
const categoriesRepo = require('./categories.repo');
const {
  throwBadRequestException,
  throwNotFoundException,
} = require('../../utils/errorResponse');

exports.addCategory = async (body) => {
  try {
    const { name, description, file, image, parent, sortOrder, metaTitle, metaDescription } = body;

    const normalizedName = name.trim();

    // Check duplicate under parent
    const parentId = parent ? new Types.ObjectId(parent) : null;
    const existingCategory = await categoriesRepo.findCategoryByNameAndParent(normalizedName, parentId);

    if (existingCategory) {
      throwBadRequestException('Category Already Exists', [
        {
          field: 'name',
          message: `Category '${normalizedName}' already exists under the selected parent category.`,
        },
      ]);
    }

    let url = '';
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file);
        url = result.secure_url;
      } catch (err) {
        console.error('Error uploading image to Cloudinary:', err);
        throwBadRequestException('Failed to upload image to Cloudinary', [
          {
            field: 'file',
            message: err.message,
          },
        ]);
      }
    } else if (image) {
      url = image;
    } else {
      throwBadRequestException('Image is required', [
        {
          field: 'image',
          message: 'Please provide either a base64 file or an image URL.',
        },
      ]);
    }

    // Calculate level
    let level = 0;
    if (parent) {
      const parentCategory = await categoriesRepo.findCategoryById(parent, true);
      if (!parentCategory) {
        throwNotFoundException('Parent category not found', [
          {
            field: 'parent',
            message: 'Parent category does not exist.',
          },
        ]);
      }
      level = parentCategory.level + 1;
    }

    const payload = {
      name: normalizedName,
      description,
      image: url,
      parent: parentId,
      level,
      sortOrder: sortOrder || 0,
      metaTitle,
      metaDescription,
    };

    const newCategory = await categoriesRepo.createCategory(payload);
    return newCategory;
  } catch (error) {
    throw error;
  }
};

exports.getCategories = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      name,
      isActive,
      sortBy = 'sortOrder',
      sortOrder = 'asc',
    } = filters;

    const filter = { isDeleted: false };

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    const sort = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
      createdAt: -1,
    };

    const skip = (page - 1) * limit;

    const { categories, total } = await categoriesRepo.getCategories({
      filter,
      sort,
      skip,
      limit,
    });

    const totalPages = Math.ceil(total / limit);

    const pagination = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return {
      categories,
      pagination,
    };
  } catch (error) {
    throw error;
  }
};

exports.getCategoryById = async (id, includeInactive = false) => {
  try {
    const category = await categoriesRepo.findCategoryById(id, includeInactive);
    if (!category) {
      throwNotFoundException('Category not found');
    }
    return category;
  } catch (error) {
    throw error;
  }
};

exports.updateCategory = async (id, body) => {
  try {
    const category = await categoriesRepo.findCategoryById(id, true);
    if (!category) {
      throwNotFoundException('Category not found');
    }

    const { name, description, file, image, parent, sortOrder, metaTitle, metaDescription, isActive } = body;

    const updateData = {};

    if (name !== undefined) {
      const normalizedName = name.trim();
      const parentId = parent !== undefined ? (parent ? new Types.ObjectId(parent) : null) : category.parent;

      const duplicate = await categoriesRepo.findCategoryByNameAndParent(normalizedName, parentId);
      if (duplicate && duplicate._id.toString() !== id) {
        throwBadRequestException('Category name already exists under this parent', [
          {
            field: 'name',
            message: `A category with the name '${normalizedName}' already exists under the selected parent.`,
          },
        ]);
      }
      updateData.name = normalizedName;
    }

    if (description !== undefined) updateData.description = description;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (isActive !== undefined) updateData.isActive = isActive;

    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file);
        updateData.image = result.secure_url;
      } catch (err) {
        console.error('Error uploading image to Cloudinary during update:', err);
        throwBadRequestException('Failed to upload image to Cloudinary', [
          {
            field: 'file',
            message: err.message,
          },
        ]);
      }
    } else if (image !== undefined) {
      updateData.image = image;
    }

    if (parent !== undefined) {
      if (parent === null) {
        updateData.parent = null;
        updateData.level = 0;
      } else {
        if (parent === id) {
          throwBadRequestException('Category cannot be its own parent');
        }
        const parentCategory = await categoriesRepo.findCategoryById(parent, true);
        if (!parentCategory) {
          throwNotFoundException('Parent category not found');
        }
        updateData.parent = new Types.ObjectId(parent);
        updateData.level = parentCategory.level + 1;
      }
    }

    const updatedCategory = await categoriesRepo.updateCategory(id, updateData);
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

exports.deleteCategory = async (id) => {
  try {
    const category = await categoriesRepo.findCategoryById(id, true);
    if (!category) {
      throwNotFoundException('Category not found');
    }

    const deletedCategory = await categoriesRepo.deleteCategory(id);
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};
