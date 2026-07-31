# EventSphere — Enterprise SaaS Event Management Platform

> Production-ready, ultra-polished, scalable Event Management & Ticketing SaaS Platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Groq AI (Llama 3.3)**, **Supabase**, and **Stripe**.

---

## 🎨 Theme & Design Philosophy

Engineered with a cohesive design system combining **Linear + Stripe Dashboard + Apple Minimalist + Neo-Brutalism**:

- **Color Tokens**: Primary Indigo `#6C63FF`, Neon Mint `#00E5A8`, Coral Danger `#FF5A76`, Amber Warning `#FFB84D`, Dark Surface `#0D0E12`, Card `#14161d`.
- **Typography Pairing**: `Space Grotesk` (Headings) + `Inter` (Body text) + `JetBrains Mono` (Data, Codes & Prices).
- **Interactivity**: Glassmorphism cards, Aurora gradient background, interactive SVG seat allocation, Raycast-style command palette (`Ctrl + K`), and Konami Code easter eggs.

---

## 🌟 Key Application Features

1. **Interactive SVG Venue Seat Map**: Visual 8x6 grid allocation with VIP zones, Front Row, Standard, and Accessible seats. Includes price calculation, group pass recommendations, and instant booking.
2. **Dynamic Encrypted QR Tickets**: 3D flip digital passes with encrypted QR code generation, Apple Wallet & Google Wallet mock sync, and PDF ticket exports.
3. **Volunteer Live QR Scanner**: Mobile-ready camera simulator & file validator for sub-120ms ticket check-ins, duplicate entry detection, and offline log sync.
4. **Groq AI Co-Pilot & Studio**: Powered by Llama 3.3 (70B), Mixtral (8x7B), and DeepSeek R1 for AI event copy generation, schedule optimization, dynamic pricing advice, and fraud risk analysis.
5. **Organizer Control Studio**: Gross revenue widgets, 7-day pacing charts, conversion funnel, registration tables, and payout status.
6. **6-Step Event Creation Wizard**: Intuitive step-by-step wizard (Basic Info -> Location -> Agenda -> Ticketing -> Seat Map -> SEO & Publishing).
7. **System Command Center & Admin Panel**: Feature flag toggles, role-based access matrix (Guest, Attendee, Organizer, Volunteer, Vendor, Sponsor, Admin, Super Admin), and real-time audit logs stream.
8. **Attendee Networking & Matchmaking**: Swipeable attendee cards, AI match score calculation, direct messaging, and digital business card exchange.
9. **Cryptographic Certificate Engine**: Auto-generates verified digital PDF certificates with QR verification links and LinkedIn sharing.

---

## 🚀 End-to-End Deployment Guide

Follow this guide to deploy **EventSphere** to production across Vercel, Railway, and Supabase.

### 1. Database Setup (Supabase PostgreSQL)

1. Create a new project on [Supabase Console](https://supabase.com).
2. Go to **SQL Editor** and execute the normalized schema script provided in `src/utils/supabase.ts` (or run `npx supabase db push`):

```sql
-- Create Users Profile Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Attendee',
    xp INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

3. Obtain your **Supabase URL** and **Anon Key** from `Project Settings -> API`.

---

### 2. Groq AI Integration Setup

1. Sign up for a free developer account at [Groq Console](https://console.groq.com).
2. Generate an API Key starting with `gsk_...`.
3. Enter your Groq API Key into the **EventSphere Settings** panel or set it in your environment variables.

---

### 3. Frontend Deployment (Vercel)

1. Push your codebase to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com) and click **Add New -> Project**.
3. Select your repository and configure the build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add the Environment Variables:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_GROQ_API_KEY=gsk_your_groq_key
   VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
   ```
5. Click **Deploy**. Vercel will automatically provision SSL certificates and CDN edge routes.

---

### 4. Backend & Microservices Deployment (Railway / Docker)

For backend REST APIs or webhook handlers:

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "run", "preview", "--", "--host", "--port", "3000"]
   ```
2. Deploy to [Railway.app](https://railway.app) by linking your GitHub repository.
3. Configure domain routing and webhooks for Stripe events (`checkout.session.completed`, `payment_intent.succeeded`).

---

## 🛠️ Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Type check & production build test
npx tsc --noEmit
npm run build
```

Open `http://localhost:5173` in your browser.

---

## ⌨️ Command Palette & Easter Eggs

- Press `Ctrl + K` or `Cmd + K` anywhere in the app to open the Raycast-inspired **Command Palette**.
- Type the **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) to trigger an interactive celebratory confetti easter egg.

---

## 📄 License

Distributed under the MIT License. Produced for enterprise SaaS demonstration.
