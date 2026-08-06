import { api } from "../api/client";

export async function createPayment(orderId: number) {
  const { data } = await api.post(`/payment/${orderId}`);

  return data;
}
