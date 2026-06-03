"use client";

import { motion } from "framer-motion";
import { lines, type LineId } from "@/data/lines";
import { siteContent } from "@/data/site";
import { stations, type Station } from "@/data/stations";
import {
  lineRoutes,
  mapViewBox,
  pointsToPath,
  stationGeometry,
  type StationGeometry,
} from "@/lib/mapGeometry";

type MetroMapProps = {
  selectedStationId: string | null;
  selectedLineId: LineId | null;
  onStationSelect: (stationId: string) => void;
  onLineSelect: (lineId: LineId | null) => void;
  reducedMotion: boolean;
};

export function MetroMap({
  selectedStationId,
  selectedLineId,
  onStationSelect,
  onLineSelect,
  reducedMotion,
}: MetroMapProps) {
  const copy = siteContent.map;

  return (
    <section className="metro-map-view min-h-screen px-[4vw] pb-6 pt-10">
      <div className="mb-5">
        <h1 className="text-6xl font-bold leading-none">{copy.title}</h1>
        <p className="mono mt-2 text-xs uppercase text-[var(--muted-ink)]">
          {copy.instructions}
        </p>
        <div className="mt-5 flex max-w-[1180px] flex-wrap gap-[6px]">
          <button
            type="button"
            onClick={() => onLineSelect(null)}
            className={`mono min-h-9 whitespace-nowrap border border-[var(--ink)] px-3 py-2 text-[0.68rem] uppercase leading-none ${
              selectedLineId === null ? "bg-[var(--ink)] text-[var(--board)]" : "bg-[var(--board)]"
            }`}
          >
            All stations
          </button>
          {lines.map((line) => (
            <button
              key={line.id}
              type="button"
              onClick={() => onLineSelect(line.id)}
              className={`mono inline-flex min-h-9 items-center gap-2 whitespace-nowrap border border-[var(--ink)] px-3 py-2 text-[0.68rem] uppercase leading-none ${
                selectedLineId === line.id
                  ? "bg-[var(--ink)] text-[var(--board)]"
                  : "bg-[var(--board)]"
              }`}
            >
              <span
                className="h-3 w-3 border border-current"
                style={{ backgroundColor: line.color }}
                aria-hidden="true"
              />
              {line.name}
            </button>
          ))}
        </div>
        <div className="mono mt-4 flex w-fit items-center gap-2 border border-[var(--hairline)] bg-[var(--board)] px-2 py-1">
          <span className="mono inline-block bg-[var(--ink)] px-2 py-0.5 text-[0.6rem] font-bold uppercase text-[var(--paper)]">
            {copy.currentMarker}
          </span>
          <span className="text-[0.68rem] uppercase leading-none text-[var(--muted-ink)]">
            {copy.currentMarkerLegend}
          </span>
        </div>
      </div>

      <div className="border border-[var(--ink)] bg-[var(--board)]">
        <svg
          className="map-surface h-[calc(100vh-172px)] min-h-[620px] w-full cursor-default"
          viewBox={`${mapViewBox.x} ${mapViewBox.y} ${mapViewBox.width} ${mapViewBox.height}`}
          role="application"
          aria-label={copy.ariaLabel}
        >
          <MapBackground />

          {lines.map((line, index) => (
            <motion.path
              key={line.id}
              d={pointsToPath(lineRoutes[line.id])}
              fill="none"
              stroke={line.color}
              strokeWidth="12"
              opacity={selectedLineId && selectedLineId !== line.id ? 0.18 : 1}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 1.05,
                delay: reducedMotion ? 0 : index * 0.08,
                ease: "easeOut" as const,
              }}
            />
          ))}

          {stations.map((station) => {
            const geometry = stationGeometry[station.id];
            if (!geometry) return null;

            return (
              <StationNode
                key={station.id}
                station={station}
                geometry={geometry}
                selected={selectedStationId === station.id}
                dimmed={selectedLineId ? !station.lines.includes(selectedLineId) : false}
                onSelect={onStationSelect}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function StationNode({
  station,
  geometry,
  selected,
  dimmed,
  onSelect,
}: {
  station: Station;
  geometry: StationGeometry;
  selected: boolean;
  dimmed: boolean;
  onSelect: (stationId: string) => void;
}) {
  const radius = station.isPrimary ? 31 : station.isMarquee ? 22 : station.isInterchange ? 14 : 8;
  const lineRings = station.lines.slice(0, station.isPrimary ? 5 : station.isMarquee ? 4 : 3);
  const labelDx = geometry.labelDx ?? 14;
  const labelDy = geometry.labelDy ?? -14;
  const labelAnchor = geometry.labelAnchor ?? "start";
  const labelWidth = Math.max(72, station.label.length * (station.isPrimary ? 12 : 10) + 28);
  const labelPlateHeight = station.isPrimary ? 34 : 28;
  const labelBoxX =
    labelAnchor === "end"
      ? labelDx - labelWidth - 8
      : labelAnchor === "middle"
        ? labelDx - labelWidth / 2
        : labelDx - 8;
  const labelPlateY = labelDy - labelPlateHeight / 2;
  const labelTextX = labelBoxX + labelWidth / 2;
  const labelTextY = labelPlateY + labelPlateHeight / 2 + 1;
  const currentMarkerX = geometry.currentMarkerDx ?? radius + 10;
  const currentMarkerY = geometry.currentMarkerDy ?? radius + 8;
  const copy = siteContent.map;

  function handleKeyDown(event: React.KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(station.id);
    }
  }

  function handleStationSelect(event: React.SyntheticEvent<SVGElement>) {
    event.stopPropagation();
    onSelect(station.id);
  }

  return (
    <g
      className="station-node cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`${copy.stationAction}: ${station.title}`}
      transform={`translate(${geometry.x} ${geometry.y})`}
      opacity={dimmed ? 0.28 : 1}
      onClick={handleStationSelect}
      onKeyDown={handleKeyDown}
      onPointerDown={handleStationSelect}
      onPointerUp={handleStationSelect}
      onMouseDown={handleStationSelect}
      onMouseUp={handleStationSelect}
    >
      <circle
        r={Math.max(radius + 30, 34)}
        fill="transparent"
        pointerEvents="all"
        aria-hidden="true"
      />
      <rect
        x={labelBoxX}
        y={labelPlateY}
        width={labelWidth}
        height={labelPlateHeight}
        fill="transparent"
        pointerEvents="all"
        aria-hidden="true"
      />
      <circle
        className="station-focus-ring"
        r={radius + 11}
        fill="none"
        stroke="var(--focus)"
        strokeWidth="4"
        opacity="0"
      />
      {selected ? (
        <circle r={radius + 8} fill="none" stroke="var(--ink)" strokeWidth="3" />
      ) : null}
      <circle r={radius + 4} fill="var(--board)" stroke="var(--ink)" strokeWidth="2" />
      {lineRings.map((lineId, index) => {
        const ringRadius = radius - index * (station.isMarquee ? 5 : 4);
        return (
          <circle
            key={lineId}
            r={ringRadius}
            fill={index === lineRings.length - 1 ? "var(--board)" : "none"}
            stroke={lines.find((line) => line.id === lineId)?.color}
            strokeWidth={station.isMarquee ? 4 : 3.5}
          />
        );
      })}
      <circle r={station.isMarquee ? 4 : 3} fill="var(--ink)" />
      <rect
        className="station-label-plate"
        x={labelBoxX}
        y={labelPlateY}
        width={labelWidth}
        height={labelPlateHeight}
        fill="var(--board)"
        stroke="var(--hairline)"
        strokeWidth="1"
        pointerEvents="none"
        aria-hidden="true"
      />
      {station.isPrimary ? <PrimaryMarker x={radius + 12} y={-(radius + 42)} /> : null}
      {station.isCurrent ? <CurrentMarker x={currentMarkerX} y={currentMarkerY} /> : null}
      <text
        x={labelTextX}
        y={labelTextY}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`station-label-text mono pointer-events-none fill-[var(--ink)] font-bold uppercase ${
          station.isPrimary ? "text-[19px]" : "text-[15px]"
        }`}
      >
        {station.label}
      </text>
    </g>
  );
}

function PrimaryMarker({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <rect x="0" y="-16" width="122" height="24" fill="var(--ticket-stock)" stroke="var(--ink)" />
      <text x="8" y="0" className="mono fill-[var(--ink)] text-[11px] font-bold uppercase">
        Main transfer
      </text>
    </g>
  );
}

function CurrentMarker({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <rect x="0" y="-16" width="116" height="24" fill="var(--ink)" />
      <text x="8" y="0" className="mono fill-[var(--paper)] text-[11px] font-bold uppercase">
        {siteContent.map.currentMarker}
      </text>
    </g>
  );
}

function MapBackground() {
  const horizontalGridPath = [100, 210, 320, 430, 540, 650, 760]
    .map((y) => `M80 ${y}H1200`)
    .join("");
  const verticalGridPath = [120, 320, 520, 720, 920, 1120]
    .map((x) => `M${x} 70V780`)
    .join("");

  return (
    <g aria-hidden="true">
      <rect
        x={mapViewBox.x}
        y={mapViewBox.y}
        width={mapViewBox.width}
        height={mapViewBox.height}
        fill="var(--board)"
      />
      <path
        d={horizontalGridPath}
        fill="none"
        stroke="var(--hairline)"
        strokeWidth="1"
      />
      <path
        d={verticalGridPath}
        fill="none"
        stroke="var(--hairline)"
        strokeWidth="1"
      />
    </g>
  );
}
