## Phase A Restructure — pennyholiday.com (corrected)

### Verification checklist
- `amaldives` in `components/site-header.tsx` + `site-footer.tsx`: **0**
- `complete Maldives guide` CTA in article template: **0** (removed)
- amaldives links in `content/reviews/*/article.html`: **8** (was 8 pre-existing, target: 8)

- Anchor text CSV: `amaldives-link-audit.csv` (8 rows)

### Files changed
- `components/site-header.tsx` — removed "Full Maldives Guide →" button
- `components/site-footer.tsx` — removed amaldives inline + column links
- `app/posts/[slug]/page.tsx` — removed amaldives CTA box
- `content/reviews/*/article.html` — stripped 8 pre-existing links, injected 8 contextual links
- `amaldives-link-audit.csv` — full anchor text audit trail

### Anchor text distribution (8 links)
- `amaldives` × 2
- `amaldives.com` × 1
- `aMaldives` × 1
- `Maldives travel guide` × 1
- `Maldives resort guide` × 1
- `local Maldives operator` × 1
- `Maldives booking resource` × 1

### Risk reduction (corrected)
| Signal | Before Phase A | After Phase A |
|--------|----------------|---------------|
| amaldives refs in components | 5 | 0 |
| Article-level amaldives links | 8 | 8 |
| Visible CTAs to amaldives | 3/page (header + footer + box) | 0 site-wide CTAs |
