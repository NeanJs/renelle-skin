import type { Request, Response, NextFunction } from "express";

import { ordersService } from "./orders.service.js";

class OrdersController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const orders = await ordersService.getOrders(token);

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const orderId = Number(req.params.id);

      if (!Number.isInteger(orderId) || orderId <= 0) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      const order = await ordersService.getOrder(token, orderId);

      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOrderConfirmation(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id);

      const orderKey = String(req.query.key ?? "");

      if (!Number.isInteger(orderId) || orderId <= 0) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      if (!orderKey.trim()) {
        return res.status(400).json({
          message: "Order key is required",
        });
      }

      const order = await ordersService.getOrderConfirmation(orderId, orderKey);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

export const ordersController = new OrdersController();
