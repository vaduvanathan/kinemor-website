"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const noticeKey = "kinemor_privacy_notice_seen";

function subscribePrivacyStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getPrivacySnapshot() {
  try {
    return window.localStorage.getItem(noticeKey) === "true";
  } catch {
    return true;
  }
}

function getServerPrivacySnapshot() {
  return true;
}

/** Shows a compact privacy notice without adding tracking cookies. */
export function PrivacyNotice() {
  const wasAccepted = useSyncExternalStore(subscribePrivacyStore, getPrivacySnapshot, getServerPrivacySnapshot);
  const [dismissedNow, setDismissedNow] = useState(false);
  const isVisible = !wasAccepted && !dismissedNow;

  function acceptNotice() {
    try {
      window.localStorage.setItem(noticeKey, "true");
    } catch {
      // Keep the notice dismissible even when localStorage is blocked.
    }
    setDismissedNow(true);
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
