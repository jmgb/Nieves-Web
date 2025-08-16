# 🚀 Cloudflare Worker Deployment Guide

## Archivos de Configuración Creados

✅ **wrangler.toml** - Configuración del Worker
✅ **src/index.js** - Código del Worker con headers de seguridad y SPA routing  
✅ **package.json** - Configuración del proyecto

## 🔑 Pasos para Deployment

### 1. Obtener Token de API de Cloudflare

1. Ve a https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Usa el template "Cloudflare Workers:Edit" 
4. Configuración recomendada:
   - **Permissions**: 
     - Account: Cloudflare Workers:Edit
     - Zone: Zone:Read (si tienes dominio propio)
   - **Account resources**: Include - All accounts
   - **Zone resources**: Include - All zones (si aplica)

### 2. Configurar Token en .env (Recomendado)

```bash
# Editar el archivo .env
nano .env

# Reemplazar 'your_api_token_here' con tu token real
CLOUDFLARE_API_TOKEN=tu_token_real_aqui
```

**Alternativa (temporal):**
```bash
export CLOUDFLARE_API_TOKEN="tu_token_aqui"
```

### 3. Configurar Account ID

1. Ve a https://dash.cloudflare.com/
2. En el sidebar derecho, copia tu "Account ID"
3. Edita `wrangler.toml` y añade tu account_id:

```toml
[env.production]
account_id = "tu_account_id_aqui"
workers_dev = true
```

### 4. Deploy del Worker

```bash
# Instalar dependencias
npm install

# Método 1: Deploy con .env (Recomendado)
npm run deploy

# Método 2: Deploy con variables explícitas
npm run deploy:env

# Método 3: Deploy tradicional (requiere export manual)
export CLOUDFLARE_API_TOKEN="tu_token"
wrangler deploy
```

### 5. Verificar Deployment

Después del deployment exitoso, el Worker estará disponible en:
- **URL de desarrollo**: `https://nieves-portfolio.tu-subdomain.workers.dev`
- **URL personalizada**: Configurable desde el dashboard

## 🎯 Características del Worker

### Funcionalidades Implementadas

- **🗂️ Hosting Estático**: Sirve todos los archivos del portfolio
- **🔒 Headers de Seguridad**: 
  - X-Content-Type-Options
  - X-Frame-Options  
  - X-XSS-Protection
  - Referrer-Policy
- **⚡ Cache Optimizado**:
  - Assets estáticos: 1 año
  - HTML: 1 hora
  - Robots/Sitemap: 1 día
- **🌐 CORS**: Configurado para assets
- **📱 SPA Routing**: Fallback a index.html para rutas SPA

### Archivos Servidos

- `index.html` - Portfolio completo SPA
- `assets/` - Imágenes de proyectos y CSS
- `robots.txt` - Configuración para crawlers
- `sitemap.xml` - Mapa del sitio para SEO
- `favicon.ico` - Icono del sitio

## 🔧 Configuración Avanzada

### Custom Domain (Opcional)

1. En Cloudflare Dashboard:
   - Ve a "Workers & Pages"
   - Selecciona tu worker "nieves-portfolio"
   - Ve a "Settings" > "Triggers"
   - Añade "Custom Domain"

2. Configurar DNS:
   - Añade un registro AAAA: `@` → `100::`
   - O configura un CNAME si es subdominio

### Variables de Environment

Si necesitas variables:

```bash
wrangler secret put VARIABLE_NAME
```

### Logs y Monitoring

```bash
# Ver logs en tiempo real
wrangler tail

# Ver métricas
wrangler dispatch-namespace list
```

## 🐛 Troubleshooting

### Error: "In a non-interactive environment"
- Asegúrate de configurar `CLOUDFLARE_API_TOKEN`

### Error: "Account ID missing"
- Añade tu account_id en `wrangler.toml`

### Error: "Asset not found"
- Verifica que los archivos estén en las rutas correctas
- Revisa la configuración `[site]` en wrangler.toml

### Worker no actualiza
```bash
# Limpia cache y redeploy
wrangler deploy --compatibility-date 2024-08-16
```

## 📊 Ventajas del Worker vs Pages

### ✅ Worker Benefits
- **Más control**: Headers personalizados, routing avanzado
- **Lógica server-side**: Procesamient en edge computing
- **Flexibilidad**: Modificaciones dinámicas de respuestas
- **SPA routing**: Manejo inteligente de rutas

### ⚡ Performance Esperado
- **Global CDN**: 200+ ubicaciones mundial
- **Edge computing**: <50ms latencia mundial
- **HTTP/3**: Protocol moderno automático
- **Brotli compression**: Compresión automática

## 🚀 Comandos Rápidos

```bash
# Configurar API Token (solo primera vez)
nano .env  # Editar y poner tu token

# Desarrollo local
npm run dev

# Deploy a producción (usando .env)
npm run deploy

# Ver logs en tiempo real
wrangler tail

# Deploy con variables explícitas (alternativo)
npm run deploy:env
```

## 🔐 Configuración de .env

El archivo `.env` debe contener:
```bash
CLOUDFLARE_API_TOKEN=tu_token_real_aqui
```

- ✅ **Archivo .env**: Ya incluido en .gitignore (seguro)
- ✅ **Scripts npm**: Configurados para cargar automáticamente
- ✅ **Token configurado**: Listo para deployment

**URL Final**: `https://nieves-portfolio.tu-subdomain.workers.dev`