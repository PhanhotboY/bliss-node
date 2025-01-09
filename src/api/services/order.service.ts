import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { IOrderAttrs } from '../interfaces/order.interface';
import { OrderModel } from '../models/order.model';
import { NotFoundError } from '../core/errors';
import { ORDER, POST } from '../constants';

const createOrder = async (order: IOrderAttrs) => {
  const newOrder = await OrderModel.build({
    ...removeNestedNullish(order),
  });
  return getReturnData(newOrder);
};

const getOrders = async () => {
  const orders = await OrderModel.find({}, ['-__v']).lean();
  return getReturnList(orders);
};

const getOrderDetail = async (id?: string) => {
  let order;

  order = await OrderModel.findById(id);

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  return getReturnData(order);
};

const updateOrder = async (id: string, order: IOrderAttrs) => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(order), ORDER.PREFIX),
    },
    {
      new: true,
    }
  );
  if (!updatedOrder) {
    throw new NotFoundError('Order not found');
  }

  return getReturnData(updatedOrder);
};

const deleteOrder = async (id: string) => {
  const deletedOrder = await OrderModel.findByIdAndDelete(id);
  if (!deletedOrder) {
    throw new NotFoundError('Order not found');
  }

  return getReturnData(deletedOrder);
};

export { createOrder, getOrders, getOrderDetail, updateOrder, deleteOrder };
