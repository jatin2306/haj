/**
 * Express SSR server (React SSR Guide — Method 2).
 * Renders React to HTML on each request, then the client hydrates.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const buildPath = path.join(__dirname, 'build');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

function setupRequireContextPolyfill() {
  let assetManifest = {};

  try {
    const manifestFile = path.join(buildPath, 'asset-manifest.json');
    assetManifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8')).files || {};
  } catch {
    assetManifest = {};
  }

  const assetsDir = path.join(__dirname, 'src', 'assets', 'Umrah photos');

  const contextModule = function contextModuleFactory(request, recursive, regExp) {
    const resolveKey = (key) => {
      const baseName = key.replace('./', '');
      const manifestKey = Object.keys(assetManifest).find(
        (entry) => entry.includes(baseName) || entry.endsWith(baseName),
      );
      return manifestKey ? assetManifest[manifestKey] : `/static/media/${baseName}`;
    };

    const contextFn = (key) => resolveKey(key);
    contextFn.keys = () => {
      if (!fs.existsSync(assetsDir)) return [];
      return fs
        .readdirSync(assetsDir)
        .filter((name) => regExp.test(name))
        .map((name) => `./${name}`);
    };
    contextFn.resolve = (key) => path.join(assetsDir, key.replace('./', ''));
    contextFn.id = request;
    return contextFn;
  };

  require.context = contextModule;

  const Module = require('module');
  const originalRequire = Module.prototype.require;
  Module.prototype.require = function patchedRequire(id) {
    return originalRequire.apply(this, arguments);
  };
  Object.assign(Module.prototype.require, originalRequire);
  Module.prototype.require.context = contextModule;
}

setupRequireContextPolyfill();

// Allow Node to import CRA assets and styles during SSR.
const noop = () => {};
['.css', '.scss', '.sass', '.less'].forEach((ext) => {
  require.extensions[ext] = noop;
});
['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].forEach((ext) => {
  require.extensions[ext] = (module, filename) => {
    module.exports = filename;
  };
});

require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  ignore: [/node_modules/],
});

const App = require('./src/App').default;
const { fetchPublishedBlogs, fetchBlogByRouteRef } = require('./src/api/blogsApi');
const { sortPublishedBlogsNewestFirst } = require('./src/utils/blogContent');

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

function renderApp(url, initialData) {
  const pathname = url.split('?')[0];
  if (pathname.startsWith('/admin')) {
    return { appMarkup: '', helmetContext: {} };
  }

  const helmetContext = {};
  const appMarkup = ReactDOMServer.renderToString(
    React.createElement(App, { location: url, helmetContext, initialData }),
  );

  return { appMarkup, helmetContext };
}

const app = express();

app.use(
  express.static(buildPath, {
    index: false,
    maxAge: '1d',
  }),
);

app.get('*', (req, res) => {
  const htmlFile = path.join(buildPath, 'index.html');

  fs.readFile(htmlFile, 'utf8', async (err, template) => {
    if (err) {
      console.error('Failed to read index.html:', err);
      return res.status(500).send('Server Error');
    }

    let initialData = null;
    const pathname = req.path;
    console.log(`[SSR] Incoming request: ${req.method} ${req.url}`);

    try {
      if (pathname === '/' || pathname === '/blog' || pathname === '/blog/') {
        console.log('[SSR] Fetching published blogs...');
        const posts = await fetchPublishedBlogs();
        console.log(`[SSR] Fetched ${posts ? posts.length : 0} posts`);
        const sorted = sortPublishedBlogsNewestFirst(posts);
        initialData = { posts: sorted };
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.slice(6).replace(/\/$/, ''); // extract slug and strip trailing slash
        console.log(`[SSR] Fetching blog post details for slug: "${slug}"`);
        if (slug) {
          const blog = await fetchBlogByRouteRef(slug);
          console.log(`[SSR] Fetched blog:`, blog ? blog.heading : 'null');
          initialData = { blog };
        }
      }
    } catch (fetchError) {
      console.error('[SSR] Pre-fetch failed:', fetchError);
    }

    let appMarkup = '';
    let helmetContext = {};

    try {
      console.log(`[SSR] Rendering App for URL: "${req.url}" with initialData keys:`, initialData ? Object.keys(initialData) : 'null');
      const rendered = renderApp(req.url, initialData);
      appMarkup = rendered.appMarkup;
      helmetContext = rendered.helmetContext;
      console.log(`[SSR] Render succeeded. Markup length: ${appMarkup.length}`);
    } catch (renderError) {
      console.error('[SSR] render failed:', renderError);
    }

    const serializedData = JSON.stringify(initialData || {}).replace(
      /</g,
      '\\u003c'
    );

    // Strip default title and meta description from template to prevent duplicates during SSR.
    const cleanedTemplate = template
      .replace(/<title>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');

    let finalHtml = cleanedTemplate.replace(
      '<div id="root"></div>',
      `<script>window.__INITIAL_DATA__ = ${serializedData};</script><div id="root">${appMarkup}</div>`
    );

    finalHtml = injectHelmet(finalHtml, helmetContext);

    res
      .status(200)
      .set('Content-Type', 'text/html; charset=utf-8')
      .send(finalHtml);
  });
});

app.listen(port, host, () => {
  console.log(`SSR server is active on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
});
