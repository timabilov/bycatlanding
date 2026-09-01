"use client";

import { useEffect } from "react";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "aleid",
  "alart",
];

export default function ApplovinTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    TRACKED_PARAMS.forEach((key) => {
      const val = params.get(key);
      if (val) captured[key] = val;
    });

    if (Object.keys(captured).length === 0) return;

    // Set cookies on .bycat.ai (30 days)
    const setCookie = (name: string, value: Record<string, string>) => {
      document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};path=/;max-age=2592000;domain=.bycat.ai;SameSite=Lax`;
    };

    // First touch: only set if not already present
    if (!document.cookie.includes("first_touch=")) {
      setCookie("first_touch", captured);
    }
    // Last touch: always overwrite
    setCookie("last_touch", captured);

    // Forward params on app.bycat.ai link clicks
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.includes("app.bycat.ai")) return;

      try {
        const url = new URL(href);
        for (const [key, val] of Object.entries(captured)) {
          if (!url.searchParams.has(key)) {
            url.searchParams.set(key, val);
          }
        }
        anchor.setAttribute("href", url.toString());
      } catch {}
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
