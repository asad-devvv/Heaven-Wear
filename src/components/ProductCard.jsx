import { Link } from "react-router-dom";
import StickerBadge from "./StickerBadge";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl overflow-hidden border-2 border-ink-soft bg-ink-soft/40 transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.5deg]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <StickerBadge
          label={product.tag}
          tone={product.tone}
          className="absolute top-3 left-3"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-[13px] leading-tight">{product.name}</h3>
          <p className="font-mono text-xs text-paper/50 mt-1">{product.category}</p>
        </div>
        <span className="font-mono text-sm text-volt">${product.price}</span>
      </div>
    </Link>
  );
}
