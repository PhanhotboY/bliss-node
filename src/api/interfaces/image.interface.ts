import { HydratedDocument, Model } from 'mongoose';

export interface IRawImage {
  img_name: string;
  img_title: string;
  img_type: string;
  img_description: string;
  img_link: string;
  img_url: string;
  img_isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImageAttrs {
  name: string;
  title: string;
  type?: string;
  description?: string;
  link?: string;
  url: string;
  isPublic?: boolean;
}

export type IImage = HydratedDocument<IRawImage>;

export interface IImageModel extends Model<IImage> {
  build(attrs: IImageAttrs): Promise<IImage>;
}
