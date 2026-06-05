import { Link } from 'react-router-dom';
import SEO, { blogPostSchema, pageSchemas } from '../SEO';
import {
  cleanText,
  formatBlogDate,
  getCardImage,
  getExcerpt,
  sanitizeBlogHtml,
} from '../../utils/blogContent';

function BlogPostPage({ post }) {
  const title = cleanText(post?.heading) || 'Blog post';
  const excerpt = getExcerpt(post);

  const metaParts = [];
  const d = formatBlogDate(post?.published_at);
  if (d) metaParts.push(d);
  if (post?.read_time_minutes != null) metaParts.push(`${post.read_time_minutes} min read`);
  const author = cleanText(post?.author);
  if (author) metaParts.push(`By ${author}`);
  const metaLine = metaParts.join(' · ');

  const coverUrl = getCardImage(post);

  const postSchema = [
    ...pageSchemas({
      path: `/blog/${post?.id || ''}`,
      name: title,
      description: excerpt || `Read "${title}" on A Way to Makkah blog.`,
      pageType: 'WebPage',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: title },
      ],
    }),
    blogPostSchema(post),
  ];

  return (
    <main id="content">
      <SEO
        title={title}
        description={excerpt || `Read "${title}" on A Way to Makkah blog.`}
        path={`/blog/${post?.id || ''}`}
        image={coverUrl || undefined}
        type="article"
        schema={postSchema}
      />
      <article className="section blogPostPage" aria-labelledby="blog-post-title">
        <div className="container">
          <p className="blogPostBackWrap">
            <Link className="blogPostBack" to="/blog">
              ← Back to blogs
            </Link>
          </p>
          <header className="blogPostHeader">
            <div className="kicker">Blog</div>
            {metaLine ? <p className="blogPostMeta">{metaLine}</p> : null}
            <h1 id="blog-post-title" className="h2 blogPostHeading">
              {title}
            </h1>
            {excerpt ? <p className="muted blogPostLead">{excerpt}</p> : null}
          </header>
          {coverUrl && (
            <div className="blogPostCover">
              <img src={coverUrl} alt={title} className="blogPostCoverImg" />
            </div>
          )}
          <div className="blogPostBody">
            {post?.description ? (
              <div
                className="blogPostHtml"
                dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(String(post.description)) }}
              />
            ) : null}
          </div>
        </div>
      </article>
    </main>
  );
}

export default BlogPostPage;
