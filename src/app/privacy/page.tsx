import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Kinemor handles contact form details and basic website privacy.",
};

/** Explains Kinemor's current lightweight website data practices. */
export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <Navigation />
      <section className="page-shell legal-hero" aria-labelledby="privacy-title">
        <p className="eyebrow">PRIVACY</p>
        <h1 id="privacy-title">Privacy notice</h1>
        <p>
          This notice explains how Kinemor handles information submitted through this website.
        </p>
      </section>
      <section className="page-shell legal-content" aria-label="Privacy details">
        <article>
          <h2>What we collect</h2>
          <p>
            If you submit the contact form, we collect the name, email address, organization if provided, inquiry type, and message you send.
          </p>
        </article>
        <article>
          <h2>Why we use it</h2>
          <p>
            We use this information to review your inquiry, reply to you, and understand whether Kinemor can support your data or research needs.
          </p>
        </article>
        <article>
          <h2>Cookies and storage</h2>
          <p>
            Kinemor does not currently use tracking cookies or advertising pixels. The site may use essential browser storage only to remember that you have seen the privacy notice.
          </p>
        </article>
        <article>
          <h2>How long we keep it</h2>
          <p>
            We keep inquiry emails only as long as needed for business follow-up, record keeping, or legal reasons. We review stored inquiries periodically.
          </p>
        </article>
        <article>
          <h2>Contact</h2>
          <p>
            To ask about your submitted information, email <a href="mailto:privacy@kinemor.com">privacy@kinemor.com</a>.
          </p>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
