// ─── Types ───────────────────────────────────────────────────────────────────

export interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  attendees: number;
  image: string;
  tag: string;
  tagColor: string;
  featured: boolean;
  description: string;
  organizer: {
    name: string;
    avatar: string;
    bio: string;
  };
  schedule: { time: string; title: string; speaker?: string }[];
  highlights: string[];
}

export interface Category {
  name: string;
  icon: string;
  count: number;
  accent: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  desc: string;
  accent: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Discover", href: "/events" },
  { label: "Categories", href: "/categories" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const CATEGORIES: Category[] = [
  { name: "Technology", icon: "⚡", count: 284, accent: "#6366f1" },
  { name: "Music", icon: "🎵", count: 519, accent: "#ec4899" },
  { name: "Business", icon: "📈", count: 173, accent: "#f59e0b" },
  { name: "Sports", icon: "🏆", count: 342, accent: "#10b981" },
  { name: "Art & Design", icon: "🎨", count: 201, accent: "#a78bfa" },
  { name: "Food & Drink", icon: "🍷", count: 388, accent: "#f97316" },
  { name: "Health", icon: "🧠", count: 156, accent: "#06b6d4" },
  { name: "Education", icon: "📚", count: 447, accent: "#84cc16" },
  { name: "Theatre", icon: "🎭", count: 0, accent: "#e11d48" },
  { name: "Comedy", icon: "😂", count: 0, accent: "#facc15" },
  { name: "Film & Cinema", icon: "🎬", count: 0, accent: "#fb923c" },
  { name: "Fitness & Wellness", icon: "🧘", count: 0, accent: "#14b8a6" },
  { name: "Gaming & Esports", icon: "🎮", count: 0, accent: "#8b5cf6" },
];

export const CATEGORY_ICONS: Record<string, string> = {
  All: "◈",
  Technology: "⚡",
  Music: "🎵",
  Business: "📈",
  Sports: "🏆",
  "Art & Design": "🎨",
  "Food & Drink": "🍷",
  Health: "🧠",
  Education: "📚",
  Theatre: "🎭",
  Comedy: "😂",
  "Film & Cinema": "🎬",
  "Fitness & Wellness": "🧘",
  "Gaming & Esports": "🎮",
};

export const FILTER_CATEGORIES = [
  "All",
  "Technology",
  "Music",
  "Business",
  "Sports",
  "Art & Design",
  "Food & Drink",
  "Health",
  "Education",
  "Theatre",
  "Comedy",
  "Film & Cinema",
  "Fitness & Wellness",
  "Gaming & Esports",
];

export const SORT_OPTIONS = [
  "Relevance",
  "Date: Soonest",
  "Price: Low to High",
  "Price: High to Low",
  "Most Popular",
];

export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    icon: "✦",
    title: "AI-Powered Matching",
    desc: "Our proprietary engine analyzes your interests and behavioral signals to surface events you'll love before you even search.",
    accent: "#6366f1",
  },
  {
    icon: "⬡",
    title: "Instant Booking",
    desc: "One-tap checkout with Apple Pay, Google Pay, and 40+ payment methods. Tickets land in your wallet in seconds.",
    accent: "#ec4899",
  },
  {
    icon: "◈",
    title: "Smart Reminders",
    desc: "Intelligent alerts timed to your commute, traffic, and personal schedule — so you're never late to what matters.",
    accent: "#f59e0b",
  },
  {
    icon: "⊕",
    title: "Live Analytics",
    desc: "Organizers get real-time dashboards with attendance heatmaps, revenue forecasts, and audience sentiment.",
    accent: "#10b981",
  },
];

// ─── Events Data ─────────────────────────────────────────────────────────────

