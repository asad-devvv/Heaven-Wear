export default function Marquee({ text = "Heaven Wear", variant = "flare" }) {
  const bg =
    variant === "flare"
      ? "bg-flare text-ink"
      : variant === "volt"
      ? "bg-volt text-ink"
      : "bg-uv text-paper";

  const items = new Array(10).fill(text);

  return (
    <div className={`overflow-hidden border-y-2 border-ink ${bg} py-2`}>
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display text-sm tracking-wider whitespace-nowrap px-4 flex items-center gap-4"
          >
            {t} <span aria-hidden="true">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
