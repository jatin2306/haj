/**
 * Express production server with SSR and optional Rendertron for crawlers.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {
  sanitizeAbsoluteAssetPaths,
  setupSsrEnvironment,
} = require('./scripts/ssrSetup');

const buildPath = path.join(__dirname, 'build');
const projectRoot = __dirname;
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const assetManifest = setupSsrEnvironment({ buildPath, projectRoot });

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
const { createRendertronMiddleware, getRendertronProxyUrl } = require('./server/dynamicRendering');

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

app.set('trust proxy', 1);

const rendertronMiddleware = createRendertronMiddleware();
if (rendertronMiddleware) {
  app.use(rendertronMiddleware);
  console.log(`Rendertron dynamic rendering enabled → ${getRendertronProxyUrl()}`);
}

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

    try {
      if (pathname === '/' || pathname === '/blog' || pathname === '/blog/') {
        const posts = await fetchPublishedBlogs();
        const sorted = sortPublishedBlogsNewestFirst(posts);
        initialData = { posts: sorted };
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.slice(6).replace(/\/$/, '');
        if (slug) {
          const blog = await fetchBlogByRouteRef(slug);
          initialData = { blog };
        }
      }
    } catch (fetchError) {
      console.error('[SSR] Pre-fetch failed:', fetchError);
    }

    let appMarkup = '';
    let helmetContext = {};

    try {
      const rendered = renderApp(req.url, initialData);
      appMarkup = rendered.appMarkup;
      helmetContext = rendered.helmetContext;
    } catch (renderError) {
      console.error('[SSR] render failed:', renderError);
    }

    const serializedData = JSON.stringify(initialData || {}).replace(/</g, '\\u003c');

    const cleanedTemplate = template
      .replace(/<title>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');

    let finalHtml = cleanedTemplate.replace(
      '<div id="root"></div>',
      `<script>window.__INITIAL_DATA__ = ${serializedData};</script><div id="root">${appMarkup}</div>`,
    );

    finalHtml = injectHelmet(finalHtml, helmetContext);
    finalHtml = sanitizeAbsoluteAssetPaths(finalHtml, assetManifest);

    res
      .status(200)
      .set('Content-Type', 'text/html; charset=utf-8')
      .send(finalHtml);
  });
});

app.listen(port, host, () => {
  console.log(`SSR server is active on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
});
