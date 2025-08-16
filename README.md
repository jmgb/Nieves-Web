# Portfolio Nieves Calvo

Portfolio moderno y responsivo para **Nieves Calvo** - Arquitecta, Diseñadora de Interiores, Artista, Creativa y Exploradora.

Sitio web estático modernizado desde WordPress a HTML personalizado con diseño responsivo avanzado y funcionalidad móvil tipo Instagram.

## 🚀 Tecnologías Utilizadas

- **HTML5 Puro** - Sin frameworks, máximo rendimiento
- **CSS3 Avanzado** - Responsive design y animaciones modernas
- **Vanilla JavaScript** - Funcionalidad progresiva sin dependencias
- **Diseño Mobile-First** - Optimizado para dispositivos móviles

## 📁 Estructura del Proyecto

```
Nieves-Web/
├── index.html              # Sitio completo (SPA - Single Page Application)
├── CLAUDE.md              # Guía de desarrollo y arquitectura
├── mapa-proyectos.md      # FUENTE DE VERDAD para orden de proyectos
├── robots.txt             # Configuración para crawlers y IA
├── sitemap.xml            # SEO - mapa del sitio
├── assets/
│   ├── css/
│   │   └── custom.css     # Estilos adicionales (si necesario)
│   └── images/
│       ├── profile/       # Imágenes de perfil y logos
│       └── projects/      # Proyectos organizados por categoría
│           ├── austin-popup/
│           ├── beer-tap-chase/
│           ├── burj-azizi-dubai/
│           ├── chase-sapphire-lounges/
│           ├── dream-hotel/
│           ├── hilton-punta-cana/
│           ├── ied-innovation-lab/
│           ├── maria-mallo-pavilion/
│           ├── mrny-community-center/
│           ├── nasa/
│           ├── rambla-climate-house/
│           ├── ritz-carlton-aruba/
│           ├── romola/
│           ├── runrunrun/
│           ├── tlc-nyc/
│           └── xu-collective-bdny/
└── data/
    └── projects.json      # Datos estructurados (puede estar desactualizado)
```

## ✨ Características

### 🎨 Diseño
- **Layout Instagram-Style**: Grid 3x3 en móviles (≤768px) para proyectos
- **Responsive Avanzado**: Desktop completo, móvil optimizado
- **Modal Fullscreen**: Texto de proyectos extraído dinámicamente
- **Transiciones Suaves**: Animaciones CSS3 profesionales
- **SEO Preservado**: Estructura WordPress mantenida para buscadores

### 🛠️ Funcionalidades Únicas
- **16 Proyectos Arquitectónicos**: Todos visibles, control manual via CSS
- **Modal System**: Extracción automática de texto de proyectos
- **Breakpoint Crítico**: 768px para transformación móvil
- **Fallback Graceful**: Funciona sin JavaScript, mejorado con JS
- **Gestión de Visibilidad**: Clase `hidden-project` (NO nth-child)

### 📱 Funcionalidad Móvil Avanzada
- **Grid Transformation**: Desktop list → Mobile 3x3 grid automático
- **Touch Optimized**: Interacciones táctiles fluidas
- **Modal Mobile**: Pantalla completa con scroll interno
- **Performance Mobile**: <3s carga en 3G

### 🎯 Arquitectura del Proyecto
- **Single Page Application**: Todo el contenido en `index.html` (1400+ líneas)
- **Hybrid Approach**: SPA moderno + estructura WordPress para SEO
- **Progressive Enhancement**: Base HTML + mejoras JavaScript
- **Mobile-First CSS**: Estilos móviles base, desktop como enhancement

## 🚀 Inicio Rápido

### Servidor de Desarrollo (Recomendado)

```bash
# Método principal - Python HTTP server
python3 -m http.server 8000

# Puerto alternativo si 8000 está ocupado
python3 -m http.server 8001

# Métodos alternativos
npx serve .              # Si tienes Node.js
php -S localhost:8000    # Si tienes PHP
```

