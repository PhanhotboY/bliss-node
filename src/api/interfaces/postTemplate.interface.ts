import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { PostTemplate } from '../constants';

interface IRawPostTemplate {
  _id: string;
  ptp_name: string;
  ptp_code: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IPostTemplate = HydratedDocument<IRawPostTemplate>;

export interface IPostTemplateAttrs {
  name: string;
  code: string;
}

export interface IPostTemplateResponseData {
  id: string;
  name: string;
  code: string;
}

export interface IPostTemplateModel extends Model<IPostTemplate> {
  build(attrs: IPostTemplateAttrs): Promise<IPostTemplate>;
}
