import { Schema, Types, model } from 'mongoose';
import {
  IPostTemplate,
  IPostTemplateModel,
} from '../interfaces/postTemplate.interface';
import { formatAttributeName } from '../utils';
import { POST } from '../constants';

const postTemplateSchema = new Schema<IPostTemplate, IPostTemplateModel>(
  {
    ptp_name: { type: String, required: true, unique: true },
    ptp_code: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: POST.TEMPLATE.COLLECTION_NAME,
  }
);

postTemplateSchema.statics.build = (attrs: IPostTemplate) => {
  return PostTemplateModel.create(
    formatAttributeName(attrs, POST.TEMPLATE.PREFIX)
  );
};

export const PostTemplateModel = model<IPostTemplate, IPostTemplateModel>(
  POST.TEMPLATE.DOCUMENT_NAME,
  postTemplateSchema
);
