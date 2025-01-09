import { Request, Response } from 'express';

import * as OrderService from '../services/order.service';

import { OK } from '../core/success.response';

export class OrderController {
  static async getOrders(req: Request, res: Response) {
    return OK({
      res,
      metadata: await OrderService.getOrders(),
    });
  }

  static async getOrderDetails(req: Request, res: Response) {
    return OK({
      res,
      metadata: await OrderService.getOrderDetail(req.params.id),
    });
  }

  static async createOrder(req: Request, res: Response) {
    return OK({
      res,
      message: 'Order created successfully',
      metadata: await OrderService.createOrder(req.body),
    });
  }

  static async updateOrder(req: Request, res: Response) {
    return OK({
      res,
      message: 'Order updated successfully',
      metadata: await OrderService.updateOrder(req.params.id, req.body),
    });
  }

  static async deleteOrder(req: Request, res: Response) {
    return OK({
      res,
      message: 'Order deleted successfully',
      metadata: await OrderService.deleteOrder(req.params.productId),
    });
  }
}
