import { Request, Response } from 'express';

import * as ProductService from '../services/product.service';

import { OK } from '../core/success.response';

export class ProductController {
  static async getProducts(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ProductService.getProducts(),
    });
  }

  static async getProductDetails(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ProductService.getProductDetails(req.params.id),
    });
  }

  static async createProduct(req: Request, res: Response) {
    return OK({
      res,
      message: 'Product created successfully',
      metadata: await ProductService.createProduct(req.body),
    });
  }

  static async updateProduct(req: Request, res: Response) {
    return OK({
      res,
      message: 'Product updated successfully',
      metadata: await ProductService.updateProduct(req.params.id, req.body),
    });
  }

  static async deleteProduct(req: Request, res: Response) {
    return OK({
      res,
      message: 'Product deleted successfully',
      metadata: await ProductService.deleteProduct(req.params.id),
    });
  }

  static async createProductCategory(req: Request, res: Response) {
    return OK({
      res,
      message: 'Product category created successfully',
      metadata: await ProductService.createProductCategory(req.body),
    });
  }

  static async getProductCategories(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ProductService.getProductCategories(),
    });
  }
}
