import { Schema, Types, model } from 'mongoose';
import {
  IProductCategory,
  IProductCategoryModel,
} from '../interfaces/productCategory.interface';
import { formatAttributeName } from '../utils';
import { PRODUCT } from '../constants';

const productCategorySchema = new Schema<
  IProductCategory,
  IProductCategoryModel
>(
  {
    pct_name: { type: String, trim: true, required: true, unique: true },
    pct_slug: { type: String, trim: true, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: PRODUCT.CATEGORY.COLLECTION_NAME,
  }
);

productCategorySchema.statics.build = (attrs: IProductCategory) => {
  return ProductCategoryModel.create(
    formatAttributeName(attrs, PRODUCT.CATEGORY.PREFIX)
  );
};

export const ProductCategoryModel = model<
  IProductCategory,
  IProductCategoryModel
>(PRODUCT.CATEGORY.DOCUMENT_NAME, productCategorySchema);
