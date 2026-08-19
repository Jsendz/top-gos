import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import { localizedUrl } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: localizedUrl(locale),
      languages: {
        ca: localizedUrl("ca"),
        es: localizedUrl("es"),
        fr: localizedUrl("fr"),
        en: localizedUrl("en"),
        "x-default": localizedUrl("ca"),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedUrl(locale),
      siteName: "Top Gos",
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es" | "fr" | "ca")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <JsonLd />
      {children}
    </NextIntlClientProvider>
  );
}
