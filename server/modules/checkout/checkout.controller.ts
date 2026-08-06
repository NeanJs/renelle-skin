import type { Request, Response, NextFunction } from "express";

import { storeCartService } from "../store-cart/store-cart.service.js";

class CheckoutController {
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const result = await storeCartService.checkout(
        cartToken,
        req.body,
        req.headers.authorization,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const checkoutController = new CheckoutController();
