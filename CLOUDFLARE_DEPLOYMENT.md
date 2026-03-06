# Cloudflare Worker Deployment Guide

## Estado actual

Este proyecto se despliega en **Cloudflare Workers**.

URLs activas documentadas:
- `https://nievescalvo.com` (dominio personalizado)
- `https://nieves-portfolio.jesus82c.workers.dev` (workers.dev)

El repositorio ya incluye auto-deploy por **GitHub Actions** en cada push a `main`, siempre que el secreto `CLOUDFLARE_API_TOKEN` esté configurado en GitHub.

## Flujo rapido recomendado (futuro)

1. Confirmar cambios locales:
   - `git status`
2. Instalar dependencias si hace falta:
   - `npm install`
3. Desplegar Worker desde este checkout local:
   - `npm run deploy`
4. Verificar que producción refleja exactamente el contenido local:
   - `sha256sum index.html`
   - `curl -sL https://nievescalvo.com/ | sha256sum`
   - `curl -sL https://nieves-portfolio.jesus82c.workers.dev/ | sha256sum`
5. (Opcional) Revisar logs:
   - `wrangler tail`

## Archivos de configuración relevantes

- `wrangler.toml` - Configuración del Worker
- `src/index.js` - Handler `fetch` del Worker
- `package.json` - Scripts de desarrollo y deploy
- `.assetsignore` - Allowlist de archivos públicos que sí deben subirse como assets

## Configuración mínima

### 1. API Token de Cloudflare

1. Ir a `https://dash.cloudflare.com/profile/api-tokens`
2. Crear token con permisos de Workers (por ejemplo `Cloudflare Workers:Edit`)
3. Guardarlo en `.env`:

```bash
CLOUDFLARE_API_TOKEN=tu_token_real_aqui
```

Alternativa temporal:

```bash
export CLOUDFLARE_API_TOKEN="tu_token_real_aqui"
```

### 1.1. Secreto de GitHub Actions

Para que el auto-deploy funcione en GitHub:

1. Ir a `GitHub > Settings > Secrets and variables > Actions`
2. Crear el secreto:
   - `CLOUDFLARE_API_TOKEN`
3. Usar un token con permisos de Workers deploy para la cuenta correcta

### 2. Account ID en `wrangler.toml`

La configuración actual está en el nivel raíz (no en `[env.production]`):

```toml
name = "nieves-portfolio"
main = "src/index.js"
compatibility_date = "2024-08-16"
account_id = "tu_account_id_aqui"
```

## Deploy

### Auto-deploy por GitHub Actions

- Archivo: `.github/workflows/deploy.yml`
- Trigger: cada push a `main`
- Trigger adicional: ejecución manual con `workflow_dispatch`
- Flujo:
  - `npm ci`
  - `node --test tests/*.mjs`
  - `npx wrangler deploy`

```bash
# Instalar dependencias
npm install

# Deploy (usa CLOUDFLARE_API_TOKEN desde .env)
npm run deploy

# Alternativa: export de .env + deploy
npm run deploy:env
```

## Desarrollo local

```bash
# Emulación local con Wrangler
npm run dev

# Modo local explícito
npm run preview
```

## Qué hace el Worker actual

- Sirve archivos estáticos locales del repositorio a través de `env.ASSETS`
- Soporta fallback SPA a `index.html` cuando una ruta no existe
- Aplica headers de seguridad
- Cachea:
  - Assets estáticos: 1 día (`max-age=86400`)
  - HTML: 1 hora (`max-age=3600`)

## Assets públicos

El proyecto usa:

```toml
assets = { directory = "." }
```

Como el directorio de assets es la raíz del repo, es obligatorio mantener una allowlist en `.assetsignore` para evitar que Cloudflare publique archivos internos como dependencias, tooling, caches o documentación.

Los archivos públicos esperados son:
- `index.html`
- `favicon.ico`
- `robots.txt`
- `sitemap.xml`
- `sitemap_index.xml`
- `page-sitemap.xml`
- `main-sitemap.xsl`
- `assets/**`

## Troubleshooting

### Error: `In a non-interactive environment`
- Falta `CLOUDFLARE_API_TOKEN` en entorno o `.env`.

### Error: `Account ID missing`
- Falta `account_id` en `wrangler.toml`.

### Error: `Asset not found`
- Revisar la ruta solicitada en URL.
- Verificar que el archivo exista en el repo local y no esté excluido por `.assetsignore`.

### Error: `Asset too large`
- Suele ocurrir si `assets.directory = "."` intenta subir `node_modules`, `.wrangler`, PDFs o archivos internos.
- Revisar `.assetsignore` y mantenerlo como allowlist de archivos públicos.

### El Worker no refleja cambios
```bash
wrangler deploy --compatibility-date 2024-08-16
```

Si el HTML o los assets no cambian enseguida:
- comparar hashes entre local y las dos URLs públicas
- revisar `Cache-Control`
- purgar caché en Cloudflare si hace falta una actualización visual inmediata

## Comandos rápidos

```bash
# Auto-deploy por push a main
git push origin main

# Desarrollo local
npm run dev

# Deploy a producción
npm run deploy

# Logs en tiempo real
wrangler tail
```
