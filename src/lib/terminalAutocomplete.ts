/**
 * Shared ghost-text autocomplete for the site's interactive terminals.
 *
 * Returns the remaining suffix that completes `input` against the first
 * matching entry, or '' when there's nothing to suggest. When `navPages`
 * is provided, `cd <partial>` also completes against page names.
 */
export function getTerminalGhostText(
  input: string,
  entries: string[],
  navPages: string[] = []
): string {
  const val = input.toLowerCase();
  if (!val) return '';

  if (navPages.length && val.startsWith('cd ')) {
    const arg = val.slice(3).replace(/^\//, '');
    if (!arg) return '';
    const match = navPages.find(p => p.startsWith(arg) && p !== arg);
    return match ? match.slice(arg.length) : '';
  }

  const match = entries.find(cmd => cmd.startsWith(val) && cmd !== val);
  return match ? match.slice(val.length) : '';
}
