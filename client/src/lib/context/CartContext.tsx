import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;

  type: "product" | "kit";

  productId?: number;
  variationId?: number;

  kitId?: number;
  tier?: string;

  name: string;
  variationName?: string;
  size?: string;

  purchaseType: "one time" | "subscription";

  replenishmentInterval?: 4 | 6 | 8;

  price: number;
  quantity: number;

  image?: string | null;

  storeItemKey?: string;
}
interface CartStore {
  items: CartItem[];
  cartToken: string | null;
  cartExpiresAt: number | null;

  setCartToken: (token: string | null) => void;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;

  clearCart: () => void;
}
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      cartToken: null,
      cartExpiresAt: null,

      setCartToken: (token) =>
        set({
          cartToken: token,

          cartExpiresAt: token ? Date.now() + 48 * 60 * 60 * 1000 : null,
        }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + item.quantity,
                      storeItemKey: item.storeItemKey ?? cartItem.storeItemKey,
                    }
                  : cartItem,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        })),

      clearCart: () =>
        set({
          items: [],
          cartToken: null,
          cartExpiresAt: null,
        }),
    }),
    {
      name: "renelle-cart",
    },
  ),
);