Luego visita `http://localhost:8000`

### Pruebas de Responsividad Móvil
- Usar herramientas de desarrollador del navegador
- Simular dispositivos móviles 
- Probar grid 3x3 en viewport ≤768px
- Verificar modal fullscreen con texto de proyectos

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Abre el proyecto en VS Code
3. Click derecho en `index.html` → "Open with Live Server"

## 📊 Performance y Optimización

- **Tamaño total**: ~100KB (mejora significativa desde 65K+ tokens originales)
- **CSS**: Inline en HTML para rendimiento crítico
- **JavaScript**: Mínimo, solo mejoras progresivas
- **Imágenes**: Pre-optimizadas con múltiples tamaños responsivos
- **Bundle**: Sin proceso de build - HTML/CSS/JS directo

## 🔧 Gestión de Proyectos

### ⚠️ IMPORTANTE: Orden y Visibilidad de Proyectos

**SIEMPRE revisa `mapa-proyectos.md` antes de cambios de visibilidad**

1. **Fuente de Verdad**: `mapa-proyectos.md` contiene:
   - Orden definitivo de proyectos (1-16)
   - Detalles de colaboración (ICRAVE, HBA MIAMI, etc.)
   - Premios y reconocimientos por proyecto
   - Categorización por tipo

2. **Control de Visibilidad**:
   ```css
   /* ✅ CORRECTO - Uso manual de clase */
   .project-section.hidden-project {
       display: none !important;
   }
   
   /* ❌ INCORRECTO - NUNCA usar nth-child */
   .project-section:nth-child(n) { display: none; }
   ```

### Añadir Nuevos Proyectos

1. **Actualizar `mapa-proyectos.md`** con detalles del nuevo proyecto
2. **Añadir sección** en `index.html` siguiendo patrón existente
3. **Agregar imágenes** en `assets/images/projects/[categoria]/`
4. **Probar layout móvil** y funcionalidad de modal

### Estructura de Proyecto en HTML

```html
<section class="project-section" id="proyecto-nuevo">
    <div class="project-header">
        <h2>Título del Proyecto</h2>
        <span class="project-number">17</span>
    </div>
    <div class="project-content">
        <div class="project-images">
            <img src="assets/images/projects/categoria/imagen.jpg" 
                 alt="Descripción" loading="lazy">
        </div>
        <div class="project-text">
            <p>Descripción del proyecto...</p>
        </div>
    </div>
</section>
```

## 📱 Responsive Design Critical

### Breakpoints Críticos
- **Mobile**: ≤ 768px (Grid 3x3 Instagram-style)
- **Desktop**: > 768px (Lista vertical completa)
- **Transformación**: Automática en 768px exactos

### Testing Mobile Layout
```bash
# Servidor de desarrollo
python3 -m http.server 8000

# En DevTools del navegador:
# 1. Simular dispositivo móvil
# 2. Verificar transformación a 768px
# 3. Probar modal fullscreen
# 4. Validar extracción de texto
```

## 🌐 Deployment

### GitHub Repository (Completado)
- **Repositorio**: https://github.com/jmgb/Nieves-Web
- **Tipo**: Privado
- **Archivos**: 66 archivos, 2,929 líneas
- **Commits**: Inicial + .gitignore + robots.txt

### Cloudflare Worker (DESPLEGADO) ✅
```bash
# Despliegue actual con Worker
npm run deploy

# URLs activas:
# - https://nievescalvo.com (dominio personalizado)
# - https://nieves-portfolio.jesus82c.workers.dev (worker directo)
```

**Estado del deployment:**
- ✅ Worker desplegado y funcionando
- ✅ Dominio personalizado: `https://nievescalvo.com`
- ✅ Assets servidos desde GitHub (público)
- ✅ Caché optimizado (1 día assets, 1 hora HTML)
- ⏳ www.nievescalvo.com (pendiente configuración)

