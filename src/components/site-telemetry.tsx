"use client";

import { track } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const pageViewEvents = new Map([
  ["/glove", "glove_page_view"],
  ["/open-worlds", "open_worlds_page_view"],
]);

/** Records lightweight product telemetry without sending personal form data. */
export function SiteTelemetry() {
  const pathname = usePathname();
  const scrollEventsSent = useRef(new Set<string>());

  useEffect(() => {
    const eventName = pageViewEvents.get(pathname);

    if (eventName) {
      track(eventName, { path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    scrollEventsSent.current.clear();

    function recordScrollDepth() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const scrollDepth = (window.scrollY / scrollableHeight) * 100;

      if (scrollDepth >= 50 && !scrollEventsSent.current.has("scroll_50_percent")) {
        scrollEventsSent.current.add("scroll_50_percent");
        track("scroll_50_percent", { path: pathname });
      }

      if (scrollDepth >= 90 && !scrollEventsSent.current.has("scroll_90_percent")) {
        scrollEventsSent.current.add("scroll_90_percent");
        track("scroll_90_percent", { path: pathname });
      }
    }

    recordScrollDepth();
    window.addEventListener("scroll", recordScrollDepth, { passive: true });
    window.addEventListener("resize", recordScrollDepth);

    return () => {
      window.removeEventListener("scroll", recordScrollDepth);
      window.removeEventListener("resize", recordScrollDepth);
    };
  }, [pathname]);

  return null;
}
