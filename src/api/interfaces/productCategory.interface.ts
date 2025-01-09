import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawProductCategory {
  id: string;
  pct_name: string;
  pct_slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCategoryAttrs {
  name: string;
  slug: string;
}

export type IProductCategory = HydratedDocument<IRawProductCategory>;

export interface IProductCategoryModel extends Model<IProductCategory> {
  build(attrs: IProductCategoryAttrs): Promise<IProductCategory>;
}
