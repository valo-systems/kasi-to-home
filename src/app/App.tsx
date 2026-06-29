import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Phone, MessageCircle, Menu, X, Shield, Heart, Users, Check,
  ChevronDown, Mail, Clock, ExternalLink, Star, Home, Leaf,
  FileText, ArrowRight,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import logoImg from "@/assets/logo-circle-transparent-tight.png";
import logoTaglineImg from "@/assets/logo-with-tagline.png";
import atlehangLogoImg from "@/assets/atlehanglife-logo.png";

// ─── Brand constants ──────────────────────────────────────────────────────────
const GOLD = "#C9A44C";
const GOLD_RICH = "#A87B24";
const CREAM = "#F7F1E5";   // page background
const CARD = "#EDE7D8";    // card/surface background
const INK = "#2C1A0E";     // primary text (warm near-black)
const BLACK = "#070707";   // button text on gold only
const EMERALD = "#061F1C"; // dark trust strip
const NAVY = "#07111F";

// ─── Data ────────────────────────────────────────────────────────────────────

interface CoverAmount { label: string; amount: string; }
interface FuneralPlan {
  name: string; premium: number; coverPeople: string; includes: string;
  ageBand: string; benefits: string[]; coverAmounts: CoverAmount[];
  monument: string;
  highlight?: boolean;
}

const funeralPlans: FuneralPlan[] = [
  {
    name: "Excel Plan", premium: 167, coverPeople: "6 people",
    includes: "Member + spouse and 6 children",
    ageBand: "Member + spouse: 18–65 years; children: 0–21 years",
    monument: "Gravemaker",
    benefits: ["Flatlid coffin", "Hearse and 1 family car", "Tent and 50 chairs", "1 toilet", "2 tables", "Vegetables", "A2 photo"],
    coverAmounts: [
      { label: "Member + spouse", amount: "R15,000" },
      { label: "Children 14–21 years", amount: "R15,000" },
      { label: "Children 6–13 years", amount: "R7,500" },
      { label: "Children 1–5 years", amount: "R3,750" },
      { label: "Stillborn to 11 months", amount: "R1,875" },
    ],
  },
  {
    name: "Delta Plan", premium: 210, coverPeople: "6 people",
    includes: "Member + spouse and 6 children",
    ageBand: "Member + spouse: 18–65 years; children: 0–21 years",
    monument: "Gravemaker",
    benefits: ["Open face square casket", "Hearse and 2 family cars", "Tent and 50 chairs", "1 toilet", "2 tables", "Groceries and vegetables", "A2 photo"],
    coverAmounts: [
      { label: "Member + spouse", amount: "R20,000" },
      { label: "Children 14–21 years", amount: "R20,000" },
      { label: "Children 6–13 years", amount: "R10,000" },
      { label: "Children 1–5 years", amount: "R5,000" },
      { label: "Stillborn to 11 months", amount: "R2,500" },
    ],
  },
  {
    name: "Classic Plan", premium: 291, coverPeople: "6 people",
    includes: "Member + spouse and 6 children",
    ageBand: "Member + spouse: 18–65 years; children: 0–21 years",
    monument: "Headstone",
    benefits: ["Kiaat Mini Dome coffin", "Coffin spray", "Hearse and 4 family cars", "7×12 tent and 100 chairs", "1 toilet", "4 tables", "Groceries and vegetables", "A2 photo", "1× flowers"],
    coverAmounts: [
      { label: "Member + spouse", amount: "R30,000" },
      { label: "Children 14–21 years", amount: "R30,000" },
      { label: "Children 6–13 years", amount: "R15,000" },
      { label: "Children 1–5 years", amount: "R7,500" },
      { label: "Stillborn to 11 months", amount: "R3,750" },
    ],
  },
  {
    name: "Blue Plan", premium: 470, coverPeople: "6 people",
    includes: "Member + spouse and 6 children",
    ageBand: "Member + spouse: 18–65 years; children: 0–21 years",
    monument: "Headstone",
    highlight: true,
    benefits: ["Kiaat Standard Dome coffin", "Coffin spray", "Hearse and 4 family cars", "7×12 tent and 100 chairs", "1 toilet", "4 tables", "Groceries and vegetables", "A2 photo", "2× flowers"],
    coverAmounts: [
      { label: "Member + spouse", amount: "R50,000" },
      { label: "Children 14–21 years", amount: "R50,000" },
      { label: "Children 6–13 years", amount: "R25,000" },
      { label: "Children 1–5 years", amount: "R12,500" },
      { label: "Stillborn to 11 months", amount: "R6,250" },
    ],
  },
];

