import type { LineId } from "@/data/lines";
import { skills } from "@/data/skills";

export type StationLink = {
  label: string;
  href: string;
};

export type Station = {
  id: string;
  title: string;
  label: string;
  lines: LineId[];
  date: string;
  summary: string;
  bullets?: string[];
  skillGroups?: Array<{
    label: string;
    values: readonly string[];
  }>;
  tech?: string[];
  links?: StationLink[];
  image?: string;
  isInterchange?: boolean;
  isCurrent?: boolean;
  isMarquee?: boolean;
  isPrimary?: boolean;
  checksum: string;
};

export const stations: Station[] = [
  {
    id: "cmu",
    title: "Carnegie Mellon University",
    label: "CMU",
    lines: ["career", "build"],
    date: "Aug 2025 - May 2028",
    summary: "B.S. in Information Systems & Computer Science — the shared origin hub for the Career and Build lines.",
    bullets: [
      "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Web Application Development.",
    ],
    tech: ["Artificial Intelligence", "Information Systems", "Product thinking"],
    isInterchange: true,
    checksum: "sha256: 3b7e9014",
  },
  {
    id: "skills-hub",
    title: "Languages & Frameworks",
    label: "Skills Hub",
    lines: ["career", "build", "privacy", "security", "integrity"],
    date: "Always in service",
    summary:
      "The main transfer station for the tools I use most often: practical languages and frameworks for building privacy-aware, data-reliable systems.",
    skillGroups: [
      { label: "Languages", values: skills.languages },
      { label: "Frameworks", values: skills.frameworks },
    ],
    isInterchange: true,
    isMarquee: true,
    isPrimary: true,
    checksum: "sha256: 61c2b840",
  },
  {
    id: "goldenlink",
    title: "GoldenLink",
    label: "GoldenLink",
    lines: ["build"],
    date: "Dec 2025 - Jan 2026",
    summary: "Full-stack web application for nursing homes to manage volunteer opportunities and resident event sign-ups.",
    bullets: [
      "Designed and built a full-stack web application for nursing homes to manage volunteer opportunities, resident event sign-ups, and fragmented manual coordination workflows.",
      "Developed Django REST APIs for authentication, event registration, waitlist promotion, role-based access control, and transaction-safe signups backed by PostgreSQL.",
      "Built a React dashboard focused on simple, accessible user flows for event discovery, one-click signups, volunteer hour tracking, and administrative coordination.",
    ],
    tech: ["Python", "Django", "React", "PostgreSQL", "REST APIs"],
    links: [{ label: "GitHub", href: "https://github.com/maanavrajesh" }],
    checksum: "sha256: 7850d21b",
  },
  {
    id: "data-center-ticketing",
    title: "Data Center Centralized Ticketing System",
    label: "Ticketing",
    lines: ["build", "security", "integrity"],
    date: "Jan 2026 - Present",
    summary: "Security-hardened centralized ticketing system integrating Jira Cloud REST APIs with real-time operational updates.",
    bullets: [
      "Engineered a security-hardened Node.js/TypeScript backend integrating Jira Cloud REST APIs, HMAC-SHA256 verification, rate limiting, and Zod validation to defend against forged requests, injection, and abuse.",
      "Built a multi-tier parsing system converting unstructured ticket summaries into structured intervention targets using regex, label extraction, and LLM fallback via the Anthropic Claude API.",
      "Architected a Supabase PostgreSQL data layer with normalized schemas for facilities, racks, devices, and components, with Server-Sent Events powering real-time operational updates across connected clients.",
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Jira API",
      "HMAC-SHA256",
      "Zod",
      "Server-Sent Events",
    ],
    links: [{ label: "GitHub", href: "https://github.com/maanavrajesh" }],
    isInterchange: true,
    isCurrent: true,
    checksum: "sha256: c4ad9102",
  },
  {
    id: "workbenchai",
    title: "CMU HCII Lab",
    label: "HCII Lab",
    lines: ["career", "build"],
    date: "Jan 2026 - May 2026",
    summary: "Software Engineer Intern at CMU's Human-Computer Interaction Institute, building backend services for WorkBenchAI — an AI-powered HR automation platform.",
    bullets: [
      "Architected and built backend services for WorkBenchAI, an AI-powered HR automation platform that structures employee lifecycle workflows and reduces manual onboarding overhead for small businesses.",
      "Designed an LLM-driven document generation pipeline integrating hosted LLM APIs with structured HR workflow data, automating personalized compliance reminders, lifecycle trigger notifications, and onboarding artifacts at scale.",
      "Built an agentic AI HR assistant with conversational query handling over employee data using Node.js, TypeScript, and PostgreSQL, modeled with object-oriented service abstractions for extensibility across HR domains.",
      "Leveraged Cursor and Claude Code throughout development to accelerate iteration on prompt engineering, schema design, and API integration, critically reviewing AI-generated code before merging.",
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "REST APIs", "OOP services"],
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/maanav-rajesh/" }],
    isInterchange: true,
    checksum: "sha256: b09077d6",
  },
  {
    id: "vision-xi",
    title: "Vision XI — AI Soccer Analytics",
    label: "Vision XI",
    lines: ["build", "off-hours"],
    date: "Feb 2026",
    summary: "Tartan Hacks 2026 — an AI soccer analytics platform with end-to-end pipeline from video upload to real-time YOLOv8 player tracking.",
    bullets: [
      "Built a Flask backend and relational database schema for an AI soccer analytics platform that processed match video, coordinated YOLOv8 player tracking, and stored movement metrics in SQLite.",
      "Implemented an end-to-end pipeline from video upload to CV inference, metric extraction, and LLM-generated tactical analysis, supporting near real-time player tracking at approximately 30 FPS.",
    ],
    tech: ["Python", "Flask", "YOLOv8", "SQLite", "OpenRouter"],
    links: [{ label: "GitHub", href: "https://github.com/maanavrajesh" }],
    isInterchange: true,
    checksum: "sha256: e71843aa",
  },
  {
    id: "go-fraud-pipeline",
    title: "Privacy-Preserving Risk Signal Pipeline",
    label: "Risk Signals",
    lines: ["build", "privacy", "security", "integrity"],
    date: "2026 - Present",
    summary:
      "A Go-based event pipeline for real-time risk signals: user activity is processed with statistical and rule-based detection while raw PII is hashed at ingestion, sensitive values are tokenized, and analysis runs on anonymized identifiers.",
    tech: [
      "Go",
      "Event streaming",
      "Privacy-by-design",
      "Tokenization",
      "Hashing",
      "Fraud detection",
    ],
    links: [{ label: "GitHub", href: "https://github.com/maanavrajesh" }],
    isInterchange: true,
    isCurrent: true,
    isMarquee: true,
    checksum: "sha256: f96a33c8",
  },
  {
    id: "privy",
    title: "CMU SPUD Lab",
    label: "SPUD Lab",
    lines: ["career", "privacy", "security"],
    date: "May 2026 - Present",
    summary: "Incoming Software Engineer Intern at CMU's Security and Privacy Lab, developing Privy — an LLM-powered privacy engineering platform.",
    bullets: [
      "Selected to develop Privy, an LLM-powered privacy engineering platform that helps product teams assess privacy risks, generate mitigation strategies, and improve decision-making before launch.",
      "Preparing to build full-stack features for internal deployment with an industry partner, extending prior evaluations with 30+ AI practitioners into product-ready workflows.",
      "Will contribute across backend APIs, React interfaces, PostgreSQL data models, and privacy-focused validation logic for secure handling of product and user-risk data.",
    ],
    tech: ["Python", "Flask", "React", "PostgreSQL", "Privacy engineering"],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/maanav-rajesh/" },
      { label: "Email", href: "mailto:maanavr@andrew.cmu.edu" },
    ],
    isInterchange: true,
    isCurrent: true,
    checksum: "sha256: 1fd934bb",
  },
  {
    id: "metro-card-collecting",
    title: "Metro-card Collecting",
    label: "Cards",
    lines: ["off-hours"],
    date: "Ongoing",
    summary:
      "I love collecting metro cards from the countries I have visited; the format of this site is built around that habit.",
    tech: ["Transit systems", "Printed ephemera", "Interface detail"],
    checksum: "sha256: 593e13fc",
  },
  {
    id: "soccer-football",
    title: "Soccer / Football",
    label: "Soccer",
    lines: ["off-hours"],
    date: "Ongoing",
    summary:
      "I love watching and playing soccer, and I have been playing since I was 5.",
    tech: ["Tactics", "Analytics", "Team systems"],
    checksum: "sha256: 91c0ab77",
  },
  {
    id: "world-travel",
    title: "World Travel",
    label: "World Travel",
    lines: ["travel", "off-hours"],
    date: "Ongoing",
    summary:
      "Travel as a way to study how cities move people: signage, fare cards, station rituals, and the quiet logic of public systems.",
    tech: ["Transit literacy", "Wayfinding", "Metro-card collecting"],
    isInterchange: true,
    checksum: "sha256: aa817c31",
  },
  {
    id: "japan",
    title: "Japan",
    label: "Japan",
    lines: ["travel"],
    date: "Visited",
    summary:
      "JR passes, Suica, Pasmo, and station choreography make Japan the clearest reference point for the printed-pass feel of this portfolio.",
    tech: ["JR Pass", "Suica", "Pasmo", "Rail wayfinding"],
    checksum: "sha256: 048aa2c9",
  },
  {
    id: "south-korea",
    title: "South Korea",
    label: "South Korea",
    lines: ["travel"],
    date: "Visited",
    summary:
      "T-money cards and dense urban rail systems bring the Korean transit-card influence into the ticket metadata and compact labeling.",
    tech: ["T-money", "Seoul Metro", "Fare cards"],
    checksum: "sha256: 7bb23c59",
  },
  {
    id: "denmark",
    title: "Denmark",
    label: "Denmark",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Copenhagen Metro adds restraint: flat color, generous air, and a system that feels precise without shouting.",
    tech: ["Copenhagen Metro", "Rejsekort", "Scandinavian restraint"],
    checksum: "sha256: f1563482",
  },
  {
    id: "norway",
    title: "Norway",
    label: "Norway",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Norway brings Ruter-style clarity and the kind of quiet, legible station language that rewards repeated use.",
    tech: ["Ruter", "Oslo transit", "Wayfinding"],
    checksum: "sha256: c04aa8fd",
  },
  {
    id: "spain-madrid",
    title: "Spain (Madrid)",
    label: "Madrid",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Metro de Madrid supplies the red confidence, the official lozenge attitude, and the proof that flat color can carry an entire identity.",
    tech: ["Metro de Madrid", "Transit cards", "Flat red identity"],
    checksum: "sha256: 60d9f11a",
  },
  {
    id: "singapore",
    title: "Singapore",
    label: "Singapore",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Singapore MRT and EZ-Link show how a compact system can feel efficient, clean, and operationally exact.",
    tech: ["MRT", "EZ-Link", "Operational design"],
    checksum: "sha256: 86e5207b",
  },
  {
    id: "thailand",
    title: "Thailand",
    label: "Thailand",
    lines: ["travel"],
    date: "Visited",
    summary:
      "BTS, MRT, and Rabbit cards add another model for multi-network urban movement and station-level fare design.",
    tech: ["BTS", "MRT", "Rabbit card"],
    checksum: "sha256: ba93d12e",
  },
  {
    id: "indonesia",
    title: "Indonesia",
    label: "Indonesia",
    lines: ["travel"],
    date: "Visited",
    summary:
      "MRT Jakarta and KRL systems show fast-growing city transit with a different visual language and operating cadence.",
    tech: ["MRT Jakarta", "KRL", "Urban rail"],
    checksum: "sha256: 4cf0d772",
  },
  {
    id: "mexico",
    title: "Mexico",
    label: "Mexico",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Mexico City Metro is a masterclass in icon-led wayfinding, line color, and station identity at civic scale.",
    tech: ["CDMX Metro", "Station icons", "Line color"],
    checksum: "sha256: 29e0cd4c",
  },
  {
    id: "costa-rica",
    title: "Costa Rica",
    label: "Costa Rica",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Costa Rica rounds out the travel line with a more road-and-route-centered transit memory than a metro-card one.",
    tech: ["Public routes", "Travel planning", "Local systems"],
    checksum: "sha256: de72a934",
  },
  {
    id: "canada",
    title: "Canada",
    label: "Canada",
    lines: ["travel"],
    date: "Visited",
    summary:
      "Canada adds Presto, Compass, STM, and the card variants that make fare media feel local even when the job is universal.",
    tech: ["Presto", "Compass", "STM", "Fare media"],
    checksum: "sha256: 8e671a4d",
  },
];

export const stationById = Object.fromEntries(
  stations.map((station) => [station.id, station]),
) as Record<string, Station>;
