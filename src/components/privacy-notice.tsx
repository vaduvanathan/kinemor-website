"use client";

import Link from "next/link";
import { useState } from "react";

const noticeKey = "kinemor_privacy_notice_seen";

/** Shows a compact privacy notice without adding tracking cookies. */
export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(noticeKey) !== "true";
  });

  function acceptNotice() {
    window.localStorage.setItem(noticeKey, "true");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="privacy-notice" aria-label="Privacy notice">
      <p>
        Kinemor does not use tracking cookies. We collect contact form details only to review and reply to inquiries.
        <Link href="/privacy">Privacy notice</Link>
      </p>
      <button type="button" onClick={acceptNotice}>Got it</button>
    </aside>
  );
}
