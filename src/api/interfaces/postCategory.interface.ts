import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { PostCategory } from '../constants';

interface IRawPostCategory {
  id: string;
  pct_name: string;
  pct_slug: string;
  pct_parent: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostCategory = HydratedDocument<IRawPostCategory>;

export interface IPostCategoryAttrs {
  name: string;
  slug: string;
  parent: ObjectId;
}

export interface IPostCategoryResponseData {
  id: string;
  name: string;
  slug: string;
  parent: string;
}

export interface IPostCategoryModel extends Model<IPostCategory> {
  build(attrs: IPostCategoryAttrs): Promise<IPostCategory>;
}
