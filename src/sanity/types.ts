export interface LocaleField {
  en: string;
  es?: string;
  fr?: string;
  ca?: string;
}

/** Pick the right locale string, falling back to English. */
export function loc(
  field: LocaleField | null | undefined,
  locale: string
): string {
  if (!field) return "";
  const map = field as unknown as Record<string, string>;
  return map[locale] || map.en || "";
}

export interface SanityImageAsset {
  url: string;
}

export interface HeroData {
  label?: LocaleField;
  title?: LocaleField;
  subtitle?: LocaleField;
  ctaText?: LocaleField;
  backgroundImage?: { asset: SanityImageAsset };
}

export interface AboutData {
  label?: LocaleField;
  title?: LocaleField;
  body?: LocaleField;
  bullet1?: LocaleField;
  bullet2?: LocaleField;
  bullet3?: LocaleField;
  ctaText?: LocaleField;
  imageUrl?: string;
}

export interface SectionHeader {
  label?: LocaleField;
  title?: LocaleField;
  body?: LocaleField;
  subtitle?: LocaleField;
  ctaText?: LocaleField;
}

export interface AreasData extends SectionHeader {
  mapTitle?: LocaleField;
  mapSubtitle?: LocaleField;
}

export interface SiteSettings {
  email?: string;
  phone?: string;
  footerTagline?: LocaleField;
}

export interface HomepageData {
  hero?: HeroData;
  about?: AboutData;
  servicesSection?: SectionHeader;
  testimonialsSection?: SectionHeader;
  areasSection?: AreasData;
  howItWorksSection?: SectionHeader;
  siteSettings?: SiteSettings;
}

export interface ServiceData {
  title?: LocaleField;
  description?: LocaleField;
  imageUrl?: string;
}

export interface TestimonialData {
  title?: LocaleField;
  body?: LocaleField;
  name?: string;
  role?: LocaleField;
}

export interface StepData {
  number?: string;
  title?: LocaleField;
  description?: LocaleField;
}
