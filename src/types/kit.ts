export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  stock_status: string;
  image: string | null;
}

export interface Kit {
  id: number;
  title: string;
  tiers: {
    trial: Product[];
    essential: Product[];
    retail: Product[];
  };
}
