export interface VITAPVenue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  standingCapacity?: number;
  hardware: string[];
  approvalLevel: string;
  inCharge: string;
  image: string;
}

export interface VITAPClub {
  id: string;
  name: string;
  category: 'Technical' | 'Scientific & Professional' | 'Cultural & Social Outreach';
  email: string;
  schoolAffiliation: string; // e.g. SCOPE, SENSE, SAS, VSB, VIT-AP Law
  description: string;
  logo: string;
  leadName: string;
  facultyCoordinator: string;
}

export interface FFCSSlot {
  code: string; // e.g. "A1", "B1", "L1+L2"
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // "08:30"
  endTime: string; // "10:00"
}

export const VITAP_VENUES: VITAPVenue[] = [
  {
    id: 'V-AB1-AUD',
    name: 'APJ Abdul Kalam Auditorium',
    location: 'AB-1 Ground Floor, VIT-AP',
    capacity: 1200,
    hardware: ['Dual 4K Projectors', 'Dolby Atmos Surround Audio', 'Stage Spotlights', 'Green Rooms', 'Centralized AC'],
    approvalLevel: 'DSW + Registrar Sign-Off Required',
    inCharge: 'Estate Office & DSW Auditorium Manager',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-AB1-CR',
    name: 'Central Conference Hall',
    location: 'AB-1 First Floor (Admin Wing)',
    capacity: 250,
    hardware: ['86" Smart Interactive Panel', 'Polycom Video Conference Rig', 'High-Fidelity Mics'],
    approvalLevel: 'DSW + Administrative Office',
    inCharge: 'Admin Affairs & Registrar Office',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-MPH-01',
    name: 'Multipurpose Hall (MPH)',
    location: 'Central Student Amenities / Sports Complex',
    capacity: 1000,
    standingCapacity: 2500,
    hardware: ['Open Floor Layout', 'High-Wattage Concert PA System', 'Portable Stage', 'Dual Diesel Power Backups'],
    approvalLevel: 'DSW + Sports & Estate Dept',
    inCharge: 'Director of Physical Education & Sports',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-OAT-01',
    name: 'Open Air Theatre (OAT)',
    location: 'Central Green Lawns',
    capacity: 3500,
    hardware: ['Elevated Outdoor Stage', 'Acoustic Shell', 'High-Voltage 3-Phase Power Lines', 'Crowd Control Barricades'],
    approvalLevel: 'DSW + Estate Officer + Security Command',
    inCharge: 'Chief Security Officer & Student Welfare',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-AB1-SH1',
    name: 'Seminar Hall 1 & 2 (AB-1)',
    location: 'AB-1 Floor 1 & 2',
    capacity: 200,
    hardware: ['HD Laser Projector', 'Wireless Lapel Mics', 'Podium with Touch Interface'],
    approvalLevel: 'School Dean / DSW Approval',
    inCharge: 'SCOPE / SENSE School Office',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-AB2-SH1',
    name: 'Seminar Hall AB-2',
    location: 'AB-2 Floor 1',
    capacity: 300,
    hardware: ['Dual Side Displays', '7.1 Surround Sound', 'Tiered Amphitheater Seating'],
    approvalLevel: 'School Dean / DSW Approval',
    inCharge: 'AB-2 Facility Manager',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'V-LAB-MAC',
    name: 'Mac & High-Performance Computing Labs',
    location: 'AB-1 & AB-2 Computer Wing',
    capacity: 120,
    hardware: ['60-120 M2 Mac & RTX GPU Workstations', 'Gigabit Dedicated LAN', 'Nvidia CUDA Cluster Access'],
    approvalLevel: 'SCOPE Lab In-Charge & Dean SCOPE',
    inCharge: 'Dr. Ramesh Kumar (SCOPE Lab Director)',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const VITAP_CLUBS: VITAPClub[] = [
  // Technical Clubs
  {
    id: 'c-acm',
    name: 'ACM Student Chapter',
    category: 'Technical',
    email: 'acm.chapter@vitap.ac.in',
    schoolAffiliation: 'SCOPE (School of Computer Science)',
    description: 'Premier competitive programming and algorithmic thinking chapter conducting national coding sprints.',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80',
    leadName: 'Alex Rivera (23BCE1092)',
    facultyCoordinator: 'Dr. A. Sudhir (SCOPE)'
  },
  {
    id: 'c-gfg',
    name: 'GeeksForGeeks (GFG) VIT-AP Chapter',
    category: 'Technical',
    email: 'gfg.chapter@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Data structures, algorithms, system design, and placement interview prep bootcamps.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    leadName: 'Priya Sharma (23BCE2041)',
    facultyCoordinator: 'Dr. K. Senthil'
  },
  {
    id: 'c-csi',
    name: 'Computer Society of India (CSI)',
    category: 'Technical',
    email: 'csi@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Full-stack software engineering, mobile development, and DevOps workshops.',
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80',
    leadName: 'Rohan Verma (22BCE0412)',
    facultyCoordinator: 'Prof. M. Rajesh'
  },
  {
    id: 'c-gdsc',
    name: 'Google Developer Student Club (GDSC)',
    category: 'Technical',
    email: 'gdsc@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Official Google community focusing on Android, Flutter, TensorFlow, Google Cloud, and Solution Challenge.',
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=200&q=80',
    leadName: 'Vikram Aditya (23BCE0088)',
    facultyCoordinator: 'Dr. B. Srinivas'
  },
  {
    id: 'c-osc',
    name: 'Open Source Community (OSC)',
    category: 'Technical',
    email: 'osc@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Organizers of Hacktoberfest, Linux kernel contributions, and open-source software sprints.',
    logo: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=200&q=80',
    leadName: 'Sanya Malhotra (23BCE1892)',
    facultyCoordinator: 'Dr. T. Venkat'
  },
  {
    id: 'c-null',
    name: 'Null Chapter (Cybersecurity)',
    category: 'Technical',
    email: 'null.chapter@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Offensive security, penetration testing, CTF competitions (NULL Humla, NULL Pulia), and malware analysis.',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80',
    leadName: 'Kabir Das (22BCE1140)',
    facultyCoordinator: 'Dr. N. Suresh (Cybersecurity Wing)'
  },
  {
    id: 'c-mlc',
    name: 'Machine Learning Club (MLC)',
    category: 'Technical',
    email: 'mlc@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Generative AI, Large Language Models, Computer Vision, and PyTorch research papers.',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    leadName: 'Ananya Reddy (23BCE0911)',
    facultyCoordinator: 'Dr. V. Deepa'
  },
  {
    id: 'c-nextgen',
    name: 'NextGen Cloud Club',
    category: 'Technical',
    email: 'nextgen.cloud@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Kubernetes, Docker, AWS Solutions Architecture, and Infrastructure-as-Code.',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80',
    leadName: 'Rahul Mehta (23BCE1400)',
    facultyCoordinator: 'Prof. S. Charan'
  },
  {
    id: 'c-wios',
    name: 'WiOS (Women in Open Source)',
    category: 'Technical',
    email: 'wios@vitap.ac.in',
    schoolAffiliation: 'SCOPE',
    description: 'Empowering women engineers in open-source development, leadership, and technical research.',
    logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    leadName: 'Kavya Nair (23BCE0501)',
    facultyCoordinator: 'Dr. P. Swathi'
  },
  
  // Scientific & Professional
  {
    id: 'c-ieee',
    name: 'VIT-AP IEEE Student Branch',
    category: 'Scientific & Professional',
    email: 'ieee@vitap.ac.in',
    schoolAffiliation: 'SENSE & SCOPE',
    description: 'International IEEE paper publications, robotics expos, and signal processing symposiums.',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    leadName: 'Arjun Das (22ECE0199)',
    facultyCoordinator: 'Dr. R. Anand (SENSE)'
  },
  {
    id: 'c-seds',
    name: 'SEDS Aurora (Space Exploration & Development)',
    category: 'Scientific & Professional',
    email: 'seds.aurora@vitap.ac.in',
    schoolAffiliation: 'SENSE & SAS',
    description: 'Model rocketry, CanSat satellite building, and astrophysics observation nights.',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80',
    leadName: 'Nikhil Roy (23BCE1288)',
    facultyCoordinator: 'Dr. K. Bhaskar (SAS)'
  },
  {
    id: 'c-photon',
    name: 'Photon Club',
    category: 'Scientific & Professional',
    email: 'photon.club@vitap.ac.in',
    schoolAffiliation: 'SAS (School of Advanced Sciences)',
    description: 'Optics, quantum physics, solar energy harvesting, and laser physics research.',
    logo: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=200&q=80',
    leadName: 'Diya Sen (23BS1011)',
    facultyCoordinator: 'Dr. G. Murugan'
  },

  // Cultural & Social Outreach
  {
    id: 'c-uddeshya',
    name: 'Uddeshya Social Club',
    category: 'Cultural & Social Outreach',
    email: 'uddeshya@vitap.ac.in',
    schoolAffiliation: 'DSW',
    description: 'Teaching underprivileged children in local villages around Amaravati & organizing laptop donation drives.',
    logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80',
    leadName: 'Sneha Patel (23BBA0091)',
    facultyCoordinator: 'Dr. L. Mary (DSW)'
  },
  {
    id: 'c-yrc-nss',
    name: 'Youth Red Cross (YRC) & NSS',
    category: 'Cultural & Social Outreach',
    email: 'nss.yrc@vitap.ac.in',
    schoolAffiliation: 'DSW',
    description: 'Annual mega blood donation drives, eco-sustainability tree plantations, and health camps.',
    logo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=200&q=80',
    leadName: 'Manoj Kumar (22BCE0811)',
    facultyCoordinator: 'Prof. K. Ramu'
  },
  {
    id: 'c-music-dance',
    name: 'Music & Dance Club',
    category: 'Cultural & Social Outreach',
    email: 'cultural.music@vitap.ac.in',
    schoolAffiliation: 'DSW',
    description: 'Eastern Classical, Western Rock, Hip-Hop, and Vitopia pro-night inaugurations.',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
    leadName: 'Rhea Chakraborty (23BCE0411)',
    facultyCoordinator: 'Dr. S. Chitra'
  },
  {
    id: 'c-theatre',
    name: 'Theatre & Dramatics (Nukkad Natak)',
    category: 'Cultural & Social Outreach',
    email: 'theatre@vitap.ac.in',
    schoolAffiliation: 'DSW',
    description: 'Street plays, mime, stage drama, and social awareness theatrical skits.',
    logo: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=200&q=80',
    leadName: 'Aman Deep (23BCE0998)',
    facultyCoordinator: 'Prof. V. Mohan'
  }
];

export const FFCS_SLOTS: FFCSSlot[] = [
  { code: 'A1', day: 'Monday', startTime: '08:30', endTime: '10:00' },
  { code: 'A2', day: 'Monday', startTime: '14:00', endTime: '15:30' },
  { code: 'B1', day: 'Tuesday', startTime: '08:30', endTime: '10:00' },
  { code: 'B2', day: 'Tuesday', startTime: '14:00', endTime: '15:30' },
  { code: 'C1', day: 'Wednesday', startTime: '08:30', endTime: '10:00' },
  { code: 'C2', day: 'Wednesday', startTime: '14:00', endTime: '15:30' },
  { code: 'D1', day: 'Thursday', startTime: '08:30', endTime: '10:00' },
  { code: 'D2', day: 'Thursday', startTime: '14:00', endTime: '15:30' },
  { code: 'E1', day: 'Friday', startTime: '08:30', endTime: '10:00' },
  { code: 'E2', day: 'Friday', startTime: '14:00', endTime: '15:30' },
  { code: 'L1+L2', day: 'Monday', startTime: '10:05', endTime: '11:45' },
  { code: 'L31+L32', day: 'Wednesday', startTime: '10:05', endTime: '11:45' },
];
