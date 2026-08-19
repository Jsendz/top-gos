import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import { SITE_URL, localizedUrl } from "@/lib/seo";

export type ServiceKey = "dogWalking" | "grooming" | "sitting";

const IMAGES: Record<ServiceKey, string> = {
  dogWalking: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",
  grooming: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
  sitting: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80",
};

type Props = {
  serviceKey: ServiceKey;
  slug: string;
};

export default async function ServicePageTemplate({ serviceKey, slug }: Props) {
  const [locale, t, tNav, tAreas, tServicePages] = await Promise.all([
    getLocale(),
    getTranslations(`servicePages.${serviceKey}`),
    getTranslations("nav"),
    getTranslations("areas"),
    getTranslations("servicePages"),
  ]);

  const highlights = t.raw("highlights") as string[];
  const pageUrl = localizedUrl(locale, slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("hero.title"),
    description: t("meta.description"),
    url: pageUrl,
    areaServed: "Andorra",
    provider: { "@id": `${SITE_URL}/#business` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("faq.q1"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.a1") },
      },
      {
        "@type": "Question",
        name: t("faq.q2"),
        acceptedAnswer: { "@type": "Answer", text: t("faq.a2") },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tNav("home"), item: localizedUrl(locale) },
      { "@type": "ListItem", position: 2, name: t("hero.label"), item: pageUrl },
    ],
  };

  return (
    <main>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="bg-white px-3 pt-28 pb-14 sm:px-4 sm:pt-32">
        <Reveal direction="up" className="max-w-3xl mx-auto text-center">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">
            {t("hero.label")}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2e4a5c] leading-tight mb-5">
            {t("hero.title")}
          </h1>
          <p className="text-[#4a6a7c] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {t("hero.subtitle")}
          </p>
          <Link
            href="/#book"
            className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
          >
            {t("cta")}
          </Link>
        </Reveal>
      </section>

      {/* Intro + image */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row gap-14 items-center">
          <Reveal direction="left" className="flex-1">
            <p className="text-[#4a6a7c] leading-relaxed mb-5">{t("intro.p1")}</p>
            <p className="text-[#4a6a7c] leading-relaxed">{t("intro.p2")}</p>
          </Reveal>
          <Reveal direction="right" delay={0.15} className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={IMAGES[serviceKey]}
                alt={t("hero.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 bg-[#2e4a5c]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal direction="up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center">
              {tServicePages("highlightsTitle")}
            </h2>
          </Reveal>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4" delay={0.1}>
            {highlights.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-4">
                  <span className="mt-0.5 text-[#f6c882] text-lg shrink-0">●</span>
                  <span className="text-sm text-white/80 leading-relaxed">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Areas served (reuses the existing translated parish list) */}
      <section className="py-16 bg-[#fdf0dc]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal direction="up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2e4a5c] mb-4">
              {tAreas("title")}
            </h2>
            <p className="text-[#4a6a7c] leading-relaxed">{tAreas("body")}</p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal direction="up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2e4a5c] mb-8 text-center">
              {tServicePages("faqTitle")}
            </h2>
          </Reveal>
          <StaggerReveal className="flex flex-col gap-5" delay={0.1}>
            <StaggerItem>
              <div className="border border-[#e8e4dd] rounded-2xl p-6">
                <h3 className="font-bold text-[#2e4a5c] mb-2">{t("faq.q1")}</h3>
                <p className="text-[#4a6a7c] text-sm leading-relaxed">{t("faq.a1")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border border-[#e8e4dd] rounded-2xl p-6">
                <h3 className="font-bold text-[#2e4a5c] mb-2">{t("faq.q2")}</h3>
                <p className="text-[#4a6a7c] text-sm leading-relaxed">{t("faq.a2")}</p>
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#f8f7f5] text-center px-6">
        <Link
          href="/#book"
          className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-8 py-4 rounded-full transition-colors duration-200"
        >
          {t("cta")}
        </Link>
        <p className="text-[#4a6a7c] text-sm mt-4">
          <Link href="/" className="underline hover:text-[#2e4a5c]">
            {tNav("home")}
          </Link>
        </p>
      </section>
    </main>
  );
}
