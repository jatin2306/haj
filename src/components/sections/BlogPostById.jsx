import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogByRouteRef } from '../../api/blogsApi';
import BlogPostPage from './BlogPostPage';
import BlogNotFound from './BlogNotFound';

function BlogPostById({ routeRef }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
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
