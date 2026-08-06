import type { Request, Response, NextFunction } from "express";

import { subscriptionsService } from "./subscriptions.service.js";

class SubscriptionsController {
  async getSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const subscription = await subscriptionsService.getSubscription(token);

      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async pauseSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const subscription = await subscriptionsService.pauseSubscription(token);

      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async resumeSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const subscription = await subscriptionsService.resumeSubscription(token);

      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const subscription = await subscriptionsService.cancelSubscription(token);

      res.status(200).json(subscription);
    } catch (error) {
      next(error);
    }
  }
}

export const subscriptionsController = new SubscriptionsController();
