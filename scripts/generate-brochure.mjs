import puppeteer from "puppeteer";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
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

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const GOLD = "#C9A44C";
const CREAM = "#F7F1E5";
const BLACK = "#070707";
const DARK_GREEN = "#0D1A17";

// ─── Shared styles ────────────────────────────────────────────────────────────
const base = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
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

// ─── Page 1: Cover ────────────────────────────────────────────────────────────
const page1 = `
<!DOCTYPE html><html><head><meta charset="UTF-8">${base}</head><body>
<div class="page" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
  ${corners}

  <p class="section-label" style="letter-spacing:0.28em; margin-bottom: 32px;">Official Funeral Cover Brochure</p>

  <!-- Logo with tagline -->
  <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:28px;">
    <img src="${logoDataUrl}" style="width:130px; height:130px; object-fit:contain; margin-bottom:10px;" />
    <p style="font-family:'Playfair Display',serif; font-style:italic; font-size:13px; color:${GOLD}; letter-spacing:0.06em;">
      Excellent service back home
    </p>
  </div>

  <p class="serif" style="font-size:30px; font-weight:600; color:${CREAM}; margin-bottom:6px;">Kasi 2 Home</p>
  <p class="section-label" style="font-size:10px; letter-spacing:0.3em; margin-bottom:18px;">Funeral Services</p>

  <p style="font-style:italic; font-size:13px; color:rgba(247,241,229,0.55); margin-bottom:0;">From the first call to the final farewell</p>

  <div class="gold-divider"><div class="line"></div><div class="dot"></div><div class="line"></div></div>

  <div class="card" style="margin-top:36px; width:100%; max-width:480px; text-align:left;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Business Line</p>
        <p style="font-size:13px; color:${CREAM};">+27 78 261 3861</p>
      </div>
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">WhatsApp</p>
        <p style="font-size:13px; color:${CREAM};">wa.me/27782613861</p>
      </div>
      <div>
        <p style="font-size:9px; color:${GOLD}; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">Email</p>
        <p style="font-size:12px; color:${CREAM};">info@kasitohomefunerals.co.za</p>
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

// ─── Page 2: Plans ────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Excel Plan", premium: "R167", monument: "", highlight: false,
    benefits: ["Dutch Casket Range", "Hearse and 1 family car", "Tent and 50 chairs", "2 tables", "Vegetables · A2 photo"],
  },
  {
    name: "Delta Plan", premium: "R210", monument: "", highlight: false,
    benefits: ["4 Tier Casket", "Hearse and 2 family cars", "Tent and 50 chairs", "1 toilet · 2 tables", "Groceries + vegetables · A2 photo"],
  },
  {
    name: "Classic Plan", premium: "R291", monument: "", highlight: false,
    benefits: ["Half View Casket · Coffin Spray", "Hearse and 3 family cars", "7×12 tent and 100 chairs", "1 toilet · 4 tables", "Groceries + vegetables · A2 photo", "1 × Flowers"],
  },
  {
    name: "Blue Plan", premium: "R470", monument: "", highlight: true,
    benefits: ["Dome Range Casket · Coffin Spray", "Hearse and 4 family cars", "7×12 tent and 100 chairs", "1 toilet · 4 tables", "Groceries + vegetables · A2 photo", "2 × Flowers", "R1,000 cashback"],
  },
];

function planCard(p) {
  const borderColor = p.highlight ? `${GOLD}70` : `${GOLD}25`;
  const bg = p.highlight ? "#0D1F1A" : DARK_GREEN;
  return `
    <div style="background:${bg}; border:1px solid ${borderColor}; border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:0;">
      ${p.highlight ? `<div style="background:linear-gradient(90deg,${GOLD},#A87B24); color:${BLACK}; font-size:7.5px; letter-spacing:0.18em; text-transform:uppercase; text-align:center; border-radius:4px; padding:3px 8px; margin-bottom:8px; font-weight:600;">Full Family Cover</div>` : ""}
      <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:3px;">
        <p style="font-size:8.5px; letter-spacing:0.18em; text-transform:uppercase; color:${GOLD};">${p.name}</p>
        ${p.monument ? `<span style="font-size:7.5px; color:rgba(247,241,229,0.55); border:1px solid ${GOLD}25; border-radius:20px; padding:1px 7px; background:${GOLD}08;">${p.monument}</span>` : ""}
      </div>
      <p class="serif" style="font-size:22px; font-weight:600; color:${CREAM}; line-height:1; margin-bottom:8px;">${p.premium}<span style="font-size:11px; color:${GOLD}; font-family:Inter,sans-serif; font-weight:400;">/mo</span></p>
      <div style="height:1px; background:${GOLD}20; margin-bottom:8px;"></div>
      ${p.benefits.map(b => `
        <div style="display:flex; gap:6px; align-items:flex-start; margin-bottom:4px;">
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
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
    <div>
      <p class="section-label">Funeral Cover Plans</p>
      <p class="serif" style="font-size:24px; font-weight:600; color:${CREAM};">Honour your loved one with dignity.</p>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
      <img src="${logoDataUrl}" class="mini-logo" />
      <p style="font-size:7px; font-style:italic; color:${GOLD}; letter-spacing:0.04em; font-family:'Playfair Display',serif;">Excellent service back home</p>
    </div>
  </div>
  <div class="gold-divider" style="margin:0 0 12px 0; justify-content:flex-start; gap:8px;">
    <div class="line" style="width:40px;"></div><div class="dot"></div><div class="line" style="width:40px;"></div>
  </div>

  <!-- Star Show Feature -->
  <div style="background:linear-gradient(135deg, #1A1200, #0D1A17); border:1px solid ${GOLD}50; border-radius:10px; padding:12px 16px; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between; gap:16px;">
    <div>
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span style="font-size:14px;">⭐</span>
        <p style="font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:${GOLD}; font-weight:500;">Star Show — Featured Plan</p>
      </div>
      <p class="serif" style="font-size:18px; font-weight:600; color:${CREAM}; margin-bottom:3px;">R10,000 Cash Payout</p>
      <p style="font-size:9px; color:rgba(247,241,229,0.6); line-height:1.5;">
        A direct cash payout to your family when they need it most. No waiting for services — money paid directly to the beneficiary. Available from <span style="color:${GOLD}; font-weight:500;">R72/month</span>.
      </p>
    </div>
    <div style="text-align:center; min-width:100px; padding:10px; background:${GOLD}10; border:1px solid ${GOLD}30; border-radius:8px;">
      <p style="font-size:8px; color:rgba(247,241,229,0.5); margin-bottom:2px; letter-spacing:0.1em; text-transform:uppercase;">Cash paid to</p>
      <p style="font-size:11px; color:${CREAM}; font-weight:500;">Beneficiary</p>
      <div style="height:1px; background:${GOLD}25; margin:6px 0;"></div>
      <p style="font-size:8px; color:rgba(247,241,229,0.5); margin-bottom:2px; letter-spacing:0.1em; text-transform:uppercase;">All plan types</p>
      <p style="font-size:11px; color:${GOLD}; font-weight:500;">Age 18–85</p>
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
    ${plans.map(planCard).join("")}
  </div>

  <div style="margin-top:10px; padding:9px 14px; border:1px solid ${GOLD}20; border-radius:8px; background:rgba(13,26,23,0.6);">
    <p style="font-size:8px; color:rgba(247,241,229,0.45); line-height:1.6;">
      All plans cover: member, spouse, and up to 6 children. Premiums and benefits are subject to official policy wording and underwriter approval. 6-month waiting period for natural causes. No waiting period for accidental death (first premium received). Claims must be submitted within 6 months. Contact Kasi 2 Home Funeral Services for full details.
    </p>
  </div>
</div>
</body></html>
`;

// ─── Page 3: Benefits, Contact, Policy ────────────────────────────────────────
const page3 = `
<!DOCTYPE html><html><head><meta charset="UTF-8">${base}</head><body>
<div class="page">
  ${corners}
  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
    <div>
      <p class="section-label">Benefits &amp; Contact</p>
      <p class="serif" style="font-size:24px; font-weight:600; color:${CREAM};">We handle everything so you can grieve in peace.</p>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
      <img src="${logoDataUrl}" class="mini-logo" />
      <p style="font-size:7px; font-style:italic; color:${GOLD}; letter-spacing:0.04em; font-family:'Playfair Display',serif;">Excellent service back home</p>
    </div>
  </div>
  <div class="gold-divider" style="margin:0 0 12px 0; justify-content:flex-start; gap:8px;">
    <div class="line" style="width:40px;"></div><div class="dot"></div><div class="line" style="width:40px;"></div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Caring for Your Loved One</p>
      ${["Collection of the deceased", "Safe and respectful storage", "Washing and preparation of the body", "Assistance with registration of death"].map(i => `
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:9px; margin-top:1px;">✓</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Graveside &amp; Family Support</p>
      ${["Family gazebo &amp; grave gazebo", "Covered chairs", "Green carpet / graveside setup", "Lowering device", "Still water for the family"].map(i => `
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:9px; margin-top:1px;">✓</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
  </div>

  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Cover Options</p>
      ${["Main Member Only", "Main Member &amp; Spouse", "Main Member &amp; Children (up to 6)", "Main Member, Spouse &amp; Children (up to 6)", "Extended Family"].map(i => `
        <div style="display:flex; gap:6px; margin-bottom:5px;">
          <span style="color:${GOLD}; font-size:10px;">•</span>
          <span style="font-size:9.5px; color:rgba(247,241,229,0.75);">${i}</span>
        </div>`).join("")}
    </div>
    <div class="card">
      <p class="serif" style="font-size:14px; font-weight:600; color:${CREAM}; margin-bottom:10px;">Underwriter</p>
      <img src="${atlehangLogoDataUrl}" style="height:32px; object-fit:contain; margin-bottom:10px;" />
      ${[["FSP Number", "51568"], ["Reg. Number", "2020/864927/07"], ["Website", "atlehanglife.co.za"]].map(([l, v]) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
          <span style="font-size:9px; color:rgba(247,241,229,0.45);">${l}</span>
          <span style="font-size:9px; color:${CREAM};">${v}</span>
        </div>`).join("")}
    </div>
  </div>

  <div class="card" style="text-align:center; margin-bottom:12px;">
    <p class="serif" style="font-size:16px; font-weight:600; color:${CREAM}; margin-bottom:14px;">You don't have to face this alone.</p>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
      ${[["Business Line", "+27 78 261 3861"], ["Email Us", "info@kasitohomefunerals.co.za"]].map(([l, v]) => `
        <div>
          <div style="width:32px; height:32px; border-radius:50%; border:1px solid ${GOLD}40; background:${GOLD}12; display:flex; align-items:center; justify-content:center; margin:0 auto 6px;">
            <span style="color:${GOLD}; font-size:13px;">✆</span>
          </div>
          <p style="font-size:8.5px; color:rgba(247,241,229,0.45); margin-bottom:2px;">${l}</p>
          <p style="font-size:9.5px; color:${CREAM};">${v}</p>
        </div>`).join("")}
    </div>
    <p style="font-size:8.5px; color:rgba(247,241,229,0.4);">WhatsApp: wa.me/27782613861 · Mon – Fri · 9:00 AM – 5:00 PM · Reg. 2026/254458/07</p>
  </div>

  <div style="padding:10px 14px; border:1px solid ${GOLD}25; border-radius:8px; background:rgba(13,26,23,0.6); margin-bottom:52px;">
    <p style="font-size:8px; letter-spacing:0.15em; text-transform:uppercase; color:${GOLD}; margin-bottom:5px;">Key Policy Notes</p>
    <p style="font-size:8px; color:rgba(247,241,229,0.45); line-height:1.7;">
      6-month waiting period for natural causes · No waiting period for accidental death (first premium received) · Claims within 6 months of event · Cancellation with 1 month's notice · Suicide exclusion within first 12 months · Death from unlawful activities excluded · Subject to official policy wording.
    </p>
  </div>

  <div style="position:absolute; bottom:44px; left:44px; right:44px; display:flex; justify-content:space-between; align-items:center;">
    <div style="display:flex; align-items:center; gap:10px;">
      <img src="${logoDataUrl}" style="width:24px; height:24px; object-fit:contain;" />
      <div>
        <p style="font-size:9px; color:${CREAM};">Kasi 2 Home Funeral Services</p>
        <p style="font-size:8px; font-style:italic; color:rgba(247,241,229,0.4);">Excellent service back home.</p>
      </div>
    </div>
    <p style="font-size:8px; color:rgba(247,241,229,0.3);">kasitohomefunerals.co.za</p>
  </div>
</div>
</body></html>
`;

// ─── Logo with tagline PNG ─────────────────────────────────────────────────────
const logoTaglineHtml = `
<!DOCTYPE html><html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Inter:wght@300&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: transparent; }
  .wrap {
    width: 500px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px 20px;
  }
  img { width: 400px; height: 400px; object-fit: contain; }
  .tagline {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 24px;
    color: #C9A44C;
    letter-spacing: 0.06em;
    margin-top: 10px;
    text-align: center;
  }
</style>
</head>
<body>
<div class="wrap">
  <img src="${logoDataUrl}" />
  <p class="tagline">Excellent service back home</p>
</div>
</body></html>
`;

// ─── Generate ─────────────────────────────────────────────────────────────────
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

async function renderLogoPng(html) {
  const page = await browser.newPage();
  await page.setViewport({ width: 540, height: 500 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.fonts.ready);
  const el = await page.$(".wrap");
  const buf = await el.screenshot({ omitBackground: true });
  await page.close();
  return buf;
}

console.log("Rendering page 1 (cover)…");
const p1 = await renderPage(page1);
console.log("Rendering page 2 (plans)…");
const p2 = await renderPage(page2);
console.log("Rendering page 3 (benefits & contact)…");
const p3 = await renderPage(page3);
console.log("Rendering logo with tagline…");
const logoPng = await renderLogoPng(logoTaglineHtml);

await browser.close();

// ─── Save logo with tagline ───────────────────────────────────────────────────
const logoTaglinePath = path.resolve(assetsDir, "logo-with-tagline.png");
writeFileSync(logoTaglinePath, logoPng);
console.log(`✓ Logo with tagline written to ${logoTaglinePath}`);

// ─── Merge PDF pages ──────────────────────────────────────────────────────────
import { PDFDocument } from "pdf-lib";

const merged = await PDFDocument.create();
for (const buf of [p1, p2, p3]) {
  const doc = await PDFDocument.load(buf);
  const [page] = await merged.copyPages(doc, [0]);
  merged.addPage(page);
}

const outPath = path.resolve(publicDir, "kasi-to-home-brochure.pdf");
writeFileSync(outPath, await merged.save());
console.log(`✓ Brochure written to ${outPath}`);
