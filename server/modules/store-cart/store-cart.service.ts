import type {
  StoreCheckoutPayload,
  StoreCheckoutResponse,
} from "../../../shared/types/checkout.js";

import { wc, wcStore } from "../../config/Woocommerce.config.js";

interface AuthCustomer {
  id: number;
}
type ReplenishmentInterval = 4 | 6 | 8;

type NormalizedPurchaseType = "one_time" | "subscription";
type VariationAttribute = {
  attribute: string;
  value: string;
};

function normalizePurchaseType(purchaseType: string): NormalizedPurchaseType {
  const normalized = purchaseType
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

  if (normalized === "one_time" || normalized === "onetime") {
    return "one_time";
  }

  if (normalized === "subscription" || normalized === "subscribe") {
    return "subscription";
  }

  throw new Error(`Invalid purchase type: ${purchaseType}`);
}

function normalizeReplenishmentInterval(
  interval?: number,
): ReplenishmentInterval | undefined {
  if (interval === undefined) {
    return undefined;
  }

  if (interval !== 4 && interval !== 6 && interval !== 8) {
    throw new Error("Replenishment interval must be 4, 6, or 8 weeks");
  }

  return interval;
}

class StoreCartService {
  async createCart() {
    const response = await wcStore.get("/cart");

    return {
      cart: response.data,
      cartToken: response.headers["cart-token"],
    };
  }

  async getCart(cartToken: string) {
    const response = await wcStore.get("/cart", {
      headers: {
        "Cart-Token": cartToken,
      },
    });

    return {
      cart: response.data,
      cartToken: response.headers["cart-token"] ?? cartToken,
    };
  }

  async addItem(
    cartToken: string,
    productId: number,
    quantity: number,
    purchaseType: string,
    replenishmentInterval?: number,
    variation?: VariationAttribute[],
  ) {
    const normalizedPurchaseType = normalizePurchaseType(purchaseType);

    const normalizedInterval = normalizeReplenishmentInterval(
      replenishmentInterval,
    );

    const response = await wcStore.post(
      "/cart/add-item",
      {
        id: productId,
        quantity,

        ...(variation?.length
          ? {
              variation,
            }
          : {}),

        extensions: {
          renelle: {
            purchase_type: normalizedPurchaseType,

            replenishment_interval:
              normalizedPurchaseType === "subscription"
                ? normalizedInterval
                : null,
          },
        },
      },
      {
        headers: {
          "Cart-Token": cartToken,
        },
      },
    );

    return {
      cart: response.data,
      cartToken: response.headers["cart-token"] ?? cartToken,
    };
  }

  async updateItem(cartToken: string, itemKey: string, quantity: number) {
    if (!cartToken?.trim()) {
      throw new Error("Cart token is required");
    }

    if (!itemKey?.trim()) {
      throw new Error("Cart item key is required");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const response = await wcStore.put(
      `/cart/items/${encodeURIComponent(itemKey)}`,
      {
        quantity,
      },
      {
        headers: {
          "Cart-Token": cartToken,
        },
      },
    );

    return {
      cart: response.data,
      cartToken: response.headers["cart-token"] ?? cartToken,
    };
  }

  async removeItem(cartToken: string, itemKey: string) {
    const response = await wcStore.post(
      "/cart/remove-item",
      {
        key: itemKey,
      },
      {
        headers: {
          "Cart-Token": cartToken,
        },
      },
    );

    return {
      cart: response.data,
      cartToken: response.headers["cart-token"] ?? cartToken,
    };
  }

  async checkout(
    cartToken: string,
    payload: StoreCheckoutPayload,
    authHeader?: string,
  ): Promise<StoreCheckoutResponse> {
    let customerId: number | null = null;

    if (authHeader) {
      const { data: customer } = await wc.get<AuthCustomer>(
        "/wp-json/renelle/v1/auth/me",
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );

      customerId = customer.id;
    }

    const response = await wcStore.post(
      "/checkout",
      {
        ...payload,
        ...(customerId && {
          extensions: {
            renelle: {
              customer_id: customerId,
            },
          },
        }),
      },
      {
        headers: {
          "Cart-Token": cartToken,
        },
      },
    );

    return {
      checkout: response.data,
      cartToken: response.headers["cart-token"] ?? cartToken,
    };
  }
  async updateCustomer(
    cartToken: string,
    billingAddress: Record<string, string>,
    shippingAddress: Record<string, string>,
  ) {
    const { data } = await wc.post(
      "/wp-json/wc/store/v1/cart/update-customer",
      {
        billing_address: billingAddress,
        shipping_address: shippingAddress,
      },
      {
        headers: {
          "Cart-Token": cartToken,
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  }
}

export const storeCartService = new StoreCartService();
