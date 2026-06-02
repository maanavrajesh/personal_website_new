export const siteContent = {
  metadata: {
    title: "Maanav Rajesh | Transit Portfolio",
    description:
      "A metro-map portfolio for a software engineer focused on privacy, security, and data integrity.",
  },
  ticket: {
    systemName: "Privacy-Integrity Metro Bureau",
    passName: "Rajesh Metro Pass",
    name: "Maanav Rajesh",
    role: "Privacy / Data Integrity Engineer",
    sidebar: "ALL LINES",
    cta: "OPEN FULL MAP",
    qrHeading: "GITHUB ACCESS",
    qrValue: "https://github.com/maanavrajesh",
    routeCode: "MR 0082",
    platformCode: "PSDI 04",
    issuedLabel: "issued",
    issuedValue: "2026-06-02",
    validLabel: "valid",
    validValue: "all zones",
    fareLabel: "fare",
    fareValue: "privacy first",
    serialLabel: "serial",
    serialValue: "MR-2026-SEC-0427",
    checksumLabel: "checksum",
    checksumValue: "sha256: a3f9c1e9",
    finePrint:
      "This pass intentionally omits direct-contact data. Verify identity by public work, references, and cryptographic habits.",
    integrityNote:
      "Integrity check: hashed identifiers, verified links, no trackers, no cookies.",
    ticketFields: [
      { label: "from", value: "Carnegie Mellon" },
      { label: "to", value: "Privacy Lab / Build Yard" },
      { label: "class", value: "privacy integrity" },
      { label: "route", value: "privacy + integrity" },
    ],
    lineGateHeading: "Line gates",
    fullNetworkGate: "Full network",
    socialHeading: "Public access",
  },
  map: {
    title: "Transit Map",
    instructions: "Select a station to explore.",
    resetView: "Reset view",
    currentMarker: "YOU ARE HERE",
    currentMarkerLegend: "= currently active project or role",
    ariaLabel: "Interactive metro map portfolio navigation",
    stationAction: "Open station",
    desktopOnlyHint: "Pan and zoom enabled",
  },
  lineIndex: {
    title: "Line Index",
    instructions: "Choose a station to open its board.",
  },
  panel: {
    boardLabel: "Blank transfer card",
    close: "Close transfer card",
    lines: "Lines",
    date: "Dates",
    summary: "Summary",
    tech: "Ticket tags",
    links: "Links",
    checksum: "Checksum",
  },
  footer: {
    copyright: "2026 Maanav Rajesh",
    privacyNote: "No trackers. No cookies. No third-party scripts.",
  },
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/maanavrajesh",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/maanav-rajesh/",
    },
    {
      label: "Email",
      href: "mailto:maanavr@andrew.cmu.edu",
    },
  ],
} as const;
