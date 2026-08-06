export interface Address {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  company?: string;
}

export interface BillingAddress extends Address {
  email: string;
  phone?: string;
}

export type ShippingAddress = Address;

export interface PaymentDataItem {
  key: string;
  value: string;
}

export interface StoreCheckoutPayload {
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method?: string;
  payment_data?: PaymentDataItem[];
}

export interface StoreCheckoutPaymentResult {
  payment_status?: string;
  payment_details?: Array<{
    key: string;
    value: string;
  }>;
  redirect_url?: string;
}

export interface StoreCheckoutOrder {
  id: number;
  status: string;
  order_key?: string;
  customer_note?: string;
}

export interface StoreCheckoutResponse {
  checkout: {
    order_id: number;
    status: string;
    order_key?: string;
    payment_result?: StoreCheckoutPaymentResult;
  };
  cartToken: string;
}
