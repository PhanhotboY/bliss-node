import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Post } from '../constants';

interface IRawPost {
  _id: string;
  pst_title: string;
  pst_content: string;
  pst_thumbnail: string;
  pst_slug: string;
  pst_views: number;
  pst_excerpt: string;
  pst_category: ObjectId;
  pst_template: ObjectId;
  pst_isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IPost = HydratedDocument<IRawPost>;

export interface IPostAttrs {
  title: string;
  content: string;
  thumbnail: string;
  slug: string;
  excerpt: string;
  category: ObjectId;
  template: ObjectId;
  isPublished?: boolean;
  views?: number;
}

export interface IPostResponseData {
  id: string;
  category: string;
  template: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  slug: string;
  views: number;
  isPublished: boolean;
}

export interface IPostModel extends Model<IPost> {
  build(attrs: IPostAttrs): Promise<IPost>;
}
