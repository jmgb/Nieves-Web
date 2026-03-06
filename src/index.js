// Cloudflare Worker for Nieves Calvo Portfolio
// Serves bundled static assets from Cloudflare's edge.

const ASSET_PATH_PATTERN = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp)$/i;
const HTML_CACHE_TTL = 3600;
const ASSET_CACHE_TTL = 31536000;
const ASSET_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const HTML_CACHE_CONTROL = `public, max-age=${HTML_CACHE_TTL}`;

function buildAssetRequest(request, pathname) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  return new Request(assetUrl.toString(), request);
}

function withResponseHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  const isAssetRequest = ASSET_PATH_PATTERN.test(pathname);

  headers.set('Cache-Control', isAssetRequest ? ASSET_CACHE_CONTROL : HTML_CACHE_CONTROL);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (pathname.startsWith('/assets/')) {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    try {
      const assetPath = pathname === '/' || pathname === '' ? '/index.html' : pathname;
      let response = await env.ASSETS.fetch(buildAssetRequest(request, assetPath));

      if (response.status === 404 && !pathname.includes('.') && pathname !== '/') {
        response = await env.ASSETS.fetch(buildAssetRequest(request, '/index.html'));
        if (response.ok) {
          return withResponseHeaders(response, '/index.html');
        }
      }

      if (!response.ok) {
        return new Response(`Asset not found: ${pathname}`, {
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      return withResponseHeaders(response, assetPath);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
