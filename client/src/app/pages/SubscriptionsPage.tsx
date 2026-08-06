import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";
import { ProductCard } from "@/app/components/ProductCard";
import { FilterBar, FilterState } from "@/app/components/FilterBar";
import { getKitImage } from "@/app/config/images";
import { labelStyles, capStyles, inlineStyles } from "@/lib/design-system";
import { getKits } from "@/lib/api/kits";

import { LoadingSpinner } from "@/app/components/Loading";
import { Kit } from "../../../../shared/types/kit";
import { useKitsStore } from "@/lib/context/KitContext";

export function SubscriptionsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState<FilterState>({});

  const kits = useKitsStore((state) => state.kits);
  useEffect(() => {
    kits.length && setLoading(false);
  });
  const fetchKits = useKitsStore((state) => state.fetchKits);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);

  let filteredKits = [...kits];

  if (filters.priceRange && kits.length > 0) {
    filteredKits = filteredKits.filter((kit) => {
      // Use essential tier pricing for filtering
      const tier = kit.tiers.essential;
      const price =
        typeof tier.pricing.subscribe === "string"
          ? parseFloat(tier.pricing.subscribe)
          : tier.pricing.subscribe || 0;

      if (filters.priceRange === "0-50") return price < 50;
      if (filters.priceRange === "50-100") return price >= 50 && price < 100;
      if (filters.priceRange === "100-150") return price >= 100 && price < 150;
      if (filters.priceRange === "150+") return price >= 150;
      return true;
    });
  }

  if (sortBy === "price-low") {
    filteredKits.sort((a, b) => {
      const priceA =
        typeof a.tiers.essential.pricing.subscribe === "string"
          ? parseFloat(a.tiers.essential.pricing.subscribe)
          : a.tiers.essential.pricing.subscribe || 0;
      const priceB =
        typeof b.tiers.essential.pricing.subscribe === "string"
          ? parseFloat(b.tiers.essential.pricing.subscribe)
          : b.tiers.essential.pricing.subscribe || 0;
      return priceA - priceB;
    });
  } else if (sortBy === "price-high") {
    filteredKits.sort((a, b) => {
      const priceA =
        typeof a.tiers.essential.pricing.subscribe === "string"
          ? parseFloat(a.tiers.essential.pricing.subscribe)
          : a.tiers.essential.pricing.subscribe || 0;
      const priceB =
        typeof b.tiers.essential.pricing.subscribe === "string"
          ? parseFloat(b.tiers.essential.pricing.subscribe)
          : b.tiers.essential.pricing.subscribe || 0;
      return priceB - priceA;
    });
  } else if (sortBy === "name") {
    filteredKits.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (loading) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Error Loading Kits</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <section className="border-b border-border py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <p
            className={labelStyles.container}
            style={{ letterSpacing: labelStyles.letterSpacing }}
          >
            Monthly Skincare
          </p>
          <h1 style={inlineStyles.responsiveTitle}>Subscription Kits</h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            Choose the monthly kit that fits your skincare goals. Cancel or
            upgrade anytime.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-10">
            <FilterBar
              onSortChange={setSortBy}
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {filteredKits.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4 text-sm">
                No kits match your current filters.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters({})}
                className="rounded-none border-foreground text-xs uppercase tracking-widest transition-colors hover:bg-foreground/5"
                style={{ letterSpacing: "0.1em" }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
              {filteredKits.map((kit) => {
                const essentialTier = kit.tiers.essential;
                const price =
                  typeof essentialTier.pricing.subscribe === "string"
                    ? parseFloat(essentialTier.pricing.subscribe)
                    : essentialTier.pricing.subscribe || 0;

                return (
                  <ProductCard
                    key={kit.id}
                    id={String(kit.id)}
                    name={kit.name}
                    tier={kit.skin_concern}
                    price={price}
                    description={kit.tagline || kit.skin_concern}
                    imageUrl={
                      kit.thumbnail || getKitImage(String(kit.id), "medium")
                    }
                    recommended={false}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 border-t border-border bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <p
              className={labelStyles.container}
              style={{ letterSpacing: labelStyles.letterSpacing }}
            >
              Detailed Breakdown
            </p>
            <h2 style={inlineStyles.responsiveH2}>Compare All Kits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredKits.map((kit) => {
              const essentialTier = kit.tiers.essential;
              const price =
                typeof essentialTier.pricing.subscribe === "string"
                  ? parseFloat(essentialTier.pricing.subscribe)
                  : essentialTier.pricing.subscribe || 0;

              return (
                <div
                  key={kit.id}
                  className="bg-white border border-border p-8 relative transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p
                        className={capStyles.container}
                        style={{
                          letterSpacing: capStyles.letterSpacing,
                          fontSize: capStyles.fontSize,
                        }}
                      >
                        {kit.code}
                      </p>
                      <h3 className="text-lg" style={inlineStyles.serifFont}>
                        {kit.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-semibold">
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">/mo</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {kit.tagline || kit.skin_concern}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    <li className="flex items-start gap-3 text-sm">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                      <span className="text-muted-foreground">
                        {essentialTier.products.length} premium products
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                      <span className="text-muted-foreground">
                        Monthly delivery
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                      <span className="text-muted-foreground">
                        Free shipping
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-foreground" />
                      <span className="text-muted-foreground">
                        Cancel anytime
                      </span>
                    </li>
                  </ul>

                  <div className="mb-8">
                    <p
                      className={capStyles.container}
                      style={{
                        letterSpacing: capStyles.letterSpacing,
                        fontSize: capStyles.fontSize,
                      }}
                    >
                      Included Products
                    </p>
                    <div className="space-y-1.5 mt-3">
                      {essentialTier.products.slice(0, 5).map((product, i) => (
                        <p key={i} className="text-xs text-muted-foreground">
                          — {product.name}
                        </p>
                      ))}
                      {essentialTier.products.length > 5 && (
                        <p className="text-xs text-muted-foreground italic">
                          + {essentialTier.products.length - 5} more products
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full h-11 rounded-none text-xs uppercase tracking-widest bg-foreground text-background hover:bg-foreground/85 transition-all"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    <Link to={`/subscriptions/${kit.id}`}>View Details</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                label: "Made in Canada",
                sub: "Premium formulations crafted locally",
              },
              {
                label: "Secure Payments",
                sub: "Bank-level encryption on all transactions",
              },
              {
                label: "Free Shipping",
                sub: "Delivered to your door every month",
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className={capStyles.container}
                  style={{
                    letterSpacing: capStyles.letterSpacing,
                    fontSize: capStyles.fontSize,
                  }}
                >
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
