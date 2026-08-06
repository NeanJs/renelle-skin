import dotenv from "dotenv";

dotenv.config();

const required = [
  "PORT",
  "CLIENT_URL",
  "WC_URL",
  "WC_CONSUMER_KEY",
  "WC_CONSUMER_SECRET",
  "WC_STORE_URL",
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  PORT: Number(process.env.PORT),
  CLIENT_URL: process.env.CLIENT_URL!,
  WC_URL: process.env.WC_URL!,
  WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY!,
  WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET!,
  WC_STORE_URL: process.env.WC_STORE_URL,
};
