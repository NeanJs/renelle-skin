import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Shield, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  PurchaseMethodSelector,
  type Frequency,
  type PurchaseMethod,
} from "@/app/components/PurchaseMethodSelector";

import { useCartStore } from "@/lib/context/CartContext";
import { getProductBySlug } from "@/lib/api/products";
import { addStoreCartItem, resetStoreCart } from "@/lib/api/store-cart";
import { isExpiredCartError } from "@/lib/helper/storeCartHelper";

type CartPurchaseType = "one time" | "subscription";

type ReplenishmentInterval = 4 | 6 | 8;

interface ProductImage {
  url?: string | null;
  alt?: string | null;
}

interface ProductPricing {
  regular?: number | string | null;
  subscribe?: number | string | null;
}

interface ProductVariation {
  id: number;
  name: string;
  purchasable: boolean;

  attributes?: {
    size?: string;
    [key: string]: unknown;
  };

  pricing: ProductPricing;

  image?: ProductImage | null;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;

  image?: ProductImage | null;

  purchase_options: {
    one_time: boolean;
    subscribe: boolean;
  };

  variations?: ProductVariation[];
}

/*
|--------------------------------------------------------------------------
| Convert UI Frequency To Backend Interval
|--------------------------------------------------------------------------
*/

function frequencyToInterval(frequency: Frequency): ReplenishmentInterval {
  switch (frequency) {
    case "6weeks":
      return 6;

    case "8weeks":
      return 8;

    case "4weeks":
    default:
      return 4;
  }
}

