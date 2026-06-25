export function readSectionGradient(
  content: Record<string, unknown>,
  options: {
    fromKey?: string;
    toKey?: string;
    defaultFrom: string;
    defaultTo: string;
  },
) {
  const fromKey = options.fromKey ?? 'gradient_from';
  const toKey = options.toKey ?? 'gradient_to';
  const from = String(content[fromKey] ?? options.defaultFrom);
  const to = String(content[toKey] ?? options.defaultTo);
  return {
    from: /^#[0-9A-Fa-f]{6}$/.test(from) ? from : options.defaultFrom,
    to: /^#[0-9A-Fa-f]{6}$/.test(to) ? to : options.defaultTo,
  };
}

export function linearGradientStyle(
  from: string,
  to: string,
  direction = 'to bottom right',
): { background: string } {
  return { background: `linear-gradient(${direction}, ${from}, ${to})` };
}

export function sectionBgStyle(
  content: Record<string, unknown>,
  defaults: { defaultFrom: string; defaultTo: string; direction?: string },
) {
  const { from, to } = readSectionGradient(content, defaults);
  return linearGradientStyle(from, to, defaults.direction);
}
