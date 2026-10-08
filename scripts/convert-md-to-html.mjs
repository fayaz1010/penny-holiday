import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const mdPath = process.argv[2];
const outputDir = process.argv[3];

if (!mdPath || !outputDir) {
  console.error('Usage: node convert-md-to-html.mjs <md-file> <output-dir>');
  process.exit(1);
}

const markdown = fs.readFileSync(mdPath, 'utf8');

// Extract frontmatter
const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontmatterMatch) {
  console.error('No frontmatter found');
  process.exit(1);
}

const frontmatter = {};
const frontmatterLines = frontmatterMatch[1].split('\n');
for (const line of frontmatterLines) {
  const match = line.match(/^(\w+):\s*(.+)$/);
  if (match) {
    const key = match[1];
    let value = match[2].trim();
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }
}

const content = markdown.slice(frontmatterMatch[0].length);

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Custom renderer for tables
const renderer = new marked.Renderer();

// Convert markdown to HTML
const html = marked(content, { renderer });

// Create output directory
fs.mkdirSync(outputDir, { recursive: true });

// Wrap in proper structure with meta tags
const wrappedHtml = `<meta itemprop="headline" content="${frontmatter.title || ''}" />
<meta name="description" content="${frontmatter.excerpt || frontmatter.description || ''}" />

${html}`;

// Write to article.html
fs.writeFileSync(path.join(outputDir, 'article.html'), wrappedHtml);

// Write metadata
const meta = {
  savedAt: new Date().toISOString(),
  title: frontmatter.title,
  excerpt: frontmatter.excerpt,
  keywords: frontmatter.keywords,
  slug: frontmatter.slug,
};

fs.writeFileSync(
  path.join(outputDir, 'article.saved.json'),
  JSON.stringify(meta, null, 2)
);

console.log(`✓ Created ${outputDir}/article.html`);
console.log(`✓ Created ${outputDir}/article.saved.json`);
