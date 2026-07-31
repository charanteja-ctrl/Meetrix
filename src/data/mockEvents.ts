import type { EventItem, Seat } from '../types/event';

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-vitopia-2026',
    slug: 'vitopia-2026-international-fest',
    title: 'Vitopia 2026 — International Cultural & Sports Fest',
    description: 'VIT-AP University\'s premier annual mega festival! Featuring celebrity pro-nights, international cultural showcases, battle of the bands, fashion pageants, dance face-offs, and inter-collegiate sports tournaments.',
    category: 'Flagship Fests (Vitopia & VTAPP)',
    tags: ['Vitopia', 'Pro-Night', 'Celebrity Artist', 'Cultural Fest', 'Sports'],
    format: 'Physical (On-Campus)',
    date: '2026-09-24',
    time: '04:00 PM - 11:00 PM',
    timezone: 'IST (UTC+5:30)',
    location: {
      venueName: 'Open Air Theatre (OAT) & Central Sports Complex',
      address: 'Near Central Green Grounds, VIT-AP University',
      city: 'Amaravati / Vijayawada',
      country: 'India',
      lat: 16.4971,
      lng: 80.4992,
      virtualLink: 'https://vitopia.vitap.ac.in'
    },
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'VIT-AP Student Welfare Office & Vitopia Council',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-vit-1', name: 'Free Student Pass', price: 0, perks: ['Day Time Cultural Access', 'OAT Entry Pass'], capacity: 4000, available: 412 },
      { id: 'tier-vit-2', name: 'Standard', price: 299, perks: ['Pro-Night Arena Entry', 'Vitopia Official Swag Bag', 'Food Court Coupon'], capacity: 2000, available: 180 },
      { id: 'tier-vit-3', name: 'VIP Pro-Night Pass', price: 799, perks: ['Front Stage Reserved Pit', 'Celebrity Meet & Greet', 'VIP Lounge Access'], capacity: 250, available: 18 }
    ],
    speakers: [
      {
        id: 'spk-vit-1',
        name: 'Dr. S. V. Kota Reddy',
        role: 'Hon\'ble Vice Chancellor',
        company: 'VIT-AP University',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Inaugurating Vitopia 2026 and celebrating international student talent across 50+ universities.',
        topics: ['University Excellence', 'Global Youth Leadership']
      }
    ],
    sponsors: [
      { id: 'sp-vit-1', name: 'Stripe & Supabase', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Title Sponsor', website: 'https://vitap.ac.in' },
      { id: 'sp-vit-2', name: 'Red Bull India', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Platinum', website: 'https://redbull.com' }
    ],
    agenda: [
      { id: 'ses-vit-1', title: 'Grand Inauguration & Cultural Pageant', description: 'Opening dance acts and band performances by VIT-AP Music & Dance Clubs.', startTime: '04:30 PM', endTime: '06:30 PM', stage: 'OAT Mainstage', speakerId: 'spk-vit-1' },
      { id: 'ses-vit-2', title: 'Celebrity EDM & Bollywood Pro-Night', description: 'Headline performance by top international DJ & Bollywood musical star.', startTime: '07:30 PM', endTime: '10:30 PM', stage: 'OAT Mainstage', speakerId: 'spk-vit-1' }
    ],
    rating: 4.95,
    reviewCount: 1420,
    seatsLeft: 412,
    totalCapacity: 6000,
    liveViewersCount: 3840,
    isFeatured: true,
    isTrending: true,
    priceFrom: 0
  },
  {
    id: 'evt-vtapp-2026',
    slug: 'vtapp-2026-national-tech-fest',
    title: 'VTAPP 2026 — Annual National Tech Fest',
    description: 'The premier national technical festival organized across SCOPE, SENSE, SAS & VSB schools. Featuring 48h hackathons, robotics clash, AI paper symposiums, coding sprints, and tech expos.',
    category: 'Flagship Fests (Vitopia & VTAPP)',
    tags: ['VTAPP', 'Hackathon', 'SCOPE', 'AI & ML', 'Robotics'],
    format: 'Physical (On-Campus)',
    date: '2026-10-14',
    time: '09:00 AM - 08:00 PM',
    timezone: 'IST (UTC+5:30)',
    location: {
      venueName: 'APJ Abdul Kalam Auditorium (AB1) & Multipurpose Hall (MPH)',
      address: 'Academic Block 1 & Student Amenities Complex, VIT-AP',
      city: 'Amaravati / Vijayawada',
      country: 'India',
      lat: 16.4975,
      lng: 80.4998
    },
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'SCOPE (Computer Science) & GDSC VIT-AP',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-vt-1', name: 'Free Student Pass', price: 0, perks: ['Exhibition Pass', 'Certificate of Participation'], capacity: 2000, available: 320 },
      { id: 'tier-vt-2', name: 'Group Hacker Pass', price: 199, perks: ['48h Hackathon Entry (MPH)', 'Meals & Refreshments', 'Swag Kit'], capacity: 500, available: 64 }
    ],
    speakers: [
      {
        id: 'spk-vit-2',
        name: 'Dr. Jagadish Chandran',
        role: 'Dean, SCOPE',
        company: 'VIT-AP University',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'Keynote on Agentic Artificial Intelligence & High-Performance Distributed Systems.',
        topics: ['AI Engineering', 'Distributed Computing']
      }
    ],
    sponsors: [
      { id: 'sp-vit-3', name: 'Google Cloud & GeeksForGeeks', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', tier: 'Platinum', website: 'https://gfg.org' }
    ],
    agenda: [
      { id: 'ses-vt-1', title: 'National Hackathon Opening Sprint in Multipurpose Hall', description: '24-48h non-stop build marathon hosted by GDSC, ACM & GFG Chapters.', startTime: '10:00 AM', endTime: '06:00 PM', stage: 'MPH Student Amenities', speakerId: 'spk-vit-2' }
    ],
    rating: 4.9,
    reviewCount: 680,
    seatsLeft: 320,
    totalCapacity: 2500,
    liveViewersCount: 1920,
    isFeatured: true,
    isTrending: true,
    priceFrom: 0
  },
  {
    id: 'evt-ic4ai-2026',
    slug: 'ic4ai-2026-international-ai-conference',
    title: 'IC4AI 2026 — International Conference on AI & Deep Learning',
    description: 'High-level IEEE technical symposium organized by SCOPE & SENSE. Bringing together international researchers, foreign professors, and industry leaders to discuss LLMs, Agentic AI, and Quantum ML.',
    category: 'Conferences & EDPs',
    tags: ['IEEE', 'IC4AI', 'Research Paper', 'SCOPE', 'AI'],
    format: 'Hybrid',
    date: '2026-11-05',
    time: '09:30 AM - 05:30 PM',
    timezone: 'IST (UTC+5:30)',
    location: {
      venueName: 'APJ Abdul Kalam Auditorium (AB1 Stage 1)',
      address: 'Academic Block 1, VIT-AP Campus',
      city: 'Amaravati / Vijayawada',
      country: 'India',
      lat: 16.4971,
      lng: 80.4992,
      virtualLink: 'https://ic4ai.vitap.ac.in'
    },
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
    organizer: {
      name: 'IEEE Student Branch & SCOPE Research Lab',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      verified: true
    },
    ticketTiers: [
      { id: 'tier-ic-1', name: 'Free Student Pass', price: 0, perks: ['Auditorium Keynote Pass', 'Digital Certificate'], capacity: 500, available: 84 },
      { id: 'tier-ic-2', name: 'Standard', price: 499, perks: ['Paper Presentation Entry', 'IEEE Conference Kit', 'Faculty Lunch'], capacity: 150, available: 12 }
    ],
    speakers: [],
    sponsors: [],
    agenda: [],
    rating: 4.88,
    reviewCount: 310,
    seatsLeft: 84,
    totalCapacity: 650,
    liveViewersCount: 940,
    isFeatured: true,
    isTrending: false,
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
    price: isVip ? 799 : isFront ? 299 : 0,
    status: idx % 7 === 0 ? 'booked' : idx % 11 === 0 ? 'reserved' : 'available'
  };
});
