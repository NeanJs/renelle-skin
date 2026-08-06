import { env } from "./config.js";
import axios from "axios";

export const wc = axios.create({
  baseURL: env.WC_URL,
});

export const wcStore = axios.create({
  baseURL: env.WC_STORE_URL!,
});
