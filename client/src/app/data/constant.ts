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

const HOW_IT_WORKS = [
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
];
const TESTIMONIALS = [
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
];

const LS = {
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
} as React.CSSProperties;

export {
  featuredLines,
  LS,
  TESTIMONIALS,
  HOW_IT_WORKS,
  HERO_IMG,
  EDITORIAL_IMG_1,
  EDITORIAL_IMG_2,
};
