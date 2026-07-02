import { useState } from "react";
import { Link } from "react-router-dom";

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { productLines } from "../data/product-lines";

// Placeholder prices — would come from API in production
const basePrices: Record<string, number> = {
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
};
const DEFAULT_PRICE = 45;

// Product images — cycle through
const productImages = [
  "https://images.unsplash.com/photo-1550572017-4b7a301b9d81?w=600&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1763503836825-97f5450d155a?w=600&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1768725844772-dc834990526f?w=600&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1765887986673-953fccf56464?w=600&h=600&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1655357443031-d5e0354b56e1?w=600&h=600&fit=crop&auto=format",
];

type KitFilter = "all" | "essential" | "retail";

interface FlatProduct {
  line: ProductLine;
  kitType: "essential" | "retail";
  productIndex: number;
  name: string;
  size: string;
  price: number;
  subscribePrice: number;
  imageIndex: number;
}

// Flatten all individual products from Essential + Retail tiers
function buildProductList(): FlatProduct[] {
  const items: FlatProduct[] = [];
  let imageCounter = 0;

  for (const line of productLines) {
    for (const kitType of ["essential", "retail"] as const) {
      const kit = line.kits[kitType];
      kit.products.forEach((product, i) => {
        const price = basePrices[product.name] ?? DEFAULT_PRICE;
        items.push({
          line,
          kitType,
          productIndex: i,
          name: product.name,
          size: product.size,
          price,
          subscribePrice: Math.round(price * 0.85 * 100) / 100,
          imageIndex: imageCounter % productImages.length,
        });
        imageCounter++;
      });
    }
  }

  return items;
}

const ALL_PRODUCTS = buildProductList();

export function ProductsPage() {
  const [lineFilter, setLineFilter] = useState<string>("all");
  const [kitFilter, setKitFilter] = useState<KitFilter>("all");

  const filtered = ALL_PRODUCTS.filter((p) => {
    const lineMatch = lineFilter === "all" || p.line.id === lineFilter;
    const kitMatch = kitFilter === "all" || p.kitType === kitFilter;
    return lineMatch && kitMatch;
  });

  return (
    <div className="flex-1 bg-white">
      {/* Page Header */}
      <section className="border-b border-border py-16 md:py-20 bg-[#F7F6F4]">
        <div className="container mx-auto px-6 text-center">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
            style={{ letterSpacing: "0.16em" }}
          >
            Individual Products
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Shop Products</h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Every product from our Essential and Retail kits, available
            individually with one-time or auto-replenish pricing.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-white sticky top-[100px] z-30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-3">
            {/* Line filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs uppercase tracking-widest text-muted-foreground mr-1"
                style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}
              >
                Line:
              </span>
              {[
                { id: "all", label: "All" },
                ...productLines.map((l) => ({ id: l.id, label: l.code })),
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLineFilter(item.id)}
                  className={`px-3 py-1 text-xs border transition-all ${
                    lineFilter === item.id
                      ? "bg-foreground text-background border-foreground"
                      : "bg-white text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                  style={{ fontSize: "0.65rem", letterSpacing: "0.06em" }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            {/* Kit type filter */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-widest text-muted-foreground mr-1"
                style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}
              >
                Kit:
              </span>
              {(
                [
                  ["all", "All"],
                  ["essential", "Essential"],
                  ["retail", "Retail"],
                ] as [KitFilter, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setKitFilter(val)}
                  className={`px-3 py-1 text-xs border transition-all ${
                    kitFilter === val
                      ? "bg-foreground text-background border-foreground"
                      : "bg-white text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                  }`}
                  style={{ fontSize: "0.65rem", letterSpacing: "0.06em" }}
                >
                  {label}
                </button>
              ))}
            </div>

            <span
              className="text-xs text-muted-foreground sm:ml-auto"
              style={{ fontSize: "0.65rem" }}
            >
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-muted-foreground mb-4">
                No products match your current filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setLineFilter("all");
                  setKitFilter("all");
                }}
                className="rounded-none border-foreground text-xs uppercase tracking-widest"
                style={{ letterSpacing: "0.1em" }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((product, i) => (
                <ProductCard
                  key={`${product.line.id}-${product.kitType}-${product.productIndex}`}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 text-center">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
            style={{ letterSpacing: "0.14em" }}
          >
            Better Value
          </p>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            Save More with a Kit
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Our Essential and Retail kits bundle the full routine at a lower
            per-product cost. Trial Kits let you try before you subscribe.
          </p>
          <Button
            asChild
            className="rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest h-12 px-8"
            style={{ letterSpacing: "0.12em" }}
          >
            <Link to="/subscriptions">Explore Our Lines</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: FlatProduct }) {
  const {
    line,
    kitType,
    productIndex,
    name,
    size,
    price,
    subscribePrice,
    imageIndex,
  } = product;
  const href = `/product/${line.id}/${kitType}/${productIndex}`;
  const kitLabel = kitType === "retail" ? "Retail" : "Essential";

  return (
    <Link to={href} className="group block">
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden mb-4"
        style={{ backgroundColor: `${line.secondaryColor}33` }}
      >
        <ImageWithFallback
          src={productImages[imageIndex]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Kit type badge */}
        <div
          className="absolute top-3 right-3 text-white px-2 py-0.5"
          style={{
            backgroundColor: line.primaryColor,
            fontSize: "0.55rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {kitLabel}
        </div>
      </div>

      {/* Info */}
      <div>
        <p
          className="text-muted-foreground mb-1"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {line.code}
        </p>
        <p className="text-sm font-medium mb-0.5 group-hover:underline underline-offset-2 transition-all leading-snug">
          {name}
        </p>
        <p className="text-xs text-muted-foreground mb-2">{size}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm">${price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">
            or ${subscribePrice.toFixed(2)}/mo
          </span>
        </div>
      </div>
    </Link>
  );
}
