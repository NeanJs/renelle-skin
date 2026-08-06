import type { Request, Response, NextFunction } from "express";

import { productsService } from "./products.services.js";

class ProductsController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productsService.getProducts();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const product = await productsService.getProduct(slug as string);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

export const productsController = new ProductsController();
