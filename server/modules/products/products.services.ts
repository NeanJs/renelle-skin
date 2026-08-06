import { wc } from "../../config/Woocommerce.config.js";

import type { Product } from "../../../shared/types/kit.js";

class ProductsService {
  async getProducts() {
    const { data } = await wc.get("/products");

    return data;
  }

  async getProduct(slug: string): Promise<Product> {
    const { data } = await wc.get(
      `/products/${encodeURIComponent(slug)}`,
    );

    return data;
  }
}

export const productsService = new ProductsService();
