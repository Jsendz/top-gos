"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ca", name: "Català" },
];

export default function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors duration-200 ${
          scrolled
            ? "border-[#2e4a5c]/30 text-[#2e4a5c] hover:bg-[#2e4a5c] hover:text-white hover:border-[#2e4a5c]"
            : "border-white/40 text-white hover:border-white"
        }`}
      >
        {locale.toUpperCase()}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl overflow-hidden z-50 min-w-[140px] border border-gray-100">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                lang.code === locale
                  ? "bg-[#fdf0dc] text-[#2e4a5c] font-bold"
                  : "text-gray-700 hover:bg-[#fdf0dc] hover:text-[#2e4a5c]"
              }`}
            >
              <span className="font-semibold text-xs text-[#4a6a7c] mr-2">
                {lang.code.toUpperCase()}
              </span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
