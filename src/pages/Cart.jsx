import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config";

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, total } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);
  const [orderResult, setOrderResult] = useState(null);

  function handleCheckout() {
    setPlacing(true);
    setError(null);

    fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order failed");
        return res.json();
      })
      .then((data) => {
        setOrderResult(data); // { orderId, total }
        clearCart();
      })
      .catch(() => {
        setError("Something went wrong placing your order. Try again.");
      })
      .finally(() => {
        setPlacing(false);
      });
  }

  // Show this after a successful checkout, regardless of what's in the cart now
  if (orderResult) {
    return (
      <section className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-xl text-chrome mb-4">Order placed ✓</h1>
        <p className="font-body text-paper/70 mb-2">
          Order #{orderResult.orderId} — ${orderResult.total.toFixed(2)}
        </p>
        <p className="font-body text-paper/50 mb-8">
          Thanks for shopping Heaven Wear.
        </p>
        <Link
          to="/shop"
          className="inline-block font-mono text-sm uppercase tracking-wide bg-flare text-ink px-7 py-3 rounded-full border-2 border-ink"
        >
          Keep Shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-xl text-chrome mb-4">Your cart is empty</h1>
        <p className="font-body text-paper/60 mb-8">
          Nothing here yet — go find something to wear.
        </p>
        <Link
          to="/shop"
          className="inline-block font-mono text-sm uppercase tracking-wide bg-flare text-ink px-7 py-3 rounded-full border-2 border-ink"
        >
          Shop the Drop
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-5 py-14">
      <h1 className="font-display text-xl sm:text-2xl text-chrome mb-8">Your Cart</h1>

      <ul className="flex flex-col gap-5 mb-10">
        {items.map((item) => (
          <li
            key={`${item.id}-${item.size}`}
            className="flex items-center gap-4 border-2 border-ink-soft rounded-2xl p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="font-display text-xs mb-1">{item.name}</h2>
              <p className="font-mono text-xs text-paper/50 mb-2">
                Size {item.size}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                  className="w-7 h-7 rounded-full border-2 border-paper/30 font-mono hover:border-volt hover:text-volt"
                >
                  −
                </button>
                <span className="font-mono text-sm w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                  className="w-7 h-7 rounded-full border-2 border-paper/30 font-mono hover:border-volt hover:text-volt"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-volt text-sm mb-2">
                ${(item.price * item.qty).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id, item.size)}
                className="font-mono text-[11px] uppercase text-paper/40 hover:text-flare"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t-2 border-ink-soft pt-6">
        <span className="font-mono text-sm uppercase text-paper/60">Total</span>
        <span className="font-display text-lg text-chrome">${total.toFixed(2)}</span>
      </div>

      {error && (
        <p className="font-mono text-sm text-flare mt-4 text-center">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={placing}
        className="w-full mt-6 font-mono text-sm uppercase tracking-wide bg-volt text-ink px-8 py-4 rounded-full border-2 border-ink shadow-[3px_3px_0_0_#0a0a12] hover:-translate-y-0.5 transition-all disabled:opacity-50"
      >
        {placing ? "Placing order…" : "Checkout"}
      </button>
    </section>
  );
}