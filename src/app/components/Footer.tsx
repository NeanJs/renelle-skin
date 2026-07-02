import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Check } from "lucide-react";
import { getNavigationLines } from "@/app/data/product-lines";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const lines = getNavigationLines();

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setDone(true);
    }, 1100);
  };

  return (
    <footer className="bg-[#0A0A0A] text-white mt-auto">
      {/* Global newsletter strip */}
      <div className="border-b border-white/8">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p
                className="text-xs uppercase tracking-widest text-white/40 mb-1"
                style={{ fontSize: "0.62rem", letterSpacing: "0.14em" }}
              >
                Newsletter
              </p>
              <p className="text-sm text-white/75">
                Expert skincare insights from Catherine, monthly.
              </p>
            </div>
            {done ? (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Check className="w-4 h-4" /> You&apos;re subscribed
              </div>
            ) : (
              <form
                onSubmit={subscribe}
                className="flex gap-2 w-full sm:w-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-10 px-4 text-sm bg-white/8 border border-white/15 text-white placeholder:text-white/30 outline-none focus:border-white/35 transition-colors flex-1 sm:w-56"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  aria-label="Newsletter email"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="h-10 px-5 bg-white text-foreground text-xs uppercase tracking-widest hover:bg-white/90 disabled:opacity-60 transition-all flex items-center gap-1.5 flex-shrink-0"
                  style={{ letterSpacing: "0.1em", fontSize: "0.65rem" }}
                >
                  {busy ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-14">
          {/* Brand column */}
          <div className="md:col-span-2">
            <p
              className="text-xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
              }}
            >
              Renelle Skin
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium Canadian skincare delivered to your door every month.
              Dermatologist-formulated, clinically proven.
            </p>
          </div>

          {/* Our Lines */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-white/40 mb-5"
              style={{ letterSpacing: "0.1em" }}
            >
              Our Lines
            </p>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Shop All Products
                </Link>
              </li>
              {lines.map((line) => (
                <li key={line.id}>
                  <Link
                    to={`/subscriptions/${line.id}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {line.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-white/40 mb-5"
              style={{ letterSpacing: "0.1em" }}
            >
              Help
            </p>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/consultation"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Shipping &amp; Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-white/40 mb-5"
              style={{ letterSpacing: "0.1em" }}
            >
              Company
            </p>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  About Renelle Skin
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Our Ingredients
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust + Certifications */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            {["Cruelty-Free", "Dermatologist Tested", "Made in Canada"].map(
              (label) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <span style={{ fontSize: "0.6rem" }}>✓</span>
                  </div>
                  <span
                    className="text-xs text-white/50 uppercase tracking-wider"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            {["Visa", "MC", "AMEX", "Apple Pay", "Google Pay"].map((method) => (
              <div
                key={method}
                className="px-2.5 py-1 border border-white/15 rounded text-white/40 bg-white/5"
                style={{ fontSize: "0.6rem", letterSpacing: "0.03em" }}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 text-xs text-white/30 text-center"
          style={{ letterSpacing: "0.02em" }}
        >
          © 2026 Renelle Skin Inc. All rights reserved. Proudly Canadian.
        </div>
      </div>
    </footer>
  );
}
