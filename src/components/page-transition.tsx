"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Gives every route a short, consistent entrance without delaying navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className="page-transition" key={pathname}>{children}</div>;
}
