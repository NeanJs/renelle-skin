import { Router } from "express";

import { productsController } from "./products.controller.js";

const router = Router();

router.get("/", productsController.getProducts);

router.get("/:slug", productsController.getProduct);

export default router;
