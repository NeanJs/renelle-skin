import { api } from "./client";

export interface CheckoutHandoffResponse {
  checkout_url: string;
  cartToken?: string;
}

export async function createCheckoutHandoff(cartToken: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authorization token missing");
  }

  if (!cartToken) {
    throw new Error("Cart token missing");
  }

  const { data } = await api.post<CheckoutHandoffResponse>(
    "/checkout-handoff",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cart-Token": cartToken,
      },
    },
  );

  return data;
}
