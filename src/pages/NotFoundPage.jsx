import { Link } from 'react-router-dom';
import SEO, { pageSchemas } from '../components/SEO';

export default function NotFoundPage() {
  const title = 'Page Not Found';
  const description =
    'This address does not match any page on our site. Check the link or return to the homepage.';

  return (
    <main id="content">
      <SEO
        title={title}
        description={description}
        noindex
        schema={pageSchemas({
          path: '/404',
          name: title,
          description,
        })}
      />
      <section className="section notFoundPage" aria-label="Page not found">
        <div className="container">
          <header className="blogPostHeader">
            <div className="kicker">404</div>
            <h1 className="h2 blogPostHeading">No page found</h1>
            <p className="muted blogPostLead">
              This address does not match any page on our site. Check the link or return to the
              homepage.
            </p>
          </header>
          <p className="notFoundActions">
            <Link className="btn btnPrimary" to="/">
              Back to home
            </Link>
            <Link className="btn btnGhost" to="/#contact">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
