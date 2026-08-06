import { useCartStore } from "../context/CartContext";
import { api } from "./client";

export async function createStoreCart() {
  const { data } = await api.get("/store/cart/create");

  return data;
}

export async function getStoreCart(cartToken: string) {
  const { data } = await api.get("/store/cart", {
    headers: {
      "Cart-Token": cartToken,
    },
  });

  return data;
}

type PurchaseType = "one time" | "subscription";
type ReplenishmentInterval = 4 | 6 | 8;

export type StoreCartVariationAttribute = {
  attribute: string;
  value: string;
};

export async function addStoreCartItem(
  cartToken: string,
  productId: number,
  quantity = 1,
  purchaseType: PurchaseType,
  replenishmentInterval?: ReplenishmentInterval,
  variation?: StoreCartVariationAttribute[],
) {
  const { data } = await api.post(
    "/store/cart/items",
    {
      productId,
      quantity,
      purchaseType,

      replenishmentInterval:
        purchaseType === "subscription" ? replenishmentInterval : undefined,

      variation: variation && variation.length > 0 ? variation : undefined,
    },
    {
      headers: {
        "Cart-Token": cartToken,
      },
    },
  );

  return data;
}

export async function updateStoreCartItem(
  cartToken: string,
  itemKey: string,
  quantity: number,
) {
  const { data } = await api.patch(
    "/store/cart/items",
    {
      itemKey,
      quantity,
    },
    {
      headers: {
        "Cart-Token": cartToken,
      },
    },
  );

  return data;
}

export async function removeStoreCartItem(cartToken: string, itemKey: string) {
  const { data } = await api.delete(`/store/cart/items/${itemKey}`, {
    headers: {
      "Cart-Token": cartToken,
    },
  });

  return data;
}
export interface StoreCheckoutPayload {
  billing_address: Record<string, string>;
  shipping_address: Record<string, string>;
  payment_method: string;
  payment_data: Array<{
    key: string;
    value: unknown;
  }>;
}

export async function processStoreCheckout(
  cartToken: string,
  payload: StoreCheckoutPayload,
) {
  const { data } = await api.post("/store/checkout", payload, {
    headers: {
      "Cart-Token": cartToken,
    },
  });

  return data;
}

export async function resetStoreCart() {
  const { clearCart, setCartToken } = useCartStore.getState();

  clearCart();

  const result = await createStoreCart();

  if (!result.cartToken) {
    throw new Error("Unable to create a new cart session");
  }

  setCartToken(result.cartToken);

  return result;
}
