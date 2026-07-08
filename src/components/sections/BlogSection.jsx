import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublishedBlogs } from '../../api/blogsApi';
import { useInitialData } from '../../context/InitialDataContext';
import {
  cleanText,
  formatBlogDisplayDate,
  getBlogPath,
  getBlogPostId,
  getCardImage,
  getExcerpt,
  sortPublishedBlogsNewestFirst,
} from '../../utils/blogContent';

function BlogSection() {
  const initialData = useInitialData();
  const [posts, setPosts] = useState(() => {
    if (initialData && initialData.posts) {
      return initialData.posts;
    }
    return [];
  });
  const [loading, setLoading] = useState(() => {
    if (initialData && initialData.posts) {
      return false;
    }
    return true;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const hasInitial = Boolean(initialData && initialData.posts);
    async function load() {
      // Always refetch so new admin posts appear even if prerender/SSR data is stale.
      if (!hasInitial) setLoading(true);
      setError(null);
      try {
        const list = await fetchPublishedBlogs();
        const sorted = sortPublishedBlogsNewestFirst(list);
        if (!cancelled) setPosts(sorted);
      } catch (e) {
        if (!cancelled) {
          // Keep prerendered posts if the live API fails.
          if (!hasInitial) {
            setError(e?.message || 'Could not load articles');
            setPosts([]);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [initialData]);

  const visiblePosts = posts.slice(0, 4);
  const hasMoreThanFour = posts.length > 4;

  return (
    <section className="section" id="blog" aria-label="Blog">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Blog</div>
            <h2 className="h2">Guidance for your journey</h2>
            <p className="muted">
              Short summaries from our articles. Dates and rules can change—always confirm with
              official sources and our team before you travel.
            </p>
          </div>
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
          <>
          <div className="blogGrid">
            {visiblePosts.map((blog) => {
              const id = getBlogPostId(blog);
              const imageUrl = getCardImage(blog);
              const title = cleanText(blog?.heading) || 'Blog post';
              const excerpt = getExcerpt(blog);
              const category = cleanText(blog?.category);
              const dateStr = formatBlogDisplayDate(blog);
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
          {hasMoreThanFour ? (
            <div className="blogLoadMoreWrap">
              <Link className="btn btnPrimary" to="/blog">
                Load more
              </Link>
            </div>
          ) : null}
          </>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="muted blogSectionEmpty">No blog posts yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}

export default BlogSection;
