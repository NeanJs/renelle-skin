export const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ? ""
    : "Please enter a valid email address.";

export const validatePassword = (v: string) =>
  v.length >= 8 ? "" : "Password must be at least 8 characters.";

export const validateRequired = (v: string, label: string) =>
  v.trim() ? "" : `${label} is required.`;
