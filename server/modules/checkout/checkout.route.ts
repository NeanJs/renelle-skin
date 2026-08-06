import { Router } from "express";
import { checkoutController } from "./checkout.controller.js";

const router = Router();

router.post("/", checkoutController.checkout);

export default router;
