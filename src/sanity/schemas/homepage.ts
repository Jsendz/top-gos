import { defineField, defineType } from "sanity";

const localeStringField = (name: string, title: string) =>
  defineField({ name, title, type: "localeString" });

const localeTextField = (name: string, title: string) =>
  defineField({ name, title, type: "localeText" });

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "🦸 Hero" },
    { name: "about", title: "📖 About" },
    { name: "services", title: "🐕 Services" },
    { name: "testimonials", title: "💬 Testimonials" },
    { name: "areas", title: "📍 Areas" },
    { name: "howItWorks", title: "🔢 How It Works" },
    { name: "settings", title: "⚙️ Site Settings" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        localeStringField("label", "Label (e.g. Loving Care)"),
        localeStringField("title", "Main Title"),
        localeTextField("subtitle", "Subtitle / Description"),
        localeStringField("ctaText", "CTA Button Text"),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // ── About ─────────────────────────────────────────────────────
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      group: "about",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("body", "Body Text"),
        localeStringField("bullet1", "Bullet Point 1"),
        localeStringField("bullet2", "Bullet Point 2"),
        localeStringField("bullet3", "Bullet Point 3"),
        localeStringField("ctaText", "CTA Button Text"),
        defineField({
          name: "image",
          title: "Side Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // ── Services header ───────────────────────────────────────────
    defineField({
      name: "servicesSection",
      title: "Services Section Header",
      type: "object",
      group: "services",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("body", "Description"),
      ],
    }),

    // ── Testimonials header ───────────────────────────────────────
    defineField({
      name: "testimonialsSection",
      title: "Testimonials Section Header",
      type: "object",
      group: "testimonials",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("subtitle", "Subtitle"),
      ],
    }),

    // ── Areas ─────────────────────────────────────────────────────
    defineField({
      name: "areasSection",
      title: "Areas We Serve Section",
      type: "object",
      group: "areas",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("body", "Body Text"),
        localeStringField("ctaText", "CTA Button Text"),
        localeStringField("mapTitle", "Map Title"),
        localeStringField("mapSubtitle", "Map Subtitle"),
      ],
    }),

    // ── How It Works header ───────────────────────────────────────
    defineField({
      name: "howItWorksSection",
      title: "How It Works Section Header",
      type: "object",
      group: "howItWorks",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("body", "Description"),
        localeStringField("ctaText", "CTA Button Text"),
      ],
    }),

    // ── Site Settings ─────────────────────────────────────────────
    defineField({
      name: "siteSettings",
      title: "Site Settings",
      type: "object",
      group: "settings",
      fields: [
        defineField({ name: "email", title: "Contact Email", type: "string" }),
        defineField({ name: "phone", title: "Phone Number", type: "string" }),
        localeTextField("footerTagline", "Footer Tagline"),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage Content" };
    },
  },
});
