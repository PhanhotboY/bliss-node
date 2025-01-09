import { Schema, Types, model } from 'mongoose';
import { IOrder, IOrderModel } from '../interfaces/order.interface';
import { formatAttributeName } from '../utils';
import { ORDER, PRODUCT } from '../constants';

const orderSchema = new Schema<IOrder, IOrderModel>(
  {
    ord_name: { type: String, required: true },
    ord_msisdn: { type: String, required: true },
    ord_sum: { type: Number, required: true },
    ord_discount: { type: Number },
    ord_address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
      street: { type: String, required: true },
    },
    ord_products: {
      type: [
        {
          id: {
            type: Types.ObjectId,
            required: true,
            ref: PRODUCT.DOCUMENT_NAME,
          },
          quantity: { type: Number, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: ORDER.COLLECTION_NAME,
  }
);

orderSchema.statics.build = (attrs: IOrder) => {
  return OrderModel.create(formatAttributeName(attrs, ORDER.PREFIX));
};

export const OrderModel = model<IOrder, IOrderModel>(
  ORDER.DOCUMENT_NAME,
  orderSchema
);
