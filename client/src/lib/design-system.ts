/**
 * Design System Utilities
 * Centralizes typography, spacing, and common component patterns
 * for consistent, maintainable styling across Renelle Skin
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Premium section labels
 * Used for "Our Lines", "Newsletter", etc.
 */
export const labelStyles = {
  container: "text-xs uppercase tracking-widest text-muted-foreground",
  spacing: "mb-3 md:mb-4",
  letterSpacing: "0.14em",
} as const;

/**
 * Small caps labels
 * Used for tier badges, small metadata
 */
export const capStyles = {
  container: "text-xs uppercase tracking-widest text-muted-foreground",
  letterSpacing: "0.1em",
  fontSize: "0.65rem",
} as const;

/**
 * Micro labels
 * Ultra-small, highly tracked text
 */
export const microStyles = {
  container: "text-xs uppercase tracking-widest text-muted-foreground",
  letterSpacing: "0.08em",
  fontSize: "0.6rem",
} as const;

/**
 * Body text utilities
 */
export const textStyles = {
  body: "text-sm text-muted-foreground leading-relaxed",
  caption: "text-xs text-muted-foreground",
  small: "text-sm text-muted-foreground",
} as const;

/**
 * Button label styling - standard tracking
 */
export const buttonLabelStyles = {
  container: "uppercase tracking-widest text-xs",
  letterSpacing: "0.1em",
} as const;

/**
 * Form label styling
 */
export const formLabelStyles = {
  container: "text-xs uppercase tracking-wider text-muted-foreground",
  letterSpacing: "0.08em",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  section: {
    mobile: "py-12 md:py-16",
    large: "py-16 md:py-20",
    xl: "py-20 md:py-24",
  },
  header: {
    mobile: "py-8 md:py-12",
    large: "py-12 md:py-16",
  },
  padding: {
    tight: "px-6",
    standard: "px-6 md:px-8",
    loose: "px-6 md:px-16",
  },
  container: "container mx-auto",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Section header patterns
 */
export const sectionHeader = {
  muted: "text-xs uppercase tracking-widest text-muted-foreground mb-3",
  title: "text-2xl md:text-3xl font-serif font-bold tracking-tight",
  subtitle: "text-sm text-muted-foreground mt-4 leading-relaxed",
} as const;

/**
 * Card styling
 */
export const card = {
  base: "bg-white border border-border p-6 md:p-8",
  hover: "transition-all hover:shadow-md",
  recommended: "relative",
  recommendedBar: "absolute top-0 left-0 right-0 h-0.5 bg-foreground",
} as const;

/**
 * Input/Form field styling
 */
export const formField = {
  container: "space-y-2",
  input:
    "h-11 rounded-none border-border focus:border-foreground transition-colors",
  label: "text-xs uppercase tracking-wider text-muted-foreground",
} as const;

/**
 * Button styling
 */
export const button = {
  primary:
    "h-11 rounded-none text-xs uppercase tracking-widest bg-foreground text-background hover:bg-foreground/85 transition-all",
  secondary:
    "h-11 rounded-none text-xs uppercase tracking-widest border-foreground text-foreground hover:bg-foreground/5 transition-all",
  outline:
    "rounded-none border-foreground text-foreground hover:bg-foreground/5 text-xs uppercase tracking-widest transition-all",
} as const;

/**
 * Grid utilities
 */
export const grid = {
  product: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
  comparison: "grid grid-cols-1 md:grid-cols-2 gap-6",
  feature: "grid grid-cols-1 lg:grid-cols-2 gap-8",
} as const;

/**
 * Background colors
 */
export const backgrounds = {
  white: "bg-white",
  light: "bg-[var(--secondary)]",
  dark: "bg-foreground text-background",
  disabled: "bg-muted text-muted-foreground",
} as const;

/**
 * Border utilities
 */
export const borders = {
  line: "border-b border-border",
  box: "border border-border",
  subtle: "border border-border/50",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSIVE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

export const responsive = {
  hideOnMobile: "hidden md:block",
  showOnMobile: "md:hidden",
  flexCol: "flex flex-col md:flex-row",
  gridAuto: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TRANSITION UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

export const transitions = {
  fast: "transition-all duration-150",
  base: "transition-all duration-200",
  smooth: "transition-all duration-300",
  slow: "transition-all duration-500",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CSS PROPERTIES FOR INLINE STYLES (when needed)
// ─────────────────────────────────────────────────────────────────────────────

export const inlineStyles = {
  /**
   * Premium serif font for headings
   */
  serifFont: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
  } as React.CSSProperties,

  /**
   * Font family for body text
   */
  sansFont: {
    fontFamily: "'DM Sans', sans-serif",
  } as React.CSSProperties,

  /**
   * Responsive heading size
   */
  responsiveTitle: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
  } as React.CSSProperties,

  responsiveH2: {
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
  } as React.CSSProperties,

  responsiveH3: {
    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
  } as React.CSSProperties,
} as const;
