import { ProductModel } from '@models/product.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { NotFoundError } from '../core/errors';
import { IProductAttrs } from '../interfaces/product.interface';
import slugify from 'slugify';
import { PRODUCT } from '../constants';
import { IProductCategoryAttrs } from '../interfaces/productCategory.interface';
import { ProductCategoryModel } from '@models/productCategory.model';

const getProducts = async () => {
  const products = await ProductModel.find({}, ['-__v'])
    .populate({
      path: 'prd_category',
      select: '-__v',
    })
    .lean();
  return getReturnList(products);
};

const getProductDetails = async (productId: string) => {
  const product = await ProductModel.findOne(
    { $or: [{ _id: productId }, { prd_slug: productId }] },
    ['-__v']
  )
    .populate({
      path: 'prd_category',
      select: '-__v',
    })
    .lean();
  if (!product) throw new NotFoundError('Product not found');

  return getReturnData(product);
};

const createProduct = async (product: IProductAttrs) => {
  const newProduct = await ProductModel.build({
    ...product,
    slug: product.name && slugify(product.name, { lower: true }),
  });
  return getReturnData(newProduct);
};

const updateProduct = async (productId: string, product: IProductAttrs) => {
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { _id: productId },
    {
      ...formatAttributeName(removeNestedNullish(product), PRODUCT.PREFIX),
      pst_slug: product.name && slugify(product.name, { lower: true }),
    },
    { new: true }
  );
  if (!updatedProduct) throw new NotFoundError('Product not found');
  return getReturnData(updatedProduct);
};

const deleteProduct = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return getReturnData(deletedProduct || {});
};

const createProductCategory = async ({ name }: IProductCategoryAttrs) => {
  const newCategory = await ProductCategoryModel.build({
    name,
    slug: slugify(name, { lower: true }),
  });
  return getReturnData(newCategory);
};

const getProductCategories = async () => {
  const categories = await ProductCategoryModel.find({}, ['-__v']).lean();
  return getReturnList(categories);
};

export {
  getProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductCategory,
  getProductCategories,
};
