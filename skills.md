# Project Context: Tasheel Legal SaaS
This project is a decoupled Single Page Application (SPA) built for a legal consultancy. It is designed from day one to be a multi-tenant, white-label SaaS supporting both English and Arabic.
- **Frontend Environment:** React + Vite (HTML/JS/CSS exported to shared hosting).
- **Styling:** Tailwind CSS v3 (Strictly v3, using `tailwind.config.js` and PostCSS).
- **Backend Environment:** Serverless Node.js monolithic API hosted on the Vercel Hobby plan.
- **Database:** PostgreSQL via NeonDB.
- **Storage:** Vercel Blob Storage.

---

## 🎨 UI & Frontend Execution Rules

### 1. Tailwind CSS v3 Strict Adherence
- **Rule:** The project MUST use Tailwind CSS v3. Do not use v4 features or the v4 CSS-only configuration.
- **Implementation:** All theme configurations, color mappings, and plugin inclusions must be done inside `tailwind.config.js`. Ensure `postcss.config.js` is present. Use standard `@tailwind base; @tailwind components; @tailwind utilities;` directives.

### 2. Multi-lingual (English/Arabic) & RTL Support
- **Rule:** The app must support English (LTR) and Arabic (RTL) dynamically. No hardcoded text.
- **Implementation:** Use `react-i18next` with JSON locale files (`en.json`, `ar.json`). Implement a language toggle that updates `document.documentElement.dir`.
- **Styling:** NEVER use physical directional classes (e.g., `ml-4`, `pl-2`, `left-0`). ALWAYS use Tailwind logical properties (e.g., `ms-4`, `pe-2`, `start-0`) so the layout flips automatically for Arabic.

### 3. White-Label Design System
- **Rule:** NEVER hardcode primary, secondary, or accent colors in markup.
- **Implementation:** Always use CSS variables (e.g., `var(--color-primary)`) configured in the root stylesheet and map them inside the `extend: { colors: {} }` block of `tailwind.config.js`.

### 4. Currency Formatting Strictness
- **Rule:** NEVER use text representations like "AED", "Dhs", or the Arabic "د.إ".
- **Implementation:** Use a custom `<DirhamIcon />` SVG component based on the official CBUAE vector (Latin D with two horizontal lines). Create a global `formatCurrency` utility that always places this icon *before* the formatted numeral.

### 5. Build & Deployment Constraints
- **Rule:** Frontend must compile to static assets without SSR or Node.js runtime features.
- **Implementation:** Use `npm run build` targeting a static `dist` folder. Ensure React Router is configured properly for SPA navigation on shared hosting.

---

## ⚙️ Functionality & Backend Execution Rules

### 1. Single Serverless Function Architecture (Vercel Hobby Plan)
- **Rule:** To bypass Vercel Hobby plan limits, the ENTIRE backend API MUST be consolidated into a single monolithic serverless function.
- **Implementation:** Create a single entry point at `api/index.js` that exports an Express.js application. Use Express routers to handle internal paths (`/api/auth`, `/api/cases`, etc.). Configure `vercel.json` to rewrite all `/api/(.*)` requests to this single `api/index.js` file.

### 2. CORS & Security
- **Rule:** Frontend and backend live on separate domains.
- **Implementation:** Apply the `cors` middleware globally within the Express app, strictly configuring the `origin` to match the shared hosting frontend domain.
- **Auth:** Use stateless JWTs. Implement strict Role-Based Access Control (RBAC) middleware verifying roles: `Superadmin`, `Admin`, or `Client`.

### 3. Database (NeonDB) & Multi-Tenancy
- **Rule:** APIs are serverless; standard connections will exhaust the database.
- **Implementation:** Use serverless-optimized connection pooling (`@neondatabase/serverless`). Establish the pool once outside the Express request handlers.
- **Isolation:** All queries MUST enforce `firm_id` checks to maintain white-label data isolation across all tables (except the `Firms` table itself).
- **Translations:** Store dynamic text (e.g., Service Names) as `JSONB` in NeonDB (e.g., `{"en": "Corporate", "ar": "شركات"}`).

### 4. File Handling & Third-Party Integrations
- **Storage:** Stream all file uploads (Dubai Court documents, manual deposit receipts) directly to Vercel Blob. Generate temporary read URLs for secure access; never store files on the server.
- **Emails:** Use the Brevo v3 API (`api.brevo.com/v3/smtp/email`) via native Node.js `fetch` to keep the function lightweight.
- **PDFs:** Invoice generation must embed the firm's logo via URL and use a font that natively supports Arabic text shaping (e.g., Noto Sans Arabic) to ensure proper RTL rendering.

