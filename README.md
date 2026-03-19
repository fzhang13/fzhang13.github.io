# felixzhang.dev

Personal portfolio site built with Next.js 14, TypeScript, and Tailwind CSS.

## Prerequisites

- **Node.js** >= 18.17 (recommended: v20 LTS)
- **npm** (comes with Node.js)

If you use [nvm](https://github.com/nvm-sh/nvm), the repo includes an `.nvmrc`:

```bash
nvm use
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Export

The site is statically exported for GitHub Pages:

```bash
npm run build
```

The output is in the `out/` directory.

## Project Structure

```
src/
  app/           # Next.js App Router (layout, page, globals.css)
  components/    # React components (Hero, About, Expertise, etc.)
  copy.json      # All site copy in one place
public/          # Static assets (fonts, images, resume, CNAME)
.github/
  workflows/
    deploy.yml   # GitHub Actions deploy to GitHub Pages
```

## Deployment

Pushing to `master` triggers the GitHub Actions workflow which builds and deploys to GitHub Pages.

**First-time setup:** Go to **Settings > Pages** and set the source to **GitHub Actions**.

## Copy & Content

All text content lives in `src/copy.json`. Edit that file to update copy across the entire site.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router, static export)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev/)
