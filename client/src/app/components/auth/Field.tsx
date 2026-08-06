import { AnimatePresence, motion } from "motion/react";

export interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
  required?: boolean;
}

export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  rightSlot,
  required,
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-[#1C1C1C]"
        style={{ letterSpacing: "0.02em" }}
      >
        {label}
        {required && <span className="text-[#C4836A] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full h-12 px-4 text-sm bg-[#FAFAF9] border rounded-xl outline-none transition-all placeholder:text-[#B8B4AE] ${
            error
              ? "border-[#C4836A] focus:border-[#C4836A] focus:ring-2 focus:ring-[#C4836A]/15"
              : "border-[#E5E2DC] focus:border-[#0A0A0A] focus:ring-2 focus:ring-[#0A0A0A]/8"
          } ${rightSlot ? "pr-11" : ""}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-[#C4836A]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
