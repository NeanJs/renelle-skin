import type { Kit } from "../../../shared/types/kit.js";
import { wc } from "../../config/Woocommerce.config.js";

class KitsService {
  async getKits(): Promise<Kit[]> {
    const { data } = await wc.get<Kit[]>("/kits");

    return data;
  }

  async getKitBySlug(slug: string): Promise<Kit | null | undefined> {
    const { data } = await wc.get<Kit[]>("/kits", {
      params: {
        slug,
      },
    });

    if (!data.length) {
      return null;
    }

    return data[0];
  }
}

export const kitsService = new KitsService();
