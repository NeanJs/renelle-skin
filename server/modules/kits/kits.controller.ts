import type { Request, Response, NextFunction } from "express";
import { kitsService } from "./kits.services.js";

class KitsController {
  async getKits(req: Request, res: Response, next: NextFunction) {
    try {
      const kits = await kitsService.getKits();

      res.status(200).json(kits);
    } catch (error) {
      next(error);
    }
  }

  async getKitBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const kit = await kitsService.getKitBySlug(req.params.slug as string);

      if (!kit) {
        return res.status(404).json({
          message: "Kit not found",
        });
      }

      res.status(200).json(kit);
    } catch (error) {
      next(error);
    }
  }
}

export const kitsController = new KitsController();
