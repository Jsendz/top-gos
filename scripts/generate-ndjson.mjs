import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const load = (locale) =>
  JSON.parse(readFileSync(join(__dirname, `../messages/${locale}.json`), "utf8"));

const en = load("en"), es = load("es"), fr = load("fr"), ca = load("ca");
const ls = (g) => ({ en: g(en), es: g(es), fr: g(fr), ca: g(ca) });

// Stable key for Sanity array items (required)
const key = (str) => createHash("md5").update(str).digest("hex").slice(0, 12);

// ── Grooming package features ─────────────────────────────────────────────────
const PKG_FEATURES = {
  1: [
    { en: "Gentle bath with pet-safe shampoo",  es: "Baño suave con champú seguro para mascotas",         fr: "Bain doux avec shampooing sécurisé pour animaux",    ca: "Bany suau amb xampú segur per a mascotes" },
    { en: "Nail trimming & filing",              es: "Corte y limado de uñas",                             fr: "Coupe et lime des griffes",                          ca: "Tall i llimat d'ungles" },
    { en: "Ear cleaning",                        es: "Limpieza de oídos",                                  fr: "Nettoyage des oreilles",                             ca: "Neteja d'orelles" },
    { en: "Paw pad moisturizing",                es: "Hidratación de las almohadillas",                    fr: "Hydratation des coussinets",                         ca: "Hidratació dels coixinets" },
    { en: "Fluff dry & brush-out",               es: "Secado y cepillado",                                 fr: "Séchage et brossage",                                ca: "Assecat i raspallat" },
    { en: "Complimentary bowtie or floral collar", es: "Pajarita o collar floral de regalo",               fr: "Nœud papillon ou collier floral offert",             ca: "Llaç o collar floral de regal" },
  ],
  2: [
    { en: "Everything in The Essential Elegance",  es: "Todo lo incluido en La Elegancia Esencial",       fr: "Tout inclus dans L'Élégance Essentielle",            ca: "Tot inclòs a L'Elegància Essencial" },
    { en: "Blueberry facial treatment",            es: "Tratamiento facial de arándanos",                  fr: "Soin du visage aux myrtilles",                       ca: "Tractament facial de nabius" },
    { en: "Deep fur conditioning",                 es: "Acondicionamiento profundo del pelaje",            fr: "Soin conditionneur profond du pelage",               ca: "Condicionament profund del pelatge" },
    { en: "Teeth brushing",                        es: "Cepillado dental",                                 fr: "Brossage des dents",                                 ca: "Raspallat de dents" },
    { en: "Bandana or bow of choice",              es: "Bandana o lazo a elegir",                          fr: "Bandana ou nœud au choix",                           ca: "Bandana o llaç a triar" },
    { en: "Post-groom spritz",                     es: "Colonia post-peluquería",                          fr: "Vaporisation post-toilettage",                       ca: "Colònia post-perruqueria" },
  ],
  3: [
    { en: "Everything in The Signature Spa Day",   es: "Todo lo incluido en El Día de Spa Signature",     fr: "Tout inclus dans La Journée Spa Signature",          ca: "Tot inclòs al Dia de Spa Signature" },
    { en: "Full de-shedding treatment",            es: "Tratamiento completo anticaída",                   fr: "Traitement anti-mue complet",                        ca: "Tractament anticaiguda complet" },
    { en: "Pawdicure Plus",                        es: "Pawdicure Plus",                                   fr: "Pawdicure Plus",                                     ca: "Pawdicure Plus" },
    { en: "Aromatherapy rinse",                    es: "Aclarado de aromaterapia",                         fr: "Rinçage à l'aromathérapie",                          ca: "Aclarida d'aromaterapia" },
    { en: "Premium cologne or perfume",            es: "Colonia o perfume premium",                        fr: "Cologne ou parfum premium",                          ca: "Colònia o perfum premium" },
    { en: "Take-home grooming kit",                es: "Kit de peluquería para llevar a casa",             fr: "Kit de toilettage à emporter",                       ca: "Kit de perruqueria per endur-se" },
  ],
};

const ADDON_PRICES = { 1: "€15", 2: "€20", 3: "€10", 4: "€25", 5: "€18", 6: "€12" };
const PKG_PRICES   = { 1: "€80", 2: "€120", 3: "€160" };

