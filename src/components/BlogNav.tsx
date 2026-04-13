import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogNavProps {
  backLabel?: string;
  backHref?: string;
}

export default function BlogNav({
  backLabel = "Back",
  backHref = "/blog",
}: BlogNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm font-medium text-dark-400 hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-primary-400 transition-colors font-mono"
        >
          felix<span className="text-primary-400">.</span>zhang
        </Link>
      </div>
    </nav>
  );
}
