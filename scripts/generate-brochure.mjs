import puppeteer from "puppeteer";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");
const publicDir = path.resolve(__dirname, "../public");

function toDataUrl(filePath) {
  const buf = readFileSync(filePath);
  const ext = path.extname(filePath).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${buf.toString("base64")}`;
}

const logoDataUrl = toDataUrl(path.join(assetsDir, "logo-circle-transparent-tight.png"));
const atlehangLogoDataUrl = toDataUrl(path.join(assetsDir, "atlehanglife-logo.png"));

// ─── Brand tokens ────────────────────────────────────────────────────────────
const GOLD = "#C9A44C";
const CREAM = "#F7F1E5";
const BLACK = "#070707";
const DARK_GREEN = "#0D1A17";
const EMERALD = "#061F1C";

// ─── Shared styles ───────────────────────────────────────────────────────────
const base = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: ${BLACK};
      color: ${CREAM};
      width: 794px;
    }
    .page {
      width: 794px;
      min-height: 1123px;
      padding: 40px 44px;
      background: ${BLACK};
      position: relative;
      overflow: hidden;
    }
    .serif { font-family: 'Playfair Display', serif; }
    .gold { color: ${GOLD}; }
    .cream { color: ${CREAM}; }
    .muted { color: rgba(247,241,229,0.5); }
    .corner-tl, .corner-tr, .corner-bl, .corner-br {
      position: absolute; width: 36px; height: 36px;
    }
    .corner-tl { top: 20px; left: 20px; border-top: 1px solid ${GOLD}40; border-left: 1px solid ${GOLD}40; }
    .corner-tr { top: 20px; right: 20px; border-top: 1px solid ${GOLD}40; border-right: 1px solid ${GOLD}40; }
    .corner-bl { bottom: 20px; left: 20px; border-bottom: 1px solid ${GOLD}40; border-left: 1px solid ${GOLD}40; }
    .corner-br { bottom: 20px; right: 20px; border-bottom: 1px solid ${GOLD}40; border-right: 1px solid ${GOLD}40; }
    .gold-divider {
      display: flex; align-items: center; justify-content: center; gap: 10px; margin: 18px 0;
    }
    .gold-divider .line { height: 1px; width: 80px; background: ${GOLD}60; }
    .gold-divider .dot { width: 4px; height: 4px; border-radius: 50%; background: ${GOLD}; }
    .section-label {
      font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: ${GOLD}; margin-bottom: 4px;
    }
    .card {
      background: ${DARK_GREEN};
      border: 1px solid ${GOLD}30;
      border-radius: 10px;
      padding: 18px;
    }
    .mini-logo {
      width: 40px; height: 40px; object-fit: contain;
    }
  </style>
`;

const corners = `
  <div class="corner-tl"></div>
  <div class="corner-tr"></div>
  <div class="corner-bl"></div>
  <div class="corner-br"></div>
`;

// ─── Page 1: Cover ───────────────────────────────────────────────────────────
const page1 = `
<!DOCTYPE html><html><head><meta charset="UTF-8">${base}</head><body>
<div class="page" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
  ${corners}

  <p class="section-label" style="letter-spacing:0.28em; margin-bottom: 32px;">Official Funeral Cover Brochure</p>

  <img src="${logoDataUrl}" style="width:140px; height:140px; object-fit:contain; margin-bottom:24px;" />

  <p class="serif" style="font-size:30px; font-weight:600; color:${CREAM}; margin-bottom:6px;">Kasi to Home</p>
  <p class="section-label" style="font-size:10px; letter-spacing:0.3em; margin-bottom:18px;">Funeral Services</p>

  <p style="font-style:italic; font-size:13px; color:${GOLD}; margin-bottom:0;">From the first call to the final farewell</p>

  <div class="gold-divider"><div class="line"></div><div class="dot"></div><div class="line"></div></div>

  <p style="font-style:italic; font-size:12px; color:rgba(247,241,229,0.45);">Excellent service back home.</p>

  <div class="card" style="margin-top:48px; width:100%; max-width:480px; text-align:left;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Business Line</p>
        <p style="font-size:13px; color:${CREAM};">+27 78 261 3861</p>
      </div>
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Owner</p>
        <p style="font-size:13px; color:${CREAM};">Sibusiso Moolar</p>
      </div>
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Email</p>
        <p style="font-size:13px; color:${CREAM};">sibusiso.moolar@kasitohomefunerals.co.za</p>
      </div>
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Hours</p>
        <p style="font-size:13px; color:${CREAM};">Mon – Fri · 9:00 AM – 5:00 PM</p>
      </div>
    </div>
  </div>

  <div style="position:absolute; bottom:44px; left:0; right:0; text-align:center;">
    <div class="gold-divider"><div class="line"></div><div class="dot"></div><div class="line"></div></div>
    <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-top:8px;">
      <img src="${atlehangLogoDataUrl}" style="height:22px; object-fit:contain; opacity:0.85;" />
      <p style="font-size:10px; color:rgba(247,241,229,0.45);">Underwritten by Atlehang Life (Pty) Ltd · FSP 51568</p>
    </div>
  </div>
</div>
</body></html>
`;

// ─── Page 2: Plans ───────────────────────────────────────────────────────────
const plans = [
  {
    name: "Excel Plan", premium: "R167", highlight: false,
    cover: [["Member + Spouse","R15,000"],["Children 14–21 yrs","R15,000"],["Children 6–13 yrs","R7,500"],["Children 1–5 yrs","R3,750"],["Stillborn – 11 mths","R1,875"]],
    benefits: ["Flatlid coffin","Hearse and 1 family car","Tent and 50 chairs","1 toilet · 2 tables","Vegetables · A2 photo"],
  },
  {
    name: "Delta Plan", premium: "R210", highlight: false,
    cover: [["Member + Spouse","R20,000"],["Children 14–21 yrs","R20,000"],["Children 6–13 yrs","R10,000"],["Children 1–5 yrs","R5,000"],["Stillborn – 11 mths","R2,500"]],
    benefits: ["Open face square casket","Hearse and 2 family cars","Tent and 50 chairs","Groceries and vegetables · A2 photo","Headstone"],
  },
  {
    name: "Classic Plan", premium: "R291", highlight: false,
    cover: [["Member + Spouse","R30,000"],["Children 14–21 yrs","R30,000"],["Children 6–13 yrs","R15,000"],["Children 1–5 yrs","R7,500"],["Stillborn – 11 mths","R3,750"]],
    benefits: ["Kiaat Mini Dome coffin + spray","Hearse and 4 family cars","7×12 tent and 100 chairs","Groceries · A2 photo · Flowers","Headstone · Grave marker"],
  },
  {
    name: "Blue Plan", premium: "R470", highlight: true,
    cover: [["Member + Spouse","R50,000"],["Children 14–21 yrs","R50,000"],["Children 6–13 yrs","R25,000"],["Children 1–5 yrs","R12,500"],["Stillborn – 11 mths","R6,250"]],
    benefits: ["Kiaat Standard Dome coffin + spray","Hearse and 4 family cars","7×12 tent and 100 chairs","Groceries · A2 photo · 2× Flowers","Headstone · Grave marker"],
  },
];

function planCard(p) {
  const borderColor = p.highlight ? `${GOLD}70` : `${GOLD}25`;
  const bg = p.highlight ? "#0D1F1A" : DARK_GREEN;
  return `
    <div style="background:${bg}; border:1px solid ${borderColor}; border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:0;">
      ${p.highlight ? `<div style="background:linear-gradient(90deg,${GOLD},#A87B24); color:${BLACK}; font-size:7.5px; letter-spacing:0.18em; text-transform:uppercase; text-align:center; border-radius:4px; padding:3px 8px; margin-bottom:8px; font-weight:600;">Most Comprehensive</div>` : ""}
      <p style="font-size:8.5px; letter-spacing:0.18em; text-transform:uppercase; color:${GOLD}; margin-bottom:3px;">${p.name}</p>
      <p class="serif" style="font-size:24px; font-weight:600; color:${CREAM}; line-height:1;">${p.premium}<span style="font-size:11px; color:${GOLD}; font-family:Inter,sans-serif; font-weight:400;">/mo</span></p>
      <div style="height:1px; background:${GOLD}20; margin:8px 0;"></div>
      ${p.cover.map(([l,a]) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
          <span style="font-size:9px; color:rgba(247,241,229,0.55);">${l}</span>
          <span style="font-size:9px; font-weight:500; color:${GOLD};">${a}</span>
        </div>`).join("")}
      <div style="height:1px; background:${GOLD}20; margin:8px 0;"></div>
      ${p.benefits.map(b => `
        <div style="display:flex; gap:6px; align-items:flex-start; margin-bottom:3px;">
          <span style="color:${GOLD}; font-size:9px; margin-top:1px;">✓</span>
          <span style="font-size:9px; color:rgba(247,241,229,0.75); line-height:1.4;">${b}</span>
        </div>`).join("")}
      <p style="font-size:7.5px; color:rgba(247,241,229,0.3); margin-top:auto; padding-top:10px;">Member + spouse: 18–65 yrs · Children: 0–21 yrs</p>
    </div>
  `;
}

const page2 = `
<!DOCTYPE html><html><head><meta charset="UTF-8">${base}</head><body>
<div class="page">
  ${corners}
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
    <div>
      <p class="section-label">Funeral Cover Plans</p>
      <p class="serif" style="font-size:26px; font-weight:600; color:${CREAM};">Cover that fits your family.</p>
    </div>
    <img src="${logoDataUrl}" class="mini-logo" />
  </div>
  <div class="gold-divider" style="margin:0 0 16px 0; justify-content:flex-start; gap:8px;">
    <div class="line" style="width:40px;"></div><div class="dot"></div><div class="line" style="width:40px;"></div>
  </div>
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
    ${plans.map(planCard).join("")}
  </div>
  <div style="margin-top:14px; padding:10px 14px; border:1px solid ${GOLD}20; border-radius:8px; background:rgba(13,26,23,0.6);">
    <p style="font-size:8px; color:rgba(247,241,229,0.45); line-height:1.6;">
      All plans include: member, spouse, and up to 6 children. Premiums, benefits, and cover amounts are subject to official policy wording and underwriter approval. Claims must be submitted within 6 months of the event. 6-month waiting period applies for natural causes. No waiting period for accidental death (first premium received). Contact Kasi to Home Funeral Services for full policy details.
    </p>
  </div>
