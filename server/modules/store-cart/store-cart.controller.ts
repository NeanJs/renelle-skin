import type { Request, Response, NextFunction } from "express";

import { storeCartService } from "./store-cart.service.js";

class StoreCartController {
  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await storeCartService.createCart();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const result = await storeCartService.getCart(cartToken);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const {
        productId,
        quantity,
        purchaseType,
        replenishmentInterval,
        variation,
      } = req.body;

      const result = await storeCartService.addItem(
        cartToken,
        productId,
        quantity,
        purchaseType,
        replenishmentInterval,
        variation,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const { itemKey, quantity } = req.body;

      const result = await storeCartService.updateItem(
        cartToken,
        itemKey,
        quantity,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const cartTokenHeader = req.headers["cart-token"];

      if (!cartTokenHeader || Array.isArray(cartTokenHeader)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const itemKeyParam = req.params.itemKey;

      if (!itemKeyParam || Array.isArray(itemKeyParam)) {
        return res.status(400).json({
          message: "Valid item key is required",
        });
      }

      const result = await storeCartService.removeItem(
        cartTokenHeader,
        itemKeyParam,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (!cartToken || Array.isArray(cartToken)) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const authHeader = req.headers.authorization;

      const {
        billing_address,
        shipping_address,
        payment_method,
        payment_data,
      } = req.body;

      const result = await storeCartService.checkout(
        cartToken,
        {
          billing_address,
          shipping_address,
          payment_method,
          payment_data,
        },
        authHeader,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const cartToken = req.headers["cart-token"];

      if (typeof cartToken !== "string" || !cartToken.trim()) {
        return res.status(400).json({
          message: "Cart token is required",
        });
      }

      const { billingAddress, shippingAddress } = req.body;

      if (!billingAddress || !shippingAddress) {
        return res.status(400).json({
          message: "Billing and shipping addresses are required",
        });
      }

      const cart = await storeCartService.updateCustomer(
        cartToken,
        billingAddress,
        shippingAddress,
      );

      return res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
}

export const storeCartController = new StoreCartController();
