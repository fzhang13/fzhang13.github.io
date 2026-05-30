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
  const h = pad(now.getHours());
  const mi = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  const tzMins = -now.getTimezoneOffset();
  const tzSign = tzMins >= 0 ? '+' : '-';
  const tz = `${tzSign}${pad(Math.floor(Math.abs(tzMins) / 60))}${pad(Math.abs(tzMins) % 60)}`;
  const dateParts = now.toDateString().split(' '); // ['Fri', 'May', '30', '2026']

  return {
    // syslog-style: 2026.05.30
    'today.dot': `${y}.${mo}.${d}`,
    // syslog-style with local time: 2026.05.30 14:23:45
    'today.dot.time': `${y}.${mo}.${d} ${h}:${mi}:${s}`,
    // git blame-style: 2026-05-30
    'today.iso': `${y}-${mo}-${d}`,
    // git blame-style with local time: 2026-05-30 14:23:45 -0700
    'today.iso.time': `${y}-${mo}-${d} ${h}:${mi}:${s} ${tz}`,
    // git log-style: Fri May 30 2026
    'today.long': now.toDateString(),
    // git log-style with local time: Fri May 30 14:23:45 2026 -0700
    'today.long.time': `${dateParts[0]} ${dateParts[1]} ${dateParts[2]} ${h}:${mi}:${s} ${dateParts[3]} ${tz}`,
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
