"use client";

import { AnimatePresence, motion } from "framer-motion";
import { lineById } from "@/data/lines";
import { siteContent } from "@/data/site";
import type { Station } from "@/data/stations";

type StationDetailPanelProps = {
  station: Station | null;
  onClose: () => void;
  reducedMotion: boolean;
};

export function StationDetailPanel({
  station,
  onClose,
  reducedMotion,
}: StationDetailPanelProps) {
  const copy = siteContent.panel;

  function handleClose(event: React.SyntheticEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onClose();
  }

  return (
    <AnimatePresence>
      {station ? (
        <motion.div
          key={station.id}
          className="station-ticket-overlay"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" as const }}
        >
          <motion.aside
            className="station-ticket-card"
            role="dialog"
            aria-modal="true"
            aria-label={`${copy.boardLabel}: ${station.title}`}
            initial={reducedMotion ? false : { y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: 24, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" as const }}
          >
            <span className="station-ticket-notch station-ticket-notch-top" aria-hidden="true" />
            <span className="station-ticket-notch station-ticket-notch-bottom" aria-hidden="true" />

            <aside className="station-ticket-rail mono" aria-hidden="true">
              <span>{station.date.replace("2026", "20XX")}</span>
              <strong>{station.lines[0].toUpperCase()}</strong>
            </aside>

            <section className="station-ticket-main">
              <header className="station-ticket-header mono">
                <div>
                  <span className="station-ticket-mark">M</span>
                  <span>{copy.boardLabel}</span>
                </div>
                <span>{station.checksum.slice(-8).toUpperCase()}</span>
              </header>

              <div className="station-ticket-route-grid mono" aria-label="Station details">
                <TicketCell label={copy.date} value={station.date} />
                <TicketCell
                  label={copy.lines}
                  value={station.lines
                    .map((lineId) => lineById[lineId].name.replace(" Line", ""))
                    .join(" / ")}
                />
                <TicketCell label={copy.checksum} value={station.checksum} />
              </div>

              <div className="station-ticket-identity">
                <div>
                  <p className="mono station-ticket-kicker">Selected station</p>
                  <h2>{station.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  onPointerDown={handleClose}
                  className="station-ticket-close"
                  aria-label={copy.close}
                >
                  <CloseIcon />
                </button>
              </div>

              <section className="station-ticket-summary">
                <h3 className="mono">{copy.summary}</h3>
                <p>{station.summary}</p>
                {station.bullets?.length ? (
                  <ul className="station-ticket-bullets">
                    {station.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>

              <section className="station-ticket-line-list" aria-label={copy.lines}>
                {station.lines.map((lineId) => {
                  const line = lineById[lineId];
                  return (
                    <span key={line.id} className="mono station-ticket-line">
                      <span style={{ backgroundColor: line.color }} aria-hidden="true" />
                      {line.name}
                    </span>
                  );
                })}
              </section>

              {station.skillGroups?.length ? (
                <section className="station-ticket-skill-groups">
                  {station.skillGroups.map((group) => (
                    <section key={group.label} className="station-ticket-skill-group">
                      <h3 className="mono">{group.label}</h3>
                      <ul>
                        {group.values.map((item) => (
                          <li key={item} className="mono">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </section>
              ) : null}

              {station.tech?.length ? (
                <section className="station-ticket-tags">
                  <h3 className="mono">{copy.tech}</h3>
                  <ul>
                    {station.tech.map((item) => (
                      <li key={item} className="mono">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {station.links?.length ? (
                <section className="station-ticket-links">
                  <h3 className="mono">{copy.links}</h3>
                  <div>
                    {station.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="mono"
                        rel="noreferrer"
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </section>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TicketCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 4L14 14M14 4L4 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
