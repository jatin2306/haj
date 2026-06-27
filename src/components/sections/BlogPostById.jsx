import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogByRouteRef } from '../../api/blogsApi';
import { useInitialData } from '../../context/InitialDataContext';
import { getBlogUrlSlug, getBlogPostId } from '../../utils/blogContent';
import BlogPostPage from './BlogPostPage';
import BlogNotFound from './BlogNotFound';

function BlogPostById({ routeRef }) {
  const initialData = useInitialData();

  const [blog, setBlog] = useState(() => {
    if (initialData && initialData.blog) {
      const b = initialData.blog;
      const refStr = String(routeRef).toLowerCase();
      const derivedSlug = getBlogUrlSlug(b).toLowerCase();
      const matchSlug = derivedSlug === refStr;
      const matchId = String(getBlogPostId(b)) === refStr;
      if (matchId || matchSlug) {
        return b;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(() => {
    if (blog) return false;
    return true;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (blog) {
      const refStr = String(routeRef).toLowerCase();
      const derivedSlug = getBlogUrlSlug(blog).toLowerCase();
      const matchSlug = derivedSlug === refStr;
      const matchId = String(getBlogPostId(blog)) === refStr;
      if (matchId || matchSlug) {
        return;
      }
    }

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      setBlog(null);
      try {
        const data = await fetchBlogByRouteRef(routeRef);
        if (!cancelled) {
          setBlog(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Failed to load article');
          setBlog(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeRef]);

  if (loading) {
    return (
      <main id="content">
        <article className="section blogPostPage" aria-busy="true" aria-label="Loading article">
          <div className="container">
            <div className="blogPostSkeleton" />
          </div>
        </article>
      </main>
    );
  }

  if (error) {
    return (
      <main id="content">
        <article className="section blogPostPage" aria-label="Blog error">
          <div className="container">
            <p className="blogPostBackWrap">
              <Link className="blogPostBack" to="/blog">
                ← Back to blogs
              </Link>
            </p>
            <p className="muted">{error}</p>
          </div>
        </article>
      </main>
    );
  }

  if (!blog) {
    return <BlogNotFound />;
  }

  return <BlogPostPage post={blog} />;
}

export default BlogPostById;
