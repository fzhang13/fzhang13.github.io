import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function Writing() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subheading">Writing</p>
            <h2 className="section-heading">Thoughts &amp; Notes</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-dark-500 hover:text-primary-400 transition-colors"
          >
            all posts →
          </Link>
        </div>

        {/* Post list */}
        <ul className="space-y-px">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-dark-800/60 hover:border-dark-700/60 transition-colors"
              >
                <span className="font-mono text-xs text-dark-700 w-6 shrink-0 hidden sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-dark-500 text-sm leading-relaxed line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-dark-800/80 text-dark-500 border border-dark-700/50 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-dark-600">
                    {formatDate(post.date)}
                  </span>
                  <span className="text-dark-700 group-hover:text-primary-400 transition-colors">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile all posts link */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/blog"
            className="text-sm font-mono text-dark-500 hover:text-primary-400 transition-colors"
          >
            all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
