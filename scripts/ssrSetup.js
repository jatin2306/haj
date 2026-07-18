const path = require('path');
const fs = require('fs');

function loadAssetManifest(buildPath) {
  try {
    const manifestFile = path.join(buildPath, 'asset-manifest.json');
    const parsed = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    return parsed.files || {};
  } catch {
    return {};
  }
}

function resolveAssetUrl(filename, assetManifest) {
  const baseName = path.basename(filename);
  const stem = baseName.replace(/\.[^.]+$/, '');
  const normalizedSource = filename.replace(/\\/g, '/');

  const directKey = Object.keys(assetManifest).find((key) => {
    const normalizedKey = key.replace(/\\/g, '/');
    return (
      normalizedSource.endsWith(normalizedKey) ||
      normalizedKey.endsWith(baseName) ||
      normalizedKey.includes(`/${baseName}`)
    );
  });
  if (directKey) return assetManifest[directKey];

  const hashedKey = Object.entries(assetManifest).find(([key, url]) => {
    const keyBase = path.basename(key);
    const urlBase = path.basename(String(url));
    return (
      keyBase.startsWith(`${stem}.`) ||
      urlBase.startsWith(`${stem}.`) ||
      key.includes(`/${stem}.`)
    );
  });
  if (hashedKey) return hashedKey[1];

  return `/static/media/${baseName}`;
}

function sanitizeAbsoluteAssetPaths(html, assetManifest) {
  if (!html) return html;

  return html.replace(
    /((?:url\(|(?:src|href)=["']))(?:file:\/\/\/|)([A-Za-z]:[^)"']+\.(?:png|jpe?g|gif|webp|svg|ico))/gi,
    (full, prefix, absPath) => `${prefix}${resolveAssetUrl(absPath, assetManifest)}`,
  );
}

function setupSsrEnvironment({ buildPath, projectRoot }) {
  const assetManifest = loadAssetManifest(buildPath);
  const assetsDir = path.join(projectRoot, 'src', 'assets', 'Umrah photos');

  const contextModule = function contextModuleFactory(request, recursive, regExp) {
    const resolveKey = (key) => resolveAssetUrl(key, assetManifest);

    const contextFn = (key) => {
      const baseName = key.replace('./', '');
      const manifestKey = Object.keys(assetManifest).find(
        (entry) => entry.includes(baseName) || entry.endsWith(baseName),
      );
      return manifestKey ? assetManifest[manifestKey] : `/static/media/${baseName}`;
    };

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
  Module.prototype.require.context = contextModule;

  const noop = () => {};
  ['.css', '.scss', '.sass', '.less'].forEach((ext) => {
    require.extensions[ext] = noop;
  });
  ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].forEach((ext) => {
    require.extensions[ext] = (module, filename) => {
      module.exports = resolveAssetUrl(filename, assetManifest);
    };
  });

  return assetManifest;
}

module.exports = {
  loadAssetManifest,
  resolveAssetUrl,
  sanitizeAbsoluteAssetPaths,
  setupSsrEnvironment,
};
