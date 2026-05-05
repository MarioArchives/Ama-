# Ama Skincare

> **Live site:** https://ama-skincare.org/
>
> **Screenshot:**
<p align="center">
<img width="523" height="935" alt="Screenshot From 2026-05-05 21-57-07" src="https://github.com/user-attachments/assets/4cf932d5-3893-417f-873e-b2363a7e2165" />
</p>




Marketing site for **Ama**, a small skincare studio sourcing botanicals grown in Lancaster, England and the Colombian Amazon. The site presents the brand, its principles, and the current product catalogue (Cacay, Sacha Inchi, and Calendula) — a minimal, responsive, multi-page rebuild aimed at letting the catalogue be edited from a single data file without touching components.

---

## TL;DR

Multi-page marketing site for a boutique cosmetics studio. Built with **Vite (rolldown-vite) + React 19 + react-router-dom 7 + plain CSS** — no UI framework, no state library, no CMS. Product copy lives in a single `src/data/products_data.json` file; components are pure templates that render that data. Runs `npm run dev` for local work, `npm run build` for a static `dist/`, `npm test` for the Vitest suite, and CI gates every PR with lint + typecheck + test + build.

---

## Stack

| Layer | Technology |
|---|---|
| Build tool | [Vite 7](https://vitejs.dev/) ([rolldown-vite](https://vite.dev/guide/rolldown) variant) |
| UI framework | [React 19](https://react.dev/) with [React Compiler](https://react.dev/learn/react-compiler) enabled |
| Language | TypeScript 5.9 (strict, `noUnusedLocals`, `noUnusedParameters`) |
| Routing | [react-router-dom 7](https://reactrouter.com/) — declarative routes (`/`, `/about`, `/products`, `/contact`) |
| Styling | Plain CSS with `:root` variables and media queries — no framework |
| Typography | Google Fonts — Cormorant Garamond (display) + Manrope (body) |
| Tests | [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/) + jsdom |
| Lint | ESLint 9 (flat config) + typescript-eslint + react-hooks + react-refresh |
| CI | GitHub Actions — `.github/workflows/ci.yml` |

---

## Scripts

```bash
npm install        # install dependencies
npm run dev        # dev server (http://localhost:5173)
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint over the whole repo
npm test           # run the test suite once (Vitest)
npm run test:watch # tests in watch mode
```

---

## Structure

```
Ama-oils/
├── index.html                  ← Vite HTML entry
├── vite.config.ts              ← Vite + Vitest config
├── vercel.json                 ← SPA rewrite → /index.html
├── eslint.config.js            ← ESLint flat config
├── tsconfig.{json,app,node}.json ← TypeScript project references
├── .github/workflows/ci.yml    ← CI: lint + typecheck + test + build on every PR
├── public/
│   ├── pipette.svg             ← favicon
│   ├── cacay.png + cacay_closeup.jpeg
│   ├── Sacha inchi.png + Sacha_inchi_closeup.jpeg
│   └── calendula.png + calendula_closeup.jpeg
└── src/
    ├── main.tsx                ← React bootstrap (StrictMode + index.css)
    ├── App.tsx                 ← BrowserRouter + nested Routes inside Layout
    ├── index.css               ← `:root` variables, reset, base typography
    ├── components/
    │   ├── Layout/             ← shell with Header + <Outlet/> + footer
    │   ├── Header/             ← sticky nav with on-scroll variant + active NavLink
    │   ├── ImageSlider/        ← autoplay carousel with accessible dots
    │   ├── KeyFeatures/        ← grid of tags (Vegan, Cruelty-free, …)
    │   ├── ProductCard/        ← clickable card with parallax via `data-depth`
    │   ├── ProductDetail/      ← portal modal, closes on Escape / overlay
    │   ├── FindUsSection/      ← "where to find us" block
    │   └── Loading/            ← splash while images and fonts preload
    ├── pages/
    │   ├── Home/               ← intro + ImageSlider + KeyFeatures
    │   ├── About/              ← brand history and principles
    │   ├── Products/           ← parallax grid + ProductDetail trigger
    │   └── Contact/            ← contact info
    ├── data/
    │   └── products_data.json  ← the entire product catalogue
    ├── styles/
    │   └── common.css          ← utilities (`.section`, `.eyebrow`, `.margined-content`, buttons)
    └── test/
        └── setup.ts            ← jest-dom matchers + cleanup between tests
```

### Style organisation

Each component imports its own `.css` next to its `.tsx` — to find a component's styles, open the sibling file. Only globally reused rules live in `src/styles/common.css` and `src/index.css`:

- CSS variables (`:root` in `index.css`): palette, surfaces, borders, shadows
- Basic reset and typography (`body`, `a`, `button`)
- Utilities: `.section`, `.section-header`, `.eyebrow`, `.margined-content`, `.primary`, `.ghost`

Each component's CSS owns its own media queries, so responsive logic lives next to the code that uses it.

---

## Architecture

### 1. Content / presentation split

The whole product catalogue lives in a single file: **`src/data/products_data.json`**. Components are pure templates that consume that JSON. To add a product, change copy, or replace images, edit only `products_data.json` — never touch JSX or CSS.

Each entry has the shape:

| Field | Use |
|---|---|
| `id` | unique slug (kebab-case) |
| `title` | product name; also the key used to open the modal |
| `scientificName` / `scientistName` | botanical name + authority (e.g. "Caryodendron orinocense H. Karst.") |
| `description` | short copy on the card |
| `detailedDescription` | long copy inside the modal |
| `sizes` / `validity` | commercial metadata |
| `usage.instructions` + `usage.tips[]` | usage guidance shown in the modal |
| `imageSrc` / `detailImageSrc` / `imageAlt` | paths under `/public` + alt text |
| `depth` | parallax factor (0–1) used by `ProductCard` |

### 2. Routes

Defined in `src/App.tsx` with `react-router-dom`:

```
/            → Home
/about       → About
/products    → Products  (opens ProductDetail on click)
/contact     → Contact
```

All routes nest inside `<Layout/>`, which renders `Header` + `<Outlet/>` + footer. The SPA is served from a single `index.html`; `vercel.json` rewrites every path to `/index.html` so deep-linking works.

### 3. Interaction model — product modal

`ProductDetail` is mounted via `createPortal` into `document.body` when a `ProductCard` is clicked:

- Click on the card opens the modal with the matching JSON entry
- Escape, click on the overlay, or the × button close it
- Body-scroll lock while open (`document.body.style.overflow = 'hidden'`)
- The "Enquire" button navigates to `/contact` and closes the modal

### 4. Animations

- **Card parallax:** `Products` installs a `scroll` listener wrapped in `requestAnimationFrame` that computes a per-card offset from its `data-depth`, written to the CSS custom property `--parallax-offset`. Cleanup tears down the listeners and cancels any pending frame on unmount.
- **Header on-scroll:** `Header` adds the `is-scrolled` class when `window.scrollY > 0` for a more compact variant.
- **Slider autoplay:** `ImageSlider` rotates slides every `intervalMs` (default 4500 ms) via `setInterval`, skipping the cycle if there is only one slide. Dots allow manual jumps.
- **Loading splash:** `Home` preloads slider images and waits on `document.fonts.ready` before unmounting `<Loading/>`. An 8 s timeout acts as a fallback.

### 5. Theme

Defined in `:root` at the top of `src/index.css`:

```css
--bg:           #f6f6f6   /* neutral light background */
--bg-elevated:  #ffffff   /* cards and modals        */
--bg-panel:     rgba(255, 255, 255, 0.95)
--border:       rgba(0, 0, 0, 0.1)
--border-strong:rgba(0, 0, 0, 0.18)
--text-strong:  #111111
--text-muted:   rgba(0, 0, 0, 0.7)
--text-subtle:  rgba(0, 0, 0, 0.5)
--accent:       #000000
--accent-soft:  rgba(0, 0, 0, 0.35)
```

Changing these variables re-themes the whole site.

---

## Editing content

| I want to… | File | Where |
|---|---|---|
| Add a product | `src/data/products_data.json` | new object in the array |
| Change a product's copy | `src/data/products_data.json` | `description` / `detailedDescription` |
| Replace a product image | `public/*.png` (or `.jpeg`) + `imageSrc` / `detailImageSrc` | file + path |
| Edit "Key Features" tags | `src/components/KeyFeatures/KeyFeatures.tsx` | `features` array |
| Change home slides | `src/pages/Home/Home.tsx` | `slides` array |
| Edit nav links | `src/components/Header/Header.tsx` | `<nav>` block |
| Edit hero copy | `src/pages/Home/Home.tsx` | `<h1>` and `.intro-copy` |
| Change colours | `src/index.css` | `:root` block |
| Change the favicon | `public/pipette.svg` | replace the file |

---

## Tests

The suite lives in `__tests__/*.test.{ts,tsx}` files next to each component and uses Vitest with jsdom. Coverage:

- `ProductCard`: renders title/description, alt-text fallback, `data-depth` attribute, `onClick`.
- `Header`: brand mark, links to all four routes, `active` class based on the current route (via `MemoryRouter`).
- `Products`: one `ProductCard` per JSON entry, modal opens on click and closes via the × button.
- `products_data.json`: non-empty array, unique ids, required fields per product (paths with `/`, valid slug, non-empty tips list).

```bash
npm test           # single pass (the same as CI runs)
npm run test:watch # watch mode
```

CI runs lint + typecheck + tests + build on every push and PR against `main` — see `.github/workflows/ci.yml`. To block merges on red tests: *Settings → Branches → Branch protection rules* on `main`, then mark "Lint, typecheck, test, build" as a required check.

---

## Deploy

`npm run build` runs `tsc -b` and then `vite build`, producing a static `dist/` folder ready to serve from any CDN — Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, Nginx.

> **Vercel note:** `vercel.json` rewrites every path to `/index.html`. This is necessary because the site is an SPA backed by `react-router-dom` — without the rewrite, refreshing `/products` or `/about` would 404 at the CDN.

---

## Notes

- Product images are served from `/public/` (absolute paths in the JSON, e.g. `/cacay.png`). The `_closeup` files are used inside the modal; the main ones in the grid.
- React Compiler is enabled via `babel-plugin-react-compiler` in `vite.config.ts`. This may impact dev and build times.
- TypeScript uses project references (`tsconfig.app.json` for `src/`, `tsconfig.node.json` for the Vite config). Both run in strict mode with `noUnusedLocals` / `noUnusedParameters`.
- The template ships `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`; one pre-existing warning lives in `Home.tsx` (missing `slides` dependency in `useEffect`).
