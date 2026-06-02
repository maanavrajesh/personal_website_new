import type { LineId } from "@/data/lines";

export type MapPoint = {
  x: number;
  y: number;
};

export type StationGeometry = MapPoint & {
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
};

export const mapViewBox = {
  x: 0,
  y: 0,
  width: 1180,
  height: 760,
};

export const stationGeometry: Record<string, StationGeometry> = {
  cmu: { x: 120, y: 378, labelDx: -12, labelDy: -24, labelAnchor: "end" },
  "skills-hub": { x: 610, y: 390, labelDx: 0, labelDy: -42, labelAnchor: "middle" },
  goldenlink: { x: 270, y: 500, labelDx: -22, labelDy: 32, labelAnchor: "end" },
  "data-center-ticketing": { x: 500, y: 500, labelDx: -16, labelDy: 38, labelAnchor: "middle" },
  workbenchai: { x: 420, y: 330, labelDx: -16, labelDy: -24, labelAnchor: "middle" },
  "vision-xi": { x: 650, y: 560, labelDx: 0, labelDy: 42, labelAnchor: "middle" },
  "go-fraud-pipeline": { x: 790, y: 390, labelDx: 22, labelDy: -30, labelAnchor: "start" },
  privy: { x: 640, y: 220, labelDx: 16, labelDy: -28, labelAnchor: "start" },
  "metro-card-collecting": { x: 160, y: 650, labelDx: 0, labelDy: 34, labelAnchor: "middle" },
  "soccer-football": { x: 400, y: 650, labelDx: 0, labelDy: 34, labelAnchor: "middle" },
  "world-travel": { x: 900, y: 650, labelDx: 0, labelDy: -38, labelAnchor: "middle" },
  japan: { x: 1010, y: 120, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  "south-korea": { x: 1030, y: 180, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  denmark: { x: 1048, y: 240, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  norway: { x: 1058, y: 300, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  "spain-madrid": { x: 1064, y: 360, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  singapore: { x: 1058, y: 420, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  thailand: { x: 1048, y: 480, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  indonesia: { x: 1030, y: 540, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  mexico: { x: 1005, y: 605, labelDx: 18, labelDy: -26, labelAnchor: "start" },
  "costa-rica": { x: 975, y: 660, labelDx: 18, labelDy: -28, labelAnchor: "start" },
  canada: { x: 945, y: 690, labelDx: -14, labelDy: 30, labelAnchor: "end" },
};

// The routes are hand-authored in station order so the Career and Build lines read as timelines.
// Intermediate points create deliberate metro-style bends without changing station content.
export const lineRoutes: Record<LineId, MapPoint[]> = {
  career: [
    stationGeometry.cmu,
    { x: 260, y: 378 },
    stationGeometry.workbenchai,
    stationGeometry["skills-hub"],
    { x: 670, y: 315 },
    stationGeometry.privy,
  ],
  build: [
    stationGeometry.cmu,
    { x: 190, y: 430 },
    stationGeometry.goldenlink,
    stationGeometry["data-center-ticketing"],
    stationGeometry.workbenchai,
    stationGeometry["skills-hub"],
    { x: 585, y: 485 },
    stationGeometry["vision-xi"],
    { x: 720, y: 510 },
    stationGeometry["go-fraud-pipeline"],
  ],
  privacy: [
    stationGeometry.privy,
    { x: 710, y: 270 },
    stationGeometry["skills-hub"],
    stationGeometry["go-fraud-pipeline"],
  ],
  security: [
    stationGeometry.privy,
    { x: 585, y: 340 },
    stationGeometry["data-center-ticketing"],
    stationGeometry["skills-hub"],
    { x: 650, y: 455 },
    stationGeometry["go-fraud-pipeline"],
  ],
  integrity: [
    stationGeometry["data-center-ticketing"],
    { x: 560, y: 450 },
    stationGeometry["skills-hub"],
    stationGeometry["go-fraud-pipeline"],
  ],
  travel: [
    stationGeometry["world-travel"],
    stationGeometry.canada,
    stationGeometry["costa-rica"],
    stationGeometry.mexico,
    stationGeometry.indonesia,
    stationGeometry.thailand,
    stationGeometry.singapore,
    stationGeometry["spain-madrid"],
    stationGeometry.norway,
    stationGeometry.denmark,
    stationGeometry["south-korea"],
    stationGeometry.japan,
  ],
  "off-hours": [
    stationGeometry["metro-card-collecting"],
    stationGeometry["soccer-football"],
    stationGeometry["vision-xi"],
    { x: 760, y: 620 },
    stationGeometry["world-travel"],
  ],
};

export function pointsToPath(points: MapPoint[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}
