// Cloudflare Worker for Nieves Calvo Portfolio
// Serves static files from GitHub repository

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/jmgb/Nieves-Web/main';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Handle CORS preflight requests
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
      let fileUrl;
      
      // Handle root path
      if (pathname === '/' || pathname === '') {
        fileUrl = `${GITHUB_RAW_BASE}/index.html`;
      }
      // Handle other paths
      else {
        fileUrl = `${GITHUB_RAW_BASE}${pathname}`;
      }
      
      // Fetch file from GitHub
      const response = await fetch(fileUrl, {
        cf: {
          // Cache in Cloudflare for 1 hour for HTML, 1 day for assets
          cacheTtl: pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp)$/) 
            ? 86400 // 1 day for assets
            : 3600, // 1 hour for HTML
          cacheEverything: true
        }
      });
      
      if (!response.ok) {
        // If not found and no extension, try serving index.html (SPA routing)
        if (response.status === 404 && !pathname.includes('.') && pathname !== '/') {
          const indexResponse = await fetch(`${GITHUB_RAW_BASE}/index.html`, {
            cf: { cacheTtl: 3600, cacheEverything: true }
          });
          
          if (indexResponse.ok) {
            return new Response(indexResponse.body, {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=3600',
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'SAMEORIGIN',
                'X-XSS-Protection': '1; mode=block',
                'Referrer-Policy': 'strict-origin-when-cross-origin'
              }
            });
          }
        }
        
        return new Response(`Asset not found: ${pathname}`, { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      
      // Determine content type
      let contentType = response.headers.get('content-type') || 'application/octet-stream';
      
      if (pathname.endsWith('.html') || pathname === '/') {
        contentType = 'text/html; charset=utf-8';
      } else if (pathname.endsWith('.css')) {
        contentType = 'text/css';
      } else if (pathname.endsWith('.js')) {
        contentType = 'application/javascript';
      } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (pathname.endsWith('.png')) {
        contentType = 'image/png';
      } else if (pathname.endsWith('.svg')) {
        contentType = 'image/svg+xml';
      } else if (pathname.endsWith('.ico')) {
        contentType = 'image/x-icon';
      } else if (pathname.endsWith('.webp')) {
        contentType = 'image/webp';
      } else if (pathname.endsWith('.xml')) {
        contentType = 'application/xml';
      } else if (pathname.endsWith('.txt')) {
        contentType = 'text/plain';
      }
      
      // Create response with proper headers
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|webp)$/) 
            ? 'public, max-age=86400' // 1 day for assets
            : 'public, max-age=3600', // 1 hour for HTML
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      });
      
      // CORS for assets
      if (pathname.startsWith('/assets/')) {
        newResponse.headers.set('Access-Control-Allow-Origin', '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      }
      
      return newResponse;
      
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Error serving content: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};