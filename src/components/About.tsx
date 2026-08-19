import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import { loc, type HomepageData } from "@/sanity/types";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

export default async function About() {
  const [locale, t, cms] = await Promise.all([
    getLocale(),
    getTranslations("about"),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const a = cms?.about;
  const sideImage = a?.imageUrl;

  const label = a?.label   ? loc(a.label,   locale) : t("label");
  const title = a?.title   ? loc(a.title,   locale) : t("title");
  const body  = a?.body    ? loc(a.body,    locale) : t("body");
  const b1    = a?.bullet1 ? loc(a.bullet1, locale) : t("bullet1");
  const b2    = a?.bullet2 ? loc(a.bullet2, locale) : t("bullet2");
  const b3    = a?.bullet3 ? loc(a.bullet3, locale) : t("bullet3");
  const cta   = a?.ctaText ? loc(a.ctaText, locale) : t("cta");

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

        {/* Text — slides in from left */}
        <Reveal direction="left" className="flex-1">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight mb-6 max-w-md">{title}</h2>
          <p className="text-[#4a6a7c] leading-relaxed mb-8 max-w-lg">{body}</p>

          <StaggerReveal delay={0.2} staggerDelay={0.1}>
            {[b1, b2, b3].map((bullet, i) => (
              <StaggerItem key={i}>
                <li className="flex items-start gap-3 mb-3 list-none">
                  <span className="mt-0.5 text-[#f6c882] text-lg shrink-0">●</span>
                  <span className="text-sm text-[#4a6a7c] leading-relaxed">{bullet}</span>
                </li>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <a
            href="#book"
            className="inline-block mt-2 bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
          >
            {cta}
          </a>
        </Reveal>

        {/* Image — slides in from right */}
        <Reveal direction="right" delay={0.15} className="flex-1 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={sideImage || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"}
              alt="Top Gos caring for a dog in Andorra"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
