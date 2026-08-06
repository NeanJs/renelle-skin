import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { LS } from "@/app/data/constant";

interface CF {
  name: string;
  email: string;
  message: string;
}

const EMPTY: CF = { name: "", email: "", message: "" };
export default function ContactSection() {
  const [form, setForm] = useState<CF>(EMPTY);
  const [errors, setErrors] = useState<Partial<CF>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (f: keyof CF) => (v: string) => {
    setForm((s) => ({ ...s, [f]: v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<CF> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required.";
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Message received!", {
        description: "We'll be in touch within 1–2 business days.",
      });
    }, 1400);
  };

  const ic = (f: keyof CF) =>
    `w-full h-11 px-4 text-sm bg-white border outline-none transition-all placeholder:text-muted-foreground/40 ${
      errors[f]
        ? "border-[#C4836A] focus:border-[#C4836A]"
        : "border-border focus:border-foreground"
    }`;

  return (
    <section className="border-t border-border bg-[#F7F6F4] py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          {/* Left — context */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
              style={LS}
            >
              Get in Touch
            </p>
            <h2
              className="mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                lineHeight: 1.2,
              }}
            >
              Have a question? We&apos;d love to hear from you.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-md">
              Whether you're curious about our skincare lines, need help
              choosing a kit, or want to learn more about booking a consultation
              — reach out and we'll personally respond.
            </p>
            <div className="space-y-5">
              {[
                { label: "Email", value: "catherine@renelleskin.ca" },
                { label: "Location", value: "Vancouver, BC, Canada" },
                { label: "Response time", value: "Within 1–2 business days" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-6">
                  <p
                    className="text-xs text-muted-foreground uppercase tracking-widest w-28 flex-shrink-0"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-border p-10 text-center"
                >
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center mx-auto mb-5">
                    <Check className="w-5 h-5 text-background" />
                  </div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.4rem",
                    }}
                  >
                    Message Sent
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    We&apos;ll be in touch within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm(EMPTY);
                    }}
                    className="text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white border border-border p-8 space-y-5"
                >
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Full Name <span className="text-[#C4836A]">*</span>
                    </label>
                    <input
                      className={ic("name")}
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      placeholder="Jane Smith"
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="text-xs text-[#C4836A] mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Email Address <span className="text-[#C4836A]">*</span>
                    </label>
                    <input
                      className={ic("email")}
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#C4836A] mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Message <span className="text-[#C4836A]">*</span>
                    </label>
                    <textarea
                      className={`${ic("message")} h-28 py-3 resize-none`}
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="Tell us what's on your mind…"
                    />
                    {errors.message && (
                      <p className="text-xs text-[#C4836A] mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-foreground/85 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
