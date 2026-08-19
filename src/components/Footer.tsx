import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/client";
import { homepageQuery } from "@/sanity/queries";
import { loc, type HomepageData } from "@/sanity/types";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const [locale, t, nav, cms] = await Promise.all([
    getLocale(),
    getTranslations("footer"),
    getTranslations("nav"),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const settings = cms?.siteSettings;
  const email    = settings?.email    || "topgos@gmail.com";
  const phone    = settings?.phone    || "+376 300 000";
  const tagline  = settings?.footerTagline
    ? loc(settings.footerTagline, locale)
    : t("tagline");

  // Homepage-relative anchors so these still resolve correctly from
  // subpages like /dog-walking, not just from the homepage itself.
  const quickLinks = [
    { key: "home",     href: "/#home" },
    { key: "services", href: "/#services" },
    { key: "about",    href: "/#about" },
    { key: "contact",  href: "/#book" },
  ] as const;

  return (
    <footer className="bg-[#2e4a5c] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5">
              <Image
                src="/bottomlogo-gos.webp"
                alt="Top Gos logo"
                width={140}
                height={80}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">{tagline}</p>
            <Link
              href="/#book"
              className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              {t("bookNow")}
            </Link>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-5">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-[#f6c882] text-sm transition-colors duration-200"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-5">
              {t("getInTouch")}
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <span>📝</span>
                <Link href="/#book" className="hover:text-[#f6c882] transition-colors">
                  {t("contactForm")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${email}`} className="hover:text-[#f6c882] transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-[#f6c882] transition-colors">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-white/30 text-xs">{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}
