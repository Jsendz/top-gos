'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

const PACKAGES = [
  {
    id: 'essential',
    nameKey: 'pkg1Name' as const,
    image: '/gos-form.jpg',
    price: '$80',
    features: [
      'Gentle bath with pet-safe shampoo',
      'Nail trimming & filing',
      'Ear cleaning',
      'Paw pad moisturizing',
      'Fluff dry & brush-out',
      'Complimentary bowtie or floral collar',
    ],
  },
  {
    id: 'signature',
    nameKey: 'pkg2Name' as const,
    image: '/gos-form.jpg',
    price: '$120',
    features: [
      'Everything in The Essential Elegance',
      'Blueberry facial treatment',
      'Deep fur conditioning',
      'Teeth brushing',
      'Bandana or bow of choice',
      'Post-groom spritz',
    ],
  },
  {
    id: 'royal',
    nameKey: 'pkg3Name' as const,
    image: '/gos-form.jpg',
    price: '$160',
    features: [
      'Everything in The Signature Spa Day',
      'Full de-shedding treatment',
      'Pawdicure Plus',
      'Aromatherapy rinse',
      'Premium cologne or perfume',
      'Take-home grooming kit',
    ],
  },
];

export default function GroomingPackages() {
  const t = useTranslations('groomingPackages');
  const [active, setActive] = useState(0);
  const pkg = PACKAGES[active];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <Reveal direction="up" className="text-center mb-12">
          <p className="text-[#f6c882] text-xs font-bold uppercase tracking-widest mb-3">
            {t('label')}
          </p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight mb-4">
            {t('title')}{' '}
            <span className="text-[#f6c882]">{t('titleAccent')}</span>
          </h2>
          <p className="text-[#4a6a7c] max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Tab bar */}
        <Reveal direction="up">
          <div className="flex justify-center mb-10">
            <div className="flex overflow-x-auto border border-[#e8e4dd] rounded-2xl p-1 gap-1">
              {PACKAGES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    active === i
                      ? 'bg-[#2e4a5c] text-white'
                      : 'text-[#4a6a7c] hover:text-[#2e4a5c]'
                  }`}
                >
                  {t(p.nameKey)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Package content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Photo */}
          <Reveal direction="left" className="flex-1 w-full">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8e4dd]">
              <Image
                src={pkg.image}
                alt={t(pkg.nameKey)}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Card */}
          <Reveal direction="right" className="flex-1 w-full">
            <div className="border border-[#e8e4dd] rounded-3xl p-8 bg-white shadow-sm">
              <span className="inline-block bg-[#fdf0dc] text-[#e8ad65] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {pkg.price}
              </span>
              <h3 className="text-2xl font-extrabold text-[#2e4a5c] mb-6">
                {t(pkg.nameKey)}
              </h3>
              <ul className="flex flex-col gap-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#4a6a7c] text-sm leading-relaxed">
                    {/* Checkmark */}
                    <svg
                      className="shrink-0 mt-0.5 text-[#f6c882]"
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className="inline-block bg-[#f6c882] hover:bg-[#e8ad65] text-[#2e4a5c] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200"
              >
                {t('bookNow')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
