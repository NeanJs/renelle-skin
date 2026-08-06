import { Router } from "express";

import { subscriptionsController } from "./subscriptions.controller.js";

const router = Router();

router.get(
  "/",
  subscriptionsController.getSubscription.bind(subscriptionsController),
);

router.post(
  "/pause",
  subscriptionsController.pauseSubscription.bind(subscriptionsController),
);

router.post(
  "/resume",
  subscriptionsController.resumeSubscription.bind(subscriptionsController),
);

router.post(
  "/cancel",
  subscriptionsController.cancelSubscription.bind(subscriptionsController),
);

export default router;
