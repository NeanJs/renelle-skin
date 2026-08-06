import { Router } from "express";
import { checkoutHandoffController } from "./checkout-handoff.controller.js";

const router = Router();

router.post("/", checkoutHandoffController.createHandoff);

export default router;
