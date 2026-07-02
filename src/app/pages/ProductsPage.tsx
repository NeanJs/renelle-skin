import { useState } from "react";
import { Link } from "react-router-dom";

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { productLines } from "../data/product-lines";
import { 
  PRODUCT_PRICES, 
  DEFAULT_PRODUCT_PRICE, 
  calculateSubscriptionPrice 
} from "@/app/lib/price-utils";
import { getProductImage } from "@/app/config/images";

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
        const price = PRODUCT_PRICES[product.name] ?? DEFAULT_PRODUCT_PRICE;
        items.push({
          line,
          kitType,
          productIndex: i,
          name: product.name,
          size: product.size,
          price,
          subscribePrice: calculateSubscriptionPrice(price),
          imageIndex: imageCounter,
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
          src={getProductImage(imageIndex, "medium")}
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
