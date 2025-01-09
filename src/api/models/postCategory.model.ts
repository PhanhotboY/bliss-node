import { Schema, Types, model } from 'mongoose';
import {
  IPostCategory,
  IPostCategoryModel,
} from '../interfaces/postCategory.interface';
import { formatAttributeName } from '../utils';
import { POST } from '../constants';

const postCategorySchema = new Schema<IPostCategory, IPostCategoryModel>(
  {
    pct_name: { type: String, required: true, unique: true },
    pct_slug: { type: String, required: true, unique: true },
    pct_parent: { type: Types.ObjectId, ref: POST.CATEGORY.DOCUMENT_NAME },
  },
  {
    timestamps: true,
    collection: POST.CATEGORY.COLLECTION_NAME,
  }
);

postCategorySchema.statics.build = (attrs: IPostCategory) => {
  return PostCategoryModel.create(
    formatAttributeName(attrs, POST.CATEGORY.PREFIX)
  );
};

export const PostCategoryModel = model<IPostCategory, IPostCategoryModel>(
  POST.CATEGORY.DOCUMENT_NAME,
  postCategorySchema
);
