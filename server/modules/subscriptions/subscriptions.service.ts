import { wc } from "../../config/Woocommerce.config.js";

class SubscriptionsService {
  async getSubscription(token: string) {
    const { data } = await wc.get("/subscription", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async pauseSubscription(token: string) {
    const { data } = await wc.post(
      "/subscription/pause",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async resumeSubscription(token: string) {
    const { data } = await wc.post(
      "/subscription/resume",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  }

  async cancelSubscription(token: string) {
    const { data } = await wc.post(
      "/subscription/cancel",
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

export const subscriptionsService = new SubscriptionsService();
