import type { Metadata } from "next";
import { Azeret_Mono, Space_Grotesk } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { PrivacyNotice } from "@/components/privacy-notice";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kinemor.com"),
  title: {
    default: "Kinemor | Infrastructure for Physical AI",
    template: "%s | Kinemor",
  },
  description:
    "Kinemor builds field systems and data infrastructure for physical AI: real environments, contact-rich human demonstrations, and multimodal evidence for robotics teams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kinemor | Infrastructure for Physical AI",
    description: "The data layer for physical intelligence.",
    siteName: "Kinemor",
    type: "website",
    url: "https://kinemor.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinemor | Infrastructure for Physical AI",
    description: "The data layer for physical intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${azeretMono.variable}`}>
      <body>
        <PageTransition>{children}</PageTransition>
        <PrivacyNotice />
      </body>
    </html>
  );
}
