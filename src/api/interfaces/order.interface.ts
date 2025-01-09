import { HydratedDocument, Model, ObjectId } from 'mongoose';
// import { Order } from '../constants';

interface IRawOrder {
  id: string;
  ord_name: string;
  ord_msisdn: string;
  ord_address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  ord_sum: number;
  ord_discount: number;
  ord_products: Array<{
    id: ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export type IOrder = HydratedDocument<IRawOrder>;

export interface IOrderAttrs {
  name: string;
  msisdn: string;
  sum: number;
  discount: number;
  address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  products: Array<{
    id: ObjectId;
    quantity: number;
  }>;
}

export interface IOrderModel extends Model<IOrder> {
  build(attrs: IOrderAttrs): Promise<IOrder>;
}