const contactInfo = {
  businessPhone: "+27782613861",
  businessPhoneDisplay: "+27 78 261 3861",
  email: "info@kasitohomefunerals.co.za",
  registration: "2026/254458/07",
  hours: "9:00 AM – 5:00 PM",
  whatsapp: "https://wa.me/27782613861?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20funeral%20cover%20from%20Kasi%202%20Home%20Funeral%20Services.",
};

const trustItems = [
  { icon: Heart, text: "We walk with your family, every step" },
  { icon: Phone, text: "Someone to call at any hour" },
  { icon: Shield, text: "Underwritten by Atlehang Life", logo: true },
  { icon: Leaf, text: "Dignity and respect, always" },
];

const coverOptions = [
  {
    label: "Main Member Only",
    rows: [
      { ageBand: "18–65", r10k: "R72", r15k: "R87", r20k: "R105", r30k: "R140", r50k: "R213" },
      { ageBand: "66–75", r10k: "R135", r15k: "R185", r20k: "R235", r30k: "R335", r50k: "R530" },
      { ageBand: "76–80", r10k: "R247", r15k: "R357", r20k: "R450", r30k: "—", r50k: "—" },
      { ageBand: "81–85", r10k: "R347", r15k: "—", r20k: "—", r30k: "—", r50k: "—" },
    ],
  },
  {
    label: "Main Member & Spouse",
    rows: [
      { ageBand: "18–65", r10k: "R93", r15k: "R123", r20k: "R150", r30k: "R210", r50k: "R320" },
      { ageBand: "66–75", r10k: "R196", r15k: "R272", r20k: "R350", r30k: "R530", r50k: "R835" },
    ],
  },
  {
    label: "Member & Children (up to 6)",
    rows: [
      { ageBand: "18–65", r10k: "R95", r15k: "R125", r20k: "R155", r30k: "R215", r50k: "R325" },
      { ageBand: "66–75", r10k: "R198", r15k: "R280", r20k: "R355", r30k: "R492", r50k: "R790" },
    ],
  },
  {
    label: "Member, Spouse & Children (up to 6)",
    rows: [
      { ageBand: "18–65", r10k: "R123", r15k: "R167", r20k: "R210", r30k: "R291", r50k: "R470" },
      { ageBand: "66–75", r10k: "R276", r15k: "R396", r20k: "R510", r30k: "R750", r50k: "R1,230" },
    ],
  },
  {
    label: "Extended Family",
    extended: true,
    extRows: [
      { ageBand: "0–17",  cover: "R5,000",  premium: "R10" },
      { ageBand: "18–65", cover: "R10,000", premium: "R65" },
      { ageBand: "66–75", cover: "R10,000", premium: "R130" },
      { ageBand: "76–80", cover: "R10,000", premium: "R297" },
      { ageBand: "81–85", cover: "R10,000", premium: "R468" },
    ],
  },
];

