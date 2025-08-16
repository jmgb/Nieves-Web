# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **modernized static portfolio website** for Nieves Calvo - Architect, Interior Designer, Artist, Creative, and Explorer. The site has evolved from a WordPress export to a custom, responsive portfolio with advanced mobile functionality.

## Development Commands

### Local Development Server
```bash
# Primary method - Python HTTP server
python3 -m http.server 8000
# Alternative port if 8000 is in use
python3 -m http.server 8001

# Alternative methods
npx serve .              # If Node.js available
php -S localhost:8000    # If PHP available
```

### Testing Mobile Responsiveness
- Use browser developer tools to simulate mobile devices
- Test Instagram-style 3x3 grid layout at viewport width ≤768px
- Verify fullscreen modal functionality with project text display

## Architecture and Code Structure

### High-Level Architecture
The site uses a **hybrid approach** combining modern responsive design with preserved WordPress structure for SEO and content organization:

1. **Single Page Application (SPA)**: All content in `index.html` with JavaScript-driven interactivity
2. **Progressive Enhancement**: Works without JavaScript, enhanced with dynamic features
3. **Mobile-First Responsive**: Custom CSS with Instagram-style mobile layout
4. **SEO Optimized**: Maintains WordPress sitemaps and meta structure

### Key Technical Implementation


#### Project Visibility Management
- **All 16 projects currently visible** (no hidden projects as of latest update)
- Projects controlled via manual `hidden-project` CSS class, NOT nth-child selectors
- Order defined in `mapa-proyectos.md` - this is the source of truth for project organization


### File Organization
```
portfolio-nieves/
├── index.html              # Main site (1400+ lines, contains all content)
├── mapa-proyectos.md       # PROJECT ORDER SOURCE OF TRUTH
├── assets/
│   ├── images/
│   │   ├── profile/        # Bio images, logos
│   │   └── projects/       # Organized by category
│   ├── css/custom.css      # Additional styles (if needed)
│
├── data/
│   └── projects.json      # Structured project data (may be outdated)
└── sitemap files          # SEO optimization
```

## Project Management System

### Project Ordering and Visibility
**CRITICAL**: Always check `mapa-proyectos.md` before making project visibility changes. This file contains:
- Definitive project order (1-16)
- Collaboration details (ICRAVE, HBA MIAMI, etc.)
- Awards and recognition per project
- Project categorization by type


## Development Patterns and Conventions

### CSS Methodology
- **Progressive Enhancement**: Base styles work on all devices
- **Mobile-First**: Mobile styles defined first, desktop as enhancements
- **Important Override Pattern**: Uses `!important` for mobile grid transformation
- **WordPress Class Preservation**: Maintains original WP classes for SEO


### Image Management
- **Responsive images**: Multiple sizes for different devices
- **Error handling**: Graceful fallbacks for missing images
- **Lazy loading**: Built-in browser lazy loading
- **Optimization**: Pre-optimized via WP Smush

## Common Maintenance Tasks

### Adding New Projects
1. Update `mapa-proyectos.md` with new project details
2. Add project section to `index.html` following existing pattern
3. Add images to appropriate `assets/images/projects/` subdirectory
4. Test mobile grid layout and modal functionality

### Hiding/Showing Projects
1. **NEVER use CSS nth-child selectors** - they break after reordering
2. **Always use manual `hidden-project` class**:
   ```css
   .project-section.hidden-project {
       display: none !important;
   }
   ```
3. Update `mapa-proyectos.md` to reflect visibility changes

### Mobile Layout Testing
- Test at exactly 768px breakpoint
- Verify 3x3 grid formation
- Check modal text extraction and display
- Ensure smooth transitions between layouts

## Performance Considerations

### Optimization Status
- **Images**: Pre-optimized and properly sized
- **CSS**: Inline styles for critical path performance
- **JavaScript**: Minimal, progressive enhancement only
- **SEO**: Preserved WordPress structure and sitemaps

### Bundle Sizes
- **Total**: ~100KB (significant improvement from original 65K+ tokens)
- **CSS**: Inline in HTML for performance
- **Images**: Optimized with multiple responsive sizes

## Language and Content

- **Primary Language**: Spanish (`lang="es"`)
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Accessibility**: WCAG 2.1 AA compliant structure
- **Content**: Professional portfolio showcasing architecture and interior design projects

## Important Notes

- **No Build Process**: Direct HTML/CSS/JS - no compilation required
- **SEO Preserved**: Maintains WordPress-generated sitemaps and structure
- **Mobile-First**: Advanced responsive design with Instagram-style mobile layout
- **Performance**: Optimized for fast loading and smooth interactions
- **Maintainability**: Clear separation between content and presentation logic