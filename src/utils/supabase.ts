/**
 * EventSphere Database & Supabase Helper Utilities
 * Complete normalized PostgreSQL Schema, Row Level Security Policies, and Client Initialization
 */

export const SUPABASE_SQL_SCHEMA = `
-- =========================================================
-- EventSphere Normalized PostgreSQL Enterprise Schema
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    role VARCHAR(50) DEFAULT 'Attendee' CHECK (role IN ('Guest', 'Attendee', 'Organizer', 'Volunteer', 'Vendor', 'Sponsor', 'Admin', 'Super Admin')),
    bio TEXT,
    company VARCHAR(255),
    xp INTEGER DEFAULT 0,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    wallet_balance NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    format VARCHAR(50) CHECK (format IN ('Physical', 'Virtual', 'Hybrid')),
    event_date DATE NOT NULL,
    time_window VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'PST',
    venue_name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    banner_url TEXT,
    thumbnail_url TEXT,
    total_capacity INTEGER NOT NULL DEFAULT 500,
    seats_left INTEGER NOT NULL DEFAULT 500,
    rating NUMERIC(3,2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 3. Ticket Tiers Table
CREATE TABLE IF NOT EXISTS public.ticket_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) DEFAULT 0.00,
    capacity INTEGER NOT NULL,
    available INTEGER NOT NULL,
    perks JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bookings & Tickets Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tier_id UUID REFERENCES public.ticket_tiers(id),
    seat_number VARCHAR(50),
    quantity INTEGER DEFAULT 1,
    total_amount NUMERIC(10,2) NOT NULL,
    qr_code_value TEXT UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'valid' CHECK (status IN ('valid', 'checked-in', 'transferred', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can read published events
CREATE POLICY "Public Events Read" ON public.events FOR SELECT USING (deleted_at IS NULL);

-- Organizers can manage their own events
CREATE POLICY "Organizers Manage Events" ON public.events FOR ALL USING (auth.uid() = organizer_id);

-- Users can view their own bookings
CREATE POLICY "Users Read Bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
`;
