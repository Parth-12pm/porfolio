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
  // Basic Meta Tags
  title: {
    default: "Parth Mahadik | CSE Student & Full Stack Developer in Mumbai",
    template: "%s | Parth Mahadik",
  },
  description:
    "Parth Mahadik is a Computer Science Engineering student and Full Stack Developer from Mumbai, Maharashtra. Specializing in Next.js, React, TypeScript, Android development, and AI/ML. Explore innovative projects like StallSpot, Code Collab, Travel Mate, and more.",
  keywords: [
    "Parth Mahadik",
    "Parth Mahadik Mumbai",
    "Parth Mahadik CSE Student",
    "Parth Mahadik Developer",
    "Parth Mahadik Portfolio",
    "CSE Student Mumbai",
    "Full Stack Developer Mumbai",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Android Developer",
    "AI ML Developer",
    "Software Engineer Mumbai",
    "Web Developer Mumbai",
    "StallSpot",
    "Code Collab",
    "Travel Mate",
    "Frontend Developer",
    "Backend Developer",
    "Parth Mahadik GitHub",
    "Parth Mahadik LinkedIn",
    "Computer Science Student",
    "Maharashtra Developer",
  ],
  authors: [{ name: "Parth Mahadik", url: "https://parth-12pm.github.io/" }],
  creator: "Parth Mahadik",
  publisher: "Parth Mahadik",
  
  // Viewport and Mobile Optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  
  // Theme and Color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  
  // Robots and Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://parth-12pm.github.io/",
    title: "Parth Mahadik | CSE Student & Full Stack Developer",
    description:
      "Explore the portfolio of Parth Mahadik, a Computer Science Engineering student and Full Stack Developer from Mumbai. Innovative projects in Next.js, React, Android, and AI/ML.",
    siteName: "Parth Mahadik Portfolio",
    images: [
      {
        url: "https://parth-12pm.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parth Mahadik - CSE Student & Full Stack Developer",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@Parth_12_pm",
    creator: "@Parth_12_pm",
    title: "Parth Mahadik | CSE Student & Full Stack Developer",
    description:
      "Portfolio of Parth Mahadik - CSE Student & Full Stack Developer specializing in Next.js, React, Android, and AI/ML.",
    images: ["https://parth-12pm.github.io/og-image.png"],
  },
  
  // Verification (Add your verification codes here when you get them)
  verification: {
    google: "", // Add Google Search Console verification code
    // yandex: "",
    // yahoo: "",
    // other: {
    //   "msvalidate.01": "", // Bing Webmaster Tools
    // },
  },
  
  // App Links
  alternates: {
    canonical: "https://parth-12pm.github.io/",
  },
  
  // Web App Manifest
  manifest: "/manifest.json",
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/ic_launcher.png",
  },
  
  // Additional Meta
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://parth-12pm.github.io/#person",
                  name: "Parth Mahadik",
                  givenName: "Parth",
                  familyName: "Mahadik",
                  url: "https://parth-12pm.github.io/",
                  image: "https://parth-12pm.github.io/Me.jpg",
                  email: "mailto:parthsmahadik12027@gmail.com",
                  jobTitle: "CSE Student & Full Stack Developer",
                  description:
                    "Computer Science Engineering student and Full Stack Developer specializing in Next.js, React, TypeScript, Android development, and AI/ML",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Mumbai",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN",
                  },
                  sameAs: [
                    "https://github.com/Parth-12pm",
                    "https://www.linkedin.com/in/parth-mahadik-12-pm",
                    "https://x.com/Parth_12_pm",
                  ],
                  knowsAbout: [
                    "Next.js",
                    "React",
                    "TypeScript",
                    "JavaScript",
                    "Android Development",
                    "Java",
                    "Kotlin",
                    "AI/ML",
                    "Full Stack Development",
                    "Web Development",
                    "UI/UX Design",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://parth-12pm.github.io/#website",
                  url: "https://parth-12pm.github.io/",
                  name: "Parth Mahadik Portfolio",
                  description:
                    "Portfolio website of Parth Mahadik showcasing projects, skills, and experience in software development",
                  publisher: {
                    "@id": "https://parth-12pm.github.io/#person",
                  },
                  inLanguage: "en-US",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://parth-12pm.github.io/#profilepage",
                  url: "https://parth-12pm.github.io/",
                  name: "Parth Mahadik - CSE Student & Full Stack Developer",
                  isPartOf: {
                    "@id": "https://parth-12pm.github.io/#website",
                  },
                  about: {
                    "@id": "https://parth-12pm.github.io/#person",
                  },
                  description:
                    "Professional portfolio showcasing innovative projects like StallSpot, Code Collab, Travel Mate, and more",
                  mainEntity: {
                    "@id": "https://parth-12pm.github.io/#person",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
