/**
 * Post-build: inject per-route meta tags into static HTML copies for crawlers.
 * Run after `vite build`: node scripts/prerender-meta.mjs
 * Requires VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in env (or .env).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../out');
const indexPath = resolve(outDir, 'index.html');

function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  } catch { /* no .env */ }
}

loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn('prerender-meta: skip — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(0);
}

if (!existsSync(indexPath)) {
  console.warn('prerender-meta: skip — run vite build first');
  process.exit(0);
}

const baseHtml = readFileSync(indexPath, 'utf8');

const res = await fetch(`${url}/rest/v1/page_seo?select=path,meta_title,meta_description,og_image_url,noindex`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});
const rows = await res.json();
if (!Array.isArray(rows)) {
  console.error('prerender-meta: failed to fetch page_seo', rows);
  process.exit(1);
}

function injectMeta(html, { meta_title, meta_description, og_image_url, noindex }) {
  let out = html;
  const title = meta_title || 'The Web App Pro';
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  const set = (name, content, prop) => {
    if (!content) return;
    const attr = prop ? 'property' : 'name';
    const re = new RegExp(`<meta ${attr}="${name}"[^>]*>`, 'i');
    const tag = `<meta ${attr}="${name}" content="${content.replace(/"/g, '&quot;')}" />`;
    out = re.test(out) ? out.replace(re, tag) : out.replace('</head>', `  ${tag}\n</head>`);
  };
  set('description', meta_description);
  set('robots', noindex ? 'noindex, nofollow' : 'index, follow');
  set('og:title', title, true);
  set('og:description', meta_description, true);
  set('og:image', og_image_url, true);
  return out;
}

let count = 0;
for (const row of rows) {
  const routePath = row.path === '/' ? '' : row.path.replace(/^\//, '');
  const dir = resolve(outDir, routePath);
  mkdirSync(dir, { recursive: true });
  const html = injectMeta(baseHtml, row);
  writeFileSync(resolve(dir, 'index.html'), html);
  count++;
}

console.log(`prerender-meta: wrote ${count} route HTML files with meta tags`);

// ─── sitemap.xml ───────────────────────────────────────────────────────────
// Static routes come from page_seo; dynamic detail pages from published content.
// Never let a mis-set VITE_SITE_URL (e.g. the Render API host) leak into the sitemap.
const settingsRes = await fetch(`${url}/rest/v1/global_settings?select=site_url&id=eq.1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } }).then(r => r.json()).catch(() => []);
const isPublic = (v) => typeof v === 'string' && /^https?:\/\//.test(v) && !/onrender\.com|localhost|127\.0\.0\.1|twap-backend/i.test(v);
const siteUrl = ([Array.isArray(settingsRes) ? settingsRes[0]?.site_url : null, process.env.VITE_SITE_URL].find(isPublic) || 'https://twap-psi.vercel.app').replace(/\/$/, '');
async function fetchRows(table, select, filter = '') {
  const r = await fetch(`${url}/rest/v1/${table}?select=${select}${filter}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}
const [apps, blogs, agencies, authors, founders] = await Promise.all([
  fetchRows('apps', 'slug,updated_at', '&status=eq.published'),
  fetchRows('blog_posts', 'slug,updated_at', '&status=eq.published&noindex=eq.false'),
  fetchRows('agencies', 'slug,updated_at', '&status=eq.published'),
  fetchRows('authors', 'slug'),
  fetchRows('founder_stories', 'slug', '&active=eq.true'),
]);
const entries = [];
for (const row of rows) if (!row.noindex) entries.push({ loc: row.path, lastmod: null });
for (const a of apps) if (a.slug) entries.push({ loc: `/products/${a.slug}`, lastmod: a.updated_at });
for (const b of blogs) if (b.slug) entries.push({ loc: `/blog/${b.slug}`, lastmod: b.updated_at });
for (const g of agencies) if (g.slug) entries.push({ loc: `/agencies/${g.slug}`, lastmod: g.updated_at });
for (const a of authors) if (a.slug) entries.push({ loc: `/authors/${a.slug}`, lastmod: null });
for (const f of founders) if (f.slug) entries.push({ loc: `/founders/${f.slug}`, lastmod: null });
const seen = new Set();
const xmlEscape = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const body = entries
  .filter(e => { if (seen.has(e.loc)) return false; seen.add(e.loc); return true; })
  .map(e => `  <url>\n    <loc>${xmlEscape(siteUrl + (e.loc === '/' ? '/' : e.loc))}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod.slice(0, 10)}</lastmod>` : ''}\n  </url>`)
  .join('\n');
writeFileSync(resolve(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`prerender-meta: wrote sitemap.xml with ${seen.size} URLs`);
