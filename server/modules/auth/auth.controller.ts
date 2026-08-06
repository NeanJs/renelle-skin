import type { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.signup(req.body);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const customer = await authService.getCustomer(token);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const customer = await authService.updateCustomer(token, req.body);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
        });
      }

      const result = await authService.deleteCustomer(token);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