</div>
</body></html>
`;

// ─── Page 3: Benefits, Contact, Policy ───────────────────────────────────────
const page3 = `
<!DOCTYPE html><html><head><meta charset="UTF-8">${base}</head><body>
<div class="page">
  ${corners}
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
    <div>
      <p class="section-label">Benefits &amp; Contact</p>
      <p class="serif" style="font-size:26px; font-weight:600; color:${CREAM};">Here when your family needs us.</p>
    </div>
    <img src="${logoDataUrl}" class="mini-logo" />
  </div>
  <div class="gold-divider" style="margin:0 0 16px 0; justify-content:flex-start; gap:8px;">
    <div class="line" style="width:40px;"></div><div class="dot"></div><div class="line" style="width:40px;"></div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Standard Care</p>
      ${["Collection of the deceased","Storage of the body","Washing and preparation of the body","Assistance with registration of death"].map(i=>`
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:9px; margin-top:1px;">✓</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Cemetery Support</p>
      ${["Family gazebo &amp; grave gazebo","Covered chairs","Green carpet / graveside setup","Lowering device","Still water for the family"].map(i=>`
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:9px; margin-top:1px;">✓</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Cover Options</p>
      ${["Main Member Only","Main Member &amp; Spouse","Main Member &amp; Children (up to 6)","Main Member, Spouse &amp; Children (up to 6)","Extended Family"].map(i=>`
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:10px;">•</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Underwriter</p>
      <img src="${atlehangLogoDataUrl}" style="height:32px; object-fit:contain; margin-bottom:10px;" />
      ${[["FSP Number","51568"],["Reg. Number","2020/864927/07"],["Website","atlehanglife.co.za"]].map(([l,v])=>`
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
          <span style="font-size:9px; color:rgba(247,241,229,0.45);">${l}</span>
          <span style="font-size:9px; color:${CREAM};">${v}</span>
        </div>`).join("")}
    </div>
  </div>

  <div class="card" style="text-align:center; margin-bottom:12px;">
    <p class="serif" style="font-size:16px; font-weight:600; color:${CREAM}; margin-bottom:16px;">Speak to us today.</p>
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:12px;">
      ${[["Call Owner","+27 76 232 7358"],["Business Line","+27 78 261 3861"],["Email Us","sibusiso.moolar@kasitohomefunerals.co.za"]].map(([l,v])=>`
        <div>
          <div style="width:32px; height:32px; border-radius:50%; border:1px solid ${GOLD}40; background:${GOLD}12; display:flex; align-items:center; justify-content:center; margin:0 auto 6px;">
            <span style="color:${GOLD}; font-size:13px;">✆</span>
          </div>
          <p style="font-size:8.5px; color:rgba(247,241,229,0.45); margin-bottom:2px;">${l}</p>
          <p style="font-size:9.5px; color:${CREAM};">${v}</p>
        </div>`).join("")}
    </div>
    <p style="font-size:8.5px; color:rgba(247,241,229,0.4);">WhatsApp: wa.me/27782613861 · Mon – Fri · 9:00 AM – 5:00 PM · Company Reg. 2026/254458/07</p>
  </div>

  <div style="padding:10px 14px; border:1px solid ${GOLD}25; border-radius:8px; background:rgba(13,26,23,0.6); margin-bottom:14px;">
    <p style="font-size:8px; letter-spacing:0.15em; text-transform:uppercase; color:${GOLD}; margin-bottom:5px;">Key Policy Notes</p>
    <p style="font-size:8px; color:rgba(247,241,229,0.45); line-height:1.7;">
      6-month waiting period for natural causes · No waiting period for accidental death (first premium received) · Claims within 6 months of event · Cancellation with 1 month's notice · Suicide exclusion within first 12 months · Death from unlawful activities excluded · Subject to official policy wording.
    </p>
  </div>

  <div style="position:absolute; bottom:44px; left:44px; right:44px; display:flex; justify-content:space-between; align-items:center;">
    <div style="display:flex; align-items:center; gap:10px;">
      <img src="${logoDataUrl}" style="width:24px; height:24px; object-fit:contain;" />
      <div>
        <p style="font-size:9px; color:${CREAM};">Kasi to Home Funeral Services</p>
        <p style="font-size:8px; font-style:italic; color:rgba(247,241,229,0.4);">From the first call to the final farewell.</p>
      </div>
    </div>
  </div>
</div>
</body></html>
`;

// ─── Generate PDF ─────────────────────────────────────────────────────────────
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

async function renderPage(html) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.fonts.ready);
  const buf = await page.pdf({
    width: "794px",
    height: "1123px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();
  return buf;
}

console.log("Rendering page 1…");
const p1 = await renderPage(page1);
console.log("Rendering page 2…");
const p2 = await renderPage(page2);
console.log("Rendering page 3…");
const p3 = await renderPage(page3);

await browser.close();

// Merge with pdf-lib
import { PDFDocument } from "pdf-lib";

const merged = await PDFDocument.create();
for (const buf of [p1, p2, p3]) {
  const doc = await PDFDocument.load(buf);
  const [page] = await merged.copyPages(doc, [0]);
  merged.addPage(page);
}

const outPath = path.resolve(publicDir, "kasi-to-home-brochure.pdf");
import { writeFileSync } from "fs";
writeFileSync(outPath, await merged.save());
console.log(`✓ Brochure written to ${outPath}`);
