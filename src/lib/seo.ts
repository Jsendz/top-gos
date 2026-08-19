export const SITE_URL = "https://www.topgos.ad";

/**
 * Builds an absolute, canonical URL for a given locale + path.
 *
 * With next-intl's `localePrefix: "as-needed"` and `defaultLocale: "en"`,
 * English is served unprefixed at the root (e.g. "/dog-walking"), while
 * every other locale keeps its prefix (e.g. "/es/dog-walking"). Any code
 * building canonical/hreflang/sitemap URLs must follow this same rule or
 * search engines will see a self-referencing canonical that doesn't match
 * the page's real URL.
 */
export function localizedUrl(locale: string, path = ""): string {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "en" ? `${SITE_URL}${suffix}` : `${SITE_URL}/${locale}${suffix}`;
}
