import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { toast } from "sonner";
import {
  User,
  Package,
  Zap,
  TrendingUp,
  Shield,
  FileText,
  ChevronRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Video,
  Clock,
  CreditCard,
} from "lucide-react";

// ── Images ────────────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&h=900&fit=crop&auto=format";
const CATHERINE_IMG =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1200&fit=crop&auto=format";

// ── Fade-up animation helper ──────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Label style ───────────────────────────────────────────────────────────────
const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.16em",
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function ConsultationPage() {
  return (
    <div className="flex-1 bg-white max-w-4/6 py-8 flex flex-col ga0 items-center justify-center mx-auto consultation-page">
      <HeroSection />
      <TruthStrip />
      <CatherineSection />
      <WhyBookSection />
      <ProcessSection />
      <WhoSection />
      <FaqSection />
      <CalendlySection />
    </div>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] grid grid-cols-1 lg:grid-cols-2">
      {/* Left — dark editorial text */}
      <div className="bg-[#0A0A0A] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-24 lg:py-0 order-2 lg:order-1">
        <FadeUp delay={0.05}>
          <p
            className="text-xs uppercase tracking-widest text-white/40 mb-6"
            style={LABEL_STYLE}
          >
            Skin Reset Consultation
          </p>
        </FadeUp>
        <FadeUp delay={0.12}>
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.25rem, 3.5vw, 3.25rem)",
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            Start here. Not with a product.{" "}
            <em style={{ fontStyle: "italic", color: "#C4B89A" }}>
              With your skin.
            </em>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p
            className="text-sm text-white/55 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A virtual skin assessment with Catherine Healy, licensed esthetician
            and cosmetic formulator with 16 years of clinical experience. One
            session. One clear picture. A written protocol you can start
            tomorrow.
          </p>
        </FadeUp>
        <FadeUp delay={0.28}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-white text-[#0A0A0A] hover:bg-white/90 h-12 px-8 text-xs uppercase tracking-widest"
              style={{ letterSpacing: "0.12em" }}
            >
              <a href="#book">Book Consultation</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-[#0A0A0A] rounded-none border-white/20 hover:bg-white/8 h-12 px-8 text-xs uppercase tracking-widest"
              style={{ letterSpacing: "0.12em" }}
            >
              <a href="#catherine">Meet Catherine</a>
            </Button>
          </div>
        </FadeUp>

        {/* Session details strip */}
        <FadeUp delay={0.36}>
          <div className="flex items-center gap-8 mt-12 pt-10 border-t border-white/10">
            {[
              { label: "Format", value: "Virtual", sub: "Zoom or Meet" },
              {
                label: "Duration",
                value: "30 min",
                sub: "One focused session",
              },
              {
                label: "Investment",
                value: "$95 CAD",
                sub: "Includes written protocol",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <p
                  className="text-white/30 uppercase"
                  style={{ fontSize: "0.58rem", letterSpacing: "0.14em" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.value}
                </p>
                <p className="text-white/40" style={{ fontSize: "0.65rem" }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Right — questions people actually ask */}
      <div className="relative bg-[#F7F6F4] flex flex-col justify-center px-10 md:px-16 py-20 order-1 lg:order-2">
        <div className="max-w-sm mx-auto w-full">
          <FadeUp delay={0.1}>
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-8"
              style={LABEL_STYLE}
            >
              Questions we hear every day
            </p>
          </FadeUp>
          <div className="space-y-0">
            {[
              {
                q: '"Why am I breaking out on my back?"',
                a: "The answer was her shampoo. Not her skin.",
              },
              {
                q: '"How can I get even skin?"',
                a: "She had been using the wrong actives for her skin type.",
              },
              {
                q: '"I have really dry skin."',
                a: "Her Obagi routine was stripping her barrier daily.",
              },
              {
                q: '"I have really oily skin."',
                a: "Proactiv was drying her out. Her skin overproduced oil in response.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.08}>
                <div className="border-l border-border pl-5 py-4 hover:border-foreground transition-colors">
                  <p
                    className="text-sm text-foreground mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                    }}
                  >
                    {item.q}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.55}>
            <div className="mt-6 border-l-[3px] border-foreground pl-5 py-4 bg-[#F2F1EF]">
              <p className="text-sm text-foreground leading-relaxed">
                <strong>These are not skin problems.</strong> They are product
                problems. Without someone who knows what to look for, you keep
                treating the symptom instead of the cause.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── 2. TRUTH STRIP ────────────────────────────────────────────────────────────
function TruthStrip() {
  const items = [
    {
      num: "01",
      title: "Products are recommended before the skin is understood",
      body: "Every quiz, every algorithm recommends a product. Nobody asks what you are already using — and whether it is the problem. A skin assessment starts there.",
    },
    {
      num: "02",
      title: "Symptoms are treated without understanding the cause",
      body: "Oily skin gets drying products. Dry skin gets heavy creams. In almost every case, the treatment makes the underlying condition worse.",
    },
    {
      num: "03",
      title: "pH is never mentioned",
      body: "Healthy skin has a pH of 5.0–5.5. Traditional cleansers run at 9–10. Every wash with the wrong product disrupts the acid mantle. It is the most common cause of reactive skin — and almost nobody talks about it.",
    },
  ];

  return (
    <section className="w-full border-y border-border bg-[#F7F6F4] py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          <FadeUp>
            <div>
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
                style={LABEL_STYLE}
              >
                Why This Works
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 2vw, 2rem)",
                  lineHeight: 1.2,
                }}
              >
                What most skincare advice gets wrong
              </h2>
            </div>
          </FadeUp>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="border-t border-border pt-6">
                  <p
                    className="text-3xl text-muted-foreground/20 mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                    }}
                  >
                    {item.num}
                  </p>
                  <p
                    className="text-xs font-medium mb-3 leading-snug uppercase tracking-wide"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3. MEET CATHERINE ─────────────────────────────────────────────────────────
function CatherineSection() {
  const credentials = [
    "Licensed Esthetician — 16 years clinical practice",
    "Certified Cosmetic Formulator — Pacific Rim College",
    "Advanced Formulation — GLOW College",
    "Spa owner and operator 2015–2018",
    "Founder, Renelle Skin Care — Vancouver BC",
  ];

  return (
    <section id="catherine" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Portrait */}
          <FadeUp>
            <div className="relative overflow-hidden bg-[#F7F6F4] aspect-[3/4]">
              <ImageWithFallback
                src={CATHERINE_IMG}
                alt="Catherine Healy, licensed esthetician and founder of Renelle Skin"
                className="w-full h-full object-cover object-top"
              />
              {/* Credential float */}
              <div className="absolute bottom-6 left-6 bg-white px-5 py-4 shadow-lg">
                <p
                  className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5"
                  style={LABEL_STYLE}
                >
                  Catherine Healy
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Licensed Esthetician
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  16 years · Renelle Skin
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Bio */}
          <div>
            <FadeUp>
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
                style={LABEL_STYLE}
              >
                About Catherine
              </p>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                  lineHeight: 1.15,
                }}
              >
                16 years. Thousands of skin assessments.{" "}
                <em style={{ fontStyle: "italic" }}>One focus.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Catherine Healy is a licensed esthetician, certified cosmetic
                formulator, and the founder of Renelle Skin. She opened and ran
                her own spa from 2015 to 2018 and has spent 16 years in clinical
                practice assessing and treating skin that reacts, overproduces,
                dries out, and breaks down.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                She founded Renelle because she kept seeing the same pattern —
                clients spending money on products that were making things
                worse, with no one to tell them why. The Skin Reset Consultation
                is the conversation she has been having with clients for years.
                Now available to anyone, anywhere, virtually.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <div className="space-y-0">
                {credentials.map((cred, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-3 border-b border-border last:border-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                    <span className="text-xs text-foreground">{cred}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.24}>
              <div className="flex gap-3 mt-8">
                <Button
                  asChild
                  className="rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest h-11 px-6"
                  style={{ letterSpacing: "0.1em" }}
                >
                  <a href="#book">Book a Consultation</a>
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. WHY BOOK ───────────────────────────────────────────────────────────────
function WhyBookSection() {
  const benefits = [
    {
      icon: User,
      title: "Personalized Routine",
      body: "A routine built specifically around your skin type, barrier health, and lifestyle — not a generic category.",
    },
    {
      icon: Package,
      title: "Professional Product Matching",
      body: "Know exactly which products work for your skin and which ones are actively harming it. Stop spending on the wrong things.",
    },
    {
      icon: Zap,
      title: "Acne Support",
      body: "Understand the real cause of breakouts — whether hormonal, product-triggered, or environmental — and address it directly.",
    },
    {
      icon: TrendingUp,
      title: "Anti-Aging Strategy",
      body: "Clinically appropriate actives introduced at the right time and in the right order. No overwhelm. No damage.",
    },
    {
      icon: Shield,
      title: "Skin Barrier Repair",
      body: "Identify what has compromised your barrier, stop the damage, and follow a clear path back to baseline skin health.",
    },
    {
      icon: FileText,
      title: "Treatment Planning",
      body: "Leave with a written protocol — what to stop, what to start, and in what order. Specific enough to actually work.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F6F4] border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p
                className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
                style={LABEL_STYLE}
              >
                What You Get
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                }}
              >
                Why Book a Consultation
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed text-right hidden md:block">
              One session. One clear picture of your skin.
            </p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefits.map((item, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="bg-white h-full p-8 group hover:bg-[#F7F6F4] transition-colors">
                <div className="w-9 h-9 border border-border flex items-center justify-center mb-5 group-hover:border-foreground transition-colors">
                  <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 5. PROCESS ────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Choose a Consultation",
      body: "Select the session type that fits your needs. Virtual, 45 minutes, scheduled at your convenience.",
    },
    {
      num: "02",
      title: "Share Your Concerns",
      body: "Complete a short skin intake form before your session — your current routine, concerns, and what you have already tried.",
    },
    {
      num: "03",
      title: "Meet with Catherine",
      body: "A focused, no-sales conversation where Catherine assesses your skin type, barrier health, and what your concerns actually indicate.",
    },
    {
      num: "04",
      title: "Receive Your Routine",
      body: "A written protocol delivered after your session — what to stop, what to start, and in what order. No overwhelm.",
    },
    {
      num: "05",
      title: "Follow-Up Support",
      body: "Optional follow-up sessions available to check progress and adjust your protocol as your skin responds.",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeUp>
          <div className="mb-14">
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={LABEL_STYLE}
            >
              How It Works
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              }}
            >
              The Consultation Process
            </h2>
          </div>
        </FadeUp>

        {/* Desktop — horizontal */}
        <div className="hidden md:grid grid-cols-5 gap-px bg-border">
          {steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="bg-white h-full p-8 flex flex-col gap-4">
                <p
                  className="text-4xl text-muted-foreground/15 leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                  }}
                >
                  {step.num}
                </p>
                <p
                  className="text-xs font-medium uppercase tracking-wide leading-snug"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Mobile — vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="flex gap-6 py-7 border-b border-border last:border-0">
                <p
                  className="text-3xl text-muted-foreground/20 leading-none flex-shrink-0 w-10"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                  }}
                >
                  {step.num}
                </p>
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wide mb-2"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6. WHO IT'S FOR ───────────────────────────────────────────────────────────
function WhoSection() {
  const groups = [
    {
      label: "New to Skincare",
      desc: "Build the right foundation from the start — no trial and error.",
    },
    {
      label: "Acne-Prone Skin",
      desc: "Identify real triggers. Stop treating symptoms that are not the cause.",
    },
    {
      label: "Rosacea",
      desc: "Calm the barrier and understand what is inflaming your skin.",
    },
    {
      label: "Hyperpigmentation",
      desc: "Targeted actives in the right order for visible, lasting results.",
    },
    {
      label: "Dry Skin",
      desc: "Find out if your routine is the reason your skin feels tight.",
    },
    {
      label: "Aging Concerns",
      desc: "Clinically appropriate anti-aging — without damaging the barrier.",
    },
    {
      label: "Sensitive Skin",
      desc: "Understand why your skin reacts — and how to stop the cycle.",
    },
    {
      label: "Routine Optimization",
      desc: "Already using great products but not seeing results? This is for you.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F6F4] border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeUp>
          <div className="mb-14">
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={LABEL_STYLE}
            >
              Who It's For
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              }}
            >
              This consultation is for you if…
            </h2>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((group, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="bg-white border border-border p-6 hover:border-foreground/30 transition-colors group">
                <div className="flex items-start gap-3 mb-3">
                  <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {group.label}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  {group.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 7. FAQ ────────────────────────────────────────────────────────────────────
function FaqSection() {
  const faqs = [
    {
      q: "How long is the consultation?",
      a: "Each session is 45 minutes. This is enough time to thoroughly review your current routine, assess your skin concerns, and build a clear written protocol. Sessions are focused and purposeful — not rushed.",
    },
    {
      q: "Is it virtual or in-person?",
      a: "All consultations are virtual, conducted via Zoom or Google Meet. This means you can book from anywhere in Canada. You will receive a link upon confirmation.",
    },
    {
      q: "Do I need to purchase Renelle Skin products?",
      a: "No. The consultation is independent of any product purchase. Catherine will recommend what is best for your skin — including products you may already own, products to stop using, and options across different brands. If Renelle Skin products are appropriate for you, they may be suggested, but there is no obligation.",
    },
    {
      q: "Can I book follow-up sessions?",
      a: "Yes. Follow-up sessions are available and recommended after 6–8 weeks to assess your skin's response to the protocol and make adjustments. Your protocol is a living document, not a one-time prescription.",
    },
    {
      q: "How should I prepare for my consultation?",
      a: "You will receive a short intake form to complete before your session. Gather your current skincare products so you can show Catherine what you are using. Come with your questions — the more context you can give, the more precise your protocol will be.",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeUp>
          <div className="mb-12">
            <p
              className="text-xs uppercase tracking-widest text-muted-foreground mb-3"
              style={LABEL_STYLE}
            >
              Common Questions
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-left py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

// ── 8. CALENDLY BOOKING ───────────────────────────────────────────────────────
// Replace CALENDLY_URL with your actual Calendly event link
const CALENDLY_URL = "https://calendly.com/catherine-renelleskin";

function CalendlySection() {
  useEffect(() => {
    const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    return () => {
      // Clean up any Calendly badge/popup the script may have injected
      document.querySelector(".calendly-badge-widget")?.remove();
    };
  }, []);

  return (
    <section id="book" className="border-t border-border">
      {/* Section header */}
      <div className="bg-[#F7F6F4] py-14 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Left — session details */}
            <div className="lg:col-span-2">
              <FadeUp>
                <p
                  className="text-xs uppercase tracking-widest text-muted-foreground mb-4"
                  style={LABEL_STYLE}
                >
                  Book Your Session
                </p>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                    lineHeight: 1.2,
                  }}
                >
                  Your skin has been trying to tell you something.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Choose a time that works for you. Sessions are 45 minutes,
                  virtual, and include a written protocol delivered after your
                  call.
                </p>
              </FadeUp>

              {/* Session specs */}
              <FadeUp delay={0.1}>
                <div className="space-y-0 mb-8">
                  {[
                    {
                      icon: Video,
                      label: "Format",
                      value: "Virtual — Zoom or Google Meet",
                    },
                    {
                      icon: Clock,
                      label: "Duration",
                      value: "30 minutes per session",
                    },
                    {
                      icon: CreditCard,
                      label: "Investment",
                      value: "$95 CAD — includes written protocol",
                    },
                    {
                      icon: Check,
                      label: "Follow-up",
                      value: "Optional 6–8 week check-in available",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 py-4 border-b border-border last:border-0"
                    >
                      <div className="w-8 h-8 border border-border bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p
                          className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5"
                          style={{
                            fontSize: "0.62rem",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {item.label}
                        </p>
                        <p className="text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Contact fallback */}
              <FadeUp delay={0.18}>
                <div className="bg-white border border-border p-5">
                  <p className="text-xs text-muted-foreground mb-3">
                    Prefer to reach out first?
                  </p>
                  <div className="space-y-2.5">
                    {[
                      {
                        icon: Mail,
                        label: "catherine@renelleskin.ca",
                        href: "mailto:catherine@renelleskin.ca",
                      },
                      {
                        icon: Phone,
                        label: "+1 (604) 000-0000",
                        href: "tel:+16040000000",
                      },
                      {
                        icon: MapPin,
                        label: "Vancouver, BC, Canada",
                        href: "#",
                      },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 group"
                      >
                        <item.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right — Calendly inline widget */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                <div className="overflow-hidden">
                  {/* Calendly inline embed */}
                  <div
                    className="calendly-inline-widget"
                    data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&hide_event_type_details=0&background_color=ffffff&text_color=0a0a0a&primary_color=0a0a0a`}
                    style={{ minWidth: "320px", height: "700px" }}
                  />
                </div>
                <p
                  className="text-xs text-muted-foreground mt-3 text-center"
                  style={{ fontSize: "0.65rem" }}
                >
                  Scheduling powered by Calendly · All times shown in your local
                  timezone
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
