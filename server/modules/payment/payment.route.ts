import { Router } from "express";
import { paymentController } from "./payment.controller.js";

const router = Router();

router.post("/:orderId", paymentController.createPayment);

export default router;
