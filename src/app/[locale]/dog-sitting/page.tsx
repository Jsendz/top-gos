import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { localizedUrl } from "@/lib/seo";

const SLUG = "dog-sitting";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicePages.sitting" });
  const url = localizedUrl(locale, SLUG);

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: {
        ca: localizedUrl("ca", SLUG),
        es: localizedUrl("es", SLUG),
        fr: localizedUrl("fr", SLUG),
        en: localizedUrl("en", SLUG),
        "x-default": localizedUrl("ca", SLUG),
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url,
      siteName: "Top Gos",
      locale,
      type: "website",
    },
  };
}

export default function DogSittingPage() {
  return (
    <>
      <Navbar />
      <ServicePageTemplate serviceKey="sitting" slug={SLUG} />
      <Footer />
    </>
  );
}
