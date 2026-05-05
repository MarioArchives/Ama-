# Ama Skincare

> **Site:** marketing site for Ama — a small skincare studio sourcing botanicals from Lancaster, England and the Colombian Amazon.

Sitio de presentación de **Ama**, un estudio de cosmética que produce aceites en lotes pequeños a partir de flores y semillas amazónicas y británicas. La página describe la marca, sus principios, el equipo y el catálogo actual de productos (Cacay, Sacha Inchi y Calendula).

El sitio es un rediseño minimalista, responsivo y multi‑página, pensado para que la edición del catálogo se haga sobre un único archivo de datos sin tocar componentes.

---

## TL;DR (English)

Multi-page marketing site for a boutique cosmetics studio. Built with **Vite (rolldown-vite) + React 19 + react-router-dom 7 + plain CSS** — no UI framework, no state library, no CMS. Product copy lives in a single `src/data/products_data.json` file; components are pure templates that render that data. Runs `npm run dev` for local work, `npm run build` for a static `dist/`, `npm test` for the Vitest suite, and CI gates every PR with lint + typecheck + test + build.

---

## Stack

| Capa | Tecnología |
|---|---|
| Build tool | [Vite 7](https://vitejs.dev/) (variante [rolldown-vite](https://vite.dev/guide/rolldown)) |
| UI framework | [React 19](https://react.dev/) con [React Compiler](https://react.dev/learn/react-compiler) habilitado |
| Lenguaje | TypeScript 5.9 (strict, `noUnusedLocals`, `noUnusedParameters`) |
| Routing | [react-router-dom 7](https://reactrouter.com/) — rutas declarativas (`/`, `/about`, `/products`, `/contact`) |
| Styling | CSS puro con variables (`:root`) y media queries — sin framework |
| Tipografía | Google Fonts — Cormorant Garamond (titulares) + Manrope (cuerpo) |
| Tests | [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/) + jsdom |
| Lint | ESLint 9 (flat config) + typescript-eslint + react-hooks + react-refresh |
| CI | GitHub Actions — `.github/workflows/ci.yml` |

---

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # tsc -b && vite build → dist/
npm run preview    # servir el build localmente
npm run lint       # ESLint sobre todo el repo
npm test           # ejecuta la suite de tests (Vitest, una sola pasada)
npm run test:watch # tests en modo watch
```

---

## Estructura

```
Ama-oils/
├── index.html                  ← entry HTML (Vite)
├── vite.config.ts              ← configuración Vite + Vitest
├── vercel.json                 ← rewrite SPA → /index.html
├── eslint.config.js            ← ESLint flat config
├── tsconfig.{json,app,node}.json ← TypeScript project references
├── .github/workflows/ci.yml    ← CI: lint + typecheck + test + build en cada PR
├── public/
│   ├── pipette.svg             ← favicon
│   ├── cacay.png + cacay_closeup.jpeg
│   ├── Sacha inchi.png + Sacha_inchi_closeup.jpeg
│   └── calendula.png + calendula_closeup.jpeg
└── src/
    ├── main.tsx                ← bootstrap de React (StrictMode + index.css)
    ├── App.tsx                 ← BrowserRouter + Routes anidadas dentro de Layout
    ├── index.css               ← variables `:root`, reset y tipografía base
    ├── components/
    │   ├── Layout/             ← shell con Header + <Outlet/> + footer
    │   ├── Header/             ← nav sticky con efecto on-scroll y NavLink activo
    │   ├── ImageSlider/        ← carrusel autoplay con dots accesibles
    │   ├── KeyFeatures/        ← grilla de tags (Vegan, Cruelty-free, …)
    │   ├── ProductCard/        ← tarjeta clickable con parallax por `data-depth`
    │   ├── ProductDetail/      ← modal portal con cierre por Escape / overlay
    │   ├── FindUsSection/      ← bloque "where to find us"
    │   └── Loading/            ← splash mientras se precargan imágenes y fuentes
    ├── pages/
    │   ├── Home/               ← intro + ImageSlider + KeyFeatures
    │   ├── About/              ← historia y principios de la marca
    │   ├── Products/           ← grid con parallax + apertura de ProductDetail
    │   └── Contact/            ← datos de contacto
    ├── data/
    │   └── products_data.json  ← TODO el catálogo de productos
    ├── styles/
    │   └── common.css          ← utilidades (`.section`, `.eyebrow`, `.margined-content`, botones)
    └── test/
        └── setup.ts            ← jest-dom matchers + cleanup entre tests
```

### Organización de estilos

Cada componente importa su propio `.css` al lado de su `.tsx` — buscar el estilo de un componente es abrir el archivo hermano. Solo lo que se reutiliza globalmente vive en `src/styles/common.css` y `src/index.css`:

- Variables CSS (`:root` en `index.css`): paleta, fondos, bordes, sombras
- Reset básico y tipografía (`body`, `a`, `button`)
- Utilidades: `.section`, `.section-header`, `.eyebrow`, `.margined-content`, `.primary`, `.ghost`

Cada CSS de componente contiene sus propios media queries, así la lógica responsive vive junto al código que la usa.

---

## Arquitectura

### 1. Separación contenido / presentación

Todo el catálogo de productos vive en un único archivo: **`src/data/products_data.json`**. Los componentes son plantillas puras que consumen ese JSON. Para añadir un producto, cambiar copy o reemplazar imágenes se modifica solo `products_data.json` — nunca se toca JSX ni CSS.

Cada entrada del array tiene la forma:

| Campo | Uso |
|---|---|
| `id` | slug único (kebab-case) |
| `title` | nombre del producto, también clave para abrir el modal |
| `scientificName` / `scientistName` | nombre botánico + autoridad (ej. "Caryodendron orinocense H. Karst.") |
| `description` | copy corto en la tarjeta |
| `detailedDescription` | copy largo en el modal |
| `sizes` / `validity` | metadatos comerciales |
| `usage.instructions` + `usage.tips[]` | guía de uso dentro del modal |
| `imageSrc` / `detailImageSrc` / `imageAlt` | rutas en `/public` + texto alternativo |
| `depth` | factor de parallax (0–1) usado por `ProductCard` |

### 2. Rutas

Definidas en `src/App.tsx` con `react-router-dom`:

```
/            → Home
/about       → About
/products    → Products  (abre ProductDetail al click)
/contact     → Contact
```

Todas las rutas anidan dentro de `<Layout/>`, que renderiza `Header` + `<Outlet/>` + footer. El SPA se sirve desde un único `index.html`; `vercel.json` hace rewrite de cualquier path a `/index.html` para que el deep-linking funcione.

### 3. Modelo de interacciones — modal de producto

`ProductDetail` se monta vía `createPortal` en `document.body` cuando se hace click sobre una `ProductCard`:

- Click sobre la tarjeta abre el modal con la entrada correspondiente del JSON
- Escape, click sobre el overlay, o el botón × lo cierran
- Body‑scroll lock mientras está abierto (`document.body.style.overflow = 'hidden'`)
- El botón "Enquire" navega a `/contact` y cierra el modal

### 4. Animaciones

- **Parallax de tarjetas**: `Products` instala un listener de `scroll` con `requestAnimationFrame` que calcula un offset por tarjeta usando su `data-depth`, y lo escribe en la propiedad CSS `--parallax-offset`. La limpieza desinstala los listeners y cancela el frame pendiente al desmontar.
- **Header on-scroll**: `Header` añade la clase `is-scrolled` cuando `window.scrollY > 0` para una variante más compacta.
- **Slider autoplay**: `ImageSlider` rota slides cada `intervalMs` (default 4500 ms) con `setInterval`, pausando el ciclo si solo hay un slide. Los dots permiten saltar manualmente.
- **Splash de carga**: `Home` precarga las imágenes del slider y espera a `document.fonts.ready` antes de quitar `<Loading/>`. Hay un timeout de 8 s como fallback.

### 5. Tema

Definido en `:root` al inicio de `src/index.css`:

```css
--bg:           #f6f6f6   /* fondo neutro claro */
--bg-elevated:  #ffffff   /* tarjetas y modales */
--bg-panel:     rgba(255, 255, 255, 0.95)
--border:       rgba(0, 0, 0, 0.1)
--border-strong:rgba(0, 0, 0, 0.18)
--text-strong:  #111111
--text-muted:   rgba(0, 0, 0, 0.7)
--text-subtle:  rgba(0, 0, 0, 0.5)
--accent:       #000000
--accent-soft:  rgba(0, 0, 0, 0.35)
```

Cambiar estas variables re‑colorea todo el sitio.

---

## Editar contenido

| Quiero… | Archivo | Dónde |
|---|---|---|
| Añadir un producto | `src/data/products_data.json` | nuevo objeto en el array |
| Cambiar copy de un producto | `src/data/products_data.json` | `description` / `detailedDescription` |
| Reemplazar imagen de producto | `public/*.png` (o `.jpeg`) + `imageSrc` / `detailImageSrc` | archivo + path |
| Editar tags de "Key Features" | `src/components/KeyFeatures/KeyFeatures.tsx` | array `features` |
| Cambiar slides de la home | `src/pages/Home/Home.tsx` | array `slides` |
| Editar nav o links | `src/components/Header/Header.tsx` | bloque `<nav>` |
| Editar texto del hero | `src/pages/Home/Home.tsx` | `<h1>` y `.intro-copy` |
| Cambiar colores | `src/index.css` | bloque `:root` |
| Cambiar el favicon | `public/pipette.svg` | sustituir archivo |

---

## Tests

La suite vive en archivos `__tests__/*.test.{ts,tsx}` junto a cada componente y usa Vitest con jsdom. Cubre:

- `ProductCard`: render de título/descripción, fallback de `alt`, atributo `data-depth`, `onClick`.
- `Header`: brand mark, links a las cuatro rutas, clase `active` según ruta actual (vía `MemoryRouter`).
- `Products`: una `ProductCard` por entrada del JSON, apertura del modal al click y cierre via botón ×.
- `products_data.json`: array no vacío, ids únicos, campos requeridos por producto (paths con `/`, slug válido, lista de tips no vacía).

```bash
npm test           # una sola pasada (lo mismo que corre CI)
npm run test:watch # modo watch
```

CI corre lint + typecheck + tests + build en cada push y PR contra `main` — ver `.github/workflows/ci.yml`. Para bloquear merges sobre tests rojos: *Settings → Branches → Branch protection rules* sobre `main` y marcar "Lint, typecheck, test, build" como required check.

---

## Deploy

El build (`npm run build`) corre `tsc -b` y luego `vite build`, produciendo una carpeta `dist/` estática lista para servir desde cualquier CDN — Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, Nginx.

> **Nota sobre Vercel:** `vercel.json` reescribe cualquier path a `/index.html`. Esto es necesario porque el sitio es una SPA con `react-router-dom` — sin la rewrite, recargar `/products` o `/about` daría 404 desde el CDN.

---

## Notas

- Las imágenes de productos se sirven desde `/public/` (rutas absolutas en el JSON, ej. `/cacay.png`). Los archivos `_closeup` se usan dentro del modal; los principales en la grilla.
- React Compiler está habilitado vía `babel-plugin-react-compiler` en `vite.config.ts`. Esto puede impactar tiempos de dev y build.
- TypeScript usa project references (`tsconfig.app.json` para `src/`, `tsconfig.node.json` para la config de Vite). Ambos corren en strict mode con `noUnusedLocals` / `noUnusedParameters`.
- El template incluye `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`; un warning preexistente vive en `Home.tsx` (dependencia faltante en `useEffect` para `slides`).
