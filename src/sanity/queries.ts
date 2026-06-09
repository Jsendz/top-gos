import { groq } from "next-sanity";

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    meta { title, description, keywords },
    nav { home, services, about, contact, bookNow },
    hero {
      label, title, subtitle, ctaText,
      backgroundImage { asset->{ url } }
    },
    about {
      label, title, body,
      bullet1, bullet2, bullet3, ctaText,
      "imageUrl": image.asset->url
    },
    servicesSection { label, title, body },
    testimonialsSection { label, title, subtitle },
    areasSection { label, title, body, ctaText, mapTitle, mapSubtitle },
    howItWorksSection { label, title, body, ctaText },
    groomingPackagesSection { label, title, titleAccent, subtitle, bookNow },
    groomingAddOnsSection { label, title, subtitle, bookAppointment },
    contactFormSection {
      label, title, subtitle,
      name, namePlaceholder, email, emailPlaceholder,
      phone, phonePlaceholder, date,
      service, servicePlaceholder,
      message, messagePlaceholder,
      submit, sending, sent, error,
      services { walking, grooming, sitting }
    },
    footerSection {
      tagline, bookNow, quickLinks, getInTouch,
      contactForm, copyright, built
    },
    siteSettings { email, phone, footerTagline }
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title, description,
    "imageUrl": image.asset->url
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    title, body, name, role
  }
`;

export const stepsQuery = groq`
  *[_type == "step"] | order(order asc) {
    number, title, description
  }
`;

export const groomingPackagesQuery = groq`
  *[_type == "groomingPackage"] | order(order asc) {
    name, price, features,
    "imageUrl": image.asset->url
  }
`;

export const groomingAddonsQuery = groq`
  *[_type == "groomingAddon"] | order(order asc) {
    name, description
  }
`;
