import type { Request, Response, NextFunction } from "express";
import { checkoutHandoffService } from "./checkout-handoff.service.js";

class CheckoutHandoffController {
  async createHandoff(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];
      const token = req.headers.authorization;

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token missing",
        });
      }

      const result = await checkoutHandoffService.createHandoff(
        cartToken,
        token,
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const checkoutHandoffController = new CheckoutHandoffController();
