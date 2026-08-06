import { wc } from "../../config/Woocommerce.config.js";

interface AuthCustomer {
  id: number;
}

class CheckoutHandoffService {
  async createHandoff(cartToken: string, token?: string) {
    const internalKey = process.env.RENELLE_INTERNAL_KEY;

    if (!internalKey) {
      throw new Error("Renelle internal key is not configured");
    }

    let customerId = 0;

    if (token) {
      const { data: customer } = await wc.get<AuthCustomer>("/auth/me", {
        headers: {
          Authorization: token,
        },
      });

      customerId = customer.id;
    }

    const { data } = await wc.post(
      "/checkout-handoff",
      {
        cart_token: cartToken,
        customer_id: customerId,
      },
      {
        headers: {
          "X-Renelle-Internal-Key": internalKey,
        },
      },
    );

    return data;
  }
}

export const checkoutHandoffService = new CheckoutHandoffService();
