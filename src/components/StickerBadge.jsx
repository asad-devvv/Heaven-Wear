const palettes = {
  flare: "bg-flare text-ink",
  volt: "bg-volt text-ink",
  uv: "bg-uv text-paper",
};

export default function StickerBadge({ label, tone = "flare", className = "" }) {
  return (
    <span
      className={`inline-block font-mono text-xs font-bold uppercase px-2.5 py-1 rounded-full border-2 border-ink -rotate-6 shadow-[2px_2px_0_0_#0a0a12] ${palettes[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
