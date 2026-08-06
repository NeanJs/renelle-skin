import type { Request, Response, NextFunction } from "express";

import { paymentService } from "./payment.service.js";

class PaymentController {
  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const payment = await paymentService.createPayment(
        token,
        Number(req.params.orderId),
      );

      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}

export const paymentController = new PaymentController();
