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
import TruthStrip from "../components/landing/TruthStrip";
import HeroSection from "../components/landing/Hero";
import FeatureLineGrid from "../components/landing/FeatureLineGrid";
import EditorialFeature from "../components/landing/EdiotrialFeature";
import HowItWorks from "../components/landing/HowItWorks";
import ConsultationCTA from "../components/landing/ConsultationCTA";
import TestimonialBlock from "../components/landing/TestimonialBlock";
import ContactSection from "../components/landing/ContactSection";
import NewsletterSection from "../components/landing/Newsletter";

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