### Cloudflare Pages (Alternativa)
```bash
# Usando Wrangler CLI
wrangler pages create nieves-portfolio
wrangler pages deploy . --project-name=nieves-portfolio
```

### Alternativas de Deployment
- **Netlify**: Conectar repositorio GitHub para auto-deploy
- **Vercel**: `npx vercel` desde la carpeta del proyecto  
- **GitHub Pages**: Settings → Pages → Deploy from branch main

## 🔍 SEO y Accesibilidad

### SEO Optimizado
- **robots.txt**: Configurado para crawlers y IA (GPTBot, Claude, etc.)
- **Sitemap XML**: Preservado desde WordPress para indexación
- **Meta tags**: Open Graph, Twitter Cards, descripción optimizada  
- **Idioma**: `lang="es"` declarado correctamente
- **Semántica HTML5**: Estructura preservada desde WordPress para SEO

### Accesibilidad WCAG 2.1 AA
- **Navegación por teclado**: Modal y navegación accesibles
- **Screen readers**: Etiquetas aria apropiadas
- **Contraste**: Verificado cumplimiento AA
- **Lazy loading**: Implementado nativamente del navegador
- **Focus management**: Estados visibles en toda la interfaz

## 🐛 Troubleshooting Específico

### Grid móvil no se activa
- Verificar DevTools en exactamente 768px de ancho
- Comprobar que los estilos CSS `!important` se apliquen
- Asegurar que JavaScript no interfiera con el layout

### Modal no muestra texto de proyectos
- Verificar que las secciones tengan clase `project-section`
- Comprobar que exista `.project-text` dentro de cada proyecto
- Revisar consola para errores de extracción de texto

### Problemas de rendimiento móvil
- Verificar lazy loading de imágenes activo
- Comprobar que no hay scripts pesados bloqueando
- Medir Core Web Vitals en dispositivo real

## 🎯 Estado Actual del Proyecto

### ✅ Completado
- [x] **Migración desde WordPress**: SPA moderno manteniendo SEO
- [x] **16 Proyectos Arquitectónicos**: Todos visibles y funcionales
- [x] **Layout Móvil Instagram**: Grid 3x3 responsivo a 768px
- [x] **Modal System**: Extracción automática de texto de proyectos
- [x] **GitHub Repository**: Código versionado y documentado (público)
- [x] **SEO Optimización**: robots.txt, sitemaps, meta tags
- [x] **Performance**: <100KB total, carga rápida
- [x] **Deployment Cloudflare Worker**: https://nievescalvo.com en producción
- [x] **Dominio Personalizado**: Worker configurado con dominio propio
- [x] **Google Analytics 4**: Tracking implementado (G-JGLJ6PWKJV)

### 📈 Próximas Mejoras Recomendadas
- [ ] **Configuración www.nievescalvo.com**: Redirección o dominio adicional
- [ ] **Optimización WebP**: Conversión de imágenes para mejor performance
- [ ] **Contact Form**: Formulario funcional con backend serverless
- [ ] **Multiidioma**: Versión inglés del portfolio
- [ ] **PWA Features**: Funcionalidad offline y app-like
- [ ] **CMS Headless**: Sistema de gestión de contenido opcional

## 📋 Información Técnica

### Estructura de Archivos Críticos
- **index.html**: 1400+ líneas, SPA completo
- **mapa-proyectos.md**: Fuente de verdad para gestión de proyectos
- **CLAUDE.md**: Documentación de desarrollo y patrones
- **robots.txt**: Configuración para SEO y crawlers IA

### Performance Metrics
- **Lighthouse Score**: Optimizado para 95+ en todas las métricas
- **Core Web Vitals**: <3s LCP, <100ms FID, <0.1 CLS
- **Bundle Size**: Sin build process, archivos directos
- **Mobile Performance**: Especialmente optimizado

---

**Portfolio Profesional para Nieves Calvo**  
*Arquitecta, Diseñadora de Interiores, Artista y Exploradora*

**🚀 Migrado de WordPress a HTML moderno | SEO preservado | Performance optimizada**