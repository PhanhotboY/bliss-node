import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawProduct {
  _id: string;
  prd_name: string;
  prd_thumbnail: string;
  prd_basePrice: number;
  prd_discountPrice: number;
  prd_description?: string;
  prd_slug: string;
  prd_quantity: number;
  prd_category: ObjectId;
  prd_isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductAttrs {
  name: string;
  quantity: number;
  description?: string;
  slug: string;
  thumbnail: string;
  discountPrice: number;
  basePrice: number;
  category: ObjectId;
  isPublished?: boolean;
}

export type IProduct = HydratedDocument<IRawProduct>;

export interface IProductModel extends Model<IProduct> {
  build(attrs: IProductAttrs): Promise<IProduct>;
}
