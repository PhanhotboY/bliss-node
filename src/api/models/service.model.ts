import { Schema, Types, model } from 'mongoose';
import { IService, IServiceModel } from '../interfaces/service.interface';
import { formatAttributeName } from '../utils';
import { POST, SERVICE } from '../constants';

const serviceSchema = new Schema<IService, IServiceModel>(
  {
    svc_name: { type: String, trim: true, unique: true, required: true },
    svc_description: { type: String, trim: true, required: true },
    svc_basePrice: { type: Number, required: true },
    svc_discountPrice: { type: Number, required: true },
    svc_page: { type: Types.ObjectId, ref: POST.DOCUMENT_NAME, required: true },
  },
  {
    timestamps: true,
    collection: SERVICE.COLLECTION_NAME,
  }
);

serviceSchema.statics.build = (attrs: IService) => {
  return ServiceModel.create(formatAttributeName(attrs, SERVICE.PREFIX));
};

export const ServiceModel = model<IService, IServiceModel>(
  SERVICE.DOCUMENT_NAME,
  serviceSchema
);
