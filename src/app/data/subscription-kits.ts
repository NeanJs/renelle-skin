export interface SubscriptionKit {
  id: string;
  name: string;
  tier: "Starter" | "Essential" | "Advanced" | "Premium";
  price: number;
  description: string;
  features: string[];
  products: {
    name: string;
    size: string;
  }[];
  recommended?: boolean;
}

export const subscriptionKits: SubscriptionKit[] = [
  {
    id: "starter",
    name: "Starter Kit",
    tier: "Starter",
    price: 49,
    description: "Perfect for those new to skincare routines",
    features: [
      "Monthly delivery",
      "3 essential products",
      "Free shipping",
      "Cancel anytime",
    ],
    products: [
      { name: "Gentle Cleanser", size: "100ml" },
      { name: "Daily Moisturizer", size: "50ml" },
      { name: "SPF 30 Sunscreen", size: "50ml" },
    ],
  },
  {
    id: "essential",
    name: "Essential Kit",
    tier: "Essential",
    price: 79,
    description: "Complete daily skincare routine essentials",
    features: [
      "Monthly delivery",
      "5 curated products",
      "Free shipping",
      "Priority support",
      "Cancel anytime",
    ],
    products: [
      { name: "Hydrating Cleanser", size: "150ml" },
      { name: "Toner", size: "100ml" },
      { name: "Vitamin C Serum", size: "30ml" },
      { name: "Day Cream SPF 50", size: "50ml" },
      { name: "Night Repair Cream", size: "50ml" },
    ],
    recommended: true,
  },
  {
    id: "advanced",
    name: "Advanced Kit",
    tier: "Advanced",
    price: 129,
    description: "Advanced formulations for visible results",
    features: [
      "Monthly delivery",
      "7 premium products",
      "Free express shipping",
      "Priority support",
      "Skincare consultation",
      "Cancel anytime",
    ],
    products: [
      { name: "Deep Cleansing Gel", size: "150ml" },
      { name: "Exfoliating Toner", size: "100ml" },
      { name: "Hyaluronic Acid Serum", size: "30ml" },
      { name: "Retinol Serum", size: "30ml" },
      { name: "Anti-Aging Eye Cream", size: "15ml" },
      { name: "Day Moisturizer SPF 50", size: "50ml" },
      { name: "Intensive Night Cream", size: "50ml" },
    ],
  },
  {
    id: "premium",
    name: "Premium Kit",
    tier: "Premium",
    price: 199,
    description: "Ultimate luxury skincare experience",
    features: [
      "Monthly delivery",
      "10 luxury products",
      "Free express shipping",
      "24/7 VIP support",
      "Personal skincare consultant",
      "Exclusive member events",
      "Cancel anytime",
    ],
    products: [
      { name: "Luxury Cleansing Balm", size: "150ml" },
      { name: "Purifying Foam Cleanser", size: "150ml" },
      { name: "pH Balancing Toner", size: "150ml" },
      { name: "Vitamin C + E Serum", size: "30ml" },
      { name: "Hyaluronic Acid Complex", size: "30ml" },
      { name: "Advanced Retinol Treatment", size: "30ml" },
      { name: "Peptide Eye Cream", size: "15ml" },
      { name: "SPF 50+ Face Shield", size: "50ml" },
      { name: "Regenerative Night Cream", size: "50ml" },
      { name: "Weekly Treatment Mask", size: "75ml" },
    ],
  },
];
