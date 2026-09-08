/**
 * Site-wide safety net for broken <img> URLs.
 *
 * CMS content can point at images that later disappear (stock-photo links,
 * expired generators). Instead of showing the browser's broken-image icon and
 * alt text, swap the image for a soft brand-coloured placeholder so pages
 * always look finished.
 */
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#1F2853"/><stop offset="1" stop-color="#f25a1a" stop-opacity="0.75"/>` +
      `</linearGradient></defs>` +
      `<rect width="400" height="300" fill="url(#g)"/>` +
      `<circle cx="200" cy="150" r="46" fill="rgba(255,255,255,0.14)"/>` +
      `<path d="M172 168l18-24 14 18 10-12 22 28z" fill="rgba(255,255,255,0.7)"/>` +
      `<circle cx="184" cy="132" r="7" fill="rgba(255,255,255,0.7)"/>` +
    `</svg>`,
  );

const HANDLED = 'data-fallback-applied';

export function installImageFallback(): void {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'error',
    (event) => {
      const el = event.target as HTMLElement | null;
      if (!el || el.tagName !== 'IMG') return;
      const img = el as HTMLImageElement;
      if (img.getAttribute(HANDLED) === '1') return;
      img.setAttribute(HANDLED, '1');
      img.src = PLACEHOLDER;
      img.style.objectFit = 'cover';
    },
    true, // capture: <img> error events do not bubble
  );
}

export { PLACEHOLDER as IMAGE_PLACEHOLDER };
