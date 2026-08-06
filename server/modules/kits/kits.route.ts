import { Router } from "express";
import { kitsController } from "./kits.controller.js";

const router = Router();

router.get("/", kitsController.getKits);

router.get("/:slug", kitsController.getKitBySlug);

export default router;
