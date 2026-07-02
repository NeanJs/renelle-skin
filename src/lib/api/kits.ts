import { Kit } from "../../types/kit";

const API_URL = "https://renelleskin.ca/wp-json/kits/v1/all";

export async function getKits(): Promise<Kit[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch kits");
  }

  return response.json();
}
