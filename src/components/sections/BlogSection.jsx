function BlogSection({ posts }) {
  return (
    <section className="section" id="blog" aria-label="Blog">
      <div className="container">
        <div className="sectionHead">
          <div>
            <div className="kicker">Blog</div>
            <h2 className="h2">Guidance for your journey</h2>
            <p className="muted">
              Short summaries from our articles. Dates and rules can change -
              always confirm with official sources and our team before you
              travel.
            </p>
          </div>
        </div>
        <div className="blogGrid">
          {posts.map((post) => (
            <a key={post.slug} className="blogCard" href={`/blog/${post.slug}`}>
              <article>
                <h3 className="blogTitle">{post.title}</h3>
                <p className="blogExcerpt">{post.excerpt}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
