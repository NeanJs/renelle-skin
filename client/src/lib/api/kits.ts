import { api } from "./client";

import type { Kit } from "../../../../shared/types/kit";

export async function getKits(): Promise<Kit[]> {
  const { data } = await api.get<Kit[]>("/kits");

  return data;
}
export async function getKitById(slug: string): Promise<Kit> {
  const { data } = await api.get<Kit>(`/kits/${slug}`);

  return data;
}
