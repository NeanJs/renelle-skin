import { TESTIMONIALS } from "@/app/data/constant";

export default function TestimonialBlock() {
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
          {TESTIMONIALS.map((t) => (
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
