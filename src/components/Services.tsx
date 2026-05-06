import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery, servicesQuery } from "@/sanity/queries";
import { loc, type HomepageData, type ServiceData } from "@/sanity/types";
import Reveal from "@/components/ui/Reveal";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";

const fallbackImages = [
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80",
];

export default async function Services() {
  const [locale, t, cms, services] = await Promise.all([
    getLocale(),
    getTranslations("services"),
    sanityFetch<HomepageData>(homepageQuery),
    sanityFetch<ServiceData[]>(servicesQuery),
  ]);

  const s = cms?.servicesSection;
  const label = s?.label ? loc(s.label, locale) : t("label");
  const title = s?.title ? loc(s.title, locale) : t("title");
  const body  = s?.body  ? loc(s.body,  locale) : t("body");

  const serviceList: Array<{ title: string; description: string; image: string }> =
    services && services.length > 0
      ? services.map((sv, i) => ({
          title:       loc(sv.title,       locale),
          description: loc(sv.description, locale),
          image:       sv.imageUrl || fallbackImages[i] || fallbackImages[0],
        }))
      : [
          { title: t("dogWalking.title"), description: t("dogWalking.description"), image: fallbackImages[0] },
          { title: t("grooming.title"),   description: t("grooming.description"),   image: fallbackImages[1] },
          { title: t("sitting.title"),    description: t("sitting.description"),    image: fallbackImages[2] },
        ];

  return (
    <section id="services" className="py-24 bg-[#2e4a5c]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">{label}</p>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-5">{title}</h2>
          <p className="text-white/70 max-w-xl mx-auto leading-relaxed">{body}</p>
        </Reveal>

        {/* Cards — staggered */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" delay={0.1}>
          {serviceList.map((sv) => (
            <StaggerItem key={sv.title}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-52 w-full">
                  <Image
                    src={sv.image}
                    alt={sv.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2e4a5c] mb-2">{sv.title}</h3>
                  <p className="text-[#4a6a7c] text-sm leading-relaxed">{sv.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
