const {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
} = require('../../utils/ApiSuccessResponse');
const categoriesService = require('./categories.service');
const createCategoryZodSchema = require('./zod/create-category.zod');
const updateCategoryZodSchema = require('./zod/update-category.zod');
const searchingCategoryZodSchema = require('./zod/searching.zod');

exports.addCategory = async (req, res) => {
  const body = createCategoryZodSchema.parse(req.body);
  const newCategory = await categoriesService.addCategory(body);
  return ApiSuccessResponse(res, 201, 'Category Added Successfully', newCategory);
};

exports.getCategory = async (req, res) => {
  const query = searchingCategoryZodSchema.parse(req.query);
  const { categories, pagination } = await categoriesService.getCategories(query);
  return ApiPaginationSuccessResponse(
    res,
    200,
    'Categories fetched successfully',
    categories,
    pagination
  );
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoriesService.getCategoryById(id, true); // true, to allow fetching inactive categories for admin checks
  return ApiSuccessResponse(res, 200, 'Category Found', category);
};

exports.updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const body = updateCategoryZodSchema.parse(req.body);
  const updatedCategory = await categoriesService.updateCategory(id, body);
  return ApiSuccessResponse(res, 200, 'Category Updated Successfully', updatedCategory);
};

exports.deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await categoriesService.deleteCategory(id);
  return ApiSuccessResponse(res, 200, 'Category Deleted Successfully', deletedCategory);
};
