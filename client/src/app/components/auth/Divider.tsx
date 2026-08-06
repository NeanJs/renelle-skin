export function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[#E5E2DC]" />
      <span
        className="text-xs text-[#B8B4AE] uppercase tracking-widest"
        style={{ letterSpacing: "0.12em", fontSize: "0.62rem" }}
      >
        or
      </span>
      <div className="flex-1 h-px bg-[#E5E2DC]" />
    </div>
  );
}
