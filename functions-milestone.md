# Tasheel Legal SaaS: Execution Milestones (1-3)

## Pre-Requirements Context (Feed to AI First)
> **AI Agent Context & Rules:**
> "Acknowledge these constraints before generating any code. We are building a multi-tenant, bilingual (English/Arabic) React SPA for a legal consultancy. 
> 1. **Frontend:** React with Vite. We are strictly using **Tailwind CSS v3** (requiring `tailwind.config.js` and PostCSS). Do not use Tailwind v4. UI must support RTL seamlessly using logical CSS properties (`ms-`, `pe-`, `start-`).
> 2. **Backend:** Deployed on the Vercel Hobby plan. You MUST consolidate all backend APIs into a single monolithic Express.js application located at `api/index.js` to avoid serverless function limits. Configure `vercel.json` to rewrite `/api/(.*)` to this file.
> 3. **Database:** PostgreSQL via NeonDB using `@neondatabase/serverless` for connection pooling.
> 4. **Currency:** Never use text for the UAE currency. We will strictly use a custom `<DirhamIcon />` SVG component placed before the numeral."

---

## Milestone 1: Project Architecture & Foundation

### Prompt 1A: Frontend Initialization
> **Prompt for AI:**
> *"Initialize a new React project using Vite. Install the following dependencies: `tailwindcss@^3.4`, `postcss`, `autoprefixer`, `react-router-dom`, `react-i18next`, `i18next`, and `zustand`. Generate the Tailwind v3 configuration files using `npx tailwindcss init -p`. In `tailwind.config.js`, configure the `content` array for Vite, and extend the theme colors to use CSS variables (e.g., primary: 'var(--color-primary)') to support our white-label requirements. Set up the main CSS file with the v3 `@tailwind` directives and define the root CSS variables.*
> 
> *Next, configure `react-i18next` with a standard setup, including placeholder `en.json` and `ar.json` files in a `src/locales` directory. Create a base layout component (`Layout.jsx`) that includes a language toggle switch. This switch must update the i18n language and dynamically set the `dir` attribute on the HTML tag to either 'ltr' or 'rtl'. Ensure all generated Tailwind classes in this layout strictly use logical properties (like `ms-`, `pe-`). Finally, create a blank `<DirhamIcon />` SVG component in `src/components/ui` and a `formatCurrency.js` utility that places this icon before the formatted numeral."*

### Prompt 1B: Backend Initialization
> **Prompt for AI:**
> *"Create an `api` directory at the root of the project for Vercel serverless functions. Install `express`, `cors`, `@neondatabase/serverless`, `pg`, and `jsonwebtoken`. First, set up `api/index.js` as an Express application. Configure the `cors` middleware to accept requests from a `FRONTEND_URL` environment variable and ensure the app parses JSON bodies. Second, create a `vercel.json` file in the root directory with a "rewrites" array that funnels all `/api/(.*)` traffic into `/api/index.js`.*
> 
> *Third, create a database utility at `api/utils/db.js` that initializes a `@neondatabase/serverless` connection pool using the `DATABASE_URL` environment variable. Export this pool. Finally, create a basic `app.get('/api/health')` route within the Express app that pings the NeonDB pool to confirm the connection is active. Ensure the `api/index.js` file exports the Express app correctly for Vercel's Node.js runtime."*

---

## Milestone 2: Database Schema & Authentication

### Prompt 2: Schema & Express Auth Routes
> **Prompt for AI:**
> *"First, provide the raw PostgreSQL queries to set up our NeonDB schema. Create tables for `Firms`, `Users` (roles: Superadmin, Admin, Client), `Services` (with `name` and `description` as `JSONB` to support English/Arabic translations), `Cases`, `Documents`, and `Invoices`. Every table except `Firms` must have a `firm_id` foreign key for white-labeling. Ensure `Invoices` has a `case_id` foreign key.*
> 
> *Second, in our Express app (`api/index.js`), create an authentication router mounted at `/api/auth`. Write endpoints for `/register` (client only) and `/login`. The login route must verify the password (using `bcrypt`) and issue a stateless JWT containing the user's `id`, `role`, and `firm_id`. Ensure connection pooling from `api/utils/db.js` is used for all queries.*
> 
> *Third, create an Express middleware utility `verifyToken.js` that validates the JWT from headers/cookies, and a `requireRole.js` middleware that accepts an array of allowed roles to protect future endpoints."*

