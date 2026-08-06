import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Leaf,
  Loader2,
  Check,
} from "lucide-react";
export default function TruthStrip() {
  return (
    <div className="border-y border-border bg-[#F7F6F4]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            {
              icon: Truck,
              label: "Free Shipping",
              sub: "On all Canadian orders",
            },
            {
              icon: RotateCcw,
              label: "Cancel Anytime",
              sub: "No fees, no commitment",
            },
            {
              icon: ShieldCheck,
              label: "Dermatologist Tested",
              sub: "Clinically proven formulas",
            },
            {
              icon: Leaf,
              label: "Made in Canada",
              sub: "Premium local ingredients",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5">
              <item.icon className="w-5 h-5 flex-shrink-0 text-foreground/40" />
              <div>
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
