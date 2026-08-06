export function SocialButton({
  provider,
  icon,
  onClick,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full h-11 border border-[#E5E2DC] rounded-xl bg-white text-sm font-medium text-[#1C1C1C] hover:bg-[#F8F7F5] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]/20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {icon}
      Continue with {provider}
    </button>
  );
}
