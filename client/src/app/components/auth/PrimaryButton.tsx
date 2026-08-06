import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function PrimaryButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className="w-full h-12 rounded-xl bg-[#0A0A0A] text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 mt-2 hover:bg-[#1C1C1C] active:bg-[#333] disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/30 focus-visible:ring-offset-2"
      style={{ letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}
