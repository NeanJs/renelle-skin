import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { LS } from "@/app/data/constant";
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      toast.success("You&apos;re on the list!", {
        description: "Expert skincare tips from Catherine, monthly.",
      });
    }, 1200);
  };

  return (
    <section className="bg-[#0A0A0A] py-20">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <p
          className="text-xs uppercase tracking-widest text-white/40 mb-4"
          style={LS}
        >
          Stay Connected
        </p>
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
          }}
        >
          Skincare insights, delivered monthly.
        </h2>
        <p className="text-sm text-white/55 leading-relaxed mb-10">
          Expert tips from Catherine, product spotlights, and exclusive
          subscriber offers — straight to your inbox.
        </p>
        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <Check className="w-4 h-4 text-foreground" />
              </div>
              <p className="text-sm text-white/70">
                You&apos;re subscribed. Welcome to Renelle Skin.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubscribe}
              noValidate
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 text-sm bg-white/8 border border-white/15 text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  aria-label="Email address for newsletter"
                />
                {error && (
                  <p className="text-xs text-[#C4836A] mt-1.5 text-left">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 bg-white text-foreground text-xs uppercase tracking-widest hover:bg-white/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                style={{ letterSpacing: "0.12em" }}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <p className="text-xs text-white/25 mt-5">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
