import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import BlogNav from "@/components/BlogNav";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <BlogNav backLabel="Back to Portfolio" backHref="/" />

      <main className="min-h-screen bg-dark-950 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-primary-400 text-sm tracking-wider mb-3">
              $ ls ./writing
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              Writing
            </h1>
            <p className="text-dark-400 text-lg max-w-lg">
              Thoughts on engineering, architecture, and building things that
              hold up.
            </p>
          </div>

          {/* Post list */}
          {posts.length === 0 ? (
            <p className="text-dark-500 font-mono text-sm">No posts yet.</p>
          ) : (
            <ul className="space-y-px">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-start gap-4 py-8 border-b border-dark-800/60 hover:border-dark-700/60 transition-colors"
                  >
                    {/* Index number */}
                    <span className="font-mono text-xs text-dark-700 pt-1 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <h2 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors leading-snug">
                          {post.title}
                        </h2>
                      </div>
                      <p className="text-dark-400 text-sm leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-mono text-dark-600">
                          {formatDate(post.date)}
                        </span>
                        <span className="text-dark-700">·</span>
                        <span className="font-mono text-dark-600">
                          {post.readingTime} min read
                        </span>
                        <div className="flex gap-1.5 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-dark-800/80 text-dark-400 border border-dark-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span className="text-dark-700 group-hover:text-primary-400 transition-colors shrink-0 pt-1 hidden sm:block">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
