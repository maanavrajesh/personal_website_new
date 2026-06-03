"use client";

import { lines } from "@/data/lines";
import type { LineId } from "@/data/lines";
import { siteContent } from "@/data/site";
import { stations } from "@/data/stations";
import { cn } from "@/lib/utils";

type MobileLineIndexProps = {
  selectedStationId: string | null;
  selectedLineId: LineId | null;
  onStationSelect: (stationId: string) => void;
  onLineSelect: (lineId: LineId | null) => void;
};

export function MobileLineIndex({
  selectedStationId,
  selectedLineId,
  onStationSelect,
  onLineSelect,
}: MobileLineIndexProps) {
  const copy = siteContent.lineIndex;
  const orderedLines = selectedLineId
    ? [
        lines.find((line) => line.id === selectedLineId),
        ...lines.filter((line) => line.id !== selectedLineId),
      ].filter(Boolean)
    : lines;

  return (
    <section className="mobile-line-index px-4 pb-6 pt-10 md:hidden">
      <div className="border-b border-[var(--ink)] pb-5">
        <h1 className="text-5xl font-bold leading-none">{copy.title}</h1>
        <p className="mono mt-3 text-xs uppercase text-[var(--muted-ink)]">
          {copy.instructions}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onLineSelect(null)}
            className="mono border border-[var(--ink)] bg-[var(--board)] px-3 py-2 text-[0.68rem] uppercase"
          >
            All stations
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {orderedLines.map((line) => {
          if (!line) return null;
          const lineStations = stations.filter((station) => station.lines.includes(line.id));

          return (
            <section key={line.id} className="border border-[var(--ink)] bg-[var(--board)]">
              <button
                type="button"
                onClick={() => onLineSelect(line.id)}
                className="flex w-full items-stretch border-b border-[var(--ink)] text-left"
              >
                <div
                  className="w-4 border-r border-[var(--ink)]"
                  style={{ backgroundColor: line.color }}
                  aria-hidden="true"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold leading-none">{line.name}</h2>
                  <p className="mono mt-2 text-[0.7rem] uppercase text-[var(--muted-ink)]">
                    {line.theme}
                  </p>
                </div>
              </button>

              <div className="divide-y divide-[var(--hairline)]">
                {lineStations.map((station) => (
                  <button
                    key={`${line.id}-${station.id}`}
                    type="button"
                    onClick={() => onStationSelect(station.id)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 text-left hover:bg-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus)]",
                      selectedStationId === station.id && "bg-[var(--paper)]",
                    )}
                  >
                    <span className="font-bold leading-tight">{station.title}</span>
                    <span className="mono text-right text-[0.68rem] uppercase text-[var(--muted-ink)]">
                      {station.date}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
