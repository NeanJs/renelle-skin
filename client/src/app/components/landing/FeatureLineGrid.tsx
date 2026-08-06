import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import { useEffect, useState } from "react";
import { getKits } from "@/lib/api/kits";
import { Kit } from "../../../../../shared/types/kit";
import { useKitsStore } from "@/lib/context/KitContext";

export default function FeatureLineGrid() {
  const kits = useKitsStore((state) => state.kits);

  const fetchKits = useKitsStore((state) => state.fetchKits);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={{ letterSpacing: "0.14em" }}
            >
              Our Skincare Lines
            </p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              Find Your Line
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-xs uppercase tracking-widest underline underline-offset-4 hover:no-underline self-start md:self-auto"
            style={{ letterSpacing: "0.1em" }}
          >
            <Link to="/subscriptions">View All Lines</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {kits.map((line) => (
            <Link
              key={line.id}
              to={`/subscriptions/${line.id}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-[#F7F6F4] aspect-[4/5] mb-4">
                <ImageWithFallback
                  src={line.thumbnail ?? undefined}
                  alt={line.code}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-widest text-muted-foreground mb-1"
                  style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}
                >
                  {line.code}
                </p>
                <p className="text-sm font-medium mb-1">{line.name}</p>
                <p className="text-xs text-muted-foreground">
                  {line.skin_concern}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
