import { OrderConfirmation } from "../../../../shared/types/orders";
import { api } from "./client";

export const getOrders = async () => {
  const { data } = await api.get("/orders");

  return data;
};

export const getOrder = async (id: number) => {
  const { data } = await api.get(`/orders/${id}`);

  return data;
};
export async function getOrderConfirmation(
  orderId: number,
  orderKey: string,
): Promise<OrderConfirmation> {
  const { data } = await api.get<OrderConfirmation>(
    `/orders/${orderId}/confirmation`,
    {
      params: {
        key: orderKey,
      },
    },
  );

  return data;
}
