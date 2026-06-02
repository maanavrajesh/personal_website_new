"use client";

import { useMemo, useState } from "react";
import { MetroMap } from "@/components/MetroMap";
import { MobileLineIndex } from "@/components/MobileLineIndex";
import { StationDetailPanel } from "@/components/StationDetailPanel";
import { Ticket } from "@/components/Ticket";
import type { LineId } from "@/data/lines";
import { siteContent } from "@/data/site";
import { stationById } from "@/data/stations";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Home() {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<LineId | null>(null);
  const isMobile = useBreakpoint(767);
  const reducedMotion = usePrefersReducedMotion();
  const selectedStation = useMemo(
    () => (selectedStationId ? stationById[selectedStationId] ?? null : null),
    [selectedStationId],
  );

  function enterMap(lineId?: LineId) {
    setSelectedStationId(null);
    setSelectedLineId(lineId ?? null);
    window.requestAnimationFrame(() => {
      document.getElementById("metro-map")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <main className="min-h-screen bg-[var(--platform)] text-[var(--ink)]">
      <Ticket onEnter={enterMap} reducedMotion={reducedMotion} />

      <section id="metro-map" className="relative min-h-screen scroll-mt-0 bg-[var(--paper)] pb-8">
        {isMobile ? (
          <MobileLineIndex
            selectedStationId={selectedStationId}
            selectedLineId={selectedLineId}
            onStationSelect={setSelectedStationId}
            onLineSelect={setSelectedLineId}
          />
        ) : (
          <MetroMap
            selectedStationId={selectedStationId}
            selectedLineId={selectedLineId}
            onStationSelect={setSelectedStationId}
            onLineSelect={setSelectedLineId}
            reducedMotion={reducedMotion}
          />
        )}

        <StationDetailPanel
          station={selectedStation}
          onClose={() => setSelectedStationId(null)}
          reducedMotion={reducedMotion}
        />

        <Footer />
      </section>
    </main>
  );
}

function Footer() {
  const copy = siteContent.footer;

  return (
    <footer className="mono border-t border-[var(--ink)] bg-[var(--paper)] px-4 py-3 text-[0.68rem] uppercase text-[var(--muted-ink)] md:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>{copy.copyright}</span>
          <span>{copy.privacyNote}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {siteContent.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
              rel="noreferrer"
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
