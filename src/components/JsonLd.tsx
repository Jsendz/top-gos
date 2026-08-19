import { getLocale, getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import type { HomepageData } from "@/sanity/types";
import { SITE_URL, localizedUrl } from "@/lib/seo";

const PARISHES = [
  "Andorra la Vella",
  "Escaldes-Engordany",
  "Encamp",
  "La Massana",
  "Ordino",
  "Sant Julià de Lòria",
  "Canillo",
];

/**
 * Renders LocalBusiness + Service JSON-LD structured data so search
 * engines can understand Top Gos as a local pet-care business serving
 * every parish of Andorra, its services, and how to contact it.
 */
export default async function JsonLd() {
  const [locale, t, cms] = await Promise.all([
    getLocale(),
    getTranslations("services"),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const settings = cms?.siteSettings;
  const email = settings?.email || "topgos@gmail.com";
  const phone = settings?.phone || "+376 300 000";
  const url = localizedUrl(locale);

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Top Gos",
    url,
    telephone: phone,
    email,
    image: `${SITE_URL}/logo-gos.webp`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AD",
      addressLocality: "Andorra la Vella",
    },
    areaServed: PARISHES.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dog care services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("dogWalking.title"),
            description: t("dogWalking.description"),
            url: localizedUrl(locale, "dog-walking"),
            areaServed: "Andorra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("grooming.title"),
            description: t("grooming.description"),
            url: localizedUrl(locale, "pet-grooming"),
            areaServed: "Andorra",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: t("sitting.title"),
            description: t("sitting.description"),
            url: localizedUrl(locale, "dog-sitting"),
            areaServed: "Andorra",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
