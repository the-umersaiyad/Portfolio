import { PortfolioApp } from "@/components/PortfolioApp";
import { Scene3DWrapper } from "@/components/Scene3DWrapper";
import { SocialsSEO } from "@/components/SocialsSEO";
import { db } from "@/db";
import { siteSections, profiles, projects, journeyEvents, skills, socialLinks } from "@/db/schema";


import type { Metadata } from "next";

// Make the home page dynamic so it re-fetches when data changes
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const dbProfiles = await db.select().from(profiles).limit(1);
  const profile = dbProfiles[0];
  
  if (!profile || !profile.heroImage) return {};

  const imageUrl = profile.heroImage.startsWith("http") 
    ? profile.heroImage 
    : `https://umer-saiyad.vercel.app${profile.heroImage}`;

  return {
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: profile.heroImageAlt || profile.name,
        },
      ],
    },
    twitter: {
      images: [imageUrl],
    },
  };
}

export default async function Home() {
  const [
    dbSections,
    dbProfiles,
    dbProjects,
    dbJourneyEvents,
    dbSkills,
    dbSocialLinks,
  ] = await Promise.all([
    db.select().from(siteSections).orderBy(siteSections.order),
    db.select().from(profiles),
    db.select().from(projects).orderBy(projects.order),
    db.select().from(journeyEvents).orderBy(journeyEvents.order),
    db.select().from(skills).orderBy(skills.order),
    db.select().from(socialLinks).orderBy(socialLinks.order),
  ]);

  const profile = dbProfiles[0] || {
    name: "Umer Saiyad",
    title: "Full Stack Developer",
    tagline: "Building modern web experiences.",
    location: "Surat, Gujarat, India",
    email: "umersaiyad76@gmail.com",
    phone: "+91 9510131599",
    experience: "6+ Months",
    availability: "Available for freelance",
    heroImage: "/umer-hero-bg.png",
    heroImageAlt: "Umer Saiyad - Full Stack Developer",
    showHeroImage: true,
    cvUrl: "",
  };

  const payload = {
    sections: dbSections,
    profile,
    projects: dbProjects,
    journey: dbJourneyEvents,
    skills: dbSkills,
    socials: dbSocialLinks,
  };

  return (
    <>
      <SocialsSEO />
      <Scene3DWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: "https://umer-saiyad.vercel.app",
            image: profile.heroImage.startsWith("http") 
              ? profile.heroImage 
              : `https://umer-saiyad.vercel.app${profile.heroImage}`,
            jobTitle: profile.title,
            description: profile.tagline,
            address: {
              "@type": "PostalAddress",
              addressLocality: profile.location,
              addressCountry: "IN",
            },
            email: profile.email,
            sameAs: dbSocialLinks.map((s) => s.url),
            knowsAbout: dbSkills.map((s) => s.name),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: `${profile.name} Portfolio`,
            url: "https://umer-saiyad.vercel.app",
            description: profile.tagline,
            author: {
              "@type": "Person",
              name: profile.name,
            },
          }),
        }}
      />
      <PortfolioApp dbData={payload} />
    </>
  );
}
