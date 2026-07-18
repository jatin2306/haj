const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {
  sanitizeAbsoluteAssetPaths,
  setupSsrEnvironment,
} = require('./ssrSetup');

const projectRoot = path.join(__dirname, '..');
const buildPath = path.join(projectRoot, 'build');
const assetManifest = setupSsrEnvironment({ buildPath, projectRoot });

require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  ignore: [/node_modules/],
});

const App = require('../src/App').default;
const { fetchPublishedBlogs, fetchBlogByRouteRef } = require('../src/api/blogsApi');
const { sortPublishedBlogsNewestFirst } = require('../src/utils/blogContent');

const htmlFile = path.join(buildPath, 'index.html');
if (!fs.existsSync(htmlFile)) {
  console.error('Error: build/index.html not found. Run npm run build first.');
  process.exit(1);
}
const template = fs.readFileSync(htmlFile, 'utf8');

function injectHelmet(html, helmetContext) {
  const helmet = helmetContext?.helmet;
  if (!helmet) return html;
  const headTags = [
    helmet.title?.toString() || '',
    helmet.meta?.toString() || '',
    helmet.link?.toString() || '',
    helmet.script?.toString() || '',
  ].join('');
  if (!headTags) return html;
  return html.replace('</head>', `${headTags}</head>`);
}

function renderRoute(url, initialData) {
  const helmetContext = {};
  const appMarkup = ReactDOMServer.renderToString(
    React.createElement(App, { location: url, helmetContext, initialData }),
  );

  const serializedData = JSON.stringify(initialData || {}).replace(/</g, '\\u003c');
  const cleanedTemplate = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');

  let html = cleanedTemplate.replace(
    '<div id="root"></div>',
    `<script>window.__INITIAL_DATA__ = ${serializedData};</script><div id="root">${appMarkup}</div>`,
  );
  html = injectHelmet(html, helmetContext);
  html = sanitizeAbsoluteAssetPaths(html, assetManifest);
  return html;
}

function savePage(urlPath, html) {
  const cleanPath = urlPath.replace(/\/$/, '');
  const dirPath = cleanPath === '' ? buildPath : path.join(buildPath, cleanPath);
  const filePath = path.join(dirPath, 'index.html');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Prerendered: ${urlPath} -> ${filePath}`);
}

async function main() {
  console.log('Starting static prerendering (SSG)...');

  try {
    console.log('Fetching blog posts for prerendering...');
    const posts = await fetchPublishedBlogs();
    const sorted = sortPublishedBlogsNewestFirst(posts);

    const staticRoutes = [
      { path: '/', data: { posts: sorted } },
      { path: '/gallery', data: null },
      { path: '/hotels', data: null },
      { path: '/hajj-package-2027', data: null },
      { path: '/blog', data: { posts: sorted } },
    ];

    for (const route of staticRoutes) {
      const html = renderRoute(route.path, route.data);
      savePage(route.path, html);
    }

    console.log(`Prerendering ${posts.length} blog posts...`);
    const { getBlogUrlSlug } = require('../src/utils/blogContent');

    for (const post of posts) {
      const slug = getBlogUrlSlug(post);
      if (slug) {
        const blogPath = `/blog/${slug}`;
        const blog = await fetchBlogByRouteRef(slug);
        const html = renderRoute(blogPath, { blog });
        savePage(blogPath, html);
      }
    }

    console.log('Static prerendering completed successfully!');
  } catch (error) {
    console.error('Prerendering failed:', error);
    process.exit(1);
  }
}

main();
