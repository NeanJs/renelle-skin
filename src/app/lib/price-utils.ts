export const SUBSCRIPTION_DISCOUNT_PERCENT = 15;
export const DEFAULT_PRODUCT_PRICE = 45;

export const PRODUCT_PRICES: Record<string, number> = {
  "Cream Cleanser": 38,
  "Reset Serum": 52,
  "Light Moisturiser": 58,
  "Reset Toner": 32,
  "Clarifying Cleanser": 34,
  "Clarifying Gel Cleanser": 34,
  "BHA Exfoliating Toner": 36,
  "Niacinamide Serum": 48,
  "Targeted Spot Treatment": 42,
  "Oil-Control Moisturiser": 56,
  "SPF 50 Matte Sunscreen": 44,
  "Clay Purifying Mask": 38,
  "Milk Cleanser": 38,
  "Hydrating Essence": 42,
  "HA Plumping Serum": 55,
  "Rich Moisturiser": 60,
  "SPF 30 Hydrating Sunscreen": 44,
  "Nourishing Eye Cream": 48,
  "Overnight Barrier Mask": 44,
  "Peptide Cleanser": 42,
  "Resurfacing Toner": 46,
  "Firming Peptide Serum": 78,
  "Retinol Renewal Treatment": 68,
  "Lifting Moisturiser": 68,
  "SPF 50+ Age Defence": 52,
  "Contour Eye Cream": 62,
  "Exfoliating Lip Scrub": 22,
  "Hyaluronic Lip Serum": 38,
  "Plumping Lip Treatment": 42,
  "Overnight Lip Mask": 28,
  "SPF 30 Tinted Lip Balm": 18,
  "Nourishing Lip Oil": 32,
  "Multi-Use Face Oil": 55,
  "Hydrating Mist": 34,
  "Vitamin C Brightening Serum": 58,
  "Universal SPF 50": 46,
  "Restorative Night Oil": 62,
  "Collagen Boosting Ampoules": 72,
  "Calming Toner": 32,
  "Barrier Repair Moisturiser": 60,
  "SPF 30 Mineral Sunscreen": 44,
  "Soothing Eye Cream": 48,
  "Overnight Recovery Mask": 44,
};

export function calculateSubscriptionPrice(regularPrice: number): number {
  return Math.round(
    regularPrice * (1 - SUBSCRIPTION_DISCOUNT_PERCENT / 100) * 100
  ) / 100;
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function getProductPrice(productName: string): number {
  return PRODUCT_PRICES[productName] ?? DEFAULT_PRODUCT_PRICE;
}
