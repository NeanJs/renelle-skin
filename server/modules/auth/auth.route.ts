import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", authController.getCustomer);

router.put("/me", authController.updateCustomer);

router.delete("/me", authController.deleteCustomer);

export default router;
