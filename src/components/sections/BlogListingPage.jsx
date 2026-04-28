import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublishedBlogs } from '../../api/blogsApi';
import {
  cleanText,
  formatBlogDate,
  getBlogPath,
  getBlogPostId,
  getCardImage,
  getExcerpt,
} from '../../utils/blogContent';

function BlogListingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchPublishedBlogs();
        const sorted = [...list].sort((a, b) => {
          const ta = a?.published_at ? new Date(a.published_at).getTime() : Number.POSITIVE_INFINITY;
          const tb = b?.published_at ? new Date(b.published_at).getTime() : Number.POSITIVE_INFINITY;
          if (ta !== tb) return ta - tb; // first come, first served: oldest first

          const ida = a?.id ?? 0;
          const idb = b?.id ?? 0;
          return ida - idb;
        });
        if (!cancelled) setPosts(sorted);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Could not load articles');
          setPosts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main id="content">
      <section className="section" aria-label="Blog listing">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="kicker">Blog</div>
              <h1 className="h2">All blog posts</h1>
              <p className="muted">Browse all articles and open any post for full details.</p>
            </div>
            <Link className="btn btnGhost" to="/#blog">
              Back to home
            </Link>
          </div>

          {loading && (
            <div className="blogGrid" aria-busy="true">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="blogCard blogCardSkeleton" aria-hidden="true">
                  <div className="blogCardSkeletonMedia" />
                  <div className="blogCardSkeletonLine" />
                  <div className="blogCardSkeletonLine blogCardSkeletonLineShort" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="muted blogSectionError" role="status">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="blogGrid">
              {posts.map((blog) => {
                const id = getBlogPostId(blog);
                const imageUrl = getCardImage(blog);
                const title = cleanText(blog?.heading) || 'Blog post';
                const excerpt = getExcerpt(blog);
                const category = cleanText(blog?.category);
                const dateStr = formatBlogDate(blog?.published_at);
                const readTime =
                  blog?.read_time_minutes != null ? `${blog.read_time_minutes} min read` : '';
                if (!id) return null;
                return (
                  <Link key={id} className="blogCard" to={getBlogPath(blog)}>
                    <article>
                      <div className="blogCardMedia">
                        {imageUrl ? (
                          <img src={imageUrl} alt={title} className="blogCardImg" loading="lazy" />
                        ) : (
                          <div className="blogCardImgPlaceholder" aria-hidden="true" />
                        )}
                        {category ? <span className="blogCardTag">{category}</span> : null}
                      </div>
                      {(dateStr || readTime) && (
                        <p className="blogCardMeta">
                          {dateStr}
                          {dateStr && readTime ? ' · ' : ''}
                          {readTime}
                        </p>
                      )}
                      <h3 className="blogTitle">{title}</h3>
                      {excerpt ? <p className="blogExcerpt">{excerpt}</p> : null}
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="muted blogSectionEmpty">No blog posts yet. Check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default BlogListingPage;
