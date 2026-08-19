import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

const SERVICE_PAGES = ["dog-walking", "pet-grooming", "dog-sitting"];

function alternatesFor(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, localizedUrl(l, path)])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: localizedUrl(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: alternatesFor(""),
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICE_PAGES.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternatesFor(path),
    }))
  );

  return [...homepage, ...servicePages];
}