export const EVENTS: Event[] = [
  {
    id: 1,
    title: "Global AI Summit 2026",
    category: "Technology",
    date: "May 14, 2026",
    time: "9:00 AM",
    location: "San Francisco, CA",
    price: 299,
    attendees: 4200,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    tag: "Trending",
    tagColor: "#f97316",
    featured: true,
    description:
      "The Global AI Summit brings together the world's leading minds in artificial intelligence for three days of groundbreaking keynotes, hands-on workshops, and unparalleled networking. Explore the latest breakthroughs in large language models, computer vision, robotics, and AI ethics. From startup founders to Fortune 500 CTOs, this is where the future of AI takes shape.",
    organizer: {
      name: "TechForward Inc.",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80",
      bio: "TechForward is a global technology events company producing 50+ conferences annually across 20 countries.",
    },
    schedule: [
      { time: "9:00 AM", title: "Doors Open & Registration" },
      { time: "10:00 AM", title: "Opening Keynote: The State of AI in 2026", speaker: "Dr. Sarah Chen" },
      { time: "11:30 AM", title: "Panel: LLMs in Enterprise", speaker: "Multiple Speakers" },
      { time: "1:00 PM", title: "Networking Lunch" },
      { time: "2:30 PM", title: "Workshop: Building with GPT-6", speaker: "Alex Rivera" },
      { time: "4:00 PM", title: "Fireside Chat: AI Ethics & Governance", speaker: "Prof. James Okafor" },
      { time: "5:30 PM", title: "Closing Remarks & Cocktail Reception" },
    ],
    highlights: [
      "30+ World-class speakers",
      "Hands-on AI workshops",
      "Startup pitch competition",
      "VIP networking lounge",
      "Certificate of attendance",
    ],
  },
  {
    id: 2,
    title: "Neon Music Festival",
    category: "Music",
    date: "Jun 21, 2026",
    time: "6:00 PM",
    location: "Miami, FL",
    price: 149,
    attendees: 12000,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    tag: "Hot",
    tagColor: "#ec4899",
    featured: true,
    description:
      "Neon Music Festival is Miami's most electrifying 3-day music experience, featuring world-renowned DJs, live performances, immersive art installations, and stunning beachside stages. Dance under neon-lit skies, discover emerging artists, and create unforgettable memories. With multiple stages spanning EDM, house, techno, and pop, there's something for every music lover.",
    organizer: {
      name: "Neon Events Co.",
      avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
      bio: "Neon Events Co. produces immersive music festivals across the Americas, reaching 500K+ attendees annually.",
    },
    schedule: [
      { time: "6:00 PM", title: "Gates Open" },
      { time: "7:00 PM", title: "Opening Act: Sunrise Stage", speaker: "DJ Luna" },
      { time: "8:30 PM", title: "Main Stage Headliner", speaker: "The Midnight" },
      { time: "10:00 PM", title: "Neon Light Show Experience" },
      { time: "11:00 PM", title: "Beach Stage: Late Night Set", speaker: "Zara Wave" },
      { time: "1:00 AM", title: "Silent Disco" },
    ],
    highlights: [
      "3 stages, 40+ artists",
      "Immersive neon art installations",
      "VIP beach lounge access",
      "Food village with 20+ vendors",
      "Free festival merchandise",
    ],
  },
  {
    id: 3,
    title: "Future Finance Forum",
    category: "Business",
    date: "Jul 5, 2026",
    time: "10:00 AM",
    location: "New York, NY",
    price: 499,
    attendees: 2800,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    tag: "Exclusive",
    tagColor: "#a78bfa",
    featured: false,
    description:
      "The Future Finance Forum convenes the brightest minds in fintech, banking, and decentralized finance for a day of intensive learning and networking. Discover how blockchain, AI-driven trading, and digital banking are reshaping the financial landscape. Connect with investors, regulators, and innovators who are defining the next era of finance.",
    organizer: {
      name: "FinanceNext Global",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      bio: "FinanceNext Global is a premier financial events company focused on the intersection of technology and finance.",
    },
    schedule: [
      { time: "10:00 AM", title: "Welcome & Opening Remarks" },
      { time: "10:30 AM", title: "Keynote: The Future of Digital Banking", speaker: "Maria Santos" },
      { time: "12:00 PM", title: "Panel: DeFi vs Traditional Finance" },
      { time: "1:30 PM", title: "Executive Lunch" },
      { time: "3:00 PM", title: "Workshop: AI in Risk Management", speaker: "David Kim" },
      { time: "4:30 PM", title: "Investor Matchmaking Session" },
      { time: "6:00 PM", title: "Cocktail Networking" },
    ],
    highlights: [
      "C-suite executive audience",
      "Investor matchmaking",
      "Regulatory insights panel",
      "Fintech startup showcase",
      "Exclusive research report",
    ],
  },
  {
    id: 4,
    title: "Digital Arts Expo",
    category: "Art & Design",
    date: "Aug 10, 2026",
    time: "11:00 AM",
    location: "Los Angeles, CA",
    price: 89,
    attendees: 6500,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    tag: "New",
    tagColor: "#34d399",
    featured: false,
    description:
      "The Digital Arts Expo celebrates the intersection of technology and creativity. Explore stunning digital art installations, attend live-creation sessions by renowned digital artists, and participate in workshops covering 3D modeling, generative art, motion design, and more. Whether you're a seasoned artist or curious beginner, this expo will inspire your creative journey.",
    organizer: {
      name: "CreativeCode Labs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      bio: "CreativeCode Labs bridges the gap between art and technology through events, workshops, and collaborative projects.",
    },
    schedule: [
      { time: "11:00 AM", title: "Exhibition Opens" },
      { time: "12:00 PM", title: "Live Art Creation: Generative Worlds", speaker: "Yuki Tanaka" },
      { time: "1:30 PM", title: "Workshop: Introduction to TouchDesigner" },
      { time: "3:00 PM", title: "Panel: NFTs & The Future of Digital Art" },
      { time: "4:30 PM", title: "Interactive Installations Walk" },
      { time: "6:00 PM", title: "Closing Gallery & Awards" },
    ],
    highlights: [
      "50+ interactive installations",
      "Live art creation sessions",
      "Free software trials",
      "Portfolio review by experts",
      "Art marketplace",
    ],
  },
  {
    id: 5,
    title: "React Summit Europe",
    category: "Technology",
    date: "Sep 3, 2026",
    time: "9:30 AM",
    location: "Amsterdam, NL",
    price: 349,
    attendees: 3100,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    tag: "Trending",
    tagColor: "#f97316",
    featured: false,
    description:
      "React Summit Europe is the largest React conference in the EU, bringing together framework creators, open-source maintainers, and thousands of developers for two days of talks, workshops, and community building. Deep-dive into React Server Components, the latest in state management, performance optimization, and what's coming in React 20.",
    organizer: {
      name: "GitNation",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
      bio: "GitNation organizes the world's largest JavaScript and developer conferences, reaching 100K+ developers globally.",
    },
    schedule: [
      { time: "9:30 AM", title: "Registration & Coffee" },
      { time: "10:00 AM", title: "Keynote: React in 2026 and Beyond", speaker: "React Core Team" },
      { time: "11:30 AM", title: "Deep Dive: Server Components at Scale", speaker: "Kent C. Dodds" },
      { time: "1:00 PM", title: "Lunch & Networking" },
      { time: "2:00 PM", title: "Workshop Track A: Advanced Patterns" },
      { time: "2:00 PM", title: "Workshop Track B: Testing Mastery" },
      { time: "4:00 PM", title: "Lightning Talks" },
      { time: "5:00 PM", title: "After-Party" },
    ],
    highlights: [
      "React Core Team keynote",
      "20+ expert speakers",
      "Hands-on workshops",
      "Open-source contributor lounge",
      "Job board & career fair",
    ],
  },
  {
    id: 6,
    title: "Jazz Under the Stars",
    category: "Music",
    date: "Jun 30, 2026",
    time: "7:30 PM",
    location: "New Orleans, LA",
    price: 75,
    attendees: 850,
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    tag: "Intimate",
    tagColor: "#fbbf24",
    featured: false,
    description:
      "An enchanting evening of world-class jazz under the open sky in the heart of New Orleans. Experience intimate performances by Grammy-nominated artists in a beautifully curated garden setting. Savor craft cocktails, local cuisine, and the unmistakable magic of live jazz. Limited to 850 guests for an truly exclusive experience.",
    organizer: {
      name: "NOLA Jazz Collective",
      avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&q=80",
      bio: "NOLA Jazz Collective preserves and celebrates the rich jazz heritage of New Orleans through intimate live events.",
    },
    schedule: [
      { time: "7:30 PM", title: "Doors Open — Welcome Cocktail" },
      { time: "8:00 PM", title: "Opening Set", speaker: "The Bayou Quartet" },
      { time: "9:00 PM", title: "Headliner Performance", speaker: "Marcus Miller" },
      { time: "10:15 PM", title: "Intermission & Dessert Service" },
      { time: "10:45 PM", title: "Late Night Jazz Jam Session" },
      { time: "12:00 AM", title: "Event Closes" },
    ],
    highlights: [
      "Grammy-nominated headliner",
      "Craft cocktail bar included",
      "Gourmet food pairings",
      "Garden setting under the stars",
      "Limited to 850 guests",
    ],
  },
  {
    id: 7,
    title: "Startup World Cup",
    category: "Business",
    date: "Oct 12, 2026",
    time: "8:00 AM",
    location: "Austin, TX",
    price: 199,
    attendees: 5400,
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    tag: "Hot",
    tagColor: "#ec4899",
    featured: false,
    description:
      "The Startup World Cup is the ultimate battleground for the world's most promising startups. Watch 50 hand-picked founders pitch to a panel of legendary investors for a grand prize of $1M in funding. Attend masterclasses on fundraising, product-market fit, and scaling, and network with 5,000+ founders, VCs, and industry leaders.",
    organizer: {
      name: "Pegasus Tech Ventures",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
      bio: "Pegasus Tech Ventures is a global VC firm that organizes the world's largest startup pitch competition.",
    },
    schedule: [
      { time: "8:00 AM", title: "Registration & Breakfast" },
      { time: "9:00 AM", title: "Opening Keynote: What Investors Want in 2026" },
      { time: "10:30 AM", title: "Pitch Round 1: 25 Startups" },
      { time: "12:30 PM", title: "Networking Lunch" },
      { time: "2:00 PM", title: "Pitch Round 2: 25 Startups" },
      { time: "4:00 PM", title: "Masterclass: Scaling from 0 to $100M" },
      { time: "5:30 PM", title: "Grand Finale & $1M Prize Award" },
      { time: "7:00 PM", title: "Closing Party" },
    ],
    highlights: [
      "$1M grand prize",
      "50 curated startup pitches",
      "Top-tier VC judges",
      "Fundraising masterclasses",
      "5,000+ attendee network",
    ],
  },
  {
    id: 8,
    title: "Mindfulness & Wellness Retreat",
    category: "Health",
    date: "Jul 19, 2026",
    time: "8:00 AM",
    location: "Sedona, AZ",
    price: 420,
    attendees: 200,
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    tag: "Exclusive",
    tagColor: "#a78bfa",
    featured: false,
    description:
      "Escape the noise and reconnect with yourself at our exclusive Mindfulness & Wellness Retreat nestled in the red rock landscape of Sedona. This transformative 2-day experience combines guided meditation, yoga, breathwork, sound healing, and nature immersion. Led by world-renowned wellness practitioners, this retreat is designed for deep restoration and personal growth.",
    organizer: {
      name: "Inner Light Wellness",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      bio: "Inner Light Wellness creates transformative retreat experiences that integrate ancient wisdom with modern science.",
    },
    schedule: [
      { time: "8:00 AM", title: "Sunrise Meditation" },
      { time: "9:30 AM", title: "Vinyasa Yoga Flow", speaker: "Elena Voss" },
      { time: "11:00 AM", title: "Breathwork & Sound Healing" },
      { time: "12:30 PM", title: "Organic Farm-to-Table Lunch" },
      { time: "2:00 PM", title: "Red Rock Nature Walk" },
      { time: "4:00 PM", title: "Workshop: Building a Daily Practice", speaker: "Dr. Maya Patel" },
      { time: "6:00 PM", title: "Sunset Ceremony & Closing Circle" },
    ],
    highlights: [
      "Intimate group of 200",
      "All meals included (organic)",
      "Red rock nature immersion",
      "Expert-led sessions",
      "Take-home meditation guide",
    ],
  },
  {
    id: 9,
    title: "Street Food World Series",
    category: "Food & Drink",
    date: "Aug 2, 2026",
    time: "12:00 PM",
    location: "Portland, OR",
    price: 35,
    attendees: 9200,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    tag: "New",
    tagColor: "#34d399",
    featured: false,
    description:
      "The Street Food World Series brings the world's best street food vendors to Portland for an epic two-day culinary celebration. Sample dishes from 100+ vendors representing 40 countries, watch live cooking competitions, and vote for the World Street Food Champion. From Bangkok's pad thai to Mexico City's tacos al pastor, travel the world one bite at a time.",
    organizer: {
      name: "Global Eats Festival Co.",
      avatar: "https://images.unsplash.com/photo-1547592180-85f173990554?w=100&q=80",
      bio: "Global Eats Festival Co. celebrates food culture through festivals that connect communities around the world.",
    },
    schedule: [
      { time: "12:00 PM", title: "Festival Gates Open" },
      { time: "1:00 PM", title: "Live Cooking Battle: Round 1" },
      { time: "2:30 PM", title: "Masterclass: Perfect Street Tacos", speaker: "Chef Rosa Martinez" },
      { time: "4:00 PM", title: "World Food Passport Challenge" },
      { time: "5:30 PM", title: "Live Music & Food Pairing" },
      { time: "7:00 PM", title: "Championship Finals & Awards" },
      { time: "8:30 PM", title: "Night Market Opens" },
    ],
    highlights: [
      "100+ food vendors",
      "40 countries represented",
      "Live cooking competitions",
      "Beer & wine garden",
      "$5 tasting portions available",
    ],
  },
  {
    id: 10,
    title: "Champions League Final",
    category: "Sports",
    date: "May 31, 2026",
    time: "8:00 PM",
    location: "London, UK",
    price: 850,
    attendees: 90000,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    tag: "Sold Out Soon",
    tagColor: "#f43f5e",
    featured: true,
    description:
      "Experience the pinnacle of European football at the UEFA Champions League Final at Wembley Stadium. Two of Europe's finest clubs battle for continental glory in one of the most-watched sporting events on the planet. Feel the roar of 90,000 fans, witness world-class football, and be part of sporting history.",
    organizer: {
      name: "UEFA",
      avatar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&q=80",
      bio: "UEFA is the governing body of European football, organizing the world's most prestigious club competition.",
    },
    schedule: [
      { time: "5:00 PM", title: "Stadium Gates Open" },
      { time: "6:00 PM", title: "Fan Zone Activities" },
      { time: "7:30 PM", title: "Pre-Match Entertainment" },
      { time: "7:50 PM", title: "Team Warm-Ups" },
      { time: "8:00 PM", title: "Kick-Off" },
      { time: "8:45 PM", title: "Half-Time Show" },
      { time: "9:50 PM", title: "Full-Time / Extra Time" },
      { time: "10:30 PM", title: "Trophy Presentation" },
    ],
    highlights: [
      "Wembley Stadium, London",
      "90,000 capacity",
      "Pre-match entertainment",
      "Official fan zone",
      "Commemorative match program",
    ],
  },
  {
    id: 11,
    title: "UX Design Intensive",
    category: "Education",
    date: "Jun 8, 2026",
    time: "10:00 AM",
    location: "Online",
    price: 129,
    attendees: 1800,
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    tag: "Online",
    tagColor: "#06b6d4",
    featured: false,
    description:
      "A comprehensive 3-day online bootcamp designed to take your UX design skills to the next level. Learn from senior designers at top tech companies through live workshops covering user research, interaction design, prototyping in Figma, and design systems. Build a portfolio piece during the event and get feedback from industry mentors.",
    organizer: {
      name: "DesignMasters Academy",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
      bio: "DesignMasters Academy offers world-class design education through live workshops and mentorship programs.",
    },
    schedule: [
      { time: "10:00 AM", title: "Welcome & Setup" },
      { time: "10:30 AM", title: "Module 1: User Research Methods", speaker: "Lisa Park" },
      { time: "12:00 PM", title: "Break" },
      { time: "1:00 PM", title: "Module 2: Interaction Design Patterns", speaker: "Marcus Wei" },
      { time: "3:00 PM", title: "Hands-On: Figma Prototyping Workshop" },
      { time: "4:30 PM", title: "Portfolio Review & Feedback" },
      { time: "5:30 PM", title: "Q&A & Wrap-Up" },
    ],
    highlights: [
      "Live instruction (not recorded)",
      "Figma prototyping hands-on",
      "Portfolio piece included",
      "1-on-1 mentor feedback",
      "Certificate of completion",
    ],
  },
  {
    id: 12,
    title: "Cybersecurity Con 2026",
    category: "Technology",
    date: "Nov 4, 2026",
    time: "9:00 AM",
    location: "Washington, DC",
    price: 599,
    attendees: 3700,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    tag: "Trending",
    tagColor: "#f97316",
    featured: false,
    description:
      "Cybersecurity Con is the definitive conference for security professionals, ethical hackers, and CISOs. Dive into the latest threat landscapes, zero-day vulnerability research, and defense strategies. Participate in live capture-the-flag competitions, attend classified briefings, and connect with the global security community.",
    organizer: {
      name: "CyberShield Events",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&q=80",
      bio: "CyberShield Events produces premier cybersecurity conferences connecting defenders, researchers, and industry leaders.",
    },
    schedule: [
      { time: "9:00 AM", title: "Registration & Security Badge Pickup" },
      { time: "9:45 AM", title: "Keynote: The 2026 Threat Landscape", speaker: "Director NSA (Ret.)" },
      { time: "11:00 AM", title: "Track A: Zero-Day Research" },
      { time: "11:00 AM", title: "Track B: Cloud Security" },
      { time: "12:30 PM", title: "Networking Lunch" },
      { time: "2:00 PM", title: "Capture The Flag Competition Begins" },
      { time: "4:00 PM", title: "Panel: AI-Powered Cyber Defense" },
      { time: "5:30 PM", title: "CTF Awards & Closing" },
    ],
    highlights: [
      "Live CTF competition",
      "Classified briefing sessions",
      "Top security researchers",
      "Vendor showcase floor",
      "Free security toolkit",
    ],
  },
  {
    id: 13,
    title: "The Phantom of the Opera",
    category: "Theatre",
    date: "Dec 12, 2026",
    time: "7:30 PM",
    location: "Majestic Theatre, NY",
    price: 125,
    attendees: 1600,
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
    tag: "Classic",
    tagColor: "#e11d48",
    featured: true,
    description: "Experience the legendary Phantom of the Opera in its original home. A hauntingly beautiful score and breathtaking stagecraft tell the story of the masked figure who haunts the catacombs of the Paris Opera House.",
    organizer: {
      name: "Broadway Productions",
      avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=100&q=80",
      bio: "Bringing the best of Broadway to the world stage for over 50 years."
    },
    schedule: [
      { time: "7:00 PM", title: "Doors Open" },
      { time: "7:30 PM", title: "Act I" },
      { time: "8:45 PM", title: "Intermission" },
      { time: "9:15 PM", title: "Act II" },
      { time: "10:30 PM", title: "Curtain Call" }
    ],
    highlights: ["Original Broadway production", "Live orchestra", "Iconic chandelier drop", "Award-winning cast"]
  },
  {
    id: 14,
    title: "Laughter Lounge Night",
    category: "Comedy",
    date: "Nov 20, 2026",
    time: "8:00 PM",
    location: "The Chuckle Hub, Chicago",
    price: 45,
    attendees: 300,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    tag: "Hilarious",
    tagColor: "#facc15",
    featured: false,
    description: "A night of non-stop laughs featuring top local talent and a special surprise headliner from Netflix. Grab a drink and settle in for the funniest night of the month.",
    organizer: {
      name: "Laugh Factory",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&q=80",
      bio: "Chicago's premier destination for stand-up comedy since 1985."
    },
    schedule: [
      { time: "7:30 PM", title: "Doors Open & Happy Hour" },
      { time: "8:00 PM", title: "Host Introduction", speaker: "Mike Miller" },
      { time: "8:15 PM", title: "Opening Set", speaker: "Sarah Jenkins" },
      { time: "8:45 PM", title: "Middle Act", speaker: "The Improv Duo" },
      { time: "9:30 PM", title: "Headliner", speaker: "Surprise Guest" }
    ],
    highlights: ["Surprise headliner", "Drink specials", "Intimate venue", "No drink minimum"]
  },
  {
    id: 15,
    title: "Indie Film Premiere",
    category: "Film & Cinema",
    date: "Oct 5, 2026",
    time: "6:30 PM",
    location: "Ritzy Cinema, London",
    price: 25,
    attendees: 450,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    tag: "Exclusive",
    tagColor: "#fb923c",
    featured: false,
    description: "Be the first to see the year's most anticipated independent drama. Followed by an exclusive Q&A with the director and lead cast members.",
    organizer: {
      name: "Cinema Society",
      avatar: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&q=80",
      bio: "A community of film lovers dedicated to independent cinema."
    },
    schedule: [
      { time: "6:30 PM", title: "Red Carpet Arrivals" },
      { time: "7:00 PM", title: "Film Screening" },
      { time: "9:00 PM", title: "Director Q&A", speaker: "Elena Russo" },
      { time: "9:45 PM", title: "After-party" }
    ],
    highlights: ["World premiere", "Director Q&A", "Limited edition poster", "Complimentary popcorn"]
  },
  {
    id: 16,
    title: "Zen Yoga Workshop",
    category: "Fitness & Wellness",
    date: "Sep 15, 2026",
    time: "10:00 AM",
    location: "The Green Space, Seattle",
    price: 60,
    attendees: 150,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    tag: "Relaxing",
    tagColor: "#14b8a6",
    featured: false,
    description: "Deepen your practice with this intensive 4-hour workshop focused on alignment, breath, and meditation. Suitable for all levels.",
    organizer: {
      name: "Wellness Collective",
      avatar: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&q=80",
      bio: "Promoting holistic health through movement and mindfulness."
    },
    schedule: [
      { time: "10:00 AM", title: "Opening Circle & Breathwork" },
      { time: "10:30 AM", title: "Vinyasa Flow" },
      { time: "12:00 PM", title: "Alignment Clinic" },
      { time: "1:30 PM", title: "Guided Meditation & Savasana" }
    ],
    highlights: ["Expert instructors", "Healthy snacks provided", "Yoga mat rentals included", "Take-home guide"]
  },
  {
    id: 17,
    title: "Esports Masters 2026",
    category: "Gaming & Esports",
    date: "Aug 25, 2026",
    time: "2:00 PM",
    location: "Cyber Arena, Seoul",
    price: 80,
    attendees: 5000,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    tag: "Live",
    tagColor: "#8b5cf6",
    featured: true,
    description: "The world's top esports teams compete for glory and a massive prize pool in the most anticipated tournament of the year. Experience the energy of a live arena.",
    organizer: {
      name: "Global Gaming League",
      avatar: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&q=80",
      bio: "The leader in professional esports tournaments worldwide."
    },
    schedule: [
      { time: "2:00 PM", title: "Opening Ceremony" },
      { time: "3:00 PM", title: "Quarter Finals" },
      { time: "5:00 PM", title: "Semi Finals" },
      { time: "8:00 PM", title: "Grand Finale" }
    ],
    highlights: ["$1M prize pool", "Top pro teams", "Exclusive merch booth", "Live fan zone"]
  },
  {
    id: 18,
    title: "Hamlet: A Modern Twist",
    category: "Theatre",
    date: "Nov 5, 2026",
    time: "8:00 PM",
    location: "Globe Theatre, London",
    price: 95,
    attendees: 1200,
    image: "https://images.unsplash.com/photo-1503095396549-80705bc068d6?w=800&q=80",
    tag: "Must-See",
    tagColor: "#e11d48",
    featured: false,
    description: "Shakespeare's masterpiece reimagined for the 21st century. This bold production explores themes of power, family, and madness in a sleek, contemporary setting.",
    organizer: {
      name: "The Royal Shakespeare Company",
      avatar: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=100&q=80",
      bio: "Renowned for innovative productions of Shakespeare's works."
    },
    schedule: [
      { time: "7:30 PM", title: "Doors Open" },
      { time: "8:00 PM", title: "Act I" },
      { time: "9:30 PM", title: "Intermission" },
      { time: "10:00 PM", title: "Act II" }
    ],
    highlights: ["Contemporary reimagining", "Stellar lead performance", "Innovative stage design"]
  },
  {
    id: 19,
    title: "Stand Up Showcase",
    category: "Comedy",
    date: "Dec 5, 2026",
    time: "9:00 PM",
    location: "Gotham Comedy Club, NY",
    price: 35,
    attendees: 250,
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
    tag: "Top Rated",
    tagColor: "#facc15",
    featured: false,
    description: "Catch the rising stars of the comedy world in this high-energy showcase. Five comedians, one mic, and endless laughs.",
    organizer: {
      name: "Gotham Comedy",
      avatar: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=100&q=80",
      bio: "The legendary home of New York's finest comedy."
    },
    schedule: [
      { time: "8:30 PM", title: "Doors Open" },
      { time: "9:00 PM", title: "Showcase Starts" },
      { time: "10:30 PM", title: "Post-show Mixer" }
    ],
    highlights: ["Best of NY comedy", "Great food menu", "Celebrity drop-ins"]
  }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatAttendees(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

export function getEventById(id: number): Event | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getRelatedEvents(event: Event, limit = 3): Event[] {
  return EVENTS.filter(
    (e) => e.id !== event.id && e.category === event.category
  ).slice(0, limit);
}

export function getFeaturedEvents(): Event[] {
  return EVENTS.filter((e) => e.featured);
}
