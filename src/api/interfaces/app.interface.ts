import { HydratedDocument, Model } from 'mongoose';

export interface IRawApp {
  app_title: string;
  app_description: string;
  app_logo: string;
  app_email: string;
  app_msisdn: string;
  app_address: {
    province: string;
    district: string;
    street: string;
  };
  app_social: {
    facebook: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };
  app_google: {
    analytics: string;
    reCaptcha: string;
    map: string;
  };
  app_taxCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IApp = HydratedDocument<IRawApp>;

export interface IAppAttrs {
  title: string;
  description: string;
  logo: string;
  email: string;
  msisdn: string;
  address: {
    province: string;
    district: string;
    street: string;
  };
  social: {
    facebook: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };
  google: {
    analytics: string;
    reCaptcha: string;
    map: string;
  };
  taxCode: string;
}

export interface IAppModel extends Model<IApp> {
  build(attrs: IAppAttrs): Promise<IApp>;
}
