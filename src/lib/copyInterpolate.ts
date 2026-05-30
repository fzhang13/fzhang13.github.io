/**
 * Lightweight `{token}` interpolation for copy strings.
 *
 * Mirrors the `string-format` style used by the Jam3/Experience-Monks
 * boilerplate (`{var}` tokens) but stays dependency-free — we only need
 * dynamic values, not the full XSS/HTML pipeline of that `Copy` class.
 */

/** Build the set of dynamic tokens available to copy strings, evaluated now. */
export function buildCopyTokens(
  now: Date = new Date()
): Record<string, string> {
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = now.getFullYear();
  const mo = pad(now.getMonth() + 1);
  const d = pad(now.getDate());

  return {
    // syslog-style: 2026.05.30
    'today.dot': `${y}.${mo}.${d}`,
    // git blame-style: 2026-05-30
    'today.iso': `${y}-${mo}-${d}`,
    // git log-style: Fri May 30 2026
    'today.long': now.toDateString(),
  };
}

/** Replace every `{token}` in `text` with its value; unknown tokens are left intact. */
export function interpolate(
  text: string,
  tokens: Record<string, string>
): string {
  return text.replace(/\{([\w.]+)\}/g, (match, key) =>
    key in tokens ? tokens[key] : match
  );
}
