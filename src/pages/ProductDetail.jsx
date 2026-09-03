import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config";
import { useCart } from "../context/CartContext";
import StickerBadge from "../components/StickerBadge";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="font-mono text-paper/50">Loading…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="font-mono text-paper/60 mb-4">Product not found.</p>
        <Link to="/shop" className="text-volt font-mono text-sm">
          ← Back to shop
        </Link>
      </section>
    );
  }

  function handleAdd() {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="max-w-5xl mx-auto px-5 py-14 grid sm:grid-cols-2 gap-10">
      <div className="relative rounded-2xl overflow-hidden border-2 border-ink-soft aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <StickerBadge
          label={product.tag}
          tone={product.tone}
          className="absolute top-4 left-4"
        />
      </div>

      <div>
        <h1 className="font-display text-xl sm:text-2xl text-chrome mb-2">
          {product.name}
        </h1>
        <p className="font-mono text-volt text-lg mb-6">${product.price}</p>
        <p className="font-body text-paper/70 mb-8">{product.description}</p>

        <p className="font-mono text-xs uppercase tracking-wide text-paper/50 mb-3">
          Size
        </p>
        <div className="flex gap-2 mb-8 flex-wrap">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-11 h-11 rounded-full border-2 font-mono text-sm transition-colors ${
                size === s
                  ? "bg-flare text-ink border-ink"
                  : "border-paper/30 hover:border-flare hover:text-flare"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          disabled={!size}
          className="w-full sm:w-auto font-mono text-sm uppercase tracking-wide bg-volt text-ink px-8 py-3.5 rounded-full border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:hover:translate-y-0"
        >
          {added ? "Added ✓" : size ? "Add to Cart" : "Select a size"}
        </button>
      </div>
    </section>
  );
}