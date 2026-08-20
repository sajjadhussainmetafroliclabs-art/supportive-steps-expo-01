/**
 * Ported 1:1 from the original web app's src/lib/data.ts.
 *
 * NOTE: This was mock/static data in the source app — there was no real
 * backend or API integration to migrate. It's kept here in the same shape
 * so a real API layer (e.g. via @tanstack/react-query) can be swapped in
 * later without touching the screens that consume it.
 */

export type Supervisor = {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  licenseType: string;
  city: string;
  state: string;
  years: number;
  rating: number;
  reviewCount: number;
  bio: string;
  tags: string[];
};

export const supervisors: Supervisor[] = [
  {
    id: "amara-hale",
    name: "Dr. Amara Hale",
    credentials: "LPC-S, PhD",
    specialty: "Trauma & EMDR",
    licenseType: "LPC Supervisor",
    city: "Austin",
    state: "Texas",
    years: 14,
    rating: 4.9,
    reviewCount: 38,
    bio: "Supervises pre-licensure counselors with a relational, trauma-informed lens. Weekly group and individual hours available.",
    tags: ["Supportive", "Responsive", "Ethical"],
  },
  {
    id: "marcus-reed",
    name: "Marcus Reed",
    credentials: "LMFT-S",
    specialty: "Couples & Family",
    licenseType: "LMFT Supervisor",
    city: "Denver",
    state: "Colorado",
    years: 11,
    rating: 4.6,
    reviewCount: 24,
    bio: "Systemic family therapy supervisor focused on structured case conceptualisation and clear documentation practices.",
    tags: ["Professional", "Structured"],
  },
  {
    id: "priya-nandini",
    name: "Priya Nandini",
    credentials: "LCSW-S",
    specialty: "Community Mental Health",
    licenseType: "LCSW Supervisor",
    city: "Chicago",
    state: "Illinois",
    years: 9,
    rating: 4.8,
    reviewCount: 31,
    bio: "Advocates for sustainable caseloads and burnout prevention. Strong emphasis on cultural humility in supervision.",
    tags: ["Supportive", "Ethical", "Flexible"],
  },
  {
    id: "elena-vasquez",
    name: "Dr. Elena Vasquez",
    credentials: "LPC-S",
    specialty: "Adolescents & Schools",
    licenseType: "LPC Supervisor",
    city: "Phoenix",
    state: "Arizona",
    years: 17,
    rating: 4.4,
    reviewCount: 19,
    bio: "School-based counseling supervisor with experience guiding associates through licensure boards and audits.",
    tags: ["Responsive", "Professional"],
  },
];

export type Review = {
  id: string;
  supervisorId: string;
  supervisorName: string;
  rating: number;
  tags: string[];
  body: string;
  date: string;
};

export const recentReviews: Review[] = [
  {
    id: "r1",
    supervisorId: "amara-hale",
    supervisorName: "Dr. Amara Hale",
    rating: 5,
    tags: ["Supportive", "Ethical"],
    body: "Consistently made space for my questions and never rushed a case discussion. Documentation feedback was clear and kind.",
    date: "2 days ago",
  },
  {
    id: "r2",
    supervisorId: "priya-nandini",
    supervisorName: "Priya Nandini",
    rating: 5,
    tags: ["Responsive"],
    body: "Replied within a day on urgent client-safety questions and helped me build a realistic caseload plan.",
    date: "5 days ago",
  },
  {
    id: "r3",
    supervisorId: "marcus-reed",
    supervisorName: "Marcus Reed",
    rating: 4,
    tags: ["Professional"],
    body: "Very organised supervision hours. Would have appreciated more emphasis on self-of-the-therapist work.",
    date: "1 week ago",
  },
];

export const experienceTags = [
  "Supportive",
  "Responsive",
  "Professional",
  "Ethical",
  "Flexible",
  "Structured",
];

export const states = ["Texas", "Colorado", "Illinois", "Arizona"];
export const specialties = [
  "Trauma & EMDR",
  "Couples & Family",
  "Community Mental Health",
  "Adolescents & Schools",
];
export const licenseTypes = ["LPC Supervisor", "LMFT Supervisor", "LCSW Supervisor"];
