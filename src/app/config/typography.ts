// Centralized typography and spacing constants
export const TYPOGRAPHY = {
  h1: { fontSize: "clamp(2rem, 4vw, 3rem)" },
  h2: { fontSize: "clamp(1.5rem, 2.5vw, 2rem)" },
  h3: { fontSize: "clamp(1.25rem, 2vw, 1.75rem)" },
  pageTitle: { fontSize: "clamp(1.75rem, 3vw, 2.5rem)" },
  sectionTitle: { fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" },
  subtitle: { fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)" },
};

export const LETTER_SPACING = {
  narrow: "0.05em",
  normal: "0.08em",
  wide: "0.1em",
  wider: "0.12em",
  widest: "0.14em",
};

export const FONT_SIZE = {
  xs: "0.65rem",
  sm: "0.72rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
};

// Common button styles
export const BUTTON_STYLES = {
  primary: "rounded-none bg-foreground text-background hover:bg-foreground/85 text-xs uppercase tracking-widest",
  secondary: "rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-xs uppercase tracking-widest",
};
