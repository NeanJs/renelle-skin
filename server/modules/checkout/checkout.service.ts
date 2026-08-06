import type { StoreCheckoutPayload } from "./../../../shared/types/checkout.js";
import { wc } from "../../config/Woocommerce.config.js";

class CheckoutService {
  async createCheckout(
    token: string | undefined,
    payload: StoreCheckoutPayload,
  ) {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined;

    const { data } = await wc.post("/checkout", payload, config);

    return data;
  }
}

export const checkoutService = new CheckoutService();
