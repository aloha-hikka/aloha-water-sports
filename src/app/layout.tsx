import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
// අලුත් Button එක Import කරගත්තා
import ScrollToTop from "./ScrollToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aloha Water Sports — Hikkaduwa, Sri Lanka",
  description:
    "Premium water sports experiences in Hikkaduwa, Sri Lanka. Snorkeling, diving, surfing, and fishing with world-class guides.",
  keywords: "water sports, Sri Lanka, Hikkaduwa, snorkeling, diving, surfing, fishing",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-white antialiased relative">
        {children}
        {/* හැම පිටුවකම පේන්න මෙතනට දැම්මා */}
        <ScrollToTop />
      </body>
    </html>
  );
}