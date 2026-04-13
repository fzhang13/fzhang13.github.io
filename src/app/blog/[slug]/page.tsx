import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import BlogNav from "@/components/BlogNav";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps) {
  try {
    const post = getPost(params.slug);
    return { title: `${post.title} | Felix Zhang` };
  } catch {
    return { title: "Post not found" };
  }
}

export default function BlogPost({ params }: PageProps) {
  let post;
  try {
    post = getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      <BlogNav backLabel="All Posts" backHref="/blog" />

      <main className="min-h-screen bg-dark-950 pt-24 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          {/* Article header */}
          <header className="mb-12 pt-8">
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-primary-600/10 text-primary-400 border border-primary-500/20 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-display">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm font-mono text-dark-500">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Article body */}
          <div className="prose-blog">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  rehypePlugins: [[rehypePrettyCode, { theme: "github-dark", keepBackground: false }]] as any,
                },
              }}
            />
          </div>

          {/* Footer nav */}
          <footer className="mt-16 pt-8 border-t border-dark-800/60">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-mono text-dark-500 hover:text-primary-400 transition-colors"
            >
              ← all posts
            </a>
          </footer>
        </article>
      </main>
    </>
  );
}
