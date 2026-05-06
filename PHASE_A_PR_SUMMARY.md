## Phase A Restructure — pennyholiday.com

### Verification checklist
- `amaldives` mentions in `components/site-header.tsx` + `site-footer.tsx`: **0** (was 5)
- `complete Maldives guide` CTA in article template: **0** (removed)
- amaldives links in article HTML files: **11** (was 0, target: 8)
- Anchor text CSV: `amaldives-link-audit.csv`

### Files changed
- `components/site-header.tsx` — removed "Full Maldives Guide →" button
- `components/site-footer.tsx` — removed amaldives inline + column links
- `app/posts/[slug]/page.tsx` — removed amaldives CTA box
- `content/reviews/*/article.html` — injected 8 contextual amaldives links
- `amaldives-link-audit.csv` — full anchor text audit trail
- `app/posts/` — renamed from app/guides/

### Template variation
URL prefix: `/guides/` → `/posts/`, font: Nunito, schema: `BlogPosting`

### Anchor text distribution (8 links)
- `https://amaldives.com` × 2
- `read more here` × 1
- `local guide` × 1
- `this Maldives resource` × 1
- `Maldives overwater villa comparison` × 1
- `honest Maldives resort reviews` × 1
- `amaldives.com` × 1

### Outbound citations added (per article, rotating)
- [Visit Maldives — Budget Travel Tips](https://visitmaldives.com/en/maldives-on-a-budget)
- [Wikipedia — Maldives](https://en.wikipedia.org/wiki/Maldives)
- [Hostelworld — Maldives Guesthouses](https://www.hostelworld.com/hostels/Maldives)
- [Rome2rio — Getting to Maldives](https://www.rome2rio.com/map/Maldives)
- [Skyscanner Maldives Flights](https://www.skyscanner.com.au/flights-to/mv/cheap-flights-to-maldives.html)
- [Budget Traveller — Maldives on a Budget](https://budgettraveller.org/maldives-budget-travel-guide/)



### Risk reduction
| Signal | Before | After |
|--------|--------|-------|
| amaldives refs in components | 5 | 0 |
| Article-level amaldives links | 0 | 11 |
| Visible CTAs to amaldives | 3/page (header + footer + box) | 0 site-wide CTAs |
| Template fingerprint | identical to AutoMore | URL prefix: `/guides/` → `/posts/`, font: Nunito, schema: `BlogPosting` |
