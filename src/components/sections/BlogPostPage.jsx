function BlogPostPage({ post }) {
  return (
    <main id="content">
      <article className="section blogPostPage" aria-labelledby="blog-post-title">
        <div className="container">
          <p className="blogPostBackWrap">
            <a className="blogPostBack" href="/#blog">
              ← Back to Home
            </a>
          </p>
          <header className="blogPostHeader">
            <div className="kicker">Blog</div>
            <h1 id="blog-post-title" className="h2 blogPostHeading">
              {post.title}
            </h1>
            <p className="muted blogPostLead">{post.excerpt}</p>
          </header>
          <div className="blogPostBody">
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

export default BlogPostPage;
