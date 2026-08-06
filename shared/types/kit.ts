export type KitProduct = {
  id: number;
  name: string;
  slug: string;
  quantity?: number;

  image: {
    url: string | null;
  } | null;
};

export type Product = {
  id: number;

  variation_id?: number;

  sku?: string;

  name: string;

  slug: string;

  description: string;

  short_description: string;

  pricing: {
    regular: number | null;
    subscribe: number | null;
  };

  stock_status: string;

  purchasable: boolean;

  purchase_options: {
    one_time: boolean;
    subscribe: boolean;
  };

  image: ProductImage | null;

  gallery: ProductImage[];

  categories: ProductCategory[];

  variations: ProductVariation[];
};

export type ProductVariation = {
  id: number;

  name: string;

  sku: string;

  attributes: {
    size?: string;

    [key: string]: string | undefined;
  };

  pricing: {
    regular: number | null;

    subscribe: number | null;
  };

  stock_status: string;

  purchasable: boolean;

  image: ProductImage | null;
};

export type ProductImage = {
  id: number;

  url: string | null;

  alt: string;
};

export type ProductCategory = {
  id: number;

  name: string;

  slug: string;
};

export type TierType = "trial" | "essential" | "retail";

export type KitVariationAttribute = {
  attribute: string;
  value: string;
};

export type KitTierVariation = {
  id: number;
  purchasable: boolean;
  stock_status?: string | null;
  sku?: string | null;
  attributes: KitVariationAttribute[];
};
export type Tier = {
  subscribable: boolean;

  pricing: {
    one_time: string | number | null;
    subscribe: string | number | null;
  };

  variations: {
    one_time: KitTierVariation | null;
    subscription: KitTierVariation | null;
  };

  products: KitProduct[];
};
export type Kit = {
  id: number;

  name: string;

  code: string;

  slug: string;

  thumbnail: string | null;

  skin_concern: string;

  tagline?: string;

  hero: {
    description: string;

    image: string | null;
  };

  routine_steps: string | string[];

  benefits: string;

  colors: {
    primary: string;

    secondary: string;
  };

  tiers: Record<TierType, Tier>;
};
