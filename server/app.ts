import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/error.middleware.js";
import productRoutes from "./modules/products/product.route.js";
import kitsRoutes from "./modules/kits/kits.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import orderRoutes from "./modules/orders/order.route.js";
import checkoutRoutes from "./modules/checkout/checkout.route.js";
import paymentRoutes from "./modules/payment/payment.route.js";
import subscriptionsRoutes from "./modules/subscriptions/subscriptions.route.js";
import storeCartRoutes from "./modules/store-cart/store-cart.route.js";
import checkoutHandoffRoutes from "./modules/checkout-handoff/checkout-handoff.route.js";

const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Health check
app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "API is running 🚀",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/kits", kitsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/subscription", subscriptionsRoutes);
app.use("/api/store", storeCartRoutes);
app.use("/api/checkout-handoff", checkoutHandoffRoutes);
// Error Handler
app.use(errorHandler);

export default app;
