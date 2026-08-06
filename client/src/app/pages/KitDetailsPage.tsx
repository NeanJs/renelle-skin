import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

import {
  Check,
  Truck,
  CreditCard,
  Calendar,
  Shield,
  ChevronRight,
} from "lucide-react";

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ProductSample } from "@/app/components/ProductSample";
import { LoadingSpinner } from "@/app/components/Loading";

import { getKitImage, getProductImage } from "@/app/config/images";

import { getKitById } from "@/lib/api/kits";

import { addStoreCartItem, resetStoreCart } from "@/lib/api/store-cart";

import { useCartStore } from "@/lib/context/CartContext";
import { isExpiredCartError } from "@/lib/helper/storeCartHelper";

import type { Kit, Tier, TierType } from "../../../../shared/types/kit";

type BillingType = "subscribe" | "one_time";

type PurchaseType = "one time" | "subscription";

type ReplenishmentInterval = 4 | 6 | 8;

export function KitDetailsPage() {
  const { kitId } = useParams();

  const navigate = useNavigate();

  const [kit, setKit] = useState<Kit | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [billingType, setBillingType] = useState<BillingType>("subscribe");

  const [selectedTierType, setSelectedTierType] =
    useState<TierType>("essential");

  const [selectedTier, setSelectedTier] = useState<Tier>();

  const [replenishmentInterval, setReplenishmentInterval] =
    useState<ReplenishmentInterval>(4);

  const [selectedImg, setSelectedImg] = useState(0);

  const [isAdding, setIsAdding] = useState(false);

  const cartToken = useCartStore((state) => state.cartToken);

  const setCartToken = useCartStore((state) => state.setCartToken);

  const addItem = useCartStore((state) => state.addItem);

  const clearCart = useCartStore((state) => state.clearCart);

  /*
  |--------------------------------------------------------------------------
  | Fetch Kit
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchKit = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!kitId) {
          setError("Kit ID is required");

          return;
        }

        const response = await getKitById(kitId);

        setKit(response);

        const initialTier = response.tiers[selectedTierType];

        setSelectedTier(initialTier);

        if (!initialTier.subscribable) {
          setBillingType("one_time");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load kit");
      } finally {
        setLoading(false);
      }
    };

    void fetchKit();
  }, [kitId]);

  /*
  |--------------------------------------------------------------------------
  | Update Selected Tier
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!kit) {
      return;
    }

    const tier = kit.tiers[selectedTierType];

    setSelectedTier(tier);

    if (!tier.subscribable) {
      setBillingType("one_time");
    }
  }, [selectedTierType, kit]);

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error State
  |--------------------------------------------------------------------------
  */

  if (error || !kit) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Kit Not Found</h2>

          <p className="text-muted-foreground mb-4 text-sm">
            {error || "This kit is not available"}
          </p>

          <Button
            asChild
            className="rounded-none bg-foreground text-background hover:bg-foreground/85"
          >
            <Link to="/subscriptions">View All Kits</Link>
          </Button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Missing Tier
  |--------------------------------------------------------------------------
  */

  if (!selectedTier) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Kit Not Available</h2>

          <p className="text-muted-foreground mb-4 text-sm">
            This kit is not currently available
          </p>

          <Button
            asChild
            className="rounded-none bg-foreground text-background hover:bg-foreground/85"
          >
            <Link to="/subscriptions">View All Kits</Link>
          </Button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Pricing
  |--------------------------------------------------------------------------
  */

  const subscribePrice =
    typeof selectedTier.pricing.subscribe === "string"
      ? parseFloat(selectedTier.pricing.subscribe)
      : selectedTier.pricing.subscribe || 0;

  const oneTimePrice =
    typeof selectedTier.pricing.one_time === "string"
      ? parseFloat(selectedTier.pricing.one_time)
      : selectedTier.pricing.one_time || 0;

  const displayPrice =
    billingType === "subscribe" ? subscribePrice : oneTimePrice;

  /*
  |--------------------------------------------------------------------------
  | Resolve Selected WooCommerce Variation
  |--------------------------------------------------------------------------
  */

  const selectedVariation =
    billingType === "subscribe"
      ? selectedTier.variations.subscription
      : selectedTier.variations.one_time;

  /*
  |--------------------------------------------------------------------------
  | Add Kit To Cart
  |--------------------------------------------------------------------------
  */

  const handleAddToCart = async () => {
    if (!selectedVariation) {
      toast.error("This kit option is unavailable");
      return;
    }

    if (!selectedVariation.purchasable) {
      toast.error("This kit option cannot currently be purchased");
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

      const purchaseType: PurchaseType =
        billingType === "subscribe" ? "subscription" : "one time";

      const interval =
        purchaseType === "subscription" ? replenishmentInterval : undefined;

      /*
    |--------------------------------------------------------------------------
    | Rebuild Required WooCommerce Variation Attributes
    |--------------------------------------------------------------------------
    */

      const kitTypeLabels: Record<TierType, string> = {
        trial: "Trial",
        essential: "Essential",
        retail: "Retail",
      };

      const variationAttributes = [
        {
          attribute: "Code",
          value: kit.code,
        },
        {
          attribute: "Kit Type",
          value: kitTypeLabels[selectedTierType],
        },
        {
          attribute: "Purchase Type",
          value: purchaseType === "subscription" ? "Subscription" : "One Time",
        },
      ];

      /*
    |--------------------------------------------------------------------------
    | Add WooCommerce Variation To Store API Cart
    |--------------------------------------------------------------------------
    */

      const response = await addStoreCartItem(
        cartToken,
        selectedVariation.id,
        1,
        purchaseType,
        interval,
        variationAttributes,
      );

      /*
    |--------------------------------------------------------------------------
    | Refresh Cart Token
    |--------------------------------------------------------------------------
    */

      if (response.cartToken) {
        setCartToken(response.cartToken);
      }

      /*
    |--------------------------------------------------------------------------
    | Find Exact WooCommerce Cart Line
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
          Number(renelle?.replenishment_interval) === interval;

        return sameVariation && samePurchaseType && sameInterval;
      });

      if (!storeItem) {
        throw new Error("Unable to locate the added kit in the cart");
      }

      /*
    |--------------------------------------------------------------------------
    | Add Kit To Zustand Cart
    |--------------------------------------------------------------------------
    */

      addItem({
        id: [
          "kit",
          kit.id,
          selectedTierType,
          normalizedPurchaseType,
          interval ?? "none",
        ].join("-"),

        type: "kit",

        kitId: kit.id,

        variationId: selectedVariation.id,

        tier: selectedTierType,

        name: `${kit.code} - ${kit.name}`,

        variationName: `${selectedTierType} kit`,

        purchaseType,

        replenishmentInterval: interval,

        price: displayPrice,

        quantity: 1,

        image: kit.thumbnail,

        storeItemKey: storeItem.key,
      });

      toast.success(
        purchaseType === "subscription"
          ? `Kit added with delivery every ${interval} weeks`
          : "Kit added to cart",
      );
    } catch (error) {
      if (isExpiredCartError(error)) {
        await resetStoreCart();
        clearCart();

        toast.error("Your cart session expired, so the old cart was cleared.");

        return;
      }

      console.error("Failed to add kit to cart:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to add kit to cart",
      );
    } finally {
      setIsAdding(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Gallery
  |--------------------------------------------------------------------------
  */

  const galleryImages = [
    kit.thumbnail || getKitImage(String(kit.id), "large"),

    ...selectedTier.products
      .slice(0, 3)
      .map((_, index) => getProductImage(index, "small")),
  ];

  return (
    <div className="flex-1 bg-white">
      {/* Breadcrumb */}

      <div className="border-b border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>

          <ChevronRight className="w-3 h-3" />

          <Link
            to="/subscriptions"
            className="hover:text-foreground transition-colors"
          >
            Subscription Kits
          </Link>

          <ChevronRight className="w-3 h-3" />

          <span className="text-foreground">{kit.name}</span>
        </div>
      </div>

      {/* Product Hero */}

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}

            <div>
              <div className="relative aspect-square overflow-hidden bg-[#F7F6F4] mb-3">
                <ImageWithFallback
                  src={galleryImages[selectedImg] ?? kit.thumbnail ?? undefined}
                  alt={kit.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImg(index)}
                    className={`aspect-square overflow-hidden bg-[#F7F6F4] transition-all ${
                      selectedImg === index
                        ? "ring-1 ring-foreground"
                        : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${kit.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}

            <div className="lg:sticky lg:top-28 self-start">
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
                style={{
                  letterSpacing: "0.14em",
                  fontSize: "0.65rem",
                }}
              >
                {kit.code}
              </p>

              <h1
                className="mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                }}
              >
                {kit.name}
              </h1>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {kit.tagline || kit.skin_concern}
              </p>

              {/* Tier Selection */}

              <div className="mb-6">
                <p
                  className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
                  style={{
                    letterSpacing: "0.1em",
                    fontSize: "0.65rem",
                  }}
                >
                  Kit Tier
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {(Object.keys(kit.tiers) as TierType[]).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTierType(tier)}
                      className={`p-4 border text-left transition-all capitalize ease-linear ${
                        selectedTierType === tier
                          ? "bg-black text-white"
                          : "border-border"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                {/* Purchase Type */}

                <p
                  className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
                  style={{
                    letterSpacing: "0.1em",
                    fontSize: "0.65rem",
                  }}
                >
                  Purchase Option
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {selectedTier.subscribable && (
                    <button
                      type="button"
                      onClick={() => setBillingType("subscribe")}
                      className={`p-4 border text-left transition-all ${
                        billingType === "subscribe"
                          ? "border-foreground"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          Auto-Replenish
                        </span>

                        {billingType === "subscribe" && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="text-xl font-semibold mb-0.5">
                        ${subscribePrice.toFixed(2)}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        recurring delivery
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setBillingType("one_time")}
                    className={`p-4 border text-left transition-all ${
                      billingType === "one_time"
                        ? "border-foreground"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        One-Time
                      </span>

                      {billingType === "one_time" && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="text-xl font-semibold mb-0.5">
                      ${oneTimePrice.toFixed(2)}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      single purchase
                    </div>
                  </button>
                </div>

                {/* Replenishment Interval */}

                {billingType === "subscribe" && (
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                      Deliver Every
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {([4, 6, 8] as ReplenishmentInterval[]).map(
                        (interval) => (
                          <button
                            key={interval}
                            type="button"
                            onClick={() => setReplenishmentInterval(interval)}
                            className={`border px-4 py-3 text-sm transition ${
                              replenishmentInterval === interval
                                ? "border-black bg-black text-white"
                                : "border-gray-300 bg-white text-black"
                            }`}
                          >
                            {interval} Weeks
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-3">
                  {billingType === "subscribe"
                    ? `Delivered every ${replenishmentInterval} weeks. Cancel or pause anytime.`
                    : "One-time purchase with no recurring charges."}
                </p>
              </div>

              {/* CTA */}

              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  isAdding ||
                  !selectedTier.products.length ||
                  !selectedVariation ||
                  !selectedVariation.purchasable
                }
                className="w-full rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest mb-4"
                style={{
                  letterSpacing: "0.12em",
                  height: "52px",
                }}
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Adding...
                  </span>
                ) : (
                  `Add to Cart — $${displayPrice.toFixed(2)}`
                )}
              </Button>

              {/* Trust Points */}

              <div className="space-y-3 py-6 border-t border-border">
                {[
                  {
                    icon: Calendar,

                    text:
                      billingType === "subscribe"
                        ? `Delivered every ${replenishmentInterval} weeks`
                        : "Ships within 2–3 business days",
                  },

                  {
                    icon: Truck,
                    text: "Free shipping across Canada",
                  },

                  {
                    icon: CreditCard,
                    text: "Secure payment processing",
                  },

                  {
                    icon: Shield,

                    text:
                      billingType === "subscribe"
                        ? "Cancel anytime, no commitment"
                        : "Secure one-time purchase",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                    <span className="text-xs text-muted-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}

      <section className="py-16 md:py-20 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Kit Contents
            </p>

            <h2>What's Inside Your Kit</h2>

            <p className="text-sm text-muted-foreground mt-3">
              {selectedTier.products.length} premium products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {selectedTier.products.map((product, index) => (
              <ProductSample
                key={product.id}
                name={product.name}
                size={product.slug}
                imageUrl={product.image?.url || getProductImage(index, "small")}
                included
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + FAQ */}

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <div className="border border-border p-8 md:p-10">
            <h2 className="mb-8">What You Get</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {kit.benefits}
                </p>
              </div>

              {typeof kit.routine_steps === "string" && kit.routine_steps && (
                <div>
                  <h3 className="font-semibold mb-2">Routine Steps</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {kit.routine_steps}
                  </p>
                </div>
              )}

              {Array.isArray(kit.routine_steps) &&
                kit.routine_steps.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Routine Steps</h3>

                    <ol className="list-decimal list-inside space-y-2">
                      {kit.routine_steps.map((step, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
            </div>
          </div>

          <div className="border border-border p-8 md:p-10">
            <h2 className="mb-8">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  value: "billing",

                  q: "How does auto-replenishment work?",

                  a: `You'll be charged $${subscribePrice.toFixed(
                    2,
                  )} CAD every ${replenishmentInterval} weeks. Your plan continues until you pause or cancel it.`,
                },

                {
                  value: "shipping",

                  q: "When will I receive my kit?",

                  a: `Your first kit ships within 2–3 business days. Future kits ship every ${replenishmentInterval} weeks.`,
                },

                {
                  value: "cancel",

                  q: "Can I cancel anytime?",

                  a: "Yes. You can pause or cancel your auto-replenishment plan from your account dashboard.",
                },

                {
                  value: "change",

                  q: "Can I change my delivery frequency?",

                  a: "Yes. You can change your replenishment schedule before the next order is processed.",
                },
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-sm font-medium text-left">
                    {item.q}
                  </AccordionTrigger>

                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why Dermera */}

      <section className="py-16 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="mb-12">Why Dermera Labs?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Canadian Brand",

                sub: "Proudly formulated and shipped from Canada",
              },

              {
                label: "Premium Quality",

                sub: "Dermatologist-tested, clinically proven formulations",
              },

              {
                label: "Secure & Safe",

                sub: "Bank-level encryption protects your information",
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-widest mb-2">
                  {item.label}
                </p>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
