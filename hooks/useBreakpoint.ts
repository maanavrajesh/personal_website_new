"use client";

import { useEffect, useState } from "react";

// This hook centralizes viewport branching so desktop keeps the pan/zoom SVG
// while mobile renders the line index without duplicating breakpoint logic.
export function useBreakpoint(maxWidthPx: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const update = () => setMatches(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [maxWidthPx]);

  return matches;
}
