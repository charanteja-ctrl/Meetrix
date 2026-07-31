import type { EventItem, Seat } from '../types/event';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    slug: 'global-tech-summit-2026',
    title: 'Global Tech & AI Summit 2026',
    description: 'The world\'s flagship developer conference uniting 5,000+ AI pioneers, system architects, and tech leaders for 3 days of transformative keynotes, interactive seat workshops, and exclusive networking.',
    category: 'AI & Web3',
    tags: ['AI', 'LLMs', 'System Architecture', 'Cloud Native'],
    format: 'Hybrid',
    date: '2026-09-15',
    time: '09:00 AM - 06:00 PM',
    timezone: 'PST (UTC-8)',
    location: {
      venueName: 'Palace of Fine Arts & Tech Dome',
      address: '3301 Lyon St, San Francisco',
      city: 'San Francisco',
      country: 'USA',
      lat: 37.8024,
      lng: -122.4487,
      virtualLink: 'https://live.eventsphere.io/summit-2026'
    },
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'EventSphere Labs & Linear',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-1', name: 'Free', price: 0, perks: ['Keynote Access', 'Virtual Stream'], capacity: 1000, available: 142 },
      { id: 'tier-2', name: 'Standard', price: 299, perks: ['Full Mainstage Access', 'Swag Box', 'Lunch & Drinks'], capacity: 500, available: 89 },
      { id: 'tier-3', name: 'VIP', price: 799, perks: ['VIP Lounge & Dinner', 'Front-Row Reserved Seat', '1-on-1 Speaker Meet'], capacity: 100, available: 12 }
    ],
    speakers: [
      {
        id: 'spk-1',
        name: 'Elena Rostova',
        role: 'Chief AI Architect',
        company: 'Neural Dynamics',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Leading breakthroughs in autonomous agent architectures and large scale multi-agent reasoning systems.',
        topics: ['Agentic AI', 'Scalable LLMs']
      },
      {
        id: 'spk-2',
        name: 'Marcus Vance',
        role: 'VP of Infrastructure',
        company: 'Vercel / Stripe',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'Pioneered sub-millisecond edge routing systems and global real-time event streaming pipelines.',
        topics: ['Edge Computing', 'High Concurrency']
      }
    ],
    sponsors: [
      { id: 'sp-1', name: 'Stripe', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Platinum', website: 'https://stripe.com' },
      { id: 'sp-2', name: 'Supabase', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Gold', website: 'https://supabase.com' }
    ],
    agenda: [
      { id: 'ses-1', title: 'Keynote: The Next Decade of AI Orchestration', description: 'Deep dive into autonomous reasoning loops and agentic workflow patterns.', startTime: '09:30 AM', endTime: '11:00 AM', stage: 'Grand Arena', speakerId: 'spk-1' },
      { id: 'ses-2', title: 'Building Sub-50ms Global Event Platforms', description: 'How to scale distributed real-time engines with Supabase & edge functions.', startTime: '11:30 AM', endTime: '01:00 PM', stage: 'Stage B (Tech)', speakerId: 'spk-2' }
    ],
    rating: 4.9,
    reviewCount: 328,
    seatsLeft: 42,
    totalCapacity: 2000,
    liveViewersCount: 1420,
    isFeatured: true,
    isTrending: true,
    priceFrom: 0
  },
  {
    id: 'evt-2',
    slug: 'neo-design-and-ux-con-2026',
    title: 'Neo Design & Micro-Interactions Expo',
    description: 'Immerse yourself in modern UI engineering, glassmorphism, neo-brutalism, fluid layout physics, and state-of-the-art interactive component design.',
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Framer Motion', 'Tailwind'],
    format: 'Physical',
    date: '2026-10-04',
    time: '10:00 AM - 05:00 PM',
    timezone: 'EST (UTC-5)',
    location: {
      venueName: 'Metropolitan Pavilion',
      address: '125 W 18th St, New York',
      city: 'New York',
      country: 'USA',
      lat: 40.7397,
      lng: -73.9961
    },
    banner: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'Figma & DesignSphere',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-201', name: 'Standard', price: 149, perks: ['Design Workshops', 'UI Asset Kit'], capacity: 300, available: 45 },
      { id: 'tier-202', name: 'VIP', price: 399, perks: ['Private Design Critique', 'Figma Pro License'], capacity: 50, available: 6 }
    ],
    speakers: [
      {
        id: 'spk-3',
        name: 'Sarah Chen',
        role: 'Design Director',
        company: 'Linear Studio',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        bio: 'Creator of high-performance minimalist interface systems and typography benchmarks.',
        topics: ['Micro-Animations', 'Linear Aesthetic']
      }
    ],
    sponsors: [
      { id: 'sp-3', name: 'Raycast', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Gold', website: 'https://raycast.com' }
    ],
    agenda: [
      { id: 'ses-3', title: 'Designing Interfaces That WOW Senior Engineers', description: 'Mastering whitespace, contrast ratios, and physics-based motion transitions.', startTime: '10:15 AM', endTime: '12:00 PM', stage: 'Design Stage 1', speakerId: 'spk-3' }
    ],
    rating: 4.85,
    reviewCount: 194,
    seatsLeft: 51,
    totalCapacity: 350,
    liveViewersCount: 890,
    isFeatured: true,
    isTrending: false,
    priceFrom: 149
  },
  {
    id: 'evt-3',
    slug: 'quantum-hackathon-2026',
    title: 'Quantum Hackathon & Builders Clash',
    description: '48 hours of non-stop hacking for $100,000 in prizes. Build next-gen AI applications, Web3 protocols, or autonomous edge services.',
    category: 'Hackathons',
    tags: ['Hackathon', 'Prize Pool', 'Open Source', 'AI Agents'],
    format: 'Hybrid',
    date: '2026-11-12',
    time: '24 Hours',
    timezone: 'GMT (UTC+0)',
    location: {
      venueName: 'London Innovation Hub & Discord',
      address: '10 Hacker Row, Shoreditch, London',
      city: 'London',
      country: 'UK',
      lat: 51.5235,
      lng: -0.0827,
      virtualLink: 'https://hack.eventsphere.io'
    },
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'DevPost & EventSphere',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-301', name: 'Free', price: 0, perks: ['Hacker Pass', 'Free Meals & Drinks', 'Cloud Credits'], capacity: 2000, available: 420 }
    ],
    speakers: [],
    sponsors: [],
    agenda: [],
    rating: 4.95,
    reviewCount: 512,
    seatsLeft: 420,
    totalCapacity: 2000,
    liveViewersCount: 2310,
    isFeatured: true,
    isTrending: true,
    priceFrom: 0
  }
];

export const MOCK_SEATS: Seat[] = Array.from({ length: 48 }, (_, idx) => {
  const row = String.fromCharCode(65 + Math.floor(idx / 8));
  const number = (idx % 8) + 1;
  const isVip = row === 'A' || row === 'B';
  const isFront = row === 'C';
  const isAccessible = idx === 46 || idx === 47;
  
  return {
    id: `seat-${row}-${number}`,
    row,
    number,
    category: isVip ? 'VIP' : isFront ? 'Front Row' : isAccessible ? 'Accessible' : 'Standard',
    price: isVip ? 799 : isFront ? 399 : 149,
    status: idx % 7 === 0 ? 'booked' : idx % 11 === 0 ? 'reserved' : 'available'
  };
});