export default function ProductDetailPage() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const [product, setProduct] = useState<Product | null>(null);

  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);

  const [purchaseMethod, setPurchaseMethod] =
    useState<PurchaseMethod>("onetime");

  const [selectedFrequency, setSelectedFrequency] =
    useState<Frequency>("4weeks");

  const [isLoading, setIsLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);

  const cartToken = useCartStore((state) => state.cartToken);

  const setCartToken = useCartStore((state) => state.setCartToken);

  const addItem = useCartStore((state) => state.addItem);

  const clearCart = useCartStore((state) => state.clearCart);

  /*
  |--------------------------------------------------------------------------
  | Fetch Product
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const productData = await getProductBySlug(slug);

        setProduct(productData);

        const availableVariation =
          productData?.variations?.find(
            (variation: ProductVariation) => variation.purchasable,
          ) ??
          productData?.variations?.[0] ??
          null;

        if (availableVariation) {
          setSelectedVariation(availableVariation);
          return;
        }

        if (productData.purchasable) {
          setSelectedVariation({
            id: productData.variation_id ?? productData.id,

            name: productData.name,

            purchasable: productData.purchasable,

            attributes: {},

            pricing: productData.pricing,

            image: productData.image ?? null,
          });

          return;
        }

        setSelectedVariation(null);
      } catch (error) {
        console.error("Failed to load product:", error);

        toast.error("Unable to load this product");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProduct();
  }, [slug]);

  /*
  |--------------------------------------------------------------------------
  | Product Variations
  |--------------------------------------------------------------------------
  */

  const variations = useMemo(() => product?.variations ?? [], [product]);

  /*
  |--------------------------------------------------------------------------
  | Prices
  |--------------------------------------------------------------------------
  */

  const regularPrice = useMemo(() => {
    if (!selectedVariation) {
      return 0;
    }

    return Number(selectedVariation.pricing.regular ?? 0);
  }, [selectedVariation]);

  const subscriptionPrice = useMemo(() => {
    if (!selectedVariation) {
      return regularPrice;
    }

    return Number(
      selectedVariation.pricing.subscribe ??
        selectedVariation.pricing.regular ??
        0,
    );
  }, [selectedVariation, regularPrice]);

  const displayPrice =
    purchaseMethod === "subscribe" ? subscriptionPrice : regularPrice;

  /*
  |--------------------------------------------------------------------------
  | Purchase Method Selection
  |--------------------------------------------------------------------------
  */

  const handleSelectionChange = (
    method: PurchaseMethod,
    _price: number,
    frequency?: Frequency,
  ) => {
    setPurchaseMethod(method);

    if (method === "subscribe" && frequency) {
      setSelectedFrequency(frequency);
    }

    if (method === "onetime") {
      setSelectedFrequency("4weeks");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Add To Cart
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = async () => {
    if (!product || !selectedVariation || !selectedVariation.purchasable) {
      return;
    }

    if (!cartToken) {
      toast.error("Cart is not ready yet");

      await resetStoreCart();
      clearCart();

      return;
    }

    try {
      setIsAdding(true);

      /*
      |--------------------------------------------------------------------------
      | Convert UI Method To Cart Purchase Type
      |--------------------------------------------------------------------------
      |
      | UI:
      | onetime | subscribe
      |
      | Local cart and Express request:
      | one time | subscription
      |--------------------------------------------------------------------------
      */

      const purchaseType: CartPurchaseType =
        purchaseMethod === "subscribe" ? "subscription" : "one time";

      const replenishmentInterval: ReplenishmentInterval | undefined =
        purchaseType === "subscription"
          ? frequencyToInterval(selectedFrequency)
          : undefined;

      /*
      |--------------------------------------------------------------------------
      | Add To WooCommerce Store API Cart
      |--------------------------------------------------------------------------
      */

      const response = await addStoreCartItem(
        cartToken,
        selectedVariation.id,
        1,
        purchaseType,
        replenishmentInterval,
      );

      /*
      |--------------------------------------------------------------------------
      | Update Cart Token
      |--------------------------------------------------------------------------
      */

      if (response.cartToken) {
        setCartToken(response.cartToken);
      }

      /*
      |--------------------------------------------------------------------------
      | Find Exact WooCommerce Cart Item
      |--------------------------------------------------------------------------
      */

      const normalizedPurchaseType =
        purchaseType === "one time" ? "one_time" : "subscription";

      const storeItem = response.cart.items.find((item: any) => {
        const renelle = item.extensions?.renelle;

        const sameVariation = item.id === selectedVariation.id;

        const samePurchaseType =
          renelle?.purchase_type === normalizedPurchaseType;

        const sameInterval =
          normalizedPurchaseType === "one_time" ||
          Number(renelle?.replenishment_interval) === replenishmentInterval;

        return sameVariation && samePurchaseType && sameInterval;
      });

      if (!storeItem) {
        throw new Error("Unable to locate the added cart item");
      }

      /*
      |--------------------------------------------------------------------------
      | Update Local Zustand Cart
      |--------------------------------------------------------------------------
      */

      addItem({
        id: [
          "product",
          product.id,
          selectedVariation.id,
          normalizedPurchaseType,
          replenishmentInterval ?? "none",
        ].join("-"),

        type: "product",

        productId: product.id,

        variationId: selectedVariation.id,

        name: product.name,

        variationName: selectedVariation.name,

        size: selectedVariation.attributes?.size,

        purchaseType,

        replenishmentInterval,

        price: displayPrice,

        quantity: 1,

        image: selectedVariation.image?.url ?? product.image?.url ?? null,

        storeItemKey: storeItem.key,
      });

      toast.success(
        purchaseType === "subscription"
          ? `Added with delivery every ${replenishmentInterval} weeks`
          : "Added to cart",
      );
    } catch (error: unknown) {
      if (isExpiredCartError(error)) {
        await resetStoreCart();

        clearCart();

        toast.error("Your cart session expired, so the old cart was cleared.");

        return;
      }

      console.error("Failed to add item to cart:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to add item to cart",
      );
    } finally {
      setIsAdding(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Missing Product
  |--------------------------------------------------------------------------
  */

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Product not found</h1>

        <Link to="/products" className="underline text-sm">
          Return to products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}

      <div className="border-b bg-[#F7F6F4]">
        <div className="container mx-auto px-6 py-3 flex gap-2 text-xs">
          <Link to="/">Home</Link>

          <ChevronRight className="w-3 h-3" />

          <Link to="/products">Products</Link>

          <ChevronRight className="w-3 h-3" />

          <span>{product.name}</span>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}

            <div>
              <div className="aspect-square bg-[#F7F6F4]">
                <ImageWithFallback
                  src={
                    selectedVariation?.image?.url ?? product.image?.url ?? ""
                  }
                  alt={
                    selectedVariation?.name ??
                    product.image?.alt ??
                    product.name
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}

            <div className="lg:sticky lg:top-28 self-start">
              <h1 className="text-3xl mb-4">{product.name}</h1>

              <div className="mb-6 text-2xl font-semibold">
                ${displayPrice.toFixed(2)}
              </div>

              {/* Variation Selector */}

              {variations.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest mb-3">Size</p>

                  <div className="flex flex-wrap gap-3">
                    {variations.map((variation) => (
                      <button
                        key={variation.id}
                        type="button"
                        disabled={!variation.purchasable}
                        onClick={() => setSelectedVariation(variation)}
                        className={`
                            border px-5 py-3 text-sm transition
                            ${
                              selectedVariation?.id === variation.id
                                ? "border-black"
                                : "border-gray-300"
                            }
                            ${
                              variation.purchasable
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                            }
                          `}
                      >
                        <div>
                          {variation.attributes?.size ?? variation.name}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {variation.pricing.regular
                            ? `$${Number(variation.pricing.regular).toFixed(2)}`
                            : "Unavailable"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Method */}

              {selectedVariation?.purchasable &&
                product.purchase_options.one_time &&
                product.purchase_options.subscribe && (
                  <PurchaseMethodSelector
                    regularPrice={regularPrice}
                    onSelectionChange={handleSelectionChange}
                  />
                )}

              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding || !selectedVariation?.purchasable}
                className="w-full rounded-none mt-6 h-[52px]"
              >
                {isAdding
                  ? "Adding..."
                  : `Add to Cart — $${displayPrice.toFixed(2)}`}
              </Button>

              <div className="border-t mt-6 pt-5 space-y-3">
                <div className="flex gap-3 text-sm">
                  <Truck className="w-4 h-4" />
                  Free shipping across Canada
                </div>

                <div className="flex gap-3 text-sm">
                  <Shield className="w-4 h-4" />

                  {purchaseMethod === "subscribe"
                    ? `Auto-replenishes every ${frequencyToInterval(
                        selectedFrequency,
                      )} weeks`
                    : "Secure payment"}
                </div>

                {purchaseMethod === "subscribe" && (
                  <div className="pl-7 text-xs text-muted-foreground">
                    Cancel or update your replenishment schedule anytime.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}

      <section className="py-14 bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </div>
      </section>
    </div>
  );
}
