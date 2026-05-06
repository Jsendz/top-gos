import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery, stepsQuery } from "@/sanity/queries";
import { loc, type HomepageData, type StepData } from "@/sanity/types";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

export default async function HowItWorks() {
  const [locale, t, cms, steps] = await Promise.all([
    getLocale(),
    getTranslations("howItWorks"),
    sanityFetch<HomepageData>(homepageQuery),
    sanityFetch<StepData[]>(stepsQuery),
  ]);

  const s = cms?.howItWorksSection;
  const label = s?.label   ? loc(s.label,   locale) : t("label");
  const title = s?.title   ? loc(s.title,   locale) : t("title");
  const body  = s?.body    ? loc(s.body,    locale) : t("body");
  const cta   = s?.ctaText ? loc(s.ctaText, locale) : t("cta");

  const stepList: Array<{ number: string; title: string; description: string }> =
    steps && steps.length > 0
      ? steps.map((st) => ({
          number:      st.number || "",
          title:       loc(st.title,       locale),
          description: loc(st.description, locale),
        }))
      : (["step1", "step2", "step3"] as const).map((k, i) => ({
          number:      String(i + 1).padStart(2, "0"),
          title:       t(`${k}.title`),
          description: t(`${k}.description`),
        }));

  return (
    <section id="contact" className="py-24 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

        {/* Left text — slides in from left */}
        <Reveal direction="left" className="flex-1 max-w-md">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight mb-6">{title}</h2>
          <p className="text-[#4a6a7c] leading-relaxed mb-8">{body}</p>
          <a
            href="mailto:hello@topgos.com"
            className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
          >
            {cta}
          </a>
        </Reveal>

        {/* Steps — staggered from right */}
        <StaggerReveal className="flex-1 w-full flex flex-col gap-4" delay={0.15}>
          {stepList.map((step) => (
            <StaggerItem key={step.number} direction="right">
              <div className="bg-[#2e4a5c] rounded-2xl px-8 py-7 flex items-start gap-6 hover:bg-[#1e3340] transition-colors duration-300">
                <span className="text-3xl font-extrabold text-[#f6c882] leading-none shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
