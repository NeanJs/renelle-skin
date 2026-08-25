import { api } from "./client";

export interface CheckoutHandoffResponse {
  checkout_url: string;
  cartToken?: string;
}

export async function createCheckoutHandoff(cartToken: string) {
  if (!cartToken) {
    throw new Error("Cart token missing");
  }

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Cart-Token": cartToken,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const { data } = await api.post<CheckoutHandoffResponse>(
    "/checkout-handoff",
    {},
    config,
  );

  return data;
}
