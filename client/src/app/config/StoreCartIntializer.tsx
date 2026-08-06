import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useCartStore } from "@/lib/context/CartContext";
import { createStoreCart, getStoreCart } from "@/lib/api/store-cart";
import { isExpiredCartError } from "@/lib/helper/storeCartHelper";

export function StoreCartInitializer() {
  const initializing = useRef(false);

  const cartToken = useCartStore((state) => state.cartToken);

  const setCartToken = useCartStore((state) => state.setCartToken);

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (initializing.current) {
      return;
    }

    const initializeCart = async () => {
      initializing.current = true;

      try {
        if (!cartToken) {
          const result = await createStoreCart();

          if (!result.cartToken) {
            throw new Error("Store API did not return a cart token");
          }

          setCartToken(result.cartToken);

          return;
        }

        const result = await getStoreCart(cartToken);

        if (result.cartToken && result.cartToken !== cartToken) {
          setCartToken(result.cartToken);
        }
      } catch (error: unknown) {
        if (isExpiredCartError(error)) {
          clearCart();

          try {
            const result = await createStoreCart();

            if (!result.cartToken) {
              throw new Error("Store API did not return a cart token");
            }

            setCartToken(result.cartToken);
          } catch (creationError) {
            console.error("Failed to recreate cart:", creationError);

            toast.error("Unable to prepare your cart");
          }

          return;
        }

        console.error("Failed to initialize cart:", error);

        toast.error("Unable to prepare your cart");
      } finally {
        initializing.current = false;
      }
    };

    void initializeCart();
  }, [cartToken, setCartToken, clearCart]);

  return null;
}
