'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const t = useTranslations('contactForm');

  const services = [
    t('services.walking'),
    t('services.grooming'),
    t('services.training'),
    t('services.boarding'),
  ];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', date: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'border border-[#e8e4dd] rounded-xl px-4 py-3 text-sm text-[#2e4a5c] placeholder-[#c4bdb4] bg-white focus:outline-none focus:border-[#f6c882] focus:ring-1 focus:ring-[#f6c882] transition-colors';

  return (
    <section id="book" className="py-24 bg-[#fdf0dc]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <Reveal direction="up">
          <p className="text-[#e8ad65] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span aria-hidden>🐾</span> {t('label')}
          </p>
          <h2 className="text-4xl font-extrabold text-[#2e4a5c] leading-tight">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col lg:flex-row gap-10 items-start">

          {/* Form card */}
          <Reveal direction="up" className="flex-1 w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-sm flex flex-col gap-5"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e4a5c]">{t('name')}</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder')}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e4a5c]">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e4a5c]">{t('phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t('phonePlaceholder')}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e4a5c]">{t('date')}</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Service dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2e4a5c]">{t('service')}</label>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} w-full appearance-none pr-10`}
                  >
                    <option value="">{t('servicePlaceholder')}</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4a6a7c]"
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2e4a5c]">{t('message')}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('messagePlaceholder')}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full bg-[#f6c882] hover:bg-[#e8ad65] disabled:opacity-60 text-[#2e4a5c] font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'sending'
                  ? t('sending')
                  : status === 'sent'
                  ? `✓ ${t('sent')}`
                  : <span>{t('submit')} →</span>}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">{t('error')}</p>
              )}
            </form>
          </Reveal>

          {/* Right column: blurb + image */}
          <Reveal direction="right" className="flex-1 flex flex-col gap-6 lg:pt-2">
            <p className="text-[#4a6a7c] leading-relaxed text-lg max-w-sm">
              {t('subtitle')}
            </p>

            {/* Drop your photo at public/contact-dog.webp to fill this in */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#2e4a5c]">
              <Image
                src="/gos-form.jpg"
                alt=""
                fill
                className="object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
