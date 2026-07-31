export type UserRole = 
  | 'Guest'
  | 'Attendee'
  | 'Organizer'
  | 'Volunteer'
  | 'Vendor'
  | 'Sponsor'
  | 'Admin'
  | 'Super Admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  company?: string;
  title?: string;
  xp: number;
  badges: string[];
  mfaEnabled: boolean;
  walletBalance: number;
}

export type EventCategory = 
  | 'Tech Conferences'
  | 'Hackathons'
  | 'Concerts'
  | 'Festivals'
  | 'Sports'
  | 'Networking'
  | 'Workshops'
  | 'Design'
  | 'AI & Web3';

export type EventFormat = 'Physical' | 'Virtual' | 'Hybrid';

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
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Community';
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
  name: 'Free' | 'Early Bird' | 'Standard' | 'VIP' | 'Group Pass';
  price: number;
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
    venueName: string;
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    virtualLink?: string;
  };
  banner: string;
  thumbnail: string;
  organizer: {
    name: string;
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
  priceFrom: number;
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
