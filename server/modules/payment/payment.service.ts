import { wc } from "../../config/Woocommerce.config.js";

class PaymentService {
  async createPayment(token: string, orderId: number) {
    const { data } = await wc.post(
      `/payment/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }
}

export const paymentService = new PaymentService();
