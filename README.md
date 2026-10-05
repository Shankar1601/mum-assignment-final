# MUM Digital Agency - Full Stack Refactor

A modern, responsive, and SEO-optimized full-stack web application for MUM Digital Agency. 

**Frontend:** React, Vite, CSS (Mobile-first, responsive), Lenis (Smooth Scrolling), Lucide React (Icons).
**Backend:** Node.js, Express, PostgreSQL.
**Deployment:** Vercel (Frontend) & Render (Backend + Database).

---

## 🚀 Local Development Setup

### 1. Database Setup (PostgreSQL)
1. Ensure PostgreSQL is installed and running on your machine.
2. Create a new database (e.g., `mum_agency`).
3. Run the SQL commands in `backend/schema.sql` to generate the `submissions` table.

### 2. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (or the provided `.env`) and update your `DATABASE_URL`.
4. Start the server: `npm run dev` (Runs on `http://localhost:5000`)

### 3. Frontend Setup
1. Navigate to the vite directory: `cd vite`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev` (Runs on `http://localhost:3000`)
4. Vite will automatically proxy `/api` requests to your local backend.

---

## ☁️ Deployment Guide

### Phase 1: Database & Backend (Render)

1. **Create the Database:**
   - Log into [Render](https://render.com/).
   - Click **New** -> **PostgreSQL**.
   - Name it `mum-db` and create it.
   - Copy the **Internal Database URL** (for Render-to-Render connections) and **External Database URL** (for connecting from your local machine to run the schema).
   - Use a tool like pgAdmin, DBeaver, or `psql` to connect using the External URL and run the contents of `backend/schema.sql`.

2. **Deploy the Backend:**
   - Click **New** -> **Web Service** on Render.
   - Connect your GitHub repository.
   - Set the following settings:
     - **Root Directory:** `backend`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Add Environment Variables:
     - `NODE_ENV`: `production`
     - `DATABASE_URL`: *(Paste the Internal Database URL from Step 1)*
     - `FRONTEND_URL`: *(Leave blank for now, you will update this after deploying to Vercel)*
   - Deploy the service and copy the provided backend URL (e.g., `https://mum-backend-xyz.onrender.com`).

### Phase 2: Frontend (Vercel)

1. **Deploy the Frontend:**
   - Log into [Vercel](https://vercel.com/).
   - Click **Add New** -> **Project** and select your GitHub repository.
   - Set the following settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `vite`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variables:
     - `VITE_API_URL`: *(Paste the Render backend URL from Phase 1, e.g., `https://mum-backend-xyz.onrender.com/api`)*
   - Deploy the application.

### Phase 3: Final Security Tie-in

1. **Restrict CORS:**
   - Go back to your backend Web Service settings in **Render**.
   - Update the `FRONTEND_URL` environment variable to match your live Vercel URL (e.g., `https://mum-assignment.vercel.app`).
   - Render will automatically restart your backend with the hardened CORS policy.

---

## 🎨 Architecture Notes

- **SEO & GEO:** Semantic HTML5 tags (`<article>`, `<section>`, `<main>`) are used throughout. The application is configured to serve lightweight, fast-loading content.
- **Mobile First:** CSS media queries are optimized for mobile viewports first, scaling up gracefully to desktop interfaces.
- **Modularity:** The monolithic `main.jsx` has been refactored into distinct, functional React components (Hero, Benefits, Services, Contact, etc.) for high reusability and clean memory management.
- **Admin Dashboard:** Access the backend submissions locally or in production by navigating to `/admin`.