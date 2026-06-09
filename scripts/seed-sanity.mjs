/**
 * Seed script — uploads all content from messages/*.json into Sanity.
 *
 * Prerequisites:
 *   1. Add SANITY_API_TOKEN to .env.local (Editor or above token from
 *      https://www.sanity.io/manage → your project → API → Tokens)
 *   2. Run: node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load env ──────────────────────────────────────────────────────────────────
const dotenv = require("dotenv");
dotenv.config({ path: join(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_API_TOKEN is not set in .env.local\n" +
      "    Create one at https://www.sanity.io/manage → your project → API → Tokens\n" +
      "    Role required: Editor (or above)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ── Load locale files ─────────────────────────────────────────────────────────
const load = (locale) =>
  JSON.parse(readFileSync(join(__dirname, `../messages/${locale}.json`), "utf8"));

const en = load("en");
const es = load("es");
const fr = load("fr");
const ca = load("ca");

// Helper: build a localeString object from a key path
const ls = (getter) => ({
  en: getter(en),
  es: getter(es),
  fr: getter(fr),
  ca: getter(ca),
});

// ── Document builders ─────────────────────────────────────────────────────────

function buildHomepage() {
  return {
    _id: "homepage",
    _type: "homepage",

    meta: {
      title: ls((t) => t.meta.title),
      description: ls((t) => t.meta.description),
      keywords: ls((t) => t.meta.keywords),
    },

    nav: {
      home: ls((t) => t.nav.home),
      services: ls((t) => t.nav.services),
      about: ls((t) => t.nav.about),
      contact: ls((t) => t.nav.contact),
      bookNow: ls((t) => t.nav.bookNow),
    },

    hero: {
      label: ls((t) => t.hero.label),
      title: ls((t) => t.hero.title),
      subtitle: ls((t) => t.hero.subtitle),
      ctaText: ls((t) => t.hero.cta),
    },

    about: {
      label: ls((t) => t.about.label),
      title: ls((t) => t.about.title),
      body: ls((t) => t.about.body),
      bullet1: ls((t) => t.about.bullet1),
      bullet2: ls((t) => t.about.bullet2),
      bullet3: ls((t) => t.about.bullet3),
      ctaText: ls((t) => t.about.cta),
    },

    servicesSection: {
      label: ls((t) => t.services.label),
      title: ls((t) => t.services.title),
      body: ls((t) => t.services.body),
    },

    testimonialsSection: {
      label: ls((t) => t.testimonials.label),
      title: ls((t) => t.testimonials.title),
      subtitle: ls((t) => t.testimonials.subtitle),
    },

    areasSection: {
      label: ls((t) => t.areas.label),
      title: ls((t) => t.areas.title),
      body: ls((t) => t.areas.body),
      ctaText: ls((t) => t.areas.cta),
      mapTitle: ls((t) => t.areas.mapTitle),
      mapSubtitle: ls((t) => t.areas.mapSubtitle),
    },

    howItWorksSection: {
      label: ls((t) => t.howItWorks.label),
      title: ls((t) => t.howItWorks.title),
      body: ls((t) => t.howItWorks.body),
      ctaText: ls((t) => t.howItWorks.cta),
    },

    groomingPackagesSection: {
      label: ls((t) => t.groomingPackages.label),
      title: ls((t) => t.groomingPackages.title),
      titleAccent: ls((t) => t.groomingPackages.titleAccent),
      subtitle: ls((t) => t.groomingPackages.subtitle),
      bookNow: ls((t) => t.groomingPackages.bookNow),
    },

    groomingAddOnsSection: {
      label: ls((t) => t.groomingAddOns.label),
      title: ls((t) => t.groomingAddOns.title),
      subtitle: ls((t) => t.groomingAddOns.subtitle),
      bookAppointment: ls((t) => t.groomingAddOns.bookAppointment),
    },

    contactFormSection: {
      label: ls((t) => t.contactForm.label),
      title: ls((t) => t.contactForm.title),
      subtitle: ls((t) => t.contactForm.subtitle),
      name: ls((t) => t.contactForm.name),
      namePlaceholder: ls((t) => t.contactForm.namePlaceholder),
      email: ls((t) => t.contactForm.email),
      emailPlaceholder: ls((t) => t.contactForm.emailPlaceholder),
      phone: ls((t) => t.contactForm.phone),
      phonePlaceholder: ls((t) => t.contactForm.phonePlaceholder),
      date: ls((t) => t.contactForm.date),
      service: ls((t) => t.contactForm.service),
      servicePlaceholder: ls((t) => t.contactForm.servicePlaceholder),
      message: ls((t) => t.contactForm.message),
      messagePlaceholder: ls((t) => t.contactForm.messagePlaceholder),
      submit: ls((t) => t.contactForm.submit),
      sending: ls((t) => t.contactForm.sending),
      sent: ls((t) => t.contactForm.sent),
      error: ls((t) => t.contactForm.error),
      services: {
        walking: ls((t) => t.contactForm.services.walking),
        grooming: ls((t) => t.contactForm.services.grooming),
        sitting: ls((t) => t.contactForm.services.sitting),
      },
    },

    footerSection: {
      tagline: ls((t) => t.footer.tagline),
      bookNow: ls((t) => t.footer.bookNow),
      quickLinks: ls((t) => t.footer.quickLinks),
      getInTouch: ls((t) => t.footer.getInTouch),
      contactForm: ls((t) => t.footer.contactForm),
      copyright: ls((t) => t.footer.copyright),
      built: ls((t) => t.footer.built),
    },

    siteSettings: {
      email: "info@topgos.ad",
      phone: "+376 300 000",
    },
  };
}

function buildServices() {
  return [
    {
      _id: "service-dog-walking",
      _type: "service",
      title: ls((t) => t.services.dogWalking.title),
      description: ls((t) => t.services.dogWalking.description),
      order: 1,
    },
    {
      _id: "service-grooming",
      _type: "service",
      title: ls((t) => t.services.grooming.title),
      description: ls((t) => t.services.grooming.description),
      order: 2,
    },
    {
      _id: "service-sitting",
      _type: "service",
      title: ls((t) => t.services.sitting.title),
      description: ls((t) => t.services.sitting.description),
      order: 3,
    },
  ];
}

function buildTestimonials() {
  return [1, 2, 3, 4].map((n) => ({
    _id: `testimonial-${n}`,
    _type: "testimonial",
    title: ls((t) => t.testimonials[`t${n}`].title),
    body: ls((t) => t.testimonials[`t${n}`].body),
    name: en.testimonials[`t${n}`].name,
    role: ls((t) => t.testimonials[`t${n}`].role),
    order: n,
  }));
}

function buildSteps() {
  return [1, 2, 3].map((n) => ({
    _id: `step-${n}`,
    _type: "step",
    number: `0${n}`,
    title: ls((t) => t.howItWorks[`step${n}`].title),
    description: ls((t) => t.howItWorks[`step${n}`].description),
    order: n,
  }));
}

function buildGroomingPackages() {
  return [1, 2, 3].map((n) => ({
    _id: `grooming-package-${n}`,
    _type: "groomingPackage",
    name: ls((t) => t.groomingPackages[`pkg${n}Name`]),
    order: n,
  }));
}

function buildGroomingAddons() {
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    _id: `grooming-addon-${n}`,
    _type: "groomingAddon",
    name: ls((t) => t.groomingAddOns[`addon${n}Name`]),
    description: ls((t) => t.groomingAddOns[`addon${n}Desc`]),
    order: n,
  }));
}

// ── Upload ────────────────────────────────────────────────────────────────────

async function seed() {
  const documents = [
    buildHomepage(),
    ...buildServices(),
    ...buildTestimonials(),
    ...buildSteps(),
    ...buildGroomingPackages(),
    ...buildGroomingAddons(),
  ];

  console.log(`\n🌱  Seeding ${documents.length} documents to project "${projectId}" (${dataset})…\n`);

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✅  ${doc._type} › ${doc._id}`);
    } catch (err) {
      console.error(`  ❌  ${doc._type} › ${doc._id}`, err.message);
    }
  }

  console.log("\n🎉  Done!\n");
}

seed();
