import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Leaf,
  Loader2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const HERO_IMG =
  "https://images.unsplash.com/photo-1629732046662-2f03fde8f689?w=1400&h=900&fit=crop&auto=format";
const EDITORIAL_IMG_1 =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&h=1000&fit=crop&auto=format";
const EDITORIAL_IMG_2 =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&auto=format";

const featuredLines = [
  {
    id: "dsmo",
    code: "DSMO",
    name: "Don't Stress Me Out",
    concern: "Sensitive · Stressed skin",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: "idhtft",
    code: "IDHTFT",
    name: "I Don't Have Time for This",
    concern: "Acne · Oily skin",
    img: "https://images.unsplash.com/photo-1652464945507-687e44a1017a?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: "itctc",
    code: "ITCTC",
    name: "I'm Too Cute to Crack",
    concern: "Dry · Nourishing",
    img: "https://images.unsplash.com/photo-1617030557822-c8c35f07c60b?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: "elgom",
    code: "ELGOM",
    name: "Experience Looks Good on Me",
    concern: "Mature skin",
    img: "https://images.unsplash.com/photo-1764694187721-a5035d777fdf?w=600&h=750&fit=crop&auto=format",
  },
];

export function LandingPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Hero — full-width split */}
      <HeroSection />
      {/* Trust Strip */}
      <TruthStrip />
      {/* Featured Lines Grid */}
      <FeatureLineGrid />
      {/* Editorial Feature — Full width split */}
      <EditorialFeature />
      {/* How It Works */}
      <HowItWorks />
      {/* ── Catherine / Consultation CTA ───────────────────────────────── */}

      <ConsultationCTA />

      {/* Testimonials */}
      <TestimonialBlock />
      {/* ── Contact Form ───────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <NewsletterSection />
    </div>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
const LS = {
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
} as React.CSSProperties;

interface CF {
  name: string;
  email: string;
  message: string;
}
const EMPTY: CF = { name: "", email: "", message: "" };
function HeroSection() {
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

function TruthStrip() {
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
function FeatureLineGrid() {
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
          {featuredLines.map((line) => (
            <Link
              key={line.id}
              to={`/subscriptions/${line.id}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-[#F7F6F4] aspect-[4/5] mb-4">
                <ImageWithFallback
                  src={line.img}
                  alt={line.name}
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
                <p className="text-xs text-muted-foreground">{line.concern}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function EditorialFeature() {
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
function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
            style={{ letterSpacing: "0.16em" }}
          >
            Simple Process
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Choose Your Line",
              body: "Select the line that matches your skin concern. Start with a Trial Kit — a paid entry product in smaller sizes.",
            },
            {
              step: "02",
              title: "Subscribe & Save",
              body: "Upgrade to an Essential or Retail Kit and subscribe for 15% off every delivery. Choose your frequency — every 4, 6, or 8 weeks.",
            },
            {
              step: "03",
              title: "Manage Anytime",
              body: "Pause, change frequency, or cancel at any time from your account. No penalties, ever.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <p
                className="text-5xl text-muted-foreground/20 mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                }}
              >
                {item.step}
              </p>
              <h3
                className="text-base mb-3"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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

// ── Newsletter Section ────────────────────────────────────────────────────────
function NewsletterSection() {
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

function ConsultationCTA() {
  return (
    <section className="bg-[#F7F6F4] border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Portrait */}
        <div className="relative overflow-hidden bg-[#EAE8E3] min-h-[420px] lg:min-h-0 lg:aspect-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1100&fit=crop&auto=format&q=80"
            alt="Catherine Healy, licensed esthetician and founder of Renelle Skin"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-6 left-6 bg-white px-4 py-3 shadow">
            <p
              className="text-xs text-muted-foreground mb-0.5"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Licensed Esthetician
            </p>
            <p
              className="text-sm font-medium"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Catherine Healy
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 lg:py-20">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-5"
            style={{ fontSize: "0.65rem", letterSpacing: "0.16em" }}
          >
            Skin Reset Consultation
          </p>
          <h2
            className="mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              lineHeight: 1.2,
            }}
          >
            Personalized Skincare Starts With Expert Guidance.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
            Every skin journey is unique. Book a one-on-one consultation with
            licensed esthetician Catherine Healy and receive professional
            recommendations tailored specifically to your skin goals.
          </p>

          {/* Bullet list */}
          <ul className="space-y-3 mb-10">
            {[
              "Personalized skincare assessment",
              "Product recommendations",
              "Acne & aging support",
              "Sensitive skin guidance",
              "Professional treatment advice",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-4 h-4 border border-foreground flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path
                      d="M2 5l2.5 2.5 3.5-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-foreground text-background hover:bg-foreground/85 h-12 px-8 text-xs uppercase tracking-widest"
              style={{ letterSpacing: "0.12em" }}
            >
              <Link to="/consultation">Book Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background h-12 px-8 text-xs uppercase tracking-widest"
              style={{ letterSpacing: "0.12em" }}
            >
              <Link to="/consultation#catherine">Meet Catherine</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialBlock() {
  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
            style={{ letterSpacing: "0.16em" }}
          >
            Customer Stories
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
            What Our Subscribers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Sophie L., Vancouver",
              quote:
                "The DSMO line completely transformed my reactive skin. My barrier has never felt this strong.",
              line: "DSMO — Essential Kit",
            },
            {
              name: "Mia T., Toronto",
              quote:
                "IDHTFT cleared my breakouts within weeks. The Trial Kit convinced me instantly.",
              line: "IDHTFT — Retail Kit",
            },
            {
              name: "Jade R., Calgary",
              quote:
                "ELGOM is genuinely worth every dollar. The peptide serum alone would cost this much elsewhere.",
              line: "ELGOM — Essential Kit",
            },
          ].map((t) => (
            <div key={t.name} className="border border-border p-8">
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-foreground"
                    style={{ fontSize: "0.7rem" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6 italic">
                "{t.quote}"
              </p>
              <div>
                <p className="text-xs font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
