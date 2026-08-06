import { useState } from "react";

import { calculateSubscriptionPrice } from "@/lib/lib/price-utils";

import { microStyles } from "@/lib/design-system";

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

  const handleMethodChange = (next: PurchaseMethod) => {
    setMethod(next);

    onSelectionChange?.(
      next,
      next === "subscribe" ? subscribePrice : regularPrice,
      next === "subscribe" ? frequency : undefined,
    );
  };

  const handleFrequencyChange = (nextFrequency: Frequency) => {
    setFrequency(nextFrequency);

    onSelectionChange?.("subscribe", subscribePrice, nextFrequency);
  };

  const optionStyle = (isActive: boolean) => ({
    borderWidth: isActive ? "1.5px" : "1px",

    borderColor: isActive ? "var(--foreground)" : "var(--border)",

    backgroundColor: isActive ? "var(--secondary)" : "var(--background)",
  });

  const radioCircleStyle = (isActive: boolean) => ({
    borderColor: isActive ? "var(--foreground)" : "var(--accent-secondary)",
  });

  return (
    <div className="space-y-2">
      <label
        className="flex items-center justify-between px-4 py-3.5 border cursor-pointer transition-all hover:shadow-sm"
        style={optionStyle(method === "onetime")}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
            style={radioCircleStyle(method === "onetime")}
          >
            {method === "onetime" && (
              <span className="w-2 h-2 rounded-full bg-foreground block" />
            )}
          </span>

          <span style={microStyles}>One-time purchase</span>
        </div>

        <span style={microStyles}>${regularPrice.toFixed(2)}</span>

        <input
          type="radio"
          name="purchaseMethod"
          value="onetime"
          checked={method === "onetime"}
          onChange={() => handleMethodChange("onetime")}
          className="sr-only"
        />
      </label>

      <label
        className="flex flex-col border cursor-pointer transition-all hover:shadow-sm"
        style={optionStyle(method === "subscribe")}
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
              style={radioCircleStyle(method === "subscribe")}
            >
              {method === "subscribe" && (
                <span className="w-2 h-2 rounded-full bg-foreground block" />
              )}
            </span>

            <span style={microStyles}>Auto-replenish &amp; save</span>
          </div>

          <div className="flex items-center gap-2">
            <span style={microStyles}>${subscribePrice.toFixed(2)}</span>

            <span
              className="text-background text-xs font-medium px-2 py-0.5"
              style={{
                backgroundColor: "var(--foreground)",

                ...microStyles,
              }}
            >
              Never Run Out
            </span>
          </div>
        </div>

        {method === "subscribe" && (
          <div className="px-4 pb-4 border-t border-border pt-3">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs text-muted-foreground"
                style={microStyles}
              >
                Deliver every:
              </span>

              <select
                value={frequency}
                onChange={(event) =>
                  handleFrequencyChange(event.target.value as Frequency)
                }
                className="text-xs border border-border bg-background px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:border-foreground transition-colors"
                style={microStyles}
              >
                {(Object.keys(frequencyLabels) as Frequency[]).map(
                  (frequencyOption) => (
                    <option key={frequencyOption} value={frequencyOption}>
                      {frequencyLabels[frequencyOption]}
                    </option>
                  ),
                )}
              </select>
            </div>

            <p className="text-xs text-muted-foreground" style={microStyles}>
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
    </div>
  );
}
