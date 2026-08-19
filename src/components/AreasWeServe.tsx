import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import { loc, type HomepageData } from "@/sanity/types";

export default async function AreasWeServe() {
  const [locale, t, cms] = await Promise.all([
    getLocale(),
    getTranslations("areas"),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const a = cms?.areasSection;
  const label      = a?.label      ? loc(a.label,      locale) : t("label");
  const title      = a?.title      ? loc(a.title,      locale) : t("title");
  const body       = a?.body       ? loc(a.body,       locale) : t("body");
  const cta        = a?.ctaText    ? loc(a.ctaText,    locale) : t("cta");
  const mapTitle   = a?.mapTitle   ? loc(a.mapTitle,   locale) : t("mapTitle");
  const mapSubtitle= a?.mapSubtitle? loc(a.mapSubtitle,locale) : t("mapSubtitle");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 max-w-lg">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">
            {label}
          </p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight mb-6">{title}</h2>
          <p className="text-[#4a6a7c] leading-relaxed mb-8">{body}</p>
          <a
            href="#book"
            className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
          >
            {cta}
          </a>
        </div>

        <div className="flex-1 w-full">
          <div className="rounded-2xl h-72 lg:h-96 bg-[#fdf0dc] flex items-center justify-center border border-[#f6c882]/40">
            <div className="text-center text-[#2e4a5c]">
              <div className="text-6xl mb-4">📍</div>
              <p className="font-semibold text-lg">{mapTitle}</p>
              <p className="text-sm text-[#4a6a7c] mt-1">{mapSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
