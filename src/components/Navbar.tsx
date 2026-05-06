"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { key: "home", href: "#home" },
    { key: "services", href: "#services" },
    { key: "about", href: "#about" },
    { key: "contact", href: "#contact" },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-gos.webp"
            alt="Top Gos logo"
            width={140}
            height={48}
            className="object-contain w-auto h-12"
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-[#f6c882] ${
                scrolled ? "text-[#2e4a5c]" : "text-slate-800"
              }`}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Right side: language switcher + CTA */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher scrolled={scrolled} />
          <a
            href="#contact"
            className="bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            {t("bookNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
