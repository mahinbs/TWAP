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
