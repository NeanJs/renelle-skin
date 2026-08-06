import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Field, type FieldProps } from "./Field";

export function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: Omit<FieldProps, "type" | "rightSlot">) {
  const [show, setShow] = useState(false);
  return (
    <Field
      id={id}
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder ?? "••••••••"}
      autoComplete={autoComplete}
      required
      rightSlot={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-[#B8B4AE] hover:text-[#0A0A0A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 rounded"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}
