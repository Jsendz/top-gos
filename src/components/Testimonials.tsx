import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery, testimonialsQuery } from "@/sanity/queries";
import { loc, type HomepageData, type TestimonialData } from "@/sanity/types";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

export default async function Testimonials() {
  const [locale, t, cms, testimonials] = await Promise.all([
    getLocale(),
    getTranslations("testimonials"),
    sanityFetch<HomepageData>(homepageQuery),
    sanityFetch<TestimonialData[]>(testimonialsQuery),
  ]);

  const s = cms?.testimonialsSection;
  const label    = s?.label    ? loc(s.label,    locale) : t("label");
  const title    = s?.title    ? loc(s.title,    locale) : t("title");
  const subtitle = s?.subtitle ? loc(s.subtitle, locale) : t("subtitle");

  const cards: Array<{ title: string; body: string; name: string; role: string }> =
    testimonials && testimonials.length > 0
      ? testimonials.map((tm) => ({
          title: loc(tm.title, locale),
          body:  loc(tm.body,  locale),
          name:  tm.name || "",
          role:  loc(tm.role,  locale),
        }))
      : (["t1", "t2", "t3", "t4"] as const).map((k) => ({
          title: t(`${k}.title`),
          body:  t(`${k}.body`),
          name:  t(`${k}.name`),
          role:  t(`${k}.role`),
        }));

  return (
    <section id="testimonials" className="py-24 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] mb-4">{title}</h2>
          <p className="text-[#4a6a7c] max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </Reveal>

        {/* Cards — staggered horizontal scroll */}
        <StaggerReveal
          className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory"
          delay={0.05}
          staggerDelay={0.1}
        >
          {cards.map((card, i) => (
            <StaggerItem key={i} direction="up">
              <div className="flex-shrink-0 w-72 md:w-80 bg-[#f6c882] rounded-2xl p-7 snap-start hover:scale-[1.02] transition-transform duration-300">
                <span className="text-4xl font-serif text-[#2e4a5c]/30 leading-none mb-4 block">&ldquo;&rdquo;</span>
                <h3 className="text-base font-bold text-[#2e4a5c] mb-3">{card.title}</h3>
                <p className="text-[#2e4a5c]/80 text-sm leading-relaxed mb-6">{card.body}</p>
                <div>
                  <p className="font-bold text-[#2e4a5c] text-sm">{card.name}</p>
                  <p className="text-[#2e4a5c]/60 text-xs uppercase tracking-wide">{card.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
