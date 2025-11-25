import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Mahadik | Software Engineer & Full Stack Developer",
  description:
    "Portfolio of Parth Mahadik, a Software Engineer specializing in Next.js, React, Android, and AI/ML. View projects like StallSpot, Travel Mate, and more.",
  keywords: [
    "Parth Mahadik",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Android",
    "AI",
    "Machine Learning",
    "Portfolio",
  ],
  openGraph: {
    title: "Parth Mahadik | Software Engineer",
    description: "Building the future with code and creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
