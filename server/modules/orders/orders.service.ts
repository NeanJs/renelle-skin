import { wc } from "../../config/Woocommerce.config.js";

class OrdersService {
  async getOrders(token: string) {
    const { data } = await wc.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async getOrder(token: string, orderId: number) {
    const { data } = await wc.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
  async getOrderConfirmation(orderId: number, orderKey: string) {
    const { data } = await wc.get(`/orders/${orderId}/confirmation`, {
      params: {
        key: orderKey,
      },
    });

    return data;
  }
}

export const ordersService = new OrdersService();
