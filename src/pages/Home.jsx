import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #8b3cff33, transparent 40%), radial-gradient(circle at 80% 30%, #ff3ea533, transparent 40%), radial-gradient(circle at 50% 80%, #cfff3d22, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flare mb-4">
            Y2K Revival · Limited Drops
          </p>
          <h1 className="font-display text-chrome text-[13vw] sm:text-7xl leading-[1.05] mb-6">
            Heaven
            <br />
            Wear
          </h1>
          <p className="font-body text-paper/70 max-w-md mx-auto mb-8">
            Low-rise cargos, chrome graphics, and holographic fits built for
            the front row and the group chat.
          </p>
          <Link
            to="/shop"
            className="inline-block font-mono text-sm uppercase tracking-wide bg-flare text-ink px-7 py-3 rounded-full border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#0a0a12] transition-all"
          >
            Shop the Drop
          </Link>
        </div>
      </section>

      <Marquee text="NEW DROP · Y2K REVIVAL · LIMITED RUN" variant="flare" />

      {/* FEATURED */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-xl sm:text-2xl">Fresh Drops</h2>
          <Link
            to="/shop"
            className="font-mono text-xs uppercase tracking-wide text-paper/60 hover:text-volt"
          >
            View all →
          </Link>
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
            featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <Marquee text="HAEVEN WEAR · ASK OUR AI STYLIST" variant="volt" />

      {/* GAME TEASER */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="rounded-3xl border-2 border-ink-soft bg-ink-soft/40 p-10 text-center">
          <h2 className="font-display text-lg sm:text-xl mb-3 text-chrome">
            Spin for a Discount
          </h2>
          <p className="font-body text-paper/70 max-w-sm mx-auto mb-6">
            Play our mini arcade game and unlock a code before you check out.
          </p>
          <Link
            to="/game"
            className="inline-block font-mono text-sm uppercase tracking-wide bg-uv text-paper px-7 py-3 rounded-full border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] hover:-translate-y-0.5 transition-all"
          >
            Play Now
          </Link>
        </div>
      </section>
    </>
  );
}