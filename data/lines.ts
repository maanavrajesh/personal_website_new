export const lines = [
  {
    id: "career",
    name: "Career Line",
    theme: "CMU and internships, ordered chronologically",
    color: "#d71920",
  },
  {
    id: "build",
    name: "Build Line",
    theme: "Projects shipped",
    color: "#0057b8",
  },
  {
    id: "privacy",
    name: "Privacy Line",
    theme: "Privacy-by-design work and interest",
    color: "#68c7a3",
  },
  {
    id: "security",
    name: "Security Line",
    theme: "Security engineering: auth, HMAC, hardening",
    color: "#3f3a8c",
  },
  {
    id: "integrity",
    name: "Integrity Line",
    theme: "Data integrity: validation and real-time correctness",
    color: "#d99a12",
  },
  {
    id: "travel",
    name: "Travel Line",
    theme: "Countries visited and transit systems noticed",
    color: "#008c8c",
  },
  {
    id: "off-hours",
    name: "Off-Hours Line",
    theme: "Soccer, metro-card collecting, and travel",
    color: "#3d3d3d",
  },
] as const;

export type LineId = (typeof lines)[number]["id"];
export type TransitLine = (typeof lines)[number];

export const lineById = Object.fromEntries(
  lines.map((line) => [line.id, line]),
) as Record<LineId, TransitLine>;
