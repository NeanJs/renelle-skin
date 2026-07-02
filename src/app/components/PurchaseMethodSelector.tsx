import { useState } from "react";
import {
  SUBSCRIPTION_DISCOUNT_PERCENT,
  calculateSubscriptionPrice,
} from "@/app/lib/price-utils";

export type PurchaseMethod = "onetime" | "subscribe";
export type Frequency = "4weeks" | "6weeks" | "8weeks";

interface PurchaseMethodSelectorProps {
  regularPrice: number;
  onSelectionChange?: (
    method: PurchaseMethod,
    price: number,
    frequency?: Frequency,
  ) => void;
}

const frequencyLabels: Record<Frequency, string> = {
  "4weeks": "Every 4 weeks",
  "6weeks": "Every 6 weeks",
  "8weeks": "Every 8 weeks",
};

export function PurchaseMethodSelector({
  regularPrice,
  onSelectionChange,
}: PurchaseMethodSelectorProps) {
  const [method, setMethod] = useState<PurchaseMethod>("onetime");
  const [frequency, setFrequency] = useState<Frequency>("4weeks");

  const subscribePrice = calculateSubscriptionPrice(regularPrice);
  const activePrice = method === "subscribe" ? subscribePrice : regularPrice;

  const handleMethodChange = (next: PurchaseMethod) => {
    setMethod(next);
    onSelectionChange?.(
      next,
      next === "subscribe" ? subscribePrice : regularPrice,
      frequency,
    );
  };

  const handleFrequencyChange = (f: Frequency) => {
    setFrequency(f);
    onSelectionChange?.(method, activePrice, f);
  };

  return (
    <div className="space-y-2">
      {/* One-time option */}
      <label
        className="flex items-center justify-between px-4 py-3.5 border cursor-pointer transition-all"
        style={{
          borderWidth: method === "onetime" ? "1.5px" : "1px",
          borderColor: method === "onetime" ? "#0A0A0A" : "#E5E2DC",
          backgroundColor: method === "onetime" ? "#F7F6F4" : "#FFFFFF",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
            style={{
              borderColor: method === "onetime" ? "#0A0A0A" : "#C4B89A",
            }}
          >
            {method === "onetime" && (
              <span className="w-2 h-2 rounded-full bg-foreground block" />
            )}
          </span>
          <span className="text-sm font-medium">One-time purchase</span>
        </div>
        <span className="text-sm font-medium">${regularPrice.toFixed(2)}</span>
        <input
          type="radio"
          name="purchaseMethod"
          value="onetime"
          checked={method === "onetime"}
          onChange={() => handleMethodChange("onetime")}
          className="sr-only"
        />
      </label>

      {/* Auto-replenish option */}
      <label
        className="flex flex-col border cursor-pointer transition-all"
        style={{
          borderWidth: method === "subscribe" ? "1.5px" : "1px",
          borderColor: method === "subscribe" ? "#0A0A0A" : "#E5E2DC",
          backgroundColor: method === "subscribe" ? "#F7F6F4" : "#FFFFFF",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
              style={{
                borderColor: method === "subscribe" ? "#0A0A0A" : "#C4B89A",
              }}
            >
              {method === "subscribe" && (
                <span className="w-2 h-2 rounded-full bg-foreground block" />
              )}
            </span>
            <span className="text-sm font-medium">
              Auto-replenish &amp; save
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Subscribe price */}
            <span className="text-sm font-medium">
              ${subscribePrice.toFixed(2)}
            </span>
            {/* Strikethrough of regular price */}
            <span className="text-xs text-muted-foreground line-through">
              ${regularPrice.toFixed(2)}
            </span>
            {/* Save badge */}
            <span
              className="text-background text-xs font-medium px-2 py-0.5"
              style={{
                backgroundColor: "#0A0A0A",
                fontSize: "0.6rem",
                letterSpacing: "0.04em",
              }}
            >
              Save {SUBSCRIPTION_DISCOUNT_PERCENT}%
            </span>
          </div>
        </div>

        {/* Expanded — frequency selector, only when subscribe is active */}
        {method === "subscribe" && (
          <div className="px-4 pb-4 border-t border-border pt-3">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs text-muted-foreground"
                style={{ fontSize: "0.7rem" }}
              >
                Deliver every:
              </span>
              <select
                value={frequency}
                onChange={(e) =>
                  handleFrequencyChange(e.target.value as Frequency)
                }
                className="text-xs border border-border bg-white px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:border-foreground transition-colors"
                style={{ fontSize: "0.72rem", letterSpacing: "0.02em" }}
              >
                {(Object.keys(frequencyLabels) as Frequency[]).map((f) => (
                  <option key={f} value={f}>
                    {frequencyLabels[f]}
                  </option>
                ))}
              </select>
            </div>
            <p
              className="text-xs text-muted-foreground"
              style={{ fontSize: "0.7rem" }}
            >
              Cancel or pause anytime.
            </p>
          </div>
        )}

        <input
          type="radio"
          name="purchaseMethod"
          value="subscribe"
          checked={method === "subscribe"}
          onChange={() => handleMethodChange("subscribe")}
          className="sr-only"
        />
      </label>

      {/* Annotation — visible in prototype only for developer reference */}
      {/* Subscribe price = regular_price × 0.85 — calculated at render time from API */}
      {/* CTA price updates when purchase method changes */}
    </div>
  );
}

// Export the hook-friendly state for use in parent
export type { PurchaseMethod, Frequency };
