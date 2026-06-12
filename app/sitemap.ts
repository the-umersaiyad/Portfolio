import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://umer-saiyad.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        "https://umer-saiyad.vercel.app/umer-hero-bg.png",
        "https://umer-saiyad.vercel.app/umer-hero.png",
        "https://umer-saiyad.vercel.app/Umer_Saiyad_techstack.png",
        "https://umer-saiyad.vercel.app/umer-avatar.png",
        "https://umer-saiyad.vercel.app/insta-DEkiJrHSFJD.jpg",
        "https://umer-saiyad.vercel.app/insta-DNW6bFEI2qs.jpg",
        "https://umer-saiyad.vercel.app/insta-DT-CmqdjKJ-.jpg",
        "https://umer-saiyad.vercel.app/insta-DWJ1lq5DKS2.jpg",
        "https://umer-saiyad.vercel.app/insta-DXBwaGAjEDZ.jpg"
      ],
    },
  ];
}
