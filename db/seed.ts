import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("Seeding database...");

  // 1. Site Sections
  const existingSections = await db.select().from(schema.siteSections);
  if (existingSections.length === 0) {
    console.log("Seeding siteSections...");
    await db.insert(schema.siteSections).values([
      { sectionId: "hero", displayName: "Hero", order: 1 },
      { sectionId: "about", displayName: "About", order: 2 },
      { sectionId: "projects", displayName: "Projects", order: 3 },
      { sectionId: "skills", displayName: "Skills", order: 4 },
      { sectionId: "journey", displayName: "Journey", order: 5 },
      { sectionId: "contact", displayName: "Contact", order: 6 },
    ]);
  }

  // 2. Profile
  const existingProfiles = await db.select().from(schema.profiles);
  if (existingProfiles.length === 0) {
    console.log("Seeding profiles...");
    await db.insert(schema.profiles).values({
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
      cvUrl: "",
    });
  }

  // 3. Projects
  const existingProjects = await db.select().from(schema.projects);
  if (existingProjects.length === 0) {
    console.log("Seeding projects...");
    await db.insert(schema.projects).values([
      {
        title: "Next.js E-commerce",
        description: "A full-stack e-commerce platform built with Next.js 14, Stripe, and Tailwind CSS.",
        image: "https://via.placeholder.com/600x400",
        imageAlt: "Next.js E-commerce project screenshot",
        tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
        link: "https://github.com",
        order: 1,
      },
      {
        title: "Portfolio 3D",
        description: "Interactive 3D portfolio using React Three Fiber and Framer Motion.",
        image: "https://via.placeholder.com/600x400",
        imageAlt: "3D Portfolio interface",
        tags: ["React", "Three.js", "Framer Motion"],
        link: "https://github.com",
        order: 2,
      }
    ]);
  }

  // 4. Skills
  const existingSkills = await db.select().from(schema.skills);
  if (existingSkills.length === 0) {
    console.log("Seeding skills...");
    await db.insert(schema.skills).values([
      { name: "React", category: "Frontend", proficiency: 90, order: 1 },
      { name: "Next.js", category: "Frontend", proficiency: 85, order: 2 },
      { name: "TypeScript", category: "Languages", proficiency: 80, order: 3 },
      { name: "Node.js", category: "Backend", proficiency: 75, order: 4 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 95, order: 5 },
      { name: "PostgreSQL", category: "Database", proficiency: 70, order: 6 },
    ]);
  }

  // 5. Journey Events
  const existingJourney = await db.select().from(schema.journeyEvents);
  if (existingJourney.length === 0) {
    console.log("Seeding journeyEvents...");
    await db.insert(schema.journeyEvents).values([
      {
        title: "Full Stack Developer",
        organization: "Tech Corp",
        description: "Building scalable web applications using React and Node.js.",
        startDate: "2023",
        endDate: "Present",
        type: "work",
        order: 1,
      },
      {
        title: "Computer Science",
        organization: "University Name",
        description: "Bachelor's degree in Computer Science.",
        startDate: "2019",
        endDate: "2023",
        type: "education",
        order: 2,
      }
    ]);
  }

  // 6. Social Links
  const existingSocials = await db.select().from(schema.socialLinks);
  if (existingSocials.length === 0) {
    console.log("Seeding socialLinks...");
    await db.insert(schema.socialLinks).values([
      { platform: "github", url: "https://github.com/the-umersaiyad", order: 1 },
      { platform: "linkedin", url: "https://linkedin.com/in/umer-saiyad", order: 2 },
      { platform: "twitter", url: "https://twitter.com", order: 3 },
      { platform: "instagram", url: "https://instagram.com", order: 4 },
    ]);
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
