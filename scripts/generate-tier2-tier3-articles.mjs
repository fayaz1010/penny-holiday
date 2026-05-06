/**
 * Writes article.html + article.saved.json for tier-2-3-specs.json (hero must exist or img falls back to hero.jpg).
 *
 * Usage: node scripts/generate-tier2-tier3-articles.mjs
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SPECS_PATH = path.join(ROOT, 'content', 'reviews', 'tier-2-3-specs.json');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 88);
}

function heroSrc(slug) {
  const dir = path.join(ROOT, 'content', 'reviews', slug);
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    const f = path.join(dir, `hero${ext}`);
    if (fs.existsSync(f)) return `hero${ext}`;
  }
  return 'hero.jpg';
}

function readImageMeta(slug) {
  const p = path.join(ROOT, 'content', 'reviews', slug, 'image-meta.json');
  if (!fs.existsSync(p)) return { ok: false };
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return { ok: false };
  }
}

function figcaption(meta) {
  if (meta?.ok && meta.filePage) {
    const lic = escapeHtml(meta.licenseShort || 'See file page');
    return `Photo: <a href="${escapeHtml(meta.filePage)}" rel="nofollow noopener">Wikimedia Commons</a> (${lic}).`;
  }
  return 'Photo: <a href="https://commons.wikimedia.org/" rel="nofollow noopener">Wikimedia Commons</a> — verify licence on the file page before commercial use.';
}

function h2(id, title) {
  return `<h2 id="${id}">${title}</h2>`;
}

function segmentIntro(spec) {
  const { segment, angle } = spec;
  if (segment === 'ute')
    return `Australian dual-cab buyers still move the market on ${spec.years} stock: towing, tray weight, and mine-site cycles matter as much as brochure torque figures. ${angle}`;
  if (segment === '4wd')
    return `Remote travel and corrugated roads still define honest ${spec.short} advice in Australia. ${angle}`;
  if (segment === 'suv7')
    return `Seven-seat SUVs need realistic third-row and tow-package thinking — not just glossy brochure shots. ${angle}`;
  if (segment === 'suv5')
    return `Family SUVs in this bracket are bought on resale confidence and servicing spread as much as cabin tech. ${angle}`;
  if (segment === 'sports')
    return `Enthusiast cars trade on honesty about consumables, track history, and recall completion — not lap-time fantasies. ${angle}`;
  if (segment === 'luxury')
    return `Luxury 4WDs and SUVs here are maintenance stories first and badge stories second. ${angle}`;
  return angle;
}

function buildFaq(spec) {
  const { short, primaryKw, years, rivals } = spec;
  const r = rivals[0] || 'key rivals';
  return [
    {
      q: `Is a used ${short} a sensible buy in Australia in 2026?`,
      a: `It can be, if you buy on documented service history and a specialist pre-purchase inspection. Focus on the issues listed for ${years} examples, compare drive-away pricing to ${r}, and run a PPSR check before paying.`,
    },
    {
      q: `What are the most common problems with a ${short}?`,
      a: `Owner and workshop reports cluster around: ${spec.issues.slice(0, 3).join('; ')}. Verify each point on your test drive and in service records rather than assuming a clean exterior means a clean bill of health.`,
    },
    {
      q: `How does ${short} compare to ${r}?`,
      a: `${short} and ${r} overlap on price for many kilometres and years. The better buy is usually the example with clearer maintenance and fewer owners — not the slightly newer badge.`,
    },
    {
      q: `What should I check before buying a ${short} privately?`,
      a: `Oil condition, transmission behaviour on a cold start, obvious fluid leaks, uneven tyre wear, and a full PPSR report. For diesels, confirm DPF driving history where fitted; for 4WDs, check transfer-case and CV boots.`,
    },
    {
      q: `Where does "${primaryKw}" traffic actually land for buyers?`,
      a: `Most searches are trying to reconcile forum horror stories with real-world variance. Use this guide as a checklist: confirm recalls, match use-case (city vs tow vs remote), and budget post-purchase service if the price looks too sharp.`,
    },
    {
      q: `What ANCAP or safety context applies to ${short}?`,
      a: `${spec.safetySummary} Cross-check airbag count and stability control fitment by build plate, not by advertisement photos alone.`,
    },
  ];
}

/** Add safetySummary to specs that need it — merged at runtime */
function enrich(spec) {
  const s = { ...spec };
  if (!s.safetySummary) {
    if (s.segment === 'ute')
      s.safetySummary = `Older utes often pre-date modern lane-support scores; ANCAP context varies sharply by year and optional safety packs.`;
    else if (s.segment === '4wd')
      s.safetySummary = `Wagon and ute 4WDs in this era range from strong occupant cells to dated pedestrian protection — read the build date against ANCAP archives.`;
    else if (s.segment === 'suv7' || s.segment === 'suv5')
      s.safetySummary = `Many family SUVs have five-star ANCAP results under older protocols; compare curtain airbag coverage and AEB availability by trim.`;
    else if (s.segment === 'sports')
      s.safetySummary = `Sports coupes and hot hatches prioritise crash structures from their era — ESC and airbag count still matter for daily use in wet Australian cities.`;
    else if (s.segment === 'luxury')
      s.safetySummary = `Large luxury SUVs often scored well for occupant protection in-period; active safety and camera clarity now feel dated on early builds.`;
    else if (s.segment === 'hatch')
      s.safetySummary = `Hatchbacks here span five-star and four-star ANCAP eras — confirm variant-specific curtain airbags and ESC fitment.`;
    else s.safetySummary = `Verify ANCAP year and variant on the official ANCAP site before assuming a five-star badge.`;
  }
  return s;
}