const policyItems = [
  {
    title: "How soon does my cover start?",
    content: [
      "There is a 6-month waiting period for natural causes.",
      "Cover begins immediately for accidental death, provided your first premium has been received.",
      "If you are switching from another provider, the waiting period may not apply — subject to proof of previous cover.",
      "If your cover amount increases during a transfer, a waiting period may apply to the difference.",
    ],
  },
  {
    title: "How do I claim when the time comes?",
    content: ["Please notify us within six months of the passing. We will guide your family through every step of the claims process."],
  },
  {
    title: "Can I cancel my plan?",
    content: ["Yes. You may cancel your policy with one month's notice — no penalties."],
  },
  {
    title: "Are there any exclusions I should know about?",
    content: [
      "Suicide within the first 12 months of the policy.",
      "Death caused by unlawful activities.",
      "Abortions.",
      "Illegal immigrants.",
    ],
  },
  {
    title: "A note on plan details",
    content: [
      "All benefits, premiums, waiting periods, exclusions, and cover amounts are subject to the official policy wording and underwriter approval. Please confirm all details with Kasi 2 Home Funeral Services before joining.",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

function GoldLine() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-10" style={{ background: GOLD }} />
      <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
      <div className="h-px w-10" style={{ background: GOLD }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GoldLine />
      <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>{children}</p>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Plans", href: "#plans" },
  { label: "Benefits", href: "#benefits" },
  { label: "Underwriter", href: "#underwriter" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(247,241,229,0.98)" : "rgba(44,26,14,0.85)",
        borderBottom: scrolled ? `1px solid rgba(201,164,76,0.3)` : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img src={logoImg} alt="Kasi 2 Home logo" className="w-8 h-8 rounded object-cover" />
          <span className="hidden sm:block text-sm font-medium tracking-wide" style={{ color: scrolled ? INK : "rgba(247,241,229,0.95)" }}>
            Kasi 2 Home
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: scrolled ? "rgba(44,26,14,0.65)" : "rgba(247,241,229,0.85)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
          >
            <MessageCircle size={14} />
            WhatsApp Us
          </a>
          <button
            className="lg:hidden p-2 rounded"
            style={{ color: scrolled ? INK : CREAM }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t px-5 py-6 flex flex-col gap-4"
          style={{ background: "rgba(247,241,229,0.99)", borderColor: `rgba(201,164,76,0.25)` }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base py-1"
              style={{ color: INK }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded font-medium text-sm"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
          <a
            href={`tel:${contactInfo.businessPhone}`}
            className="flex items-center justify-center gap-2 py-3 rounded font-medium text-sm border"
            style={{ borderColor: `rgba(201,164,76,0.35)`, color: GOLD }}
          >
            <Phone size={15} /> {contactInfo.businessPhoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function OrnamentalSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 900 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.15" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="700" fill="url(#glow)" />
      {/* arch */}
      <path d="M 80 680 Q 450 20 820 680" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
      <path d="M 160 680 Q 450 80 740 680" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
      {/* corner flourish TL */}
      <path d="M 0 0 L 60 0 M 0 0 L 0 60" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <path d="M 20 0 L 20 20 L 0 20" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
      {/* corner flourish TR */}
      <path d="M 900 0 L 840 0 M 900 0 L 900 60" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <path d="M 880 0 L 880 20 L 900 20" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: CREAM }}
    >
      {/* Full-bleed hero image */}
      <img
        src="/images/hero-casket.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 1 }}
      />
      {/* Overlay — left side readable, image visible on right */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(105deg, rgba(247,241,229,0.92) 0%, rgba(247,241,229,0.75) 40%, rgba(247,241,229,0.15) 70%, rgba(247,241,229,0.05) 100%)`,
        }}
      />
      <OrnamentalSVG />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Kasi 2 Home Funeral Services</SectionLabel>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6"
              style={{ color: INK }}
            >
              From the first call to the{" "}
              <em className="not-italic" style={{ color: GOLD }}>final farewell.</em>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "rgba(44,26,14,0.7)" }}>
              Kasi 2 Home Funeral Services helps families honour their loved ones with dignity, comfort, and affordable funeral cover backed by Atlehang Life.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-8">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm border transition-all duration-200 hover:border-[#C9A44C]/60"
                style={{ borderColor: `rgba(201,164,76,0.35)`, color: GOLD }}
              >
                View Funeral Plans <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.a
              {...fadeUp(0.35)}
              href={`tel:${contactInfo.businessPhone}`}
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "rgba(44,26,14,0.5)" }}
            >
              <Phone size={13} />
              Need assistance? Call{" "}
              <span style={{ color: GOLD }}>{contactInfo.businessPhoneDisplay}</span>
            </motion.a>
          </div>

          {/* Right — comfort panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-2xl opacity-15 blur-2xl"
                style={{ background: `radial-gradient(ellipse, ${GOLD} 0%, transparent 70%)` }}
              />
              <div
                className="relative rounded-2xl p-10 border text-center"
                style={{
                  background: "rgba(237,231,216,0.96)",
                  borderColor: `rgba(201,164,76,0.3)`,
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Ornamental top */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px w-10" style={{ background: `rgba(201,164,76,0.4)` }} />
                  <Heart size={14} style={{ color: GOLD }} />
                  <div className="h-px w-10" style={{ background: `rgba(201,164,76,0.4)` }} />
                </div>

                <p className="font-serif text-2xl font-semibold leading-snug mb-6" style={{ color: INK }}>
                  In Loving Memory
                </p>

                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(44,26,14,0.65)" }}>
                  "We walk with your family from the first call to the final farewell — with dignity, care, and respect."
                </p>

                <div className="space-y-4 text-left mb-8">
                  {[
                    "Collection and preparation of the deceased",
                    "Dignified burial and graveside support",
                    "Guidance through every step of the process",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GOLD }} />
                      <span className="text-sm leading-snug" style={{ color: "rgba(44,26,14,0.7)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px mb-6" style={{ background: `rgba(201,164,76,0.15)` }} />

                <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(201,164,76,0.55)" }}>
                  Excellent service back home
                </p>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <img src={atlehangLogoImg} alt="Atlehang Life" className="h-5 w-auto object-contain opacity-60" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${CREAM})` }}
      />
    </section>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <section
      className="border-y"
      style={{ background: EMERALD, borderColor: `rgba(201,164,76,0.2)` }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map(({ icon: Icon, text, logo }, i) => (
            <motion.div
              key={text}
              {...fadeUp(i * 0.08)}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                style={{ background: `rgba(201,164,76,0.12)`, border: `1px solid rgba(201,164,76,0.25)` }}
              >
                <Icon size={14} style={{ color: GOLD }} />
              </div>
              {logo ? (
                <img src={atlehangLogoImg} alt="Atlehang Life" className="h-5 w-auto object-contain" style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }} />
              ) : (
                <span className="text-sm font-medium leading-snug" style={{ color: "rgba(247,241,229,0.9)" }}>{text}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight mb-6" style={{ color: INK }}>
              Built on comfort, dignity, and care.
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(44,26,14,0.65)" }}>
              Kasi 2 Home Funeral Services is a local and national funeral services brand created to bring comfort to grieving families. The business helps families celebrate the life lived by their loved one with style, dignity, and respect.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(44,26,14,0.65)" }}>
              It is not only about premiums. It is about bringing family and loved ones together, and helping families move through a difficult time with guidance and care.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="flex flex-col gap-6">
            <div
              className="rounded-2xl p-8 border"
              style={{ background: CARD, borderColor: `rgba(201,164,76,0.2)` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: GOLD }} />
                <Heart size={13} style={{ color: GOLD }} />
                <div className="h-px w-8" style={{ background: GOLD }} />
              </div>
              <p className="font-serif text-xl leading-relaxed mb-6" style={{ color: INK }}>
                "We started Kasi 2 Home because every family deserves a dignified farewell — regardless of where they come from or what they can afford."
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(44,26,14,0.55)" }}>
                We are a local and national funeral services brand rooted in community. We are here to carry the burden so your family can focus on celebrating the life that was lived.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Serving families", value: "Nationally" },
                { label: "Underwriter", value: "Atlehang Life" },
                { label: "Cover starts at", value: "R167 / month" },
                { label: "Plans available", value: "4 family plans" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl p-4 border" style={{ background: CARD, borderColor: `rgba(201,164,76,0.12)` }}>
                  <p className="text-xs mb-1" style={{ color: "rgba(44,26,14,0.4)" }}>{label}</p>
                  <p className="font-serif text-sm font-semibold" style={{ color: INK }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Plan Card ───────────────────────────────────────────────────────────────

function PlanCard({ plan, index }: { plan: FuneralPlan; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const preview = plan.benefits.slice(0, 4);
  const rest = plan.benefits.slice(4);

  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="relative rounded-2xl border flex flex-col transition-all duration-300 hover:border-[#C9A44C]/50 group"
      style={{
        background: plan.highlight
          ? `linear-gradient(160deg, #EAE4D4 0%, #E2DBCA 100%)`
          : CARD,
        borderColor: plan.highlight ? `rgba(201,164,76,0.45)` : `rgba(201,164,76,0.2)`,
      }}
    >
      {plan.highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium uppercase tracking-widest"
          style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
        >
          Full Family Cover
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-5">
          <p className="font-serif text-xl font-semibold mb-1" style={{ color: INK }}>{plan.name}</p>
          <p className="text-xs mb-3" style={{ color: "rgba(44,26,14,0.45)" }}>{plan.includes}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: GOLD }}>
              R{plan.premium.toLocaleString()} / month
            </span>
          </div>
        </div>

        <div className="h-px mb-5" style={{ background: `rgba(201,164,76,0.15)` }} />

        {/* Cover amounts */}
        <div className="mb-5 space-y-1.5">
          {plan.coverAmounts.map(({ label }) => (
            <div key={label} className="flex items-center">
              <span className="text-xs" style={{ color: "rgba(44,26,14,0.55)" }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="h-px mb-5" style={{ background: `rgba(201,164,76,0.15)` }} />

        {/* Benefits */}
        <div className="space-y-2 mb-4 flex-1">
          {preview.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <Check size={12} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
              <span className="text-xs leading-snug" style={{ color: "rgba(44,26,14,0.7)" }}>{b}</span>
            </div>
          ))}
          {expanded && rest.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <Check size={12} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
              <span className="text-xs leading-snug" style={{ color: "rgba(44,26,14,0.7)" }}>{b}</span>
            </div>
          ))}
        </div>

        {rest.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs mb-5 transition-colors hover:opacity-80"
            style={{ color: GOLD }}
          >
            <ChevronDown
              size={12}
              style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
            {expanded ? "Show less" : `View all ${plan.benefits.length} benefits`}
          </button>
        )}

        <a
          href={`https://wa.me/27782613861?text=${encodeURIComponent(`Hi, I'd like to enquire about the *${plan.name}* (R${plan.premium}/month) from Kasi 2 Home Funeral Services. Please send me more information.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full py-3 rounded text-sm font-medium text-center transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={
            plan.highlight
              ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }
              : { border: `1px solid rgba(201,164,76,0.35)`, color: GOLD }
          }
        >
          Ask about the {plan.name}
        </a>
      </div>
    </motion.div>
  );
}

// ─── Plans Section ───────────────────────────────────────────────────────────

function PlansSection() {
  return (
    <section id="plans" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div {...fadeUp(0)} className="mb-14">
          <SectionLabel>Funeral Plans</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold" style={{ color: INK }}>
            Honour your loved one with dignity.
          </h2>
          <p className="mt-3 text-sm max-w-xl" style={{ color: "rgba(44,26,14,0.55)" }}>
            Each plan covers the member, spouse, and up to 6 children — everything your family needs to say goodbye with care and respect.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {funeralPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits Section ────────────────────────────────────────────────────────

function BenefitsSection() {
  const cards = [
    {
      title: "Caring for Your Loved One",
      icon: Heart,
      items: [
        "Collection of the deceased",
        "Safe and respectful storage",
        "Washing and preparation of the body",
        "Assistance with registration of death",
      ],
    },
    {
      title: "Graveside & Family Support",
      icon: Leaf,
      items: [
        "Family gazebo",
        "Grave gazebo",
        "Covered chairs",
        "Green carpet / graveside setup",
        "Lowering device",
        "Still water for the family",
      ],
    },
  ];

  return (
    <section id="benefits" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div {...fadeUp(0)} className="mb-14">
          <SectionLabel>What We Do For Your Family</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold max-w-xl" style={{ color: INK }}>
            We handle everything so you can grieve in peace.
          </h2>
          <p className="mt-3 text-sm max-w-xl" style={{ color: "rgba(44,26,14,0.55)" }}>
            From the moment you call us, we take care of the arrangements with gentleness and respect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map(({ title, icon: Icon, items }, i) => (
            <motion.div
              key={title}
              {...fadeUp(i * 0.12)}
              className="rounded-2xl p-8 border"
              style={{ background: CARD, borderColor: `rgba(201,164,76,0.2)` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `rgba(201,164,76,0.1)`, border: `1px solid rgba(201,164,76,0.25)` }}
                >
                  <Icon size={18} style={{ color: GOLD }} />
                </div>
                <h3 className="font-serif text-xl font-semibold" style={{ color: INK }}>{title}</h3>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={13} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                    <span className="text-sm leading-snug" style={{ color: "rgba(44,26,14,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cover Options ───────────────────────────────────────────────────────────

function CoverOptionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = coverOptions[activeTab];

  return (
    <section
      className="py-24"
      style={{ background: `linear-gradient(160deg, #EDE7D8 0%, #E5DDD0 100%)` }}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div {...fadeUp(0)} className="mb-10">
          <SectionLabel>Cover Options</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-3" style={{ color: INK }}>
            Flexible cover for every family structure.
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "rgba(44,26,14,0.5)" }}>
            Select a cover type below to see monthly premiums by age band and cover amount.
          </p>
          <p className="text-xs mt-2" style={{ color: "rgba(201,164,76,0.7)" }}>
            * All R10,000 cover amounts are cash payments only.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div {...fadeUp(0.05)} className="flex flex-wrap gap-2 mb-8">
          {coverOptions.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => setActiveTab(i)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                activeTab === i
                  ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }
                  : { background: CARD, color: "rgba(44,26,14,0.65)", border: `1px solid rgba(201,164,76,0.2)` }
              }
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Table panel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "rgba(237,231,216,0.9)", borderColor: `rgba(201,164,76,0.2)` }}
        >
          {active.extended ? (
            /* Extended Family table */
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid rgba(201,164,76,0.15)` }}>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest font-medium" style={{ color: GOLD }}>Age Band</th>
                  <th className="text-left px-6 py-4 text-xs uppercase tracking-widest font-medium" style={{ color: GOLD }}>Cover</th>
                  <th className="text-right px-6 py-4 text-xs uppercase tracking-widest font-medium" style={{ color: GOLD }}>Monthly Premium</th>
                </tr>
              </thead>
              <tbody>
                {active.extRows!.map((row, i) => (
                  <tr
                    key={row.ageBand}
                    style={{
                      borderBottom: i < active.extRows!.length - 1 ? `1px solid rgba(201,164,76,0.08)` : "none",
                      background: i % 2 === 0 ? "transparent" : "rgba(201,164,76,0.03)",
                    }}
                  >
                    <td className="px-6 py-4" style={{ color: "rgba(44,26,14,0.7)" }}>{row.ageBand}</td>
                    <td className="px-6 py-4" style={{ color: INK }}>{row.cover}</td>
                    <td className="px-6 py-4 text-right font-medium" style={{ color: GOLD }}>{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Main member plans table */
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr style={{ borderBottom: `1px solid rgba(201,164,76,0.15)` }}>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest font-medium" style={{ color: GOLD }}>Age Band</th>
                    {["R10,000*", "R15,000", "R20,000", "R30,000", "R50,000"].map(h => (
                      <th key={h} className="text-right px-4 py-4 text-xs uppercase tracking-widest font-medium" style={{ color: GOLD }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {active.rows!.map((row, i) => (
                    <tr
                      key={row.ageBand}
                      style={{
                        borderBottom: i < active.rows!.length - 1 ? `1px solid rgba(201,164,76,0.08)` : "none",
                        background: i % 2 === 0 ? "transparent" : "rgba(201,164,76,0.03)",
                      }}
                    >
                      <td className="px-6 py-4 font-medium" style={{ color: INK }}>{row.ageBand}</td>
                      <td className="px-4 py-4 text-right" style={{ color: "rgba(44,26,14,0.7)" }}>{row.r10k}</td>
                      <td className="px-4 py-4 text-right" style={{ color: "rgba(44,26,14,0.7)" }}>{row.r15k}</td>
                      <td className="px-4 py-4 text-right" style={{ color: "rgba(44,26,14,0.7)" }}>{row.r20k}</td>
                      <td className="px-4 py-4 text-right" style={{ color: "rgba(44,26,14,0.7)" }}>{row.r30k}</td>
                      <td className="px-4 py-4 text-right" style={{ color: "rgba(44,26,14,0.7)" }}>{row.r50k}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          <div
            className="px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{ borderTop: `1px solid rgba(201,164,76,0.12)`, background: "rgba(232,224,210,0.6)" }}
          >
            <div className="flex items-center gap-2">
              <img src={atlehangLogoImg} alt="Atlehang Life" className="h-4 w-auto object-contain opacity-50" />
              <p className="text-xs" style={{ color: "rgba(44,26,14,0.4)" }}>
                Premiums per month · FSP 51568
              </p>
            </div>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: GOLD }}
            >
              <MessageCircle size={13} /> Get a quote on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-4 mt-8">
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200 hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
          >
            <MessageCircle size={15} /> WhatsApp us for a quote
          </a>
          <a
            href="/kasi-to-home-brochure.pdf"
            download="Kasi 2 Home Funeral Services Brochure.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm border transition-all duration-200 hover:border-[#C9A44C]/60"
            style={{ borderColor: `rgba(201,164,76,0.3)`, color: GOLD }}
          >
            <FileText size={15} /> Download Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Underwriter ─────────────────────────────────────────────────────────────

function UnderwriterSection() {
  return (
    <section id="underwriter" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
        <motion.div {...fadeUp(0)} className="flex justify-center mb-4">
          <GoldLine />
        </motion.div>
        <motion.p {...fadeUp(0.05)} className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: GOLD }}>
          Our Underwriter
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="font-serif text-3xl sm:text-4xl font-semibold mb-6" style={{ color: INK }}>
          Underwritten by Atlehang Life.
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "rgba(44,26,14,0.65)" }}>
          Kasi 2 Home Funeral Services products are underwritten by Atlehang Life, a licensed financial services provider and micro-insurer.
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-8 rounded-2xl px-10 py-8 border mx-auto"
          style={{ background: CARD, borderColor: `rgba(201,164,76,0.25)` }}
        >
          <img
            src={atlehangLogoImg}
            alt="Atlehang Life logo"
            className="h-16 w-auto object-contain"
          />
          <div className="text-left">
            <p className="font-serif text-xl font-semibold mb-3" style={{ color: INK }}>Atlehang Life (Pty) Ltd</p>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: "rgba(44,26,14,0.6)" }}>
                FSP Number: <span style={{ color: INK }}>51568</span>
              </p>
              <p className="text-sm" style={{ color: "rgba(44,26,14,0.6)" }}>
                Registration: <span style={{ color: INK }}>2020/864927/07</span>
              </p>
              <a
                href="https://www.atlehanglife.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm mt-2 transition-opacity hover:opacity-80"
                style={{ color: GOLD }}
              >
                atlehanglife.co.za <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Policy Accordion ────────────────────────────────────────────────────────

function PolicyAccordionSection() {
  return (
    <section
      className="py-24"
      style={{ background: CREAM }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div {...fadeUp(0)} className="mb-12">
          <SectionLabel>What You Need to Know</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold" style={{ color: INK }}>
            Honest answers to common questions.
          </h2>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {policyItems.map((item, i) => (
              <Accordion.Item
                key={item.title}
                value={`item-${i}`}
                className="rounded-xl border overflow-hidden"
                style={{ background: CARD, borderColor: `rgba(201,164,76,0.18)` }}
              >
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-left group">
                  <span className="font-medium text-sm" style={{ color: INK }}>{item.title}</span>
                  <ChevronDown
                    size={16}
                    style={{ color: GOLD, flexShrink: 0, transition: "transform 0.25s" }}
                    className="group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-none">
                  <div className="px-6 pb-5 space-y-2">
                    <div className="h-px mb-4" style={{ background: `rgba(201,164,76,0.12)` }} />
                    {item.content.map((line, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: GOLD }} />
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(44,26,14,0.65)" }}>{line}</p>
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>We Are Here For You</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-5" style={{ color: INK }}>
              You don't have to face this alone.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(44,26,14,0.65)" }}>
              Whether you are planning ahead or need urgent family support, Kasi 2 Home Funeral Services is here to guide you from the first call to the final farewell.
            </p>

            <div className="space-y-4">
              {[
                { label: "Business Hours", value: contactInfo.hours, icon: Clock },
                { label: "Email", value: contactInfo.email, icon: Mail, href: `mailto:${contactInfo.email}` },
                { label: "Company Registration", value: contactInfo.registration, icon: FileText },
              ].map(({ label, value, icon: Icon, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `rgba(201,164,76,0.1)`, border: `1px solid rgba(201,164,76,0.2)` }}
                  >
                    <Icon size={14} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "rgba(44,26,14,0.4)" }}>{label}</p>
                    {href ? (
                      <a href={href} className="text-sm hover:opacity-80 transition-opacity" style={{ color: INK }}>{value}</a>
                    ) : (
                      <p className="text-sm" style={{ color: INK }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="grid gap-4">
            {[
              {
                label: "Call Us",
                sub: contactInfo.businessPhoneDisplay,
                href: `tel:${contactInfo.businessPhone}`,
                icon: Phone,
                primary: false,
              },
              {
                label: "WhatsApp Us",
                sub: "Fastest response",
                href: contactInfo.whatsapp,
                icon: MessageCircle,
                primary: true,
                external: true,
              },
              {
                label: "Email Us",
                sub: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
                icon: Mail,
                primary: false,
              },
            ].map(({ label, sub, href, icon: Icon, primary, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 group hover:border-[#C9A44C]/50"
                style={
                  primary
                    ? { background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}11)`, borderColor: `rgba(201,164,76,0.45)` }
                    : { background: CARD, borderColor: `rgba(201,164,76,0.18)` }
                }
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={
                    primary
                      ? { background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})` }
                      : { background: `rgba(201,164,76,0.1)` }
                  }
                >
                  <Icon size={18} style={{ color: primary ? BLACK : GOLD }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: INK }}>{label}</p>
                  <p className="text-xs truncate" style={{ color: "rgba(44,26,14,0.45)" }}>{sub}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 opacity-40 group-hover:opacity-70 transition-opacity" style={{ color: GOLD }} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="border-t py-16"
      style={{ background: CARD, borderColor: `rgba(201,164,76,0.15)` }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={logoTaglineImg}
              alt="Kasi 2 Home Funeral Services — Excellent service back home"
              className="w-40 object-contain mb-4"
            />
            <p className="text-sm italic" style={{ color: "rgba(44,26,14,0.4)" }}>
              From the first call to the final farewell.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: GOLD }}>Contact</p>
            <div className="space-y-2">
              <a href={`tel:${contactInfo.businessPhone}`} className="block text-sm hover:opacity-80 transition-opacity" style={{ color: "rgba(44,26,14,0.6)" }}>
                {contactInfo.businessPhoneDisplay}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="block text-sm hover:opacity-80 transition-opacity" style={{ color: "rgba(44,26,14,0.6)" }}>
                {contactInfo.email}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: GOLD }}>Regulatory</p>
            <div className="space-y-1.5">
              <img src={atlehangLogoImg} alt="Atlehang Life" className="h-6 w-auto object-contain mb-3 opacity-70" />
              <p className="text-xs" style={{ color: "rgba(44,26,14,0.45)" }}>
                Underwritten by Atlehang Life, FSP 51568
              </p>
              <p className="text-xs" style={{ color: "rgba(44,26,14,0.45)" }}>
                Reg. 2020/864927/07
              </p>
              <p className="text-xs mt-3" style={{ color: "rgba(44,26,14,0.35)" }}>
                Company Reg. 2026/254458/07
              </p>
            </div>
          </div>
        </div>

        <div className="h-px mb-8" style={{ background: `rgba(201,164,76,0.12)` }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(44,26,14,0.3)" }}>
            © {new Date().getFullYear()} Kasi 2 Home Funeral Services. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(44,26,14,0.3)" }}>
            Prepared by{" "}
            <a
              href="https://valosystems.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "rgba(201,164,76,0.5)" }}
            >
              Valo Systems
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky Mobile Bar ───────────────────────────────────────────────────────

function StickyMobileBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t"
      style={{ background: "rgba(247,241,229,0.97)", borderColor: `rgba(201,164,76,0.2)`, backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-stretch">
        <a
          href={`tel:${contactInfo.businessPhone}`}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 border-r text-xs font-medium transition-opacity active:opacity-70"
          style={{ color: GOLD, borderColor: `rgba(201,164,76,0.2)` }}
        >
          <Phone size={18} />
          Call
        </a>
        <a
          href={contactInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-opacity active:opacity-70"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_RICH})`, color: BLACK }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a
          href="#plans"
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 border-l text-xs font-medium transition-opacity active:opacity-70"
          style={{ color: GOLD, borderColor: `rgba(201,164,76,0.2)` }}
        >
          <FileText size={18} />
          Plans
        </a>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="font-sans overflow-x-hidden"
      style={{ background: CREAM, color: INK }}
    >
      <Header />
      <main className="pb-14 lg:pb-0">
        <Hero />
        <TrustStrip />
        <AboutSection />
        <PlansSection />
        <BenefitsSection />
        <CoverOptionsSection />
        <UnderwriterSection />
        <PolicyAccordionSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
}
