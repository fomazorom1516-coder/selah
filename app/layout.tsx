import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import FloatingCart from "../components/FloatingCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://selahverse.live"),
  title: "SELAH",
  description: "SELAH — носи своє послання.",
  openGraph: {
    title: "SELAH",
    description: "SELAH — носи своє послання.",
    url: "https://selahverse.live",
    siteName: "SELAH",
    images: [
      {
        url: "/images/selah-preview.png",
        width: 1536,
        height: 1024,
        alt: "SELAH — Faith • Purpose • A Higher Life",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SELAH",
    description: "SELAH — носи своє послання.",
    images: ["/images/selah-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">

        <Navbar />

        {children}

        <FloatingCart />

      </body>
    </html>
  );
}