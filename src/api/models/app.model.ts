import { Schema, Types, model } from 'mongoose';
import { IApp, IAppModel } from '../interfaces/app.interface';
import { formatAttributeName } from '../utils';
import { APP } from '../constants';

const appSchema = new Schema<IApp, IAppModel>(
  {
    app_title: { type: String, required: true },
    app_description: { type: String, required: true },
    app_logo: { type: String, required: true },
    app_email: { type: String, required: true },
    app_msisdn: { type: String, required: true },
    app_address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      street: { type: String, required: true },
    },
    app_social: {
      facebook: { type: String, required: true },
      youtube: { type: String },
      tiktok: { type: String },
      zalo: { type: String, required: true },
    },
    app_google: {
      analytics: { type: String, required: true },
      reCaptcha: { type: String },
      map: { type: String, required: true },
    },
    app_taxCode: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: APP.COLLECTION_NAME,
  }
);

appSchema.statics.build = (attrs: IApp) => {
  return AppModel.create(formatAttributeName(attrs, APP.PREFIX));
};

export const AppModel = model<IApp, IAppModel>(APP.DOCUMENT_NAME, appSchema);
