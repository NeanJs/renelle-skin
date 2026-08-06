import type {
  StoreCheckoutPayload,
  StoreCheckoutResponse,
} from "../../../../shared/types/checkout";

import { api } from "./client";

export async function createCheckout(
  payload: StoreCheckoutPayload,
  cartToken: string,
): Promise<StoreCheckoutResponse> {
  const { data } = await api.post<StoreCheckoutResponse>("/checkout", payload, {
    headers: {
      "Cart-Token": cartToken,
    },
  });

  return data;
}
