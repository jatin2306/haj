import { Link } from 'react-router-dom';
import SEO, { pageSchemas } from '../SEO';

function BlogNotFound() {
  const title = 'Article not found';
  const description =
    'That blog link may be outdated. Return to the blog list to choose an article.';

  return (
    <main id="content">
      <SEO
        title={title}
        description={description}
        path="/blog"
        noindex
        schema={pageSchemas({
          path: '/blog',
          name: title,
          description,
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: title },
          ],
        })}
      />
      <section className="section blogPostPage" aria-label="Blog post not found">
        <div className="container">
          <p className="blogPostBackWrap">
            <Link className="blogPostBack" to="/blog">
              ← Back to blogs
            </Link>
          </p>
          <header className="blogPostHeader">
            <h1 className="h2 blogPostHeading">{title}</h1>
            <p className="muted blogPostLead">{description}</p>
          </header>
        </div>
      </section>
    </main>
  );
}

export default BlogNotFound;
