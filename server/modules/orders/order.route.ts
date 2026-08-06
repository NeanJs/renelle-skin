import { Router } from "express";
import { ordersController } from "./orders.controller.js";

const router = Router();

router.get("/", ordersController.getOrders);

router.get("/:id", ordersController.getOrder);
router.get("/:id/confirmation", ordersController.getOrderConfirmation);

router.get("/:id", ordersController.getOrder);

export default router;
