import { Schema, Types, model } from 'mongoose';
import { IPost, IPostModel } from '../interfaces/post.interface';
import { formatAttributeName } from '../utils';
import { POST } from '../constants';

const postSchema = new Schema<IPost, IPostModel>(
  {
    pst_title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    pst_content: {
      type: String,
      trim: true,
    },
    pst_excerpt: {
      type: String,
      trim: true,
    },
    pst_thumbnail: {
      type: String,
      trim: true,
    },
    pst_slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    pst_category: {
      type: Types.ObjectId,
      ref: POST.CATEGORY.DOCUMENT_NAME,
    },
    pst_template: {
      type: Types.ObjectId,
      ref: POST.TEMPLATE.DOCUMENT_NAME,
      required: true,
    },
    pst_views: {
      type: Number,
      required: true,
      default: 0,
    },
    pst_isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: POST.COLLECTION_NAME,
  }
);

postSchema.statics.build = (attrs: IPost) => {
  return PostModel.create(formatAttributeName(attrs, POST.PREFIX));
};

export const PostModel = model<IPost, IPostModel>(
  POST.DOCUMENT_NAME,
  postSchema
);
