export type UserRole = 
  | 'Guest'
  | 'Student Attendee'
  | 'Club Lead & Organizer'
  | 'Volunteer'
  | 'Faculty Coordinator'
  | 'Sponsor & Vendor'
  | 'Admin'
  | 'Super Admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  registrationNumber?: string; // VIT-AP Reg No e.g. 23BCE1092
  school?: string; // SCOPE, SENSE, SAS, VSB, VIT-AP Law
  hostelBlock?: string; // MH-1, MH-2, LH-1, Day Scholar
  xp: number;
  badges: string[];
  mfaEnabled: boolean;
  walletBalance: number;
}

export type EventCategory = 
  | 'Flagship Fests (Vitopia & VTAPP)'
  | 'Technical & Hackathons'
  | 'Cultural & Pro-Nights'
  | 'Conferences & EDPs'
  | 'Clubs & Societies'
  | 'Sports & Esports'
  | 'Workshops & FDPs';

export type EventFormat = 'Physical (On-Campus)' | 'Virtual' | 'Hybrid';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  topics: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'Title Sponsor' | 'Platinum' | 'Gold' | 'Silver' | 'Community Partner';
  website: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  stage: string;
  speakerId: string;
}

export interface TicketTier {
  id: string;
  name: 'Free Student Pass' | 'Early Bird' | 'Standard' | 'VIP Pro-Night Pass' | 'Group Hacker Pass';
  price: number; // In INR (₹)
  perks: string[];
  capacity: number;
  available: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'VIP' | 'Front Row' | 'Standard' | 'Accessible';
  price: number;
  status: 'available' | 'reserved' | 'booked';
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: EventCategory;
  tags: string[];
  format: EventFormat;
  date: string;
  time: string;
  timezone: string;
  location: {
    venueName: string; // e.g. APJ Abdul Kalam Auditorium (AB1), Multipurpose Hall (MPH), Open Air Theatre (OAT)
    address: string;
    city: string; // Amaravati / Vijayawada
    country: string;
    lat: number;
    lng: number;
    virtualLink?: string;
  };
  banner: string;
  thumbnail: string;
  organizer: {
    name: string; // e.g. GDSC VIT-AP, ACM Student Chapter, Vitopia Council
    logo: string;
    verified: boolean;
  };
  ticketTiers: TicketTier[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  agenda: Session[];
  rating: number;
  reviewCount: number;
  seatsLeft: number;
  totalCapacity: number;
  liveViewersCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  priceFrom: number; // In INR (₹)
}

export interface TicketBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventBanner: string;
  tierName: string;
  seatNumber?: string;
  quantity: number;
  totalAmount: number;
  qrCodeValue: string;
  purchasedAt: string;
  status: 'valid' | 'checked-in' | 'transferred' | 'cancelled';
  attendeeName: string;
  attendeeEmail: string;
}
