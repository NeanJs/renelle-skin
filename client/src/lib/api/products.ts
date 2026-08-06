import { api } from "./client";
import type { Product } from "../../../../shared/types/kit";

export interface ProductsResponse {
  products: Product[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export async function getProducts(options?: {
  page?: number;
  per_page?: number;
  category?: string;
}): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (options?.page) {
    params.append("page", String(options.page));
  }

  if (options?.per_page) {
    params.append("per_page", String(options.per_page));
  }

  if (options?.category) {
    params.append("category", options.category);
  }

  const endpoint = `/products${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const { data } = await api.get<ProductsResponse>(endpoint);

  return data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await api.get<Product>(
    `/products/${encodeURIComponent(slug)}`,
  );

  return data;
}
