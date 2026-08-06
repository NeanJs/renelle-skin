import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Button } from "@/app/components/ui/button";
import { LoadingSpinner } from "@/app/components/Loading";

import { getProducts } from "@/lib/api/products";

import type { Product } from "../../../../shared/types/kit";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getProducts();

      setProducts(res.products);
    } catch (error) {
      console.error("PRODUCT FETCH ERROR", error);

      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl mb-4">Error Loading Products</h2>

          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
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
            Discover Renelle Skin products available for individual purchase.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

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
            Build your complete skincare routine with a Renelle Skin kit.
          </p>

          <Button asChild className="rounded-none h-12 px-8">
            <Link to="/subscriptions">Explore Our Lines</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const price = product.pricing.regular;

  return (
    <div className="group block">
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden mb-4 bg-[#F7F6F4]">
          <ImageWithFallback
            src={product.image?.url ?? ""}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {!product.purchasable && (
            <div className="absolute top-3 right-3 bg-foreground text-background px-2 py-1 text-xs uppercase tracking-wider">
              Unavailable
            </div>
          )}
        </div>
      </Link>

      <div>
        <Link to={`/product/${product.slug}`}>
          <p className="text-sm font-medium mb-1 group-hover:underline underline-offset-2">
            {product.name}
          </p>
        </Link>

        {price !== null && (
          <span className="text-sm block mb-4">
            From ${price.toFixed(2)} CAD
          </span>
        )}

        <Button
          asChild
          variant="outline"
          disabled={!product.purchasable}
          className="w-full rounded-none"
        >
          <Link to={`/product/${product.slug}`}>
            {product.purchasable ? "Select Options" : "Unavailable"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
