import { ProductController } from '@controllers/product.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/categories', ProductController.getProductCategories);
productRouter.get('/', ProductController.getProducts);
productRouter.get('/:id', ProductController.getProductDetails);

productRouter.use(authenticationV2);

productRouter.post('/categories', ProductController.createProductCategory);
productRouter.post('/', ProductController.createProduct);
productRouter.put('/:id', ProductController.updateProduct);
productRouter.delete('/:id', ProductController.deleteProduct);

module.exports = productRouter;
