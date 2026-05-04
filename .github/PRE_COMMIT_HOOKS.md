# Pre-Commit Hooks Setup

This project uses **Husky** and **lint-staged** to enforce code quality standards before every commit.

## What Runs on Every Commit

### For TypeScript/TSX files (`*.ts`, `*.tsx`):

1. **Prettier** - Auto-formats code
2. **ESLint** - Lints code and auto-fixes issues
3. **TypeScript** - Type checking (`tsc --noEmit`)

### For other files (`*.js`, `*.jsx`, `*.json`, `*.css`, `*.md`):

1. **Prettier** - Auto-formats code

## ESLint Rules

The following rules are enforced:

- **no-console**: Warns about `console.log` (allows `console.warn` and `console.error`)
- **no-debugger**: Errors on `debugger` statements
- All Next.js core web vitals rules

## Manual Commands

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check

# Run ESLint
npm run lint

# Run type checking
npm run type-check
```

## How It Works

1. When you run `git commit`, Husky triggers the pre-commit hook
2. `lint-staged` runs the configured tools only on staged files
3. If any tool fails, the commit is blocked
4. If auto-fixes are applied, you'll need to review and stage them before committing again

## Files Excluded from Formatting

See [.prettierignore](.prettierignore) for the full list:

- `node_modules`
- `.next`
- `out`
- `build`
- Lock files

## Troubleshooting

If the hook fails:

1. Check the error message for which rule failed
2. Fix the issue manually or let the auto-fix handle it
3. Re-stage the files: `git add .`
4. Try committing again

To bypass the hook (not recommended):

```bash
git commit --no-verify -m "your message"
```
