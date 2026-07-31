# 🚀 EventSphere AI — VIT-AP Campus Event Management Platform (Vercel Edition)

> **The Production-Grade Institutional SaaS Platform for VIT-AP University**  
> Tailored specifically for VIT-AP student clubs (GDSC, ACM, GFG, CSI, IEEE, SEDS), administrative approval workflows (DSW + Registrar), venue spatial management (AB1 Auditorium, MPH, OAT), VTOP On-Duty (OD) sheet generation, and dynamic 30-second anti-screenshot QR ticketing.

---

## 🏛️ 1. VIT-AP Architecture & Spatial Specifications

### 📍 Campus Venues Matrix (`venues` Table)
| Venue ID | Venue Name | Seating Capacity | Hardware & Amenities | Approval Level |
| --- | --- | --- | --- | --- |
| `V-AB1-AUD` | **APJ Abdul Kalam Auditorium** | 1,200 | Dual 4K Laser Projectors, Dolby Atmos, Stage Lights, Green Rooms | DSW + Registrar |
| `V-AB1-CR` | **Central Conference Hall** | 250 | 86" Smart Panel, Polycom Video Conference Rig | DSW + Admin Office |
| `V-MPH-01` | **Multipurpose Hall (MPH)** | 2,500 (Standing) / 1,000 (Seated) | Open Floor, High-Wattage Audio, Portable Stage, Power Backups | DSW + Sports/Estate |
| `V-OAT-01` | **Open Air Theatre (OAT)** | 3,500+ | Outdoor Stage, Acoustic Shell, High-Voltage Power Lines | DSW + Estate Officer |
| `V-AB1-SH1` | **Seminar Hall 1 & 2** | 200 each | HD Laser Projector, PA System, Touch Podiums | School Dean / DSW |
| `V-AB2-SH1` | **Seminar Hall AB-2** | 300 | Dual Displays, 7.1 Surround Sound, Tiered Seating | School Dean / DSW |
| `V-LAB-MAC` | **Mac & High-Performance Computing Labs** | 120 Workstations | LAN, Gigabit Wi-Fi, CUDA GPU Cluster Access | SCOPE Lab Director |

---

## ⚡ 2. Core GOAT Features

1. **🔒 Dynamic TOTP Anti-Screenshot QR Pass**: In-app digital wallet issuing cryptographic QR codes refreshed every 30 seconds (`student_id` + `event_id` + `salt` + `timestamp_window`) with animated 30s countdown ring and watermark to prevent screenshot sharing.
2. **📱 Volunteer QR Scanner Kiosk**: Real-time entry scanner with WebCam camera feed, audio chimes (success chime for valid student pass, warning chime for duplicate entry), sub-second gate check-in, and manual registration number (`23BCE1092`) fallback.
3. **📅 FFCS Timetable Conflict Detector**: Intersects student's enrolled VTOP timetable slots (A1, B1, C1, L1+L2, etc.) with event schedules to issue schedule collision warnings.
4. **📄 VTOP On-Duty (OD) Sheet Exporter**: Evaluates timestamped gate logs (>80% venue duration threshold) and generates academic OD Approval Sheets in CSV/Excel format.
5. **🛡️ 3-Tier DSW Approval Pipeline**: State-machine workflow handling:  
   `Draft` ➔ `Faculty Coordinator Review` ➔ `Venue Collision Engine Check` ➔ `DSW Final Sign-off` ➔ `Live Publishing`.
6. **📊 Live Gate Occupancy Monitor**: WebSocket-powered live capacity gauge displaying gate count vs. total capacity for safety compliance across AB1 Auditorium, MPH, and OAT.

---

## 🗄️ 3. Complete Supabase PostgreSQL Schema Script

Execute this complete SQL migration script in your **Supabase Dashboard ➔ SQL Editor**:

```sql
-- 1. ENUMS & CONSTANTS
CREATE TYPE user_role AS ENUM (
  'Guest', 'Student Attendee', 'Club Lead & Organizer', 
  'Volunteer', 'Faculty Coordinator', 'Sponsor & Vendor', 'Admin', 'Super Admin'
);

CREATE TYPE approval_status AS ENUM (
  'Draft', 'Faculty Coordinator Review', 'Venue Collision Checking', 'DSW Final Sign-off', 'Live Published'
);

-- 2. USERS TABLE
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'Student Attendee',
  registration_number TEXT,
  school TEXT DEFAULT 'SCOPE',
  hostel_block TEXT DEFAULT 'MH-2',
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VENUES TABLE
CREATE TABLE public.venues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  standing_capacity INTEGER,
  hardware TEXT[],
  approval_level TEXT NOT NULL
);

-- 4. ORGANIZATIONS (CLUBS) TABLE
CREATE TABLE public.organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  email TEXT NOT NULL,
  school_affiliation TEXT NOT NULL,
  lead_name TEXT NOT NULL,
  faculty_coordinator TEXT NOT NULL
);

-- 5. EVENTS TABLE
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  venue_id TEXT REFERENCES public.venues(id),
  organizer_id TEXT REFERENCES public.organizations(id),
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  approval_stage approval_status DEFAULT 'Draft',
  price_from NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. REGISTRATIONS & TICKETS TABLE
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id),
  user_id UUID REFERENCES public.users(id),
  tier_name TEXT NOT NULL,
  seat_number TEXT,
  total_amount NUMERIC DEFAULT 0,
  qr_code_hash TEXT NOT NULL,
  status TEXT DEFAULT 'valid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ATTENDANCE LOGS TABLE
CREATE TABLE public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES public.registrations(id),
  scan_time TIMESTAMPTZ DEFAULT NOW(),
  scanned_by_volunteer TEXT NOT NULL,
  gate_location TEXT NOT NULL
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access for Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Student Read Own Tickets" ON public.registrations FOR SELECT USING (auth.uid() = user_id);
```

---

## 🌐 4. Step-by-Step Vercel Deployment Guide

### Option A: Deployment via Vercel Web Dashboard (Recommended)

1. **Push Code to GitHub**:
   Ensure your code is pushed to your GitHub repository:
   `https://github.com/charanteja-ctrl/Meetrix`

2. **Connect to Vercel**:
   - Open [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
   - Select your GitHub repository **`charanteja-ctrl/Meetrix`**.

3. **Configure Project Settings**:
   - **Framework Preset**: Vite / Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   In the **Environment Variables** panel on Vercel, paste:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bgtnxkzceuffagvmueii.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_oj6ukBvRd3jAduYuV7AuGw_NS0LLNWs
   VITE_SUPABASE_URL=https://bgtnxkzceuffagvmueii.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_oj6ukBvRd3jAduYuV7AuGw_NS0LLNWs
   GROQ_API_KEY=your_groq_api_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Deploy**:
   - Click **Deploy**. Vercel will build and assign a live production URL (e.g. `https://meetrix-vitap.vercel.app`).

---

### Option B: Deployment via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod
```

---

## 🧪 5. Local Development Commands

```bash
# Install dependencies
npm install

# Start Vite Local Dev Server
npm run dev

# Run TypeScript & Build Verification
npx tsc --noEmit && npm run build
```

---
*Built with ❤️ for VIT-AP University.*
