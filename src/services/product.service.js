const Product = require('../models/product.model');

const getProducts = async (search = '', page = 1, limit = 5) => {

  const skip = (page - 1) * limit;

  const filter = search
    ? {
        name: {
          $regex: search,
          $options: 'i'
        }
      }
    : {};

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
};
const getProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true
    }
  );
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};