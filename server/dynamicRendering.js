/**
 * Dynamic rendering for crawlers (Google Search Central — Rendertron pattern).
 * @see https://developers.google.com/search/blog/2019/01/dynamic-rendering-with-rendertron
 */
const rendertron = require('rendertron-middleware');

const EXTRA_BOT_USER_AGENTS = [
  'googlebot',
  'Google-InspectionTool',
  'AdsBot-Google',
  'Storebot-Google',
  'GoogleOther',
  'Mediapartners-Google',
  'duckduckbot',
  'applebot',
];

const BOT_USER_AGENTS = rendertron.botUserAgents.concat(EXTRA_BOT_USER_AGENTS);
const BOT_UA_PATTERN = new RegExp(BOT_USER_AGENTS.join('|'), 'i');

function normalizeRendertronProxyUrl(raw) {
  if (!raw || !String(raw).trim()) return null;

  const trimmed = String(raw).trim().replace(/\/+$/, '');
  return trimmed.endsWith('/render') ? trimmed : `${trimmed}/render`;
}

function getRendertronProxyUrl() {
  return normalizeRendertronProxyUrl(
    process.env.RENDERTRON_URL || process.env.RENDERTRON_PROXY_URL,
  );
}

function createRendertronMiddleware() {
  const proxyUrl = getRendertronProxyUrl();
  if (!proxyUrl) return null;

  const timeout = Number(process.env.RENDERTRON_TIMEOUT_MS) || 11000;

  return rendertron.makeMiddleware({
    proxyUrl,
    userAgentPattern: BOT_UA_PATTERN,
    timeout,
  });
}

module.exports = {
  BOT_UA_PATTERN,
  BOT_USER_AGENTS,
  createRendertronMiddleware,
  getRendertronProxyUrl,
};
