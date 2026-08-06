import { HOW_IT_WORKS } from "@/app/data/constant";

export default function HowItWorks() {
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
          {HOW_IT_WORKS.map((item) => (
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