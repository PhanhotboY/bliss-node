import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Service } from '../constants';

interface IRawService {
  _id: string;
  svc_name: string;
  svc_description: string;
  svc_basePrice: number;
  svc_discountPrice: number;
  svc_page: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IService = HydratedDocument<IRawService>;

export interface IServiceAttrs {
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  page: string;
}

export interface IServiceResponseData {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  page: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceModel extends Model<IService> {
  build(attrs: IServiceAttrs): Promise<IService>;
}
