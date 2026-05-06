/**
 * If article.html has no DOCTYPE, wrap it with head (title, description, keywords, canonical).
 * Reads meta from MCP JSON dump: node scripts/wrap-review-html-shell.mjs --mcpJson=path/to.txt --folder=slug
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const mcpArg = process.argv.find((a) => a.startsWith('--mcpJson='))?.split('=').slice(1).join('=');
const folder = process.argv.find((a) => a.startsWith('--folder='))?.split('=')[1];
if (!mcpArg || !folder) {
  console.error('Usage: node scripts/wrap-review-html-shell.mjs --mcpJson=PATH --folder=review-folder-slug');
  process.exit(1);
}

const mcpPath = path.isAbsolute(mcpArg) ? mcpArg : path.join(process.cwd(), mcpArg);
const data = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
const title = data.metaTitle || data.title || folder;
const desc = data.metaDescription || data.excerpt || '';
const kws = Array.isArray(data.linkerPayload?.secondaryKeywords)
  ? data.linkerPayload.secondaryKeywords.join(', ')
  : data.targetKeyword || '';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

const artPath = path.join(ROOT, 'content', 'reviews', folder, 'article.html');
let body = fs.readFileSync(artPath, 'utf8');
if (/<!DOCTYPE/i.test(body)) {
  console.log('Skip (already wrapped):', folder);
  process.exit(0);
}

const head = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="keywords" content="${esc(kws)}">
  <link rel="canonical" href="https://automore.com.au/reviews/${esc(folder)}">
</head>
<body>
`;

const foot = `
</body>
</html>
`;

fs.writeFileSync(artPath, head + body.trimStart() + foot, 'utf8');
console.log('Wrapped', folder);
