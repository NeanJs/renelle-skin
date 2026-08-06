import { Link } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

export default function ConsultationCTA() {
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