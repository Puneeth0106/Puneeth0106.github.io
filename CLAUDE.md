# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install -f

# Start dev server (http://localhost:4200)
ng serve

# Production build
ng build

# Watch mode (development)
ng build --watch --configuration development

# Run tests
ng test

# Run a single test file
ng test --include='**/home.component.spec.ts'

# Deploy to GitHub Pages
ng deploy --base-href="/"

# Docker (serves on port 4200 via nginx)
docker run -d -p 4200:80 ghcr.io/jayantgoel001/jayantgoel001.github.io:latest
```

## Architecture

### Data Layer

All portfolio content is stored in a single file: [src/assets/data.min.js](src/assets/data.min.js). This file defines a global `data` object with keys for each section (`NavBar`, `Home`, `About`, `Quote`, `Portfolio`, `Training`, `Achievement`, `Contact`, `Social`, `Footer`).

**To customize the portfolio, edit only `src/assets/data.min.js`.** No component logic changes are needed for content updates.

Components access this data via `declare var data: any` and read directly from the global: e.g., `data['Home']`, `data['About']`.

### Routing & Module Structure

Two lazy-loaded modules:
- **`ApplicationModule`** — loads at `/`, contains all portfolio sections as a single-page layout (Home → About → Quote → Portfolio → Training → Achievement → Contact → Social → Footer)
- **`PageNotFoundModule`** — loads at `/404`, all other paths redirect here

`AppComponent` only handles: splash screen animation (CSS-based loader removed after 1s), service worker update prompts, and canonical link injection.

### External Scripts

Three third-party scripts are loaded as global JS (not npm packages):
- `particles.min.js` — background animation on Home
- `vanilla-tilt.min.js` — tilt effect on Portfolio cards
- `wow.min.js` — scroll-triggered animations (uses `animationClass` values from data)

Components declare these as `declare var Typed/particlesJS/WOW/VanillaTilt: any` and call them imperatively in lifecycle hooks.

### PWA

Service worker is enabled in production via `@angular/service-worker`. Config is in [ngsw-config.json](ngsw-config.json). `AppComponent` listens for `VERSION_READY` events and prompts users to reload.

### Styling

- Global styles: [src/styles.min.css](src/styles.min.css) — minified, contains all layout/theme CSS
- Component-scoped CSS files for each component
- Font Awesome icons are self-hosted in [src/assets/fonts/](src/assets/fonts/) and [src/assets/css/font-awesome.min.css](src/assets/css/font-awesome.min.css)
- Primary font: Black Ops One (self-hosted in `src/assets/fonts/`)
- Animation library: `animate.min.css` in `src/assets/css/`

### Images

Portfolio images go in [src/assets/images/portfolio/](src/assets/images/portfolio/), achievement images in [src/assets/images/achievement/](src/assets/images/achievement/). References in `data.min.js` use bare filenames (no path prefix); components construct the full path.
