import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';
import StaggerReveal, { StaggerItem } from '@/components/ui/StaggerReveal';

const ADD_ONS = [
  {
    nameKey: 'addon1Name' as const,
    price: '$15',
    descKey: 'addon1Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Flower / facial */}
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
        <path d="M12 17a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
        <path d="M2 12a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-5 0z" />
        <path d="M17 12a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-5 0z" />
      </svg>
    ),
  },
  {
    nameKey: 'addon2Name' as const,
    price: '$20',
    descKey: 'addon2Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Scissors */}
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    nameKey: 'addon3Name' as const,
    price: '$10',
    descKey: 'addon3Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Tooth */}
        <path d="M12 2c-2.8 0-5 1.8-5 4 0 1.5.6 2.8 1 4l1 6c.2 1.1.8 2 2 2s1.8-.9 2-2l.5-3 .5 3c.2 1.1.8 2 2 2s1.8-.9 2-2l1-6c.4-1.2 1-2.5 1-4 0-2.2-2.2-4-5-4z" />
      </svg>
    ),
  },
  {
    nameKey: 'addon4Name' as const,
    price: '$25',
    descKey: 'addon4Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Comb / brush */}
        <rect x="3" y="3" width="18" height="5" rx="1" />
        <line x1="6" y1="8" x2="6" y2="18" />
        <line x1="10" y1="8" x2="10" y2="21" />
        <line x1="14" y1="8" x2="14" y2="18" />
        <line x1="18" y1="8" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    nameKey: 'addon5Name' as const,
    price: '$18',
    descKey: 'addon5Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Water drop */}
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    nameKey: 'addon6Name' as const,
    price: '$12',
    descKey: 'addon6Desc' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Ear shape */}
        <path d="M6 9a6 6 0 0 1 12 0c0 4-2 6-3 8s-1.5 3-3 3-2-1.5-2-3" />
        <path d="M9 9a3 3 0 0 1 6 0c0 2.5-1.5 4-1.5 6" />
      </svg>
    ),
  },
];

export default async function GroomingAddOns() {
  const t = await getTranslations('groomingAddOns');

  return (
    <section className="py-24 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-14">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">
            {t('label')}
          </p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-[#4a6a7c] max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* 3×2 grid */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" delay={0.1}>
          {ADD_ONS.map((addon) => (
            <StaggerItem key={addon.nameKey} direction="up">
              <div className="flex flex-col items-center text-center px-4">
                {/* Icon container */}
                <div className="w-16 h-16 rounded-full bg-[#fdf0dc] flex items-center justify-center text-[#2e4a5c] mb-5">
                  {addon.icon}
                </div>
                {/* Name + price */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#2e4a5c]">
                    {t(addon.nameKey)}
                  </h3>
                  <span className="bg-[#fdf0dc] text-[#e8ad65] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {addon.price}
                  </span>
                </div>
                {/* Description */}
                <p className="text-[#4a6a7c] text-sm leading-relaxed">
                  {t(addon.descKey)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* CTA */}
        <Reveal direction="up" className="text-center">
          <a
            href="#book"
            className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            {t('bookAppointment')}
          </a>
        </Reveal>

      </div>
    </section>
  );
}
