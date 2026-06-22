import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { db } from "@/db";
import { globalSettings } from "@/db/schema";
import { ThemeSync } from "@/components/ThemeSync";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Umer Saiyad — Full Stack Developer | React, Next.js & MERN Stack Expert",
    template: "%s | Umer Saiyad",
  },
  description:
    "Umer Saiyad is a Full Stack Web Developer from Gujarat, India specializing in React, Next.js, Node.js, and the MERN stack. Building premium, responsive, and high-performance web applications.",
  keywords: [
    "Umer Saiyad",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Gujarat Developer",
    "India Developer",
    "Freelance Web Developer",
    "Portfolio",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "Express.js",
  ],
  authors: [{ name: "Umer Saiyad", url: "https://umer-saiyad.vercel.app" }],
  creator: "Umer Saiyad",
  publisher: "Umer Saiyad",
  metadataBase: new URL("https://umer-saiyad.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umer-saiyad.vercel.app",
    siteName: "Umer Saiyad — Full Stack Developer",
    title: "Umer Saiyad — Full Stack Developer | React, Next.js & MERN Stack",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies. Building premium digital experiences from Gujarat, India.",
    images: [
      {
        url: "/umer-hero.png",
        width: 1200,
        height: 630,
        alt: "Umer Saiyad — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Saiyad — Full Stack Developer",
    description:
      "Full Stack Web Developer specializing in React, Next.js, Node.js, and the MERN stack. Building premium web experiences.",
    images: ["/umer-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: "BL1Hk09MhVYcs88MdreAA074s_PcQ8J-HZQg6sbyJlU" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: any[] = [];
  try {
    settings = await db.select().from(globalSettings);
  } catch (e) {
    console.warn("Global settings table missing, using fallbacks.");
  }
  
  // Provide safe fallbacks if DB is empty during first boot
  const activeTheme = settings[0]?.activeTheme || "dark";
  const darkAccent = settings[0]?.accentColorDark || "#10b981";
  const lightAccent = settings[0]?.accentColorLight || "#8b5cf6";

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} ${activeTheme}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-accent-override: ${darkAccent};
            }
            .light {
              --color-accent-override: ${lightAccent};
            }
          `
        }} />
      </head>
      <body>
        <ThemeSync publicTheme={activeTheme} />
        {children}
      </body>
    </html>
  );
}
