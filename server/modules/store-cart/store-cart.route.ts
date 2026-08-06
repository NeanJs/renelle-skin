import { Router } from "express";

import { storeCartController } from "./store-cart.controller.js";

const router = Router();

router.get("/cart/create", storeCartController.createCart);

router.get("/cart", storeCartController.getCart);

router.post("/cart/items", storeCartController.addItem);

router.patch("/cart/items", storeCartController.updateItem);

router.delete("/cart/items/:itemKey", storeCartController.removeItem);

router.post("/checkout", storeCartController.checkout);

export default router;
