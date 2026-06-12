// ─── SocialsSEO — Server Component (no "use client") ─────────────────────────
// This file intentionally has NO "use client" directive.
// Next.js will render it as static HTML on the server so Googlebot
// can index the Instagram images and structured data without executing JS.

import Image from "next/image";

const instaAltTexts: Record<string, string> = {
  DXBwaGAjEDZ:
    "Umer Saiyad, Full Stack Developer from Surat, holding a flower bouquet in a white shirt and blue jeans.",
  DWJ1lq5DKS2:
    "Umer Saiyad, Full Stack Developer from Surat, wearing a black traditional kurta and glasses outdoors by a road.",
  "DT-CmqdjKJ-":
    "Umer Saiyad, Full Stack Developer from Surat, wearing a red sweatshirt, glasses, and a white prayer cap, leaning on a motorcycle.",
  DNW6bFEI2qs:
    "Umer Saiyad, a Full Stack developer from India, posing outdoor next to a clean, polished car under bright daylight.",
  DEkiJrHSFJD:
    "Umer Saiyad, Full Stack Developer from Surat, wearing a purple formal suit, a white dress shirt, and clear glasses, posing against a purple draped background with floral arrangements.",
};

const instaDates: Record<string, string> = {
  DXBwaGAjEDZ: "2026-04-12T12:00:00+05:30",
  DWJ1lq5DKS2: "2026-03-21T12:00:00+05:30",
  "DT-CmqdjKJ-": "2026-01-26T12:00:00+05:30",
  DNW6bFEI2qs: "2025-08-15T12:00:00+05:30",
  DEkiJrHSFJD: "2025-01-08T12:00:00+05:30",
};

const instagramShortcodes = [
  "DXBwaGAjEDZ",
  "DWJ1lq5DKS2",
  "DT-CmqdjKJ-",
  "DNW6bFEI2qs",
  "DEkiJrHSFJD",
];

export function SocialsSEO() {
  return (
    <div className="sr-only" aria-hidden="true">
      {/* LinkedIn tech-stack post */}
      <article itemScope itemType="https://schema.org/SocialMediaPosting">
        <span
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content="Umer Saiyad" />
          <meta itemProp="url" content="https://umer-saiyad.vercel.app/" />
        </span>
        <meta
          itemProp="datePublished"
          content="2026-05-20T10:00:00+05:30"
        />
        <h2 itemProp="headline">
          Umer Saiyad - Full Stack Developer Surat Professional Tech Stack
          Update
        </h2>
        <p itemProp="articleBody">
          Driven by building scalable web applications and seamless user
          experiences. As a Full Stack Web Developer, I focus on bridging the
          gap between clean, responsive frontend user interfaces and robust,
          high-performance backend architecture. Here is a look at my current
          core production tech stack: Next.js, React.js, JavaScript (ES6+),
          HTML5, CSS3, Node.js, Express.js, REST APIs, PostgreSQL, Drizzle ORM.
        </p>
        <Image
          itemProp="image"
          src="/Umer_Saiyad_techstack.png"
          width={800}
          height={400}
          loading="lazy"
          alt="Umer Saiyad, Full Stack Developer from Surat, smiling in a white dress shirt with arms crossed, next to glowing digital panels showcasing Next.js, PostgreSQL, Drizzle ORM, and Node.js."
        />
        <a
          itemProp="url"
          href="https://www.linkedin.com/feed/update/urn:li:share:7462732694418817024"
          rel="noopener noreferrer"
          target="_blank"
        >
          View Umer Saiyad&apos;s tech-stack graphic on LinkedIn
        </a>
      </article>

      {/* Instagram posts */}
      {instagramShortcodes.map((code, index) => (
        <article
          key={code}
          itemScope
          itemType="https://schema.org/SocialMediaPosting"
        >
          <span
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name" content="Umer Saiyad" />
            <meta itemProp="url" content="https://umer-saiyad.vercel.app/" />
          </span>
          <meta
            itemProp="datePublished"
            content={instaDates[code] || "2026-05-01T12:00:00+05:30"}
          />
          <h3 itemProp="headline">
            Umer Saiyad — Full Stack Developer from Surat, Instagram Photo{" "}
            {index + 1}
          </h3>
          <Image
            itemProp="image"
            src={`/insta-${code}.jpg`}
            width={400}
            height={400}
            loading="lazy"
            alt={instaAltTexts[code] || "Umer Saiyad Instagram Post"}
          />
          <a
            itemProp="url"
            href={`https://www.instagram.com/p/${code}/`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Umer Saiyad&apos;s full stack developer life post {index + 1}{" "}
            on Instagram
          </a>
        </article>
      ))}
    </div>
  );
}
