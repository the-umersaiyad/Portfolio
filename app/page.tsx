import { PortfolioApp } from "@/components/PortfolioApp";
import { Scene3DWrapper } from "@/components/Scene3DWrapper";
import { SocialsSEO } from "@/components/SocialsSEO";

export default function Home() {
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
            name: "Umer Saiyad",
            url: "https://umer-saiyad.vercel.app",
            image: "https://umer-saiyad.vercel.app/umer-hero.png",
            jobTitle: "Full Stack Web Developer",
            description:
              "Full Stack Developer specializing in React, Next.js, Node.js, and the MERN stack. Building premium web applications from Gujarat, India.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Gujarat",
              addressCountry: "IN",
            },
            email: "umersaiyad76@gmail.com",
            sameAs: [
              "https://github.com/Umer-Enacton",
              "https://www.linkedin.com/in/umer-saiyad-741710254/",
              "https://www.instagram.com/the_umersaiyad/",
            ],
            knowsAbout: [
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "JavaScript",
              "MongoDB",
              "Express.js",
              "Tailwind CSS",
              "Full Stack Development",
              "Web Development",
            ],
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Uka Tarsadia University",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Umer Saiyad Portfolio",
            url: "https://umer-saiyad.vercel.app",
            description:
              "Portfolio of Umer Saiyad — Full Stack Developer specializing in React, Next.js, and modern web technologies.",
            author: {
              "@type": "Person",
              name: "Umer Saiyad",
            },
          }),
        }}
      />
      <PortfolioApp />
    </>
  );
}
