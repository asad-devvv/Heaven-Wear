import { useState, useRef } from "react";
import Marquee from "../components/Marquee";

const SLICES = [
  { label: "5% OFF", code: "WAYF5", color: "#ff3ea5" },
  { label: "TRY AGAIN", code: null, color: "#14131f" },
  { label: "15% OFF", code: "WAYF15", color: "#cfff3d" },
  { label: "FREE SHIP", code: "WAYFSHIP", color: "#8b3cff" },
  { label: "TRY AGAIN", code: null, color: "#14131f" },
  { label: "10% OFF", code: "WAYF10", color: "#ff3ea5" },
];

const SLICE_ANGLE = 360 / SLICES.length;

export default function Game() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winnerIndex = Math.floor(Math.random() * SLICES.length);
    // land the winner under the top pointer, plus extra full spins for effect
    const targetAngle =
      360 * 5 + (360 - winnerIndex * SLICE_ANGLE - SLICE_ANGLE / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(SLICES[winnerIndex]);
    }, 4000);
  }

  return (
    <>
      <Marquee text="SPIN TO WIN · ONE SPIN PER VISIT" variant="uv" />
      <section className="max-w-lg mx-auto px-5 py-16 text-center">
        <h1 className="font-display text-xl sm:text-2xl text-chrome mb-3">
          Spin the Wheel
        </h1>
        <p className="font-body text-paper/70 mb-10">
          One spin, one shot at a discount code for your cart.
        </p>

        <div className="relative w-72 h-72 mx-auto mb-10">
          {/* pointer */}
          <div
            className="absolute left-1/2 -top-1 -translate-x-1/2 z-10 w-0 h-0"
            style={{
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "18px solid #cfff3d",
            }}
            aria-hidden="true"
          />
          <div
            ref={wheelRef}
            className="w-72 h-72 rounded-full border-4 border-ink-soft relative overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4s cubic-bezier(0.15, 0.85, 0.25, 1)"
                : "none",
              background: `conic-gradient(${SLICES.map(
                (s, i) =>
                  `${s.color} ${i * SLICE_ANGLE}deg ${(i + 1) * SLICE_ANGLE}deg`
              ).join(", ")})`,
            }}
          >
            {SLICES.map((s, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 font-mono text-[10px] font-bold uppercase"
                style={{
                  transform: `rotate(${
                    i * SLICE_ANGLE + SLICE_ANGLE / 2
                  }deg) translate(0, -95px) rotate(90deg)`,
                  color: s.color === "#14131f" ? "#f3f1ff" : "#0a0a12",
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="font-mono text-sm uppercase tracking-wide bg-flare text-ink px-8 py-3.5 rounded-full border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          {spinning ? "Spinning…" : "Spin"}
        </button>

        {result && (
          <div className="mt-8 border-2 border-ink-soft rounded-2xl p-6">
            {result.code ? (
              <>
                <p className="font-mono text-xs uppercase text-paper/50 mb-2">
                  You won
                </p>
                <p className="font-display text-lg text-chrome mb-3">
                  {result.label}
                </p>
                <p className="font-mono text-sm bg-ink-soft rounded-full px-4 py-2 inline-block text-volt">
                  {result.code}
                </p>
              </>
            ) : (
              <p className="font-body text-paper/60">
                No luck this time — come back next visit.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
