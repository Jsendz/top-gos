import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import { loc, type HomepageData } from "@/sanity/types";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

export default async function Hero() {
  const [locale, t, cms] = await Promise.all([
    getLocale(),
    getTranslations("hero"),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const h = cms?.hero;
  const bgImage = h?.backgroundImage?.asset?.url;

  const label    = h?.label    ? loc(h.label,    locale) : t("label");
  const title    = h?.title    ? loc(h.title,    locale) : t("title");
  const subtitle = h?.subtitle ? loc(h.subtitle, locale) : t("subtitle");
  const cta      = h?.ctaText  ? loc(h.ctaText,  locale) : t("cta");

  return (
    <section id="home" className="bg-white px-3 pt-20 pb-10 sm:px-4 sm:pt-24 sm:pb-12">
      <div className="relative mx-auto max-w-[1152px] h-[420px] sm:h-[480px] md:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden">
        <Image
          src={bgImage || "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=80"}
          alt="Dog walking, grooming and in-home care in Andorra"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1152px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3340]/90 via-[#2e4a5c]/65 to-[#2e4a5c]/20 sm:to-transparent" />

        {/* Staggered text reveal on load */}
        <StaggerReveal
          className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 md:px-14 max-w-3xl"
          delay={0.1}
        >
          <StaggerItem>
            <p className="text-[#f6c882] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
              {label}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-5">
              {title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-white/80 text-sm sm:text-base max-w-xs sm:max-w-sm mb-7 sm:mb-8 leading-relaxed">
              {subtitle}
            </p>
          </StaggerItem>
          <StaggerItem>
            <a
              href="#book"
              className="inline-block self-start border-2 border-[#f6c882] text-[#f6c882] hover:bg-[#f6c882] hover:text-[#2e4a5c] font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors duration-200"
            >
              {cta}
            </a>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