function internalLinks(spec) {
  const links = spec.internal || [];
  return `<ul>
${links.map((href) => `    <li><a href="${href}">${href.replace('/reviews/', '')}</a> — related Automore used-buyer guide</li>`).join('\n')}
  </ul>`;
}

function faqJsonLd(faqs) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    null,
    2
  );
}

function buildArticle(spec) {
  const s = enrich(spec);
  const meta = readImageMeta(s.slug);
  const hero = heroSrc(s.slug);
  const cap = figcaption(meta);
  const faqs = buildFaq(s);

  const issuesList = s.issues.map((t) => `    <li>${escapeHtml(t)}</li>`).join('\n');
  const rivalsPara = s.rivals
    .map(
      (name) =>
        `<p><strong>${escapeHtml(name)}:</strong> Shop ${escapeHtml(s.short)} against ${escapeHtml(
          name
        )} on kilometres, owners, and documented transmission/driveline work — not sticker price alone.</p>`
    )
    .join('\n');

  const idWho = slugify('Who this Australian used guide is for');
  const idYears = slugify('Model years and positioning');
  const idMech = slugify('Engines driveline and towing');
  const idProb = slugify('Common problems and recalls');
  const idSafe = slugify('Safety and ANCAP context');
  const idCost = slugify('Running costs servicing insurance');
  const idComp = slugify('Competition on the used lot');
  const idVer = slugify('Verdict for 2026 buyers');
  const idFaq = slugify('Frequently asked questions');
  const idMore = slugify('More Automore guides');

  const body = `
<figure class="automore-hero" style="margin:0 0 1.25rem 0">
  <img src="${hero}" alt="${escapeHtml(s.h1.replace(/<[^>]+>/g, ''))}" width="1200" height="675" loading="eager" decoding="async" style="width:100%;height:auto;display:block;border-radius:6px" />
  <figcaption style="font-size:0.85rem;color:#444;margin-top:0.35rem">${cap}</figcaption>
</figure>

<h1>${escapeHtml(s.h1)}</h1>

<p>If you are researching <strong>${escapeHtml(s.primaryKw)}</strong>, you are probably trying to separate forum panic from usable pattern: which kilometres are fair, which options matter in Australian heat, and where sellers hide wear. Automore aggregates ANCAP references, recall and TSB chatter, workshop themes, and pricing context — we do not claim secret fleet tests unless a source is named.</p>

<p>${escapeHtml(segmentIntro(s))} This page targets honest <strong>${escapeHtml(s.primaryKw)}</strong> intent: problems, rivals, running costs, and a plain-language verdict for ${escapeHtml(s.years)}.</p>

${h2(idWho, 'Who this Australian used guide is for')}
<p>${escapeHtml(s.angle)} Start from the assumption that one mint service folder beats one fresh detail spray.</p>
<p>Use the checklist in the problems section with any independent inspector; for remote buyers, factor freight and registration transfer costs into your spreadsheet, not just the carsales listing.</p>

${h2(idYears, 'Model years and positioning in Australia')}
<p>${escapeHtml(s.short)} in the ${escapeHtml(s.years)} window sits in a crowded used lane: finance pressure, dealer consignment, and private ads often diverge by thousands for the same apparent grade.</p>
<p>Read build plates and compliance dates, not model-year badges alone — Australian deliveries can trail other markets, and that matters for emissions hardware, gearbox mappings, and infotainment generations.</p>

${h2(idMech, 'Engines, driveline, and what Australian buyers actually tow')}
<p>${escapeHtml(s.engines)}</p>
<p>Match the powertrain to your use: constant highway towing in Queensland heat is not the same as short Sydney commutes. If you tow, verify hitch rating, trailer stability gear, and transmission cooler fitment where relevant — and budget fluid changes sooner than the absolute minimum interval if you are heavy on the pedal.</p>

${h2(idProb, 'Common problems, recalls, and inspection priorities')}
<p>These themes show up repeatedly in Australian owner discussions and workshop intake — not every car exhibits all of them, but your test drive and compression/leakdown checks should deliberately hunt them down:</p>
<ul>
${issuesList}
</ul>
<p>Always check the official manufacturer recall portal with the VIN, and keep PDF proof in your own folder — it helps resale and keeps the story straight if you sell in three years.</p>

${h2(idSafe, 'Safety, ANCAP, and equipment variance by trim')}
<p>${escapeHtml(s.safetySummary)}</p>
<p>Second-hand buyers should photograph tyre placards, jack and spare locations, and any aftermarket bars that can interfere with sensors. If you carry kids, confirm top-tether and ISOFIX layout for your exact child seats — not all rear rows are equal.</p>

${h2(idCost, 'Running costs: servicing, fuel, tyres, and insurance bands')}
<p>Servicing costs swing wildly by postcode: Perth labour rates, Darwin freight on parts, and Melbourne inner-city workshop rents all flow into the same national listing price. Ring three independents who specialise in your chassis before you bid.</p>
<p>Tyre size and speed rating matter for utes and SUVs that mix bitumen and gravel; for performance cars, budget a second set of wheels if you plan track days — consumables are part of real ownership, not an optional extra.</p>

${h2(idComp, 'Competition: how ' + escapeHtml(s.short) + ' stacks up on the used lot')}
${rivalsPara}
<p>Internal benchmarking: see our related hubs below for cross-shopping without leaving independent editorial context.</p>

${h2(idVer, 'Verdict: should you buy ' + escapeHtml(s.short) + ' in 2026?')}
<p>Buy ${escapeHtml(s.short)} if the example you have found matches your use-case, has verifiable maintenance, and leaves room in your budget for the highest-risk wear items in this guide. Walk away if the seller cannot explain gaps in service history, if transmission behaviour is inconsistent on a cold start, or if PPSR shows finance or write-off ambiguity.</p>
<p>Fair deals still exist — they just reward buyers who read build sheets, not buyers who chase the lowest screenshot price.</p>

${h2(idFaq, 'Frequently asked questions')}
${faqs
  .map(
    (f) => `<h3>${escapeHtml(f.q)}</h3>
<p>${escapeHtml(f.a)}</p>`
  )
  .join('\n\n')}

<script type="application/ld+json">
${faqJsonLd(faqs)}
</script>

${h2(idMore, 'More Automore used-buyer guides')}
${internalLinks(s)}

<h2>About this review</h2>
<p><strong>Automore editorial</strong> produces independent Australian used-car guides by aggregating ANCAP data, manufacturer recalls, owner forums, and local media — not anonymous overseas rewrites. Methodology and limitations are stated inline; we flag uncertainty instead of inventing seat-of-the-pants fuel figures.</p>
`.trim();

  const html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(s.title)}</title>
  <meta name="description" content="${escapeHtml(s.description)}">
  <meta name="keywords" content="${escapeHtml(s.keywords)}">
  <link rel="canonical" href="https://automore.com.au/reviews/${escapeHtml(s.slug)}">
</head>
<body>
${body}
</body>
</html>
`;

  return html;
}

function main() {
  const specs = JSON.parse(fs.readFileSync(SPECS_PATH, 'utf8'));
  const stamp = new Date().toISOString();
  for (const spec of specs) {
    const dir = path.join(ROOT, 'content', 'reviews', spec.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = buildArticle(spec);
    fs.writeFileSync(path.join(dir, 'article.html'), html, 'utf8');
    fs.writeFileSync(
      path.join(dir, 'article.saved.json'),
      JSON.stringify(
        {
          savedAt: stamp,
          mcpSlug: spec.slug,
          folderSlug: spec.slug,
          source: 'scripts/generate-tier2-tier3-articles.mjs',
          hero: heroSrc(spec.slug),
          tier: '2-3',
        },
        null,
        2
      ),
      'utf8'
    );
    console.log('Wrote', spec.slug);
  }
}

main();
