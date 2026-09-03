import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Marquee from "../components/Marquee";
import { useProducts } from "../hooks/useProducts";

const categories = ["All", "Tops", "Bottoms", "Outerwear"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const { products, loading, error } = useProducts(active);

  return (
    <>
      <Marquee text="THE FULL COLLECTION" variant="uv" />
      <section className="max-w-6xl mx-auto px-5 py-14">
        <h1 className="font-display text-2xl sm:text-3xl text-chrome mb-8">
          Shop
        </h1>

        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-full border-2 transition-colors ${
                active === c
                  ? "bg-volt text-ink border-ink"
                  : "border-paper/30 text-paper/70 hover:border-volt hover:text-volt"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {loading && (
            <p className="col-span-full font-mono text-sm text-paper/50">
              Loading products…
            </p>
          )}
          {error && (
            <p className="col-span-full font-mono text-sm text-flare">
              Couldn't load products — is the backend running?
            </p>
          )}
          {!loading &&
            !error &&
            products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}