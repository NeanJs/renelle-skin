interface OrderItem {
  id: number;
  product_id: number;
  variation_id: number;
  name: string;
  quantity: number;
  subtotal: string;
  total: string;
  image: string | null;

  purchase_type?: "one_time" | "subscription";
  replenishment_interval?: 4 | 6 | 8 | null;
}

export type OrderConfirmation = {
  id: number;
  status: string;
  currency: string;

  subtotal: number | string;
  shipping_total: string;
  discount_total: string;
  tax_total: string;
  total: string;

  purchase_type: "one_time" | "subscription";
  replenishment_interval: 4 | 6 | 8 | null;

  payment: {
    method: string;
    method_title: string;
  };

  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };

  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };

  items: OrderItem[];

  kit: {
    id: number;
    tier: string;
    purchase_type: "one_time" | "subscription";
    replenishment_interval: 4 | 6 | 8 | null;
  } | null;

  created_at: string | null;
  updated_at: string | null;
};
