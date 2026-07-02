import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productLines } from "@/app/data/product-lines";
import { Button } from "@/app/components/ui/button";
import {
  PurchaseMethodSelector,
  PurchaseMethod,
  Frequency,
} from "@/app/components/PurchaseMethodSelector";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { LoadingSpinner } from "@/app/components/Loading";
import { ChevronRight, Truck, Shield } from "lucide-react";

// Sample product images — rotate by index
const productImages = [
  "https://images.unsplash.com/photo-1550572017-4b7a301b9d81?w=900&h=900&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1763503836825-97f5450d155a?w=900&h=900&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1768725844772-dc834990526f?w=900&h=900&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1765887986673-953fccf56464?w=900&h=900&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1655357443031-d5e0354b56e1?w=900&h=900&fit=crop&auto=format",
];

// Placeholder prices for individual products (prototype — from API in production)
const basePrices: Record<string, number> = {
  "Cream Cleanser": 38,
  "Reset Serum": 52,
  "Light Moisturiser": 58,
  "Reset Toner": 32,
  "Clarifying Cleanser": 34,
  "BHA Exfoliating Toner": 36,
  "Niacinamide Serum": 48,
  "Oil-Control Moisturiser": 56,
  "SPF 50 Matte Sunscreen": 44,
  "Milk Cleanser": 38,
  "Hydrating Essence": 42,
  "HA Plumping Serum": 55,
  "Rich Moisturiser": 60,
  "SPF 30 Hydrating Sunscreen": 44,
  "Peptide Cleanser": 42,
  "Resurfacing Toner": 46,
  "Firming Peptide Serum": 78,
  "Lifting Moisturiser": 68,
  "SPF 50+ Age Defence": 52,
};

const DEFAULT_PRICE = 45;

export function ProductDetailPage() {
  const { lineId, kitType, productIndex } = useParams();
  const navigate = useNavigate();

  const line = productLines.find((l) => l.id === lineId);
  const idx = parseInt(productIndex ?? "0", 10);

  // Only essential and retail kit types are valid for individual products
  const kitTypeKey = kitType === "retail" ? "retail" : "essential";
  const kit = line?.kits[kitTypeKey];
  const product = kit?.products[idx];

  const [purchaseMethod, setPurchaseMethod] =
    useState<PurchaseMethod>("onetime");
  const [activePrice, setActivePrice] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);

  if (!line || !kit || !product) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product Not Found</h2>
          <Button
            asChild
            className="rounded-none bg-foreground text-background hover:bg-foreground/85"
          >
            <Link to="/subscriptions">View Our Lines</Link>
          </Button>
        </div>
      </div>
    );
  }

  const regularPrice = basePrices[product.name] ?? DEFAULT_PRICE;
  const subscribePrice = Math.round(regularPrice * 0.85 * 100) / 100;
  const displayPrice = activePrice > 0 ? activePrice : regularPrice;

  const handleSelectionChange = (
    method: PurchaseMethod,
    price: number,
    _frequency?: Frequency,
  ) => {
    setPurchaseMethod(method);
    setActivePrice(price);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      navigate("/checkout", {
        state: {
          kit: {
            name: `${product.name} (${product.size})`,
            tier: kitTypeKey,
            price: displayPrice,
            description: `${line.code} — ${kitTypeKey.charAt(0).toUpperCase() + kitTypeKey.slice(1)} tier`,
            id: line.id,
          },
        },
      });
    }, 800);
  };

  const kitLabel = kitTypeKey === "retail" ? "Retail Kit" : "Essential Kit";

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
            Our Lines
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            to={`/subscriptions/${line.id}`}
            className="hover:text-foreground transition-colors"
          >
            {line.code}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Product Image */}
            <div>
              <div
                className="aspect-square overflow-hidden"
                style={{ backgroundColor: `${line.secondaryColor}33` }}
              >
                <ImageWithFallback
                  src={productImages[idx % productImages.length]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right — Product Info */}
            <div className="lg:sticky lg:top-28 self-start">
              {/* Line + Kit context */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs px-2.5 py-1 text-white uppercase tracking-widest font-medium"
                  style={{
                    backgroundColor: line.primaryColor,
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {line.code}
                </span>
                <span
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                  style={{ letterSpacing: "0.06em", fontSize: "0.65rem" }}
                >
                  {kitLabel}
                </span>
              </div>

              {/* Product name & size */}
              <h1
                className="mb-1"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                {product.size}
              </p>

              {/* Price display */}
              <div className="mb-6">
                <span className="text-2xl font-semibold">
                  ${displayPrice.toFixed(2)}
                </span>
                {purchaseMethod === "subscribe" && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${regularPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* ─── Purchase Method Selector ─── */}
              <div className="mb-6">
                <PurchaseMethodSelector
                  regularPrice={regularPrice}
                  onSelectionChange={handleSelectionChange}
                />
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest mb-4"
                style={{ letterSpacing: "0.12em", height: "52px" }}
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" /> Adding...
                  </span>
                ) : (
                  `Add to Cart — $${displayPrice.toFixed(2)}`
                )}
              </Button>

              {/* Trust points */}
              <div className="space-y-3 py-5 border-t border-border">
                {[
                  { icon: Truck, text: "Free shipping across Canada" },
                  {
                    icon: Shield,
                    text:
                      purchaseMethod === "subscribe"
                        ? "Cancel or pause anytime, no fees"
                        : "Secure one-time payment",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Back to kit link */}
              <div className="pt-4 border-t border-border">
                <Link
                  to={`/subscriptions/${line.id}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  ← View full {line.code} kit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product context */}
      <section className="py-12 border-t border-border bg-[#F7F6F4]">
        <div className="container mx-auto px-6 max-w-3xl">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
            style={{ letterSpacing: "0.14em", fontSize: "0.65rem" }}
          >
            Part of the {line.code} Line
          </p>
          <h2
            className="mb-3"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
          >
            {line.name}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {line.tagline}
          </p>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-xs uppercase tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              <Link to={`/subscriptions/${line.id}`}>View Full Kit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
