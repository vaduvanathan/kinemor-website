import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Kinemor about robotics data collection, hand data research, or an industrial data program.",
};

export default function ContactPage() {
  return (
    <main className="site-main contact-page">
      <Navigation />
      <section className="contact-page-hero" aria-labelledby="contact-title">
        <div className="page-shell contact-page-layout">
          <Reveal className="contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h1 id="contact-title">Tell us what you want your robot to learn.</h1>
            <p>Share the task, place, and data you need. We will review it and reply to the email address you provide.</p>
          </Reveal>
          <Reveal delay={120}><ContactForm /></Reveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
