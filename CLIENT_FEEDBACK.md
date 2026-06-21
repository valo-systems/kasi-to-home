# Client Feedback & Requirements — Kasi 2 Home
**From:** Bophelo Monyayi
**Captured by:** Valo Systems
**Date:** 2026-06-21

---

## 1. Website

### REQ-W01 — Domain & Branding ✓
- **Done:** Domain confirmed as **https://kasitohomefunerals.co.za/** (purchased 2026-06-20)
- **Done:** Brand name corrected to **"Kasi 2 Home"** across `src/app/App.tsx`, `index.html`, `public/site.webmanifest`, `public/agent-flyer/index.html`, and all `dist/` files

### REQ-W02 — Contact Details ✓
- **Done:** Removed owner name ("Sibusiso Moolar") and personal phone (+27 76 232 7358) from `contactInfo` and all UI
- **Done:** Contact section now shows business hours, email, company reg, and a single "Call Us" + WhatsApp + Email Us block
- **Done:** Email updated to **info@kasitohomefunerals.co.za** across `App.tsx`, `index.html` (JSON-LD), `public/agent-flyer/index.html`, and all `dist/` equivalents

### REQ-W03 — Background Colour
- **Decision:** Background left as-is (current design retained)

### REQ-W04 — Homepage Feel ✓
- **Done:** Added full-bleed hero background image — white dove in flight (Unsplash, free commercial license, photographer: Ahmed Nishaath)
- **Done:** Image sits at 22% opacity behind a dark gradient overlay so gold/cream text remains fully readable. Layout (copy + floating card) unchanged.

### REQ-W05 — Cover Options Tabs ✓
- **Done:** Replaced broken static list with a fully functional tabbed component
- **Done:** 5 tabs — Main Member Only, Main Member & Spouse, Member & Children, Member + Spouse + Children, Extended Family
- **Done:** Each tab renders a premium table (age band × cover amount) with all data from the WhatsApp product sheet
- **Done:** Extended Family uses its own simpler table (age band / cover / premium)
- **Done:** Table footer shows Atlehang Life credit and a WhatsApp quote CTA

#### Product Data — Main Member Plans
> NB: All R10,000 cover are **cash payments only**

| Plan Type | Age Band | R10,000 | R15,000 | R20,000 | R30,000 | R50,000 |
|-----------|----------|---------|---------|---------|---------|---------|
| Main Member Only | 18–65 | R72 | R87 | R105 | R140 | R213 |
| | 66–75 | R135 | R185 | R235 | R335 | R530 |
| | 76–80 | R247 | R357 | R450 | — | — |
| | 81–85 | R347 | — | — | — | — |
| Main Member & Spouse | 18–65 | R93 | R123 | R150 | R210 | R320 |
| | 66–75 | R196 | R272 | R350 | R530 | R835 |
| Main Member & Children (up to 6) | 18–65 | R95 | R125 | R155 | R215 | R325 |
| | 66–75 | R198 | R280 | R355 | R492 | R790 |
| Main Member, Spouse & Children (up to 6) | 18–65 | R123 | R167 | R210 | R291 | R470 |
| | 66–75 | R276 | R396 | R510 | R750 | R1,230 |

#### Product Data — Extended Family
| Age Band | Cover | Premium |
|----------|-------|---------|
| 0–17 | R5,000 | R10 |
| 18–65 | R10,000 | R65 |
| 66–75 | R10,000 | R130 |
| 76–80 | R10,000 | R297 |
| 81–85 | R10,000 | R468 |

> Underwritten by **Atlehang Life (Pty) Ltd** — FSP 51568, Licensed Financial Service Provider & Micro-Insurer. Long-term insurance category 1, Sub category A. Company Reg: 2020/864927/07

### REQ-W06 — Plan Monument Details ✓
- **Done:** Monument added to each plan's data and displayed as a small pill badge on each plan card alongside the monthly price
- Excel → Gravemaker, Delta → Gravemaker, Classic → Headstone, Blue → Headstone

### REQ-W07 — Go-Live
- Target go-live date: **1 July 2026**
- Client to present site to underwriter for approval prior to launch

---

## 2. Logo

### REQ-L01 — Tagline ✓
- Green colour: unchanged
- **Done:** Generated `logo-with-tagline.png` — logo with italic gold tagline "Excellent service back home" below it
- **Done:** Footer on website now uses the tagline logo
- **Done:** Tagline appears on all 3 brochure pages alongside the logo

---

## 3. Brochure

### REQ-B01 — Brochure ✓
- **Done:** 3-page brochure regenerated and written to `public/kasi-to-home-brochure.pdf`
- **Done:** Cover page retained (3 pages kept, within budget)
- **Done:** Star Show featured prominently on page 2 — R10,000 cash payout callout banner with age range and "paid to beneficiary" detail
- **Done:** Lump-sum cover amounts removed from plan cards — services listed only
- **Done:** Monument badge (Gravemaker / Headstone) shown on each plan card
- **Done:** "Full Family Cover" badge replaces "Most Comprehensive" on Blue Plan
- **Done:** Owner name + personal email removed; updated to `info@kasitohomefunerals.co.za`
- **Done:** "Kasi 2 Home" spelling fixed throughout all pages
- **Done:** Section headings updated to match website tone ("Caring for Your Loved One", "You don't have to face this alone.")

---

## 4. Commercial Terms

### REQ-C01 — Scope & Pricing
| Item | Resolution |
|------|------------|
| Agent Brochure (R1,800) | **Removed from scope** — revisit when sales agents are in place |
| Agent Flyer | **Removed from scope** — price removed to meet budget |
| Total Budget | **R9,000.00 maximum — confirmed, Valo Systems to meet this** |
| Payment Plan | **4 monthly invoices** — first payment due on go-live (1 July 2026), then monthly thereafter |
| Annual Fee | **Not waived** — this is a service & hosting fee under the Valo BMS solution. Invoice ref: **VAL-K2H-AGR-2026-001** (see agreement in project root). Will be updated later. |

> Client accepts the invoice in principle and is committed to continuing with **Valo Systems**.

---

## Open Questions for Sbu

| # | Question | Blocks |
|---|----------|--------|
| Q1 | **Underwriter turnaround** — Awaiting response from them. How long does their approval typically take? Could affect the 1 July go-live. | REQ-W07 |

---

*Prepared by Valo Systems — 2026-06-21*