---

## Milestone 3: Client Portal & Core UI

### Prompt 3: Bilingual Dashboard & Service Selection
> **Prompt for AI:**
> *"Build the React frontend components for the Client Portal. Create a `ClientDashboard.jsx` using Tailwind v3. Implement a 'Case Tracker' timeline component that fetches data from a mock API.*
> 
> *Next, build a 'Service Selection' catalog component. The component must consume a simulated JSON payload of services where names and descriptions are provided in both English and Arabic (simulating our JSONB database structure). Use our `react-i18next` setup to render the correct language based on the current locale.*
> 
> *Crucially, ensure every single price displayed in the UI utilizes the global `formatCurrency` utility and the `<DirhamIcon />` we created in Milestone 1. All layout elements (margins, padding, positioning) must strictly use Tailwind logical properties (`ms-`, `pe-`, `start-`, `end-`) so the entire dashboard flips flawlessly when the user switches to Arabic."*

## Milestone 4: Admin Portals & Document Management

### Prompt 4A: Superadmin & Admin Dashboards
> **Prompt for AI:**
> *"Build the React frontend components for the Admin and Superadmin portals. For the Superadmin, create a 'Service Management' UI to perform CRUD operations on our `Services` table. The form must allow inputting both English and Arabic names/descriptions to match our JSONB database schema, and all price inputs must display the `<DirhamIcon />`.*
> 
> *For the Admin, build a 'Case Management' dashboard. This must include a detailed view for a specific case, featuring a dedicated 'Dubai Court Documents' section for uploading files. Ensure all layouts strictly use Tailwind v3 logical properties (`ms-`, `pe-`, etc.) to support the RTL toggle, and integrate `react-i18next` for all static text."*

### Prompt 4B: Vercel Blob Uploads & Status Updates
> **Prompt for AI:**
> *"In our monolithic Express app (`api/index.js`), create a new router mounted at `/api/admin`. Protect this router using the `verifyToken` and `requireRole(['Superadmin', 'Admin'])` middlewares.*
> 
> *First, create a `POST /upload-document` endpoint. Integrate `@vercel/blob` to stream file uploads directly to Vercel Blob storage, ensuring the file is never saved to the local serverless disk. The endpoint must save the resulting Blob URL and the associated `case_id` to our `Documents` table in NeonDB.*
> 
> *Second, create a `PUT /case-status` endpoint to update a case's status. Inside this endpoint, implement the `sendEmail` utility (using the Brevo v3 fetch logic) to automatically notify the client when their case status changes."*

---

## Milestone 5: Payments & PDF Invoicing

### Prompt 5A: Payment Gateways & Manual Approval
> **Prompt for AI:**
> *"Update our Express app (`api/index.js`) by creating a `/api/payments` router. First, integrate the `stripe` Node.js package. Create a `POST /create-checkout-session` endpoint that generates a Stripe checkout link for a selected service, ensuring the currency is set to AED (even though our UI displays our custom Dirham icon).*
> 
> *Second, build the backend and frontend logic for 'Manual Bank Deposits'. On the frontend, build a UI for clients to upload a deposit receipt. On the backend, create an endpoint for clients to upload this receipt to Vercel Blob, flagging the invoice status as 'Pending Approval'. Create a corresponding Admin UI and endpoint to 'Approve' or 'Reject' these manual payments."*

### Prompt 5B: Arabic-Supported PDF Generation
> **Prompt for AI:**
> *"Create a `GET /invoice/:id/download` endpoint in our Express app to generate professional PDF invoices on the fly. Use a library like `pdf-lib`. *
> 
> *The PDF generation logic must strictly adhere to these rules: 1) Fetch the firm's logo URL from the `Firms` table and embed it in the header. 2) You MUST load an Arabic-supporting Unicode font (like Noto Sans Arabic) to ensure RTL text shaping works correctly and letters are not disconnected. 3) The invoice must include the `case_id`, client details, service name (in the client's preferred language), and format all prices perfectly using the official Dirham symbol."*