# WAYF BOYS — Y2K Streetwear Shop (Frontend Starter)

This is the frontend for the Wayf Boys shop, built with React + Vite + Tailwind v4.

## Run it locally

You need Node.js installed (v18+). Then:

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## What's in here

- `src/pages/` — Home, Shop, Product Detail, Cart, and the Spin-to-Win minigame
- `src/components/` — Navbar, Footer, ProductCard, the chrome/marquee design elements, and the AI chat widget shell
- `src/data/products.js` — placeholder product data (this is what your backend + database will eventually replace)
- `src/context/CartContext.jsx` — cart state, saved to localStorage for now

## Design system

- Colors, fonts, and the signature "chrome" gradient text effect all live in `src/index.css`
- Palette: `ink` (near-black bg), `chrome` (metallic text), `flare` (hot pink), `volt` (cyber lime), `uv` (violet)
- Fonts: Rubik Mono One (display/headlines), Space Grotesk (body), Space Mono (prices/labels/tags)

## Not wired up yet (next steps)

- **AI chatbot**: the chat bubble is a UI shell only — it needs a backend route that calls the Claude/OpenAI API
- **Database**: products are hardcoded in `products.js` — this becomes a real API call once we build the backend
- **Checkout**: the Checkout button on the Cart page doesn't do anything yet — that needs Stripe + a backend order endpoint
- **Real product photos**: currently using placeholder images from placehold.co

We'll tackle these in the next steps of the build.