// ── Documents ─────────────────────────────────────────────────────────────────
const docs = [
  {
    _id: "homepage", _type: "homepage",
    meta: { title: ls(t=>t.meta.title), description: ls(t=>t.meta.description), keywords: ls(t=>t.meta.keywords) },
    nav: { home: ls(t=>t.nav.home), services: ls(t=>t.nav.services), about: ls(t=>t.nav.about), contact: ls(t=>t.nav.contact), bookNow: ls(t=>t.nav.bookNow) },
    hero: { label: ls(t=>t.hero.label), title: ls(t=>t.hero.title), subtitle: ls(t=>t.hero.subtitle), ctaText: ls(t=>t.hero.cta) },
    about: { label: ls(t=>t.about.label), title: ls(t=>t.about.title), body: ls(t=>t.about.body), bullet1: ls(t=>t.about.bullet1), bullet2: ls(t=>t.about.bullet2), bullet3: ls(t=>t.about.bullet3), ctaText: ls(t=>t.about.cta) },
    servicesSection: { label: ls(t=>t.services.label), title: ls(t=>t.services.title), body: ls(t=>t.services.body) },
    testimonialsSection: { label: ls(t=>t.testimonials.label), title: ls(t=>t.testimonials.title), subtitle: ls(t=>t.testimonials.subtitle) },
    areasSection: { label: ls(t=>t.areas.label), title: ls(t=>t.areas.title), body: ls(t=>t.areas.body), ctaText: ls(t=>t.areas.cta), mapTitle: ls(t=>t.areas.mapTitle), mapSubtitle: ls(t=>t.areas.mapSubtitle) },
    howItWorksSection: { label: ls(t=>t.howItWorks.label), title: ls(t=>t.howItWorks.title), body: ls(t=>t.howItWorks.body), ctaText: ls(t=>t.howItWorks.cta) },
    groomingPackagesSection: { label: ls(t=>t.groomingPackages.label), title: ls(t=>t.groomingPackages.title), titleAccent: ls(t=>t.groomingPackages.titleAccent), subtitle: ls(t=>t.groomingPackages.subtitle), bookNow: ls(t=>t.groomingPackages.bookNow) },
    groomingAddOnsSection: { label: ls(t=>t.groomingAddOns.label), title: ls(t=>t.groomingAddOns.title), subtitle: ls(t=>t.groomingAddOns.subtitle), bookAppointment: ls(t=>t.groomingAddOns.bookAppointment) },
    contactFormSection: { label: ls(t=>t.contactForm.label), title: ls(t=>t.contactForm.title), subtitle: ls(t=>t.contactForm.subtitle), name: ls(t=>t.contactForm.name), namePlaceholder: ls(t=>t.contactForm.namePlaceholder), email: ls(t=>t.contactForm.email), emailPlaceholder: ls(t=>t.contactForm.emailPlaceholder), phone: ls(t=>t.contactForm.phone), phonePlaceholder: ls(t=>t.contactForm.phonePlaceholder), date: ls(t=>t.contactForm.date), service: ls(t=>t.contactForm.service), servicePlaceholder: ls(t=>t.contactForm.servicePlaceholder), message: ls(t=>t.contactForm.message), messagePlaceholder: ls(t=>t.contactForm.messagePlaceholder), submit: ls(t=>t.contactForm.submit), sending: ls(t=>t.contactForm.sending), sent: ls(t=>t.contactForm.sent), error: ls(t=>t.contactForm.error), services: { walking: ls(t=>t.contactForm.services.walking), grooming: ls(t=>t.contactForm.services.grooming), sitting: ls(t=>t.contactForm.services.sitting) } },
    footerSection: { tagline: ls(t=>t.footer.tagline), bookNow: ls(t=>t.footer.bookNow), quickLinks: ls(t=>t.footer.quickLinks), getInTouch: ls(t=>t.footer.getInTouch), contactForm: ls(t=>t.footer.contactForm), copyright: ls(t=>t.footer.copyright), built: ls(t=>t.footer.built) },
    siteSettings: { email: "info@topgos.ad", phone: "+376 300 000" },
  },
  ...[["dog-walking","dogWalking",1],["grooming","grooming",2],["sitting","sitting",3]].map(([slug,k,order])=>({
    _id:`service-${slug}`,_type:"service",order,title:ls(t=>t.services[k].title),description:ls(t=>t.services[k].description)
  })),
  ...[1,2,3,4].map(n=>({
    _id:`testimonial-${n}`,_type:"testimonial",order:n,
    title:ls(t=>t.testimonials[`t${n}`].title),body:ls(t=>t.testimonials[`t${n}`].body),
    name:en.testimonials[`t${n}`].name,role:ls(t=>t.testimonials[`t${n}`].role)
  })),
  ...[1,2,3].map(n=>({
    _id:`step-${n}`,_type:"step",order:n,number:`0${n}`,
    title:ls(t=>t.howItWorks[`step${n}`].title),description:ls(t=>t.howItWorks[`step${n}`].description)
  })),
  ...[1,2,3].map(n=>({
    _id:`grooming-package-${n}`,_type:"groomingPackage",order:n,
    name:ls(t=>t.groomingPackages[`pkg${n}Name`]),
    price: PKG_PRICES[n],
    features: PKG_FEATURES[n].map((text, i) => ({
      _type: "object",
      _key: key(`pkg${n}-feat${i}`),
      text,
    })),
  })),
  ...[1,2,3,4,5,6].map(n=>({
    _id:`grooming-addon-${n}`,_type:"groomingAddon",order:n,
    name:ls(t=>t.groomingAddOns[`addon${n}Name`]),
    price: ADDON_PRICES[n],
    description:ls(t=>t.groomingAddOns[`addon${n}Desc`]),
  })),
];

const ndjson = docs.map(d => JSON.stringify(d)).join("\n");
writeFileSync(join(__dirname, "../data.ndjson"), ndjson);
console.log(`✅  Generated data.ndjson with ${docs.length} documents`);
