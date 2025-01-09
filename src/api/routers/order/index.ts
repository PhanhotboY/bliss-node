import { OrderController } from '@controllers/order.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.post('/', OrderController.createOrder);

orderRouter.use(authenticationV2);

orderRouter.get('/', OrderController.getOrders);
orderRouter.get('/:id', OrderController.getOrderDetails);

orderRouter.put('/:id', OrderController.updateOrder);
orderRouter.delete('/:id', OrderController.deleteOrder);

module.exports = orderRouter;
