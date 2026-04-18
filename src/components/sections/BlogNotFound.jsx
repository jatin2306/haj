function BlogNotFound() {
  return (
    <main id="content">
      <section className="section blogPostPage" aria-label="Blog post not found">
        <div className="container">
          <p className="blogPostBackWrap">
            <a className="blogPostBack" href="/#blog">
              ← Back to Home
            </a>
          </p>
          <header className="blogPostHeader">
            <h1 className="h2 blogPostHeading">Article not found</h1>
            <p className="muted blogPostLead">
              That blog link may be outdated. Return to the blog list to choose an article.
            </p>
          </header>
        </div>
      </section>
    </main>
  );
}

export default BlogNotFound;
