// Global brand configuration
// These settings can be updated via the Admin Settings page

export interface BrandConfig {
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
}

export const defaultBrandConfig: BrandConfig = {
  brandName: 'Dermera Labs',
  primaryColor: '#2d2d2d',
  accentColor: '#e7e5e4',
  currency: 'CAD',
  taxRate: 13, // HST for Ontario
  shippingFee: 0, // Free shipping
};

// In a real application, this would be fetched from a backend
export function getBrandConfig(): BrandConfig {
  const stored = localStorage.getItem('brandConfig');
  if (stored) {
    return { ...defaultBrandConfig, ...JSON.parse(stored) };
  }
  return defaultBrandConfig;
}

export function setBrandConfig(config: Partial<BrandConfig>): void {
  const current = getBrandConfig();
  const updated = { ...current, ...config };
  localStorage.setItem('brandConfig', JSON.stringify(updated));
}
