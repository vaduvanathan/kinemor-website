import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kinemor.com"),
  title: {
    default: "Kinemor | Infrastructure for Physical AI",
    template: "%s | Kinemor",
  },
  description:
    "Kinemor builds the multimodal data infrastructure behind embodied intelligence: real environments, real movement, and the context models need to act with care.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kinemor | Infrastructure for Physical AI",
    description: "Data that teaches machines the real world.",
    siteName: "Kinemor",
    type: "website",
    url: "https://kinemor.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinemor | Infrastructure for Physical AI",
    description: "Data that teaches machines the real world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
