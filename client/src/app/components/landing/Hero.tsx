import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
const HERO_IMG =
  "https://images.unsplash.com/photo-1629732046662-2f03fde8f689?w=1400&h=900&fit=crop&auto=format";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[86vh]">
      {/* Text side */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
        <p
          className="text-xs uppercase tracking-widest text-muted-foreground mb-6"
          style={{ letterSpacing: "0.16em" }}
        >
          Canadian Skincare — Monthly Subscription
        </p>
        <h1
          className="mb-8"
          style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
        >
          Science-Backed Skincare, Simplified
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md">
          Expertly curated kits featuring clinical-grade formulations. Tailored
          to your skin concern, delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/85 h-12 px-8 rounded-none text-xs uppercase tracking-widest"
            style={{ letterSpacing: "0.12em" }}
          >
            <Link to="/subscriptions">Explore Our Lines</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-none border-foreground text-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background"
            style={{ letterSpacing: "0.12em" }}
          >
            <Link to="/subscriptions">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Image side */}
      <div className="relative bg-[#F2F1EF] order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
        <ImageWithFallback
          src={HERO_IMG}
          alt="Renelle Skin skincare collection"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute bottom-8 left-8 bg-white px-5 py-4 shadow-lg max-w-[220px]">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-1"
            style={{ letterSpacing: "0.1em" }}
          >
            New Formula
          </p>
          <p className="text-sm font-medium">With Active Peptide Complex</p>
        </div>
      </div>
    </section>
  );
}
