import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/game", label: "Play" },
];

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur border-b-2 border-ink-soft">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-lg tracking-wide text-chrome">
          Heaven Wear
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-sm uppercase tracking-wide transition-colors ${
                  isActive ? "text-volt" : "text-paper/80 hover:text-flare"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/cart"
          className="relative font-mono text-sm uppercase tracking-wide border-2 border-paper/30 rounded-full px-4 py-1.5 hover:border-volt hover:text-volt transition-colors"
        >
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-flare text-ink text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
