export interface KitDetails {
  price: number;
  subscribePrice?: number;
  savePct?: number;
  products: { name: string; size: string }[];
}

export interface ProductLine {
  id: string;
  code: string;
  name: string;
  emoji: string;
  skinConcern: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  kits: {
    trial: KitDetails;
    essential: KitDetails;
    retail: KitDetails;
  };
}

export const productLines: ProductLine[] = [
  {
    id: "dsmo",
    code: "DSMO",
    name: "Don't Stress Me Out",
    emoji: "💆",
    skinConcern: "Sensitive · Stressed skin",
    tagline: "Calm, soothe, and restore balance to reactive skin.",
    primaryColor: "#8FAF8A",
    secondaryColor: "#C4B8D9",
    kits: {
      trial: {
        price: 29,
        products: [
          { name: "Reset Serum", size: "10ml" },
          { name: "Reset Toner", size: "30ml" },
          { name: "Light Moisturiser", size: "10ml" },
          { name: "Cream Cleanser", size: "30ml" },
        ],
      },
      essential: {
        price: 79,
        subscribePrice: 67,
        savePct: 15,
        products: [
          { name: "Cream Cleanser", size: "100ml" },
          { name: "Calming Toner", size: "100ml" },
          { name: "Reset Serum", size: "30ml" },
          { name: "Barrier Repair Moisturiser", size: "50ml" },
          { name: "SPF 30 Mineral Sunscreen", size: "50ml" },
        ],
      },
      retail: {
        price: 149,
        subscribePrice: 127,
        savePct: 15,
        products: [
          { name: "Cream Cleanser", size: "150ml" },
          { name: "Calming Toner", size: "150ml" },
          { name: "Reset Serum", size: "30ml" },
          { name: "Barrier Repair Moisturiser", size: "75ml" },
          { name: "SPF 30 Mineral Sunscreen", size: "50ml" },
          { name: "Soothing Eye Cream", size: "15ml" },
          { name: "Overnight Recovery Mask", size: "50ml" },
        ],
      },
    },
  },
  {
    id: "idhtft",
    code: "IDHTFT",
    name: "I Don't Have Time for This",
    emoji: "⚡",
    skinConcern: "Acne · Oily skin",
    tagline: "Fast-acting formulas for skin that needs results now.",
    primaryColor: "#E8935A",
    secondaryColor: "#E8D44D",
    kits: {
      trial: {
        price: 29,
        products: [
          { name: "Clarifying Cleanser", size: "30ml" },
          { name: "BHA Toner", size: "30ml" },
          { name: "Spot Treatment", size: "5ml" },
          { name: "Oil-Free Moisturiser", size: "10ml" },
        ],
      },
      essential: {
        price: 79,
        subscribePrice: 67,
        savePct: 15,
        products: [
          { name: "Clarifying Cleanser", size: "100ml" },
          { name: "BHA Exfoliating Toner", size: "100ml" },
          { name: "Niacinamide Serum", size: "30ml" },
          { name: "Oil-Control Moisturiser", size: "50ml" },
          { name: "SPF 50 Matte Sunscreen", size: "50ml" },
        ],
      },
      retail: {
        price: 149,
        subscribePrice: 127,
        savePct: 15,
        products: [
          { name: "Clarifying Gel Cleanser", size: "150ml" },
          { name: "BHA Exfoliating Toner", size: "150ml" },
          { name: "Niacinamide Serum", size: "30ml" },
          { name: "Targeted Spot Treatment", size: "15ml" },
          { name: "Oil-Control Moisturiser", size: "75ml" },
          { name: "SPF 50 Matte Sunscreen", size: "50ml" },
          { name: "Clay Purifying Mask", size: "50ml" },
        ],
      },
    },
  },
  {
    id: "itctc",
    code: "ITCTC",
    name: "I'm Too Cute to Crack",
    emoji: "🌸",
    skinConcern: "Dry · Nourishing",
    tagline: "Deep hydration for skin that deserves better.",
    primaryColor: "#E8B4A0",
    secondaryColor: "#C4836A",
    kits: {
      trial: {
        price: 29,
        products: [
          { name: "Milk Cleanser", size: "30ml" },
          { name: "Hydrating Essence", size: "30ml" },
          { name: "Rich Moisturiser", size: "10ml" },
          { name: "Barrier Balm", size: "10ml" },
        ],
      },
      essential: {
        price: 79,
        subscribePrice: 67,
        savePct: 15,
        products: [
          { name: "Milk Cleanser", size: "100ml" },
          { name: "Hydrating Essence", size: "100ml" },
          { name: "HA Plumping Serum", size: "30ml" },
          { name: "Rich Moisturiser", size: "50ml" },
          { name: "SPF 30 Hydrating Sunscreen", size: "50ml" },
        ],
      },
      retail: {
        price: 149,
        subscribePrice: 127,
        savePct: 15,
        products: [
          { name: "Milk Cleanser", size: "150ml" },
          { name: "Hydrating Essence", size: "150ml" },
          { name: "HA Plumping Serum", size: "30ml" },
          { name: "Rich Moisturiser", size: "75ml" },
          { name: "SPF 30 Hydrating Sunscreen", size: "50ml" },
          { name: "Nourishing Eye Cream", size: "15ml" },
          { name: "Overnight Barrier Mask", size: "50ml" },
        ],
      },
    },
  },
  {
    id: "elgom",
    code: "ELGOM",
    name: "Experience Looks Good on Me",
    emoji: "✨",
    skinConcern: "Mature skin",
    tagline: "Clinical-grade formulas for skin that keeps getting better.",
    primaryColor: "#C4A882",
    secondaryColor: "#F0E8D8",
    kits: {
      trial: {
        price: 35,
        products: [
          { name: "Peptide Cleanser", size: "30ml" },
          { name: "Firming Serum", size: "10ml" },
          { name: "Lifting Moisturiser", size: "10ml" },
          { name: "Retinol Treatment", size: "5ml" },
        ],
      },
      essential: {
        price: 99,
        subscribePrice: 84,
        savePct: 15,
        products: [
          { name: "Peptide Cleanser", size: "100ml" },
          { name: "Resurfacing Toner", size: "100ml" },
          { name: "Firming Peptide Serum", size: "30ml" },
          { name: "Lifting Moisturiser", size: "50ml" },
          { name: "SPF 50+ Age Defence", size: "50ml" },
        ],
      },
      retail: {
        price: 179,
        subscribePrice: 152,
        savePct: 15,
        products: [
          { name: "Peptide Cleanser", size: "150ml" },
          { name: "Resurfacing Toner", size: "150ml" },
          { name: "Firming Peptide Serum", size: "30ml" },
          { name: "Retinol Renewal Treatment", size: "30ml" },
          { name: "Lifting Moisturiser", size: "75ml" },
          { name: "SPF 50+ Age Defence", size: "50ml" },
          { name: "Contour Eye Cream", size: "15ml" },
        ],
      },
    },
  },
  {
    id: "ldit",
    code: "LDIT",
    name: "Lips Deserve It Too",
    emoji: "💋",
    skinConcern: "Lip care · Nourishing",
    tagline: "Targeted treatments for lips that stay soft year-round.",
    primaryColor: "#C4B89A",
    secondaryColor: "#E8E2D9",
    kits: {
      trial: {
        price: 19,
        products: [
          { name: "Exfoliating Lip Scrub", size: "15ml" },
          { name: "Overnight Lip Mask", size: "10ml" },
        ],
      },
      essential: {
        price: 45,
        subscribePrice: 38,
        savePct: 16,
        products: [
          { name: "Exfoliating Lip Scrub", size: "30ml" },
          { name: "Hyaluronic Lip Serum", size: "10ml" },
          { name: "Overnight Lip Mask", size: "15ml" },
          { name: "SPF 30 Lip Balm", size: "4g" },
        ],
      },
      retail: {
        price: 79,
        subscribePrice: 67,
        savePct: 15,
        products: [
          { name: "Exfoliating Lip Scrub", size: "30ml" },
          { name: "Hyaluronic Lip Serum", size: "15ml" },
          { name: "Plumping Lip Treatment", size: "10ml" },
          { name: "Overnight Lip Mask", size: "30ml" },
          { name: "SPF 30 Tinted Lip Balm", size: "4g" },
          { name: "Nourishing Lip Oil", size: "8ml" },
        ],
      },
    },
  },
  {
    id: "universal",
    code: "Universal",
    name: "All Lines Add-On",
    emoji: "🌿",
    skinConcern: "All skin types",
    tagline: "Essentials that work alongside every Renelle Skin line.",
    primaryColor: "#4A6741",
    secondaryColor: "#8FAF8A",
    kits: {
      trial: {
        price: 25,
        products: [
          { name: "Multi-Use Face Oil", size: "10ml" },
          { name: "Hydrating Mist", size: "30ml" },
        ],
      },
      essential: {
        price: 59,
        subscribePrice: 50,
        savePct: 15,
        products: [
          { name: "Multi-Use Face Oil", size: "30ml" },
          { name: "Hydrating Mist", size: "100ml" },
          { name: "Vitamin C Brightening Serum", size: "30ml" },
          { name: "Universal SPF 50", size: "50ml" },
        ],
      },
      retail: {
        price: 109,
        subscribePrice: 93,
        savePct: 15,
        products: [
          { name: "Multi-Use Face Oil", size: "50ml" },
          { name: "Hydrating Mist", size: "150ml" },
          { name: "Vitamin C Brightening Serum", size: "30ml" },
          { name: "Universal SPF 50", size: "50ml" },
          { name: "Restorative Night Oil", size: "30ml" },
          { name: "Collagen Boosting Ampoules", size: "7 x 2ml" },
        ],
      },
    },
  },
];
