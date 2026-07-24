"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error || "We could not send your note. Please try again.");
      }

      form.reset();
      setStatus("success");
      setMessage(result.message || "Thanks. Your message is on its way.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your note. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitContact} aria-busy={status === "sending"}>
      <div className="contact-form-grid">
        <label>
          <span>Name</span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label>
          <span>Work email</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          <span>Organization</span>
          <input autoComplete="organization" name="organization" type="text" />
        </label>
        <label className="contact-message-field">
          <span>What are you building?</span>
          <textarea name="message" required rows={5} />
        </label>
        <label className="contact-honeypot" aria-hidden="true">
          <span>Website</span>
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>
      <div className="contact-form-actions">
        <button className="button button-primary" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending" : "Send inquiry"}
          <ArrowUpRight aria-hidden="true" size={18} />
        </button>
        <p aria-live="polite" className={`form-status form-status-${status}`}>
          {message}
        </p>
      </div>
    </form>
  );
}
