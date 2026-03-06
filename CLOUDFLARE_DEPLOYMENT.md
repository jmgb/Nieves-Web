# Cloudflare Worker Deployment Guide

## Estado actual

Este proyecto se despliega en **Cloudflare Workers**.

URLs activas documentadas:
- `https://nievescalvo.com` (dominio personalizado)
- `https://nieves-portfolio.jesus82c.workers.dev` (workers.dev)

## Flujo rapido recomendado (futuro)

1. Confirmar cambios locales:
   - `git status`
2. Si cambiaste contenido estatico (`index.html`, `assets/`, `robots.txt`, `sitemap.xml`), hacer commit + push a `main`:
   - El Worker actual lee archivos desde `https://raw.githubusercontent.com/jmgb/Nieves-Web/main`.
3. Desplegar Worker:
   - `npm run deploy`
4. Verificar que el deploy salio bien:
   - `curl -s https://nieves-portfolio.jesus82c.workers.dev | head`
5. (Opcional) Revisar logs:
   - `wrangler tail`

## Archivos de configuración relevantes

- `wrangler.toml` - Configuración del Worker
- `src/index.js` - Handler `fetch` del Worker
- `package.json` - Scripts de desarrollo y deploy

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

### 2. Account ID en `wrangler.toml`

La configuración actual está en el nivel raíz (no en `[env.production]`):

```toml
name = "nieves-portfolio"
main = "src/index.js"
compatibility_date = "2024-08-16"
account_id = "tu_account_id_aqui"
```

## Deploy

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

- Sirve contenido desde `https://raw.githubusercontent.com/jmgb/Nieves-Web/main`
- Soporta fallback SPA a `index.html` cuando una ruta no existe
- Aplica headers de seguridad
- Cachea:
  - Assets estáticos: 1 día (`max-age=86400`)
  - HTML: 1 hora (`max-age=3600`)

## Troubleshooting

### Error: `In a non-interactive environment`
- Falta `CLOUDFLARE_API_TOKEN` en entorno o `.env`.

### Error: `Account ID missing`
- Falta `account_id` en `wrangler.toml`.

### Error: `Asset not found`
- Revisar la ruta solicitada en URL.
- Verificar que el archivo exista en el repositorio (`main`) que consume el Worker.

### El Worker no refleja cambios
```bash
wrangler deploy --compatibility-date 2024-08-16
```

## Comandos rápidos

```bash
# Desarrollo local
npm run dev

# Deploy a producción
npm run deploy

# Logs en tiempo real
wrangler tail
```
