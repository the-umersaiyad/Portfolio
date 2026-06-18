import { pgTable, serial, text, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const siteSections = pgTable("site_sections", {
  id: serial("id").primaryKey(),
  sectionId: text("section_id").notNull().unique(), // e.g., 'hero', 'about'
  displayName: text("display_name").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  isMobileVisible: boolean("is_mobile_visible").default(true).notNull(),
  order: integer("order").notNull(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  experience: text("experience").notNull(),
  availability: text("availability").notNull(),
  heroImage: text("hero_image").notNull(),
  heroImageAlt: text("hero_image_alt").default("Portfolio Hero Image").notNull(),
  cvUrl: text("cv_url").default("").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  imageAlt: text("image_alt").default("Project Image").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  link: text("link").notNull(),
  order: integer("order").notNull(),
});

export const journeyEvents = pgTable("journey_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  description: text("description").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(), // e.g., 'Present' or a year
  type: text("type").notNull(), // 'work' or 'education'
  order: integer("order").notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Frontend, Backend, etc.
  proficiency: integer("proficiency").notNull(), // 0-100
  order: integer("order").notNull(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // e.g., 'github'
  url: text("url").notNull(),
  order: integer("order").notNull(),
});
