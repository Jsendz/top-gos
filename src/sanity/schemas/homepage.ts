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
    { name: "meta", title: "🔍 SEO / Meta" },
    { name: "nav", title: "🧭 Navigation" },
    { name: "hero", title: "🦸 Hero" },
    { name: "about", title: "📖 About" },
    { name: "services", title: "🐕 Services" },
    { name: "testimonials", title: "💬 Testimonials" },
    { name: "areas", title: "📍 Areas" },
    { name: "howItWorks", title: "🔢 How It Works" },
    { name: "groomingPackages", title: "✂️ Grooming Packages" },
    { name: "groomingAddOns", title: "🛁 Grooming Add-Ons" },
    { name: "contactForm", title: "📬 Contact Form" },
    { name: "footer", title: "🦶 Footer" },
    { name: "settings", title: "⚙️ Site Settings" },
  ],
  fields: [
    // ── SEO / Meta ────────────────────────────────────────────────
    defineField({
      name: "meta",
      title: "SEO / Meta",
      type: "object",
      group: "meta",
      fields: [
        localeStringField("title", "Page Title"),
        localeTextField("description", "Meta Description"),
        localeStringField("keywords", "Meta Keywords"),
      ],
    }),

    // ── Navigation ────────────────────────────────────────────────
    defineField({
      name: "nav",
      title: "Navigation Labels",
      type: "object",
      group: "nav",
      fields: [
        localeStringField("home", "Home"),
        localeStringField("services", "Services"),
        localeStringField("about", "About"),
        localeStringField("contact", "Contact"),
        localeStringField("bookNow", "Book Now"),
      ],
    }),

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

    // ── Grooming Packages header ──────────────────────────────────
    defineField({
      name: "groomingPackagesSection",
      title: "Grooming Packages Section",
      type: "object",
      group: "groomingPackages",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeStringField("titleAccent", "Title Accent (highlighted word)"),
        localeTextField("subtitle", "Subtitle"),
        localeStringField("bookNow", "Book Now Button Text"),
      ],
    }),

    // ── Grooming Add-Ons header ───────────────────────────────────
    defineField({
      name: "groomingAddOnsSection",
      title: "Grooming Add-Ons Section",
      type: "object",
      group: "groomingAddOns",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("subtitle", "Subtitle"),
        localeStringField("bookAppointment", "Book Appointment Button Text"),
      ],
    }),

    // ── Contact Form labels ───────────────────────────────────────
    defineField({
      name: "contactFormSection",
      title: "Contact Form",
      type: "object",
      group: "contactForm",
      fields: [
        localeStringField("label", "Section Label"),
        localeStringField("title", "Title"),
        localeTextField("subtitle", "Subtitle"),
        localeStringField("name", "Name Field Label"),
        localeStringField("namePlaceholder", "Name Placeholder"),
        localeStringField("email", "Email Field Label"),
        localeStringField("emailPlaceholder", "Email Placeholder"),
        localeStringField("phone", "Phone Field Label"),
        localeStringField("phonePlaceholder", "Phone Placeholder"),
        localeStringField("date", "Date Field Label"),
        localeStringField("service", "Service Field Label"),
        localeStringField("servicePlaceholder", "Service Placeholder"),
        localeStringField("message", "Message Field Label"),
        localeTextField("messagePlaceholder", "Message Placeholder"),
        localeStringField("submit", "Submit Button Text"),
        localeStringField("sending", "Sending State Text"),
        localeStringField("sent", "Sent Confirmation Text"),
        localeStringField("error", "Error Message"),
        defineField({
          name: "services",
          title: "Service Options",
          type: "object",
          fields: [
            localeStringField("walking", "Dog Walking Label"),
            localeStringField("grooming", "Grooming Label"),
            localeStringField("sitting", "Dog Sitting Label"),
          ],
        }),
      ],
    }),

    // ── Footer ────────────────────────────────────────────────────
    defineField({
      name: "footerSection",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        localeTextField("tagline", "Footer Tagline"),
        localeStringField("bookNow", "Book Now Link Text"),
        localeStringField("quickLinks", "Quick Links Heading"),
        localeStringField("getInTouch", "Get In Touch Heading"),
        localeStringField("contactForm", "Contact Form Link Text"),
        localeStringField("copyright", "Copyright Text"),
        localeStringField("built", "Built-with Text"),
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
        localeTextField("footerTagline", "Footer Tagline (legacy)"),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage Content" };
    },
  },
});
