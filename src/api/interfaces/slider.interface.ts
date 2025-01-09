import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawSlider {
  id: string;
  sld_images: { url: string; alt: string; link?: string }[];
  sld_type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISliderAttrs {
  images: { url: string; alt: string; link?: string }[];
  type: string;
}

export type ISlider = HydratedDocument<IRawSlider>;

export interface ISliderModel extends Model<ISlider> {
  build(attrs: ISliderAttrs): Promise<ISlider>;
}
