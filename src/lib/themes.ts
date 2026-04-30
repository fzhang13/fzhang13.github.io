export type ThemeId = 'root' | 'bin' | 'usr' | 'var';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  description: string;
}

export const themes: ThemeDefinition[] = [
  { id: 'root', label: 'Root', description: 'Terminal Brutalist' },
  { id: 'bin', label: 'BIN', description: 'Amber Phosphor' },
  { id: 'usr', label: 'USR', description: 'Warning Red' },
  { id: 'var', label: 'Var', description: 'Cyberpunk Cyan' },
];

export const DEFAULT_THEME: ThemeId = 'root';

export const NAV_ITEMS = [
  { label: 'HOME.sh', href: '/' },
  { label: 'ABOUT.log', href: '/about' },
  { label: 'STACK.env', href: '/stack' },
  { label: 'WORK.tar.gz', href: '/work' },
] as const;
