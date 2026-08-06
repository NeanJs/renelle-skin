import { Link } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { EDITORIAL_IMG_1 } from "@/app/data/constant";

export default function EditorialFeature() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#F7F6F4]">
      <div className="relative overflow-hidden min-h-[480px]">
        <ImageWithFallback
          src={EDITORIAL_IMG_1}
          alt="Renelle Skin skincare routine"
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <div className="flex flex-col justify-center px-10 md:px-16 py-16">
        <p
          className="text-xs uppercase tracking-widest text-muted-foreground mb-6"
          style={{ letterSpacing: "0.16em" }}
        >
          The Renelle Skin Method
        </p>
        <h2
          className="mb-6"
          style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
        >
          Precision Skincare for Every Skin Concern
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Each line is built around a specific skin concern — not a generic
          routine. Start with a Trial Kit to experience the formulations, then
          move to Essential or Retail when you're ready.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          No guesswork. No subscription box filler. Just clinically formulated
          products that work as a system.
        </p>
        <Button
          asChild
          variant="outline"
          className="self-start rounded-none border-foreground text-foreground h-11 px-6 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background"
          style={{ letterSpacing: "0.1em" }}
        >
          <Link to="/subscriptions">Explore Lines</Link>
        </Button>
      </div>
    </section>
  );
}