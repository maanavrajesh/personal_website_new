"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { lines, type LineId } from "@/data/lines";
import { siteContent } from "@/data/site";

type TicketProps = {
  onEnter: (lineId?: LineId) => void;
  reducedMotion: boolean;
};

const lineCodes: Record<LineId, string> = {
  career: "CAR",
  build: "BLD",
  privacy: "PRV",
  security: "SEC",
  integrity: "INT",
  travel: "TRV",
  "off-hours": "OFF",
};

const countryCards = [
  {
    id: "japan",
    city: "Tokyo / Odakyu",
    country: "Japan",
    code: "JP-082",
    nativeText: "小田急線 / 東京",
    detail: "Sakura transfer",
    className: "country-card-japan",
  },
  {
    id: "korea",
    city: "Seoul Metro",
    country: "South Korea",
    code: "KR-TM",
    nativeText: "서울 지하철",
    detail: "T-money pass",
    className: "country-card-korea",
  },
  {
    id: "copenhagen",
    city: "Copenhagen Metro",
    country: "Denmark",
    code: "DK-M4",
    nativeText: "København",
    detail: "M4 clean line",
    className: "country-card-copenhagen",
  },
  {
    id: "madrid",
    city: "Metro de Madrid",
    country: "Spain",
    code: "ES-L1",
    nativeText: "Metro de Madrid",
    detail: "Billete sencillo",
    className: "country-card-madrid",
  },
  {
    id: "singapore",
    city: "MRT / EZ-Link",
    country: "Singapore",
    code: "SG-CC",
    nativeText: "新加坡 MRT",
    detail: "Tap in / tap out",
    className: "country-card-singapore",
  },
] as const;

export function Ticket({ onEnter, reducedMotion }: TicketProps) {
  const content = siteContent.ticket;

  return (
    <motion.section
      className="ticket-stage relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-8 sm:px-6"
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: reducedMotion ? 0 : 0.42, ease: "easeOut" }}
    >
      <div className="ticket-stack relative z-10 w-full max-w-[1080px]" aria-label="Transit ticket stack">
        <div className="country-card-field" aria-hidden="true">
          {countryCards.map((card, index) => (
            <CountryCard key={card.id} card={card} index={index} />
          ))}
        </div>

        <article className="ticket-main">
          <TicketTexture ink="#20150e" opacity="0.08" />
          <TicketCuts />

          <div className="relative z-10 grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr_220px]">
            <aside className="ticket-date-rail mono">
              <span>{content.issuedValue.replace("2026-", "20XX.")}</span>
              <span className="ticket-date-arrow">&gt;</span>
            </aside>

            <section className="ticket-body">
              <header className="ticket-head mono">
                <div>
                  <span className="ticket-mark">M</span>
                  <span>{content.systemName}</span>
                </div>
                <span>{content.routeCode}</span>
              </header>

              <div className="ticket-route-grid mono" aria-label="Route details">
                <TicketRouteCell label="route" value="MR-082" />
                <TicketRouteCell label="from" value="CMU" />
                <TicketRouteCell label="to" value="Build Systems" />
                <TicketRouteCell label="zone" value="All" />
              </div>

              <div className="ticket-identity">
                <div>
                  <p className="mono ticket-honorific">Portfolio holder</p>
                  <h1>{content.name}</h1>
                  <p className="mono ticket-role">{content.role}</p>
                </div>

                <div className="ticket-qr-block">
                  <a
                    href={content.qrValue}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={content.qrHeading}
                  >
                    <QRCodeSVG
                      value={content.qrValue}
                      size={92}
                      bgColor="#fff2df"
                      fgColor="#17130e"
                      level="M"
                      marginSize={1}
                    />
                  </a>
                  <span className="mono">{content.qrHeading}</span>
                </div>

                <div className="ticket-stamp mono" aria-hidden="true">
                  VALID
                </div>
              </div>

              <div className="ticket-gate-row" aria-label="Ticket line gates">
                <a
                  href="#metro-map"
                  onClick={() => onEnter()}
                  className="ticket-gate ticket-gate-primary"
                  aria-label={content.cta}
                >
                  <span>{content.cta}</span>
                  <ArrowIcon />
                </a>

                {lines.map((line) => (
                  <a
                    key={line.id}
                    href="#metro-map"
                    onClick={() => onEnter(line.id)}
                    className="ticket-gate"
                    aria-label={`Open ${line.name}`}
                  >
                    <span
                      className="ticket-line-swatch"
                      style={{ backgroundColor: line.color }}
                      aria-hidden="true"
                    />
                    <span className="ticket-gate-code">{lineCodes[line.id]}</span>
                    <span className="ticket-gate-name">{line.name.replace(" Line", "")}</span>
                  </a>
                ))}
              </div>

              <div className="ticket-access-row mono" aria-label="Public links">
                {siteContent.socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    rel="noreferrer"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <footer className="ticket-fineprint mono">
                <span>{content.finePrint}</span>
                <strong>{content.checksumValue}</strong>
              </footer>

              <div className="ticket-integrity-strip mono">
                <span>Privacy by design</span>
                <span>{content.integrityNote}</span>
              </div>
            </section>

            <aside className="ticket-side mono">
              <div className="ticket-zone">ZONE<br />ALL</div>
              <TicketSideRow label={content.issuedLabel} value={content.issuedValue} />
              <TicketSideRow label={content.validLabel} value={content.validValue} />
              <TicketSideRow label={content.fareLabel} value={content.fareValue} />
              <TicketSideRow label={content.serialLabel} value={content.serialValue} />
              <div className="ticket-side-insert">
                <span>{content.sidebar}</span>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </motion.section>
  );
}

function CountryCard({
  card,
  index,
}: {
  card: (typeof countryCards)[number];
  index: number;
}) {
  return (
    <div className={`country-card country-card-${index + 1} ${card.className}`}>
      <TicketTexture ink="#20150e" opacity="0.08" />
      <div className="country-card-copy mono">
        <span>{card.city}</span>
        <strong>{card.country}</strong>
        <span>{card.code}</span>
        <em>{card.nativeText}</em>
        <small>{card.detail}</small>
      </div>
      <div className="country-card-band" />
      <div className="country-card-chip">
        <span>{card.code.slice(0, 2)}</span>
      </div>
      <CountryMotif cardId={card.id} />
    </div>
  );
}

function CountryMotif({ cardId }: { cardId: (typeof countryCards)[number]["id"] }) {
  return (
    <div className={`country-motif country-motif-${cardId}`} aria-hidden="true">
      {cardId === "japan" ? (
        <>
          <span className="flag-japan" />
          <span className="sakura sakura-one" />
          <span className="sakura sakura-two" />
          <span className="sakura sakura-three" />
        </>
      ) : null}
      {cardId === "korea" ? (
        <>
          <span className="flag-korea" />
          <span className="trigram trigram-one" />
          <span className="trigram trigram-two" />
        </>
      ) : null}
      {cardId === "copenhagen" ? <span className="flag-denmark" /> : null}
      {cardId === "madrid" ? <span className="madrid-lozenge">Metro</span> : null}
      {cardId === "singapore" ? (
        <>
          <span className="flag-singapore" />
          <span className="mrt-rings" />
        </>
      ) : null}
    </div>
  );
}

function TicketRouteCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TicketSideRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ticket-side-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TicketCuts() {
  return (
    <>
      <span className="ticket-notch ticket-notch-top" aria-hidden="true" />
      <span className="ticket-notch ticket-notch-bottom" aria-hidden="true" />
      <span className="ticket-notch ticket-notch-left" aria-hidden="true" />
      <span className="ticket-notch ticket-notch-right" aria-hidden="true" />
    </>
  );
}

function TicketTexture({ ink, opacity }: { ink: string; opacity: string }) {
  const idSeed = useId().replace(/:/g, "");
  const patternId = `ticket-pattern-${idSeed}`;
  const noiseId = `ticket-noise-${idSeed}`;

  return (
    <svg className="ticket-texture" aria-hidden="true">
      <defs>
        <pattern id={patternId} width="36" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M-8 14C2 2 12 26 22 14S42 2 52 14"
            fill="none"
            stroke={ink}
            strokeOpacity={opacity}
            strokeWidth="1"
          />
          <circle cx="9" cy="7" r="0.9" fill={ink} opacity={opacity} />
          <circle cx="27" cy="21" r="0.9" fill={ink} opacity={opacity} />
        </pattern>
        <filter id={noiseId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="11" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.2" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <rect width="100%" height="100%" filter={`url(#${noiseId})`} opacity="0.24" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 8H13M9 4L13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
