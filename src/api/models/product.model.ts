import { Schema, Types, model } from 'mongoose';
import { IProduct, IProductModel } from '../interfaces/product.interface';
import { formatAttributeName } from '../utils';
import { PRODUCT } from '../constants';

const productSchema = new Schema<IProduct, IProductModel>(
  {
    prd_name: {
      type: String,
      trim: true,
      required: true,
    },
    prd_description: {
      type: String,
      trim: true,
    },
    prd_basePrice: {
      type: Number,
      required: true,
    },
    prd_discountPrice: {
      type: Number,
      required: true,
    },
    prd_category: {
      type: Types.ObjectId,
      ref: PRODUCT.CATEGORY.DOCUMENT_NAME,
    },
    prd_isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    prd_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    prd_slug: {
      type: String,
      trim: true,
    },
    prd_thumbnail: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: PRODUCT.COLLECTION_NAME,
  }
);

productSchema.statics.build = (attrs: IProduct) => {
  return ProductModel.create(formatAttributeName(attrs, PRODUCT.PREFIX));
};

export const ProductModel = model<IProduct, IProductModel>(
  PRODUCT.DOCUMENT_NAME,
  productSchema
);
