"use client";

import { ArrowUpRight, Check } from "lucide-react";
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
      <div className="contact-form-intro">
        <div>
          <p className="contact-form-code">KNR / INQUIRY_01</p>
          <p>Tell us the outcome you need. We will reply to the address you provide.</p>
        </div>
      </div>
      <div className="contact-form-grid">
        <label>
          <span>Name <span className="field-required" aria-hidden="true">*</span></span>
          <input autoComplete="name" name="name" required type="text" aria-required="true" />
        </label>
        <label>
          <span>Work email <span className="field-required" aria-hidden="true">*</span></span>
          <input autoComplete="email" name="email" placeholder="you@company.com" required type="email" aria-required="true" />
        </label>
        <label>
          <span>Organization</span>
          <input autoComplete="organization" name="organization" placeholder="Company or lab" type="text" />
        </label>
        <label>
          <span>Inquiry type</span>
          <select defaultValue="General inquiry" name="inquiryType">
            <option value="Data program">Data program</option>
            <option value="Research partnership">Research partnership</option>
            <option value="Capture operations">Capture operations</option>
            <option value="General inquiry">General inquiry</option>
          </select>
        </label>
        <label className="contact-message-field">
          <span>What are you building? <span className="field-required" aria-hidden="true">*</span></span>
          <textarea name="message" placeholder="The physical task, data you need, scale, timing, or the question you want to solve." required rows={5} aria-required="true" />
        </label>
        <label className="contact-honeypot" aria-hidden="true">
          <span>Website</span>
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>
      </div>
      <div className="contact-form-actions">
        <button className="button button-primary" disabled={status === "sending"} type="submit">
          {status === "sending" ? "Sending" : status === "success" ? "Inquiry received" : "Send inquiry"}
          {status === "success" ? <Check aria-hidden="true" size={18} /> : <ArrowUpRight aria-hidden="true" size={18} />}
        </button>
        <p className="form-privacy-note">
          By sending this form, you agree that Kinemor may use your details to review and reply to your inquiry. See our <a href="/privacy">privacy notice</a>.
        </p>
        <p aria-live="polite" className={`form-status form-status-${status}`}>
          {message}
        </p>
      </div>
    </form>
  );
}
