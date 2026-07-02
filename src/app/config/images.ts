export const PRODUCT_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1550572017-4b7a301b9d81",
  "https://images.unsplash.com/photo-1763503836825-97f5450d155a",
  "https://images.unsplash.com/photo-1768725844772-dc834990526f",
  "https://images.unsplash.com/photo-1765887986673-953fccf56464",
  "https://images.unsplash.com/photo-1655357443031-d5e0354b56e1",
];

export const KIT_IMAGES: Record<string, string> = {
  starter:
    "https://images.unsplash.com/photo-1652464945507-687e44a1017a",
  essential:
    "https://images.unsplash.com/photo-1617030557822-c8c35f07c60b",
  advanced:
    "https://images.unsplash.com/photo-1677735476292-0fc57ab097b2",
  premium:
    "https://images.unsplash.com/photo-1764694187721-a5035d777fdf",
};

type ImageSize = "small" | "medium" | "large";

export function getProductImage(
  index: number,
  size: ImageSize = "medium"
): string {
  const sizeParams: Record<ImageSize, string> = {
    small: "w=400&h=400",
    medium: "w=600&h=600",
    large: "w=900&h=900",
  };
  const url = PRODUCT_IMAGE_URLS[index % PRODUCT_IMAGE_URLS.length];
  return `${url}?${sizeParams[size]}&fit=crop&auto=format`;
}

export function getKitImage(kitId: string, size: ImageSize = "large"): string {
  const base = KIT_IMAGES[kitId];
  if (!base) return "";
  const sizeParam = size === "medium" ? "w=800&h=800" : "w=900&h=900";
  return `${base}?${sizeParam}&fit=crop&auto=format`;
}
