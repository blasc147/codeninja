# CodeNinja — Contexto del Proyecto

Sitio web educativo para el curso de programación de UTN. Desarrollado por **Ing. Blas Cabas Geat** (Full Stack Developer, Docente UTN).

## Stack
- **Framework:** Astro v6 (output: static + API routes con prerender: false)
- **CSS:** Tailwind v3 (NO v4) con PostCSS — `postcss.config.cjs` + `tailwind.config.mjs`
- **Fuentes:** Space Grotesk (sans) + Fira Code (mono) via Google Fonts en Layout.astro
- **Deploy:** Vercel — `codeninjautn.vercel.app` → repo `github.com/blasc147/codeninja`
- **Tests:** Playwright E2E en `e2e/smoke.spec.ts`

## Colores Tailwind custom
```
primary:          #a3e635  (verde lima)
background-dark:  #0f172a
background-light: #f8fafc
accent-blue:      #60a5fa
accent-brown:     #a16207
```

## Estructura de carpetas clave
```
src/
  components/       Header, Footer, HeroSection, FeaturesSection, ProfeSection, CTASection, ComingSoon
  layouts/          Layout.astro  (incluye fuentes, dark mode, global.css)
  pages/
    index.astro
    cursos.astro          ← grid de 4 cursos
    presentaciones.astro  ← terminal theme, sidebar filtros, cards macOS
    playground.astro      ← editor funcional
    cursos/
      c/
        index.astro       ← índice 16 lecciones
        [lesson].astro    ← página dinámica por lección
    api/
      chat.ts             ← placeholder LLM (prerender: false)
      execute.ts          ← ejecución de código via Wandbox (prerender: false)
  data/
    cursos/
      c.ts                ← 16 lecciones con contenido completo en español
  styles/
    global.css            ← solo @tailwind base/components/utilities
```

## Decisiones importantes

**Tailwind v3 (no v4):** La migración a v4 rompe los estilos. Usar siempre `tailwindcss@3` con `postcss.config.cjs`.

**Clases dinámicas:** NO usar template literals en clases Tailwind (ej: `` `bg-${color}` ``). Tailwind purga las clases que no aparecen literales en el código. Siempre escribir la clase completa.

**output: static con API routes:** El proyecto usa `output: 'static'` pero las API routes tienen `export const prerender = false` individualmente. Funciona con `@astrojs/vercel`.

**NO commitear .vercel/output:** Ya está en `.gitignore`. Si se commitea, Vercel sirve ese output viejo en lugar de buildear.

**Playground — ejecución de código:**
- JavaScript: corre en el browser via Web Worker (sin API externa)
- C: corre via Wandbox API (`gcc-head`) — funciona
- Java/Python: Wandbox API — actualmente con errores, pendiente fix

## Lo que está hecho ✅
- Home completo (hero con terminal animada, features, profe, CTA)
- `/cursos` — grid de 4 cursos
- `/cursos/c` — índice + 16 lecciones completas con contenido educativo
- `/presentaciones` — layout terminal, filtros JS, cards C linkeadas a lecciones
- `/playground` — editor funcional (JS y C andan)
- Deploy en Vercel funcionando con auto-deploy desde main

## Pendiente 🔜
- Cursos de Java, Git y JavaScript (estructura igual a C, en `src/data/cursos/`)
- Presentaciones: activar links de Java, JavaScript y Algoritmos
- Playground: fix Java y Python en Wandbox
- Footer: reemplazar `YOUR_LINKEDIN` y `YOUR_GITHUB` con URLs reales
- Sección LLM (marcada como 🚧 en nav, backend en `/api/chat.ts` preparado)

## Estilo visual
- Dark mode por defecto (`<html class="dark">`)
- Estética hacker/terminal: fondos oscuros, verde lima como acento
- Cards con `hover:shadow-[0_0_30px_-5px_rgba(163,230,53,0.25)]`
- Puntitos macOS (rojo/amarillo/verde) en cards de presentaciones
- Cursor parpadeante verde en terminal con CSS `animation: blink`
- Animaciones de entrada con Intersection Observer en FeaturesSection
