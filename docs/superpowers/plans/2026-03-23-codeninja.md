# CodeNinja Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a UTN programming course website (CodeNinja) using Astro v5 + Tailwind CSS v4, inspired by programierds, with professor section, scroll animations, and a placeholder LLM API endpoint, deployed on Vercel.

**Architecture:** Static site with Astro v5 generating all pages at build time, except `/api/chat` which is a serverless Astro endpoint. Components are split by section responsibility. Tailwind v4 CSS-first configuration with custom color tokens matching the original design.

**Tech Stack:** Astro v6, Tailwind CSS v4, `@tailwindcss/vite`, Playwright (E2E), Vercel

---

## File Map

| File | Responsibility |
|------|---------------|
| `astro.config.mjs` | Astro config with Tailwind Vite plugin, output: server for API support |
| `src/styles/global.css` | Tailwind import + `@theme` custom color tokens |
| `src/layouts/Layout.astro` | Base HTML shell: `<html lang="es" class="dark">`, head, global CSS import |
| `src/components/Header.astro` | Sticky navbar, links, `🚧` badge on Playground |
| `src/components/Footer.astro` | Footer with CodeNinja brand + social links |
| `src/components/HeroSection.astro` | Two-column hero with headline, subtitle, two CTA buttons |
| `src/components/FeaturesSection.astro` | Three cards with Intersection Observer fade-in animation |
| `src/components/ProfeSection.astro` | Professor section: initials avatar, name, bio, social icons |
| `src/components/CTASection.astro` | Full-width CTA with gradient background |
| `src/components/ComingSoon.astro` | Reusable "próximamente" hero used by cursos/presentaciones/playground |
| `src/pages/index.astro` | Home: assembles Hero + Features + Profe + CTA |
| `src/pages/cursos.astro` | Uses ComingSoon component |
| `src/pages/presentaciones.astro` | Uses ComingSoon component |
| `src/pages/playground.astro` | Uses ComingSoon with LLM message |
| `src/pages/api/chat.ts` | POST endpoint placeholder for future LLM |
| `public/favicon.svg` | Ninja emoji SVG favicon |
| `e2e/smoke.spec.ts` | Playwright E2E: pages load, nav links work, API responds |

---

## Task 1: Initialize project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (via `npm create astro`)
- Create: `src/styles/global.css`

- [ ] **Step 1: Create project folder and init Astro**

```bash
cd "/Users/blasc147/Documents/proyectos propios"
npm create astro@latest codeninja -- --template minimal --typescript strict --no-install --no-git
cd codeninja
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install tailwindcss @tailwindcss/vite
npm install @astrojs/vercel
npm install --save-dev @playwright/test
```

- [ ] **Step 3: Configure Tailwind v4 and Vercel adapter in astro.config.mjs**

Replace the contents of `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create global CSS with color tokens**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #a3e635;
  --color-background-dark: #0f172a;
  --color-background-light: #f8fafc;
  --color-accent-blue: #60a5fa;
  --color-accent-brown: #a16207;
}
```

- [ ] **Step 5: Init git and first commit**

```bash
git init
git add .
git commit -m "chore: init Astro + Tailwind v4 project"
```

---

## Task 2: Base Layout and Header

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create Layout.astro**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
}
const { title = 'CodeNinja' } = Astro.props;
---
<!doctype html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <div class="relative flex min-h-screen flex-col overflow-x-hidden">
      <slot />
    </div>
  </body>
</html>
```

- [ ] **Step 2: Create Header.astro**

```astro
---
const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/presentaciones', label: 'Presentaciones' },
  { href: '/playground', label: 'Playground 🚧' },
];
const currentPath = Astro.url.pathname;
---
<header class="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 lg:px-20 py-4">
  <div class="mx-auto flex max-w-7xl items-center justify-between">
    <a class="flex items-center gap-2" href="/">
      <span class="text-3xl">🥷</span>
      <h2 class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">CodeNinja</h2>
    </a>
    <nav class="hidden md:flex items-center gap-8">
      {navLinks.map(link => (
        <a
          href={link.href}
          class={`text-sm transition-colors ${currentPath === link.href ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-medium'}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
    <a href="/playground" class="flex items-center justify-center rounded-xl bg-primary px-6 py-2 text-sm font-bold text-background-dark hover:brightness-110 transition-all">
      Playground
    </a>
  </div>
</header>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro src/components/Header.astro
git commit -m "feat: add base layout and header with nav"
```

---

## Task 3: Footer

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

```astro
---
---
<footer class="border-t border-primary/10 bg-background-light dark:bg-background-dark px-4 py-16 lg:px-20">
  <div class="mx-auto max-w-7xl flex flex-col gap-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🥷</span>
        <h2 class="text-xl font-bold">CodeNinja</h2>
      </div>
      <div class="flex flex-col items-center md:items-end gap-2">
        <p class="text-sm text-slate-400">
          Creado por <span class="text-white font-bold">Ing. Blas Cabas Geat</span>
        </p>
        <p class="text-xs text-slate-500">Full Stack Developer | Docente UTN</p>
        <div class="flex items-center gap-5 mt-2">
          <a class="text-slate-500 hover:text-primary transition-all" href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <!-- LinkedIn SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
          <a class="text-slate-500 hover:text-primary transition-all" href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <!-- GitHub SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="text-center text-slate-500 text-sm">
      <p>&copy; 2025 CodeNinja. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add footer with professor info and social links"
```

---

## Task 4: Home page — Hero section

**Files:**
- Create: `src/components/HeroSection.astro`

- [ ] **Step 1: Create HeroSection.astro**

```astro
---
---
<section class="relative px-4 py-16 lg:px-20 lg:py-32">
  <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="flex flex-col gap-8">
      <div class="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
        🥷 UTN · Programación
      </div>
      <h1 class="text-slate-900 dark:text-white text-5xl font-black leading-tight tracking-tight lg:text-7xl">
        Aprendé a programar en la UTN
        <span class="text-primary">(sin morir en el intento)</span>
      </h1>
      <p class="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-xl">
        Código real, proyectos reales y un profe que ya pasó por todo lo que estás a punto de pasar.
      </p>
      <div class="flex flex-wrap gap-4">
        <a href="/cursos" class="flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-background-dark hover:scale-105 transition-transform">
          Ver Cursos
        </a>
        <a href="/playground" class="flex h-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-8 text-lg font-bold text-primary hover:bg-primary/10 transition-colors">
          Playground 🚧
        </a>
      </div>
    </div>
    <div class="relative hidden lg:block">
      <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
      <div class="relative rounded-2xl border border-primary/20 bg-background-dark/50 p-8 shadow-2xl flex items-center justify-center aspect-square">
        <span class="text-[10rem]">🥷</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.astro
git commit -m "feat: add hero section"
```

---

## Task 5: Home page — Features section with scroll animations

**Files:**
- Create: `src/components/FeaturesSection.astro`

- [ ] **Step 1: Create FeaturesSection.astro with Intersection Observer**

```astro
---
const features = [
  {
    icon: `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>`,
    color: 'primary',
    title: 'Proyectos Reales',
    description: 'Nada de "Hola Mundo". Construís apps que la gente realmente usa y que van a hacer brillar tu portfolio.',
  },
  {
    icon: `<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>`,
    color: 'accent-blue',
    title: 'Comunidad UTN',
    description: 'No estás solo. Compartís el camino con otros estudiantes de la UTN que tienen las mismas dudas (y los mismos memes).',
  },
  {
    icon: `<path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>`,
    color: 'accent-brown',
    title: 'Mentoría Directa',
    description: 'Tu profe ya pasó por el barro. Feedback honesto, directo y sin vueltas para que mejores rápido.',
  },
];
---
<section class="bg-primary/5 px-4 py-20 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="mb-16 text-center lg:text-left">
      <h2 class="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">¿Por qué CodeNinja?</h2>
      <p class="mt-4 text-slate-600 dark:text-slate-400 text-lg">Hacemos que el camino sea real, directo y sin filtros.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="features-grid">
      {features.map((f, i) => (
        <div
          class="feature-card opacity-0 translate-y-8 transition-all duration-700 group relative flex flex-col gap-6 rounded-2xl border border-primary/10 bg-background-light dark:bg-background-dark p-8 hover:border-primary/50"
          style={`transition-delay: ${i * 150}ms`}
        >
          <div class={`flex size-12 items-center justify-center rounded-lg bg-${f.color}/10 text-${f.color}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <Fragment set:html={f.icon} />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  const cards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach(card => observer.observe(card));
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturesSection.astro
git commit -m "feat: add features section with scroll fade-in animations"
```

---

## Task 6: Home page — Professor section

**Files:**
- Create: `src/components/ProfeSection.astro`

- [ ] **Step 1: Create ProfeSection.astro**

```astro
---
---
<section class="px-4 py-20 lg:px-20">
  <div class="mx-auto max-w-7xl">
    <div class="mb-12 text-center lg:text-left">
      <h2 class="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">Tu profe</h2>
    </div>
    <div class="flex flex-col md:flex-row items-center md:items-start gap-10 rounded-2xl border border-primary/10 bg-primary/5 p-10">
      <!-- Avatar con iniciales -->
      <div class="flex-shrink-0 flex size-28 items-center justify-center rounded-full bg-primary text-background-dark text-3xl font-black select-none">
        BCG
      </div>
      <div class="flex flex-col gap-4 text-center md:text-left">
        <h3 class="text-2xl font-black text-slate-900 dark:text-white">Ing. Blas Cabas Geat</h3>
        <p class="text-slate-500 text-sm font-medium uppercase tracking-wider">Full Stack Developer · Docente UTN</p>
        <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
          Desarrollador Full Stack con años de experiencia en el mercado tech, construyendo productos reales que usan personas reales.
          Hoy comparte todo lo que aprendió (y lo que nadie le enseñó) en el aula de la UTN.
          Cree que programar bien es mitad lógica, mitad actitud — y que cualquiera puede aprenderlo si alguien se toma el tiempo de explicarlo como corresponde.
        </p>
        <div class="flex items-center gap-4 justify-center md:justify-start mt-2">
          <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer"
            class="text-slate-500 hover:text-primary transition-all" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
          <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer"
            class="text-slate-500 hover:text-primary transition-all" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProfeSection.astro
git commit -m "feat: add professor section with initials avatar and bio"
```

---

## Task 7: Home page — CTA section and index.astro

**Files:**
- Create: `src/components/CTASection.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create CTASection.astro**

```astro
---
---
<section class="px-4 py-24 lg:px-20 text-center">
  <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary/20 via-background-dark to-background-dark border border-primary/20 p-12 lg:p-20 relative overflow-hidden">
    <div class="absolute top-0 right-0 p-8 opacity-10">
      <span class="text-9xl">🥷</span>
    </div>
    <div class="relative z-10 flex flex-col items-center gap-8">
      <h2 class="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black leading-tight">
        Dejá de copiar código de Stack Overflow sin entender nada
      </h2>
      <p class="text-slate-600 dark:text-slate-300 text-lg max-w-2xl">
        Empezá hoy tu camino en la programación con proyectos reales y un profe que la rompe.
      </p>
      <a href="/cursos" class="flex h-16 items-center justify-center rounded-xl bg-primary px-10 text-xl font-bold text-background-dark hover:scale-105 transition-transform shadow-lg shadow-primary/20">
        Ver Cursos
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import HeroSection from '../components/HeroSection.astro';
import FeaturesSection from '../components/FeaturesSection.astro';
import ProfeSection from '../components/ProfeSection.astro';
import CTASection from '../components/CTASection.astro';
---
<Layout title="CodeNinja — Programación UTN">
  <Header />
  <main class="flex-1">
    <HeroSection />
    <FeaturesSection />
    <ProfeSection />
    <CTASection />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Start dev server and verify home page renders**

```bash
npm run dev
```
Open http://localhost:4321 — verify: dark background, lime accents, 4 sections visible, navbar with 🥷 logo.

- [ ] **Step 4: Commit**

```bash
git add src/components/CTASection.astro src/pages/index.astro
git commit -m "feat: assemble home page with all sections"
```

---

## Task 8: Inner pages (cursos, presentaciones, playground)

**Files:**
- Create: `src/components/ComingSoon.astro`
- Create: `src/pages/cursos.astro`
- Create: `src/pages/presentaciones.astro`
- Create: `src/pages/playground.astro`

- [ ] **Step 1: Create ComingSoon.astro**

```astro
---
interface Props {
  title: string;
  subtitle: string;
  emoji?: string;
}
const { title, subtitle, emoji = '🥷' } = Astro.props;
---
<section class="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
  <div class="flex flex-col items-center gap-8 max-w-2xl">
    <span class="text-8xl">{emoji}</span>
    <div class="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary border border-primary/20">
      🚧 En construcción
    </div>
    <h1 class="text-slate-900 dark:text-white text-5xl font-black leading-tight">{title}</h1>
    <p class="text-slate-600 dark:text-slate-400 text-xl">{subtitle}</p>
    <a href="/" class="flex h-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-8 font-bold text-primary hover:bg-primary/10 transition-colors">
      ← Volver al inicio
    </a>
  </div>
</section>
```

- [ ] **Step 2: Create cursos.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ComingSoon from '../components/ComingSoon.astro';
---
<Layout title="Cursos — CodeNinja">
  <Header />
  <main class="flex-1 flex flex-col">
    <ComingSoon
      title="Cursos"
      subtitle="Estamos preparando el contenido del curso. Pronto vas a poder acceder a todas las clases y materiales."
      emoji="📚"
    />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Create presentaciones.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ComingSoon from '../components/ComingSoon.astro';
---
<Layout title="Presentaciones — CodeNinja">
  <Header />
  <main class="flex-1 flex flex-col">
    <ComingSoon
      title="Presentaciones"
      subtitle="Las slides de cada clase van a estar disponibles acá. Volvé pronto."
      emoji="🎯"
    />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 4: Create playground.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import ComingSoon from '../components/ComingSoon.astro';
---
<Layout title="Playground — CodeNinja">
  <Header />
  <main class="flex-1 flex flex-col">
    <ComingSoon
      title="Playground"
      subtitle="Estamos integrando un asistente de IA para que puedas practicar y consultar dudas directamente acá. Muy pronto."
      emoji="🤖"
    />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ComingSoon.astro src/pages/cursos.astro src/pages/presentaciones.astro src/pages/playground.astro
git commit -m "feat: add inner pages with coming soon component"
```

---

## Task 9: API endpoint for future LLM

**Files:**
- Create: `src/pages/api/chat.ts`

- [ ] **Step 1: Create chat.ts endpoint**

```ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // TODO: Integrate LLM here
  // Expected request body: { message: string }
  // Expected response: { reply: string }
  return new Response(
    JSON.stringify({ reply: 'El Playground estará disponible muy pronto. 🥷' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
```

- [ ] **Step 2: Test the endpoint manually**

> Note: ensure the dev server is running (`npm run dev`) before executing this command.

```bash
curl -X POST http://localhost:4321/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "hola"}'
```
Expected output: `{"reply":"El Playground estará disponible muy pronto. 🥷"}`

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/chat.ts
git commit -m "feat: add placeholder /api/chat endpoint for future LLM"
```

---

## Task 10: Favicon

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create ninja emoji favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90">🥷</text>
</svg>
```

- [ ] **Step 2: Commit**

```bash
git add public/favicon.svg
git commit -m "feat: add ninja emoji favicon"
```

---

## Task 11: E2E smoke tests

**Files:**
- Create: `e2e/smoke.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Create playwright.config.ts**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});
```

- [ ] **Step 2: Create e2e/smoke.spec.ts**

```ts
import { test, expect } from '@playwright/test';

test('home page loads with key content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Aprendé a programar/i })).toBeVisible();
  await expect(page.getByText('CodeNinja')).toBeVisible();
  await expect(page.getByText('Ing. Blas Cabas Geat')).toBeVisible();
});

test('navbar links navigate correctly', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Cursos' }).first().click();
  await expect(page).toHaveURL('/cursos');
  await expect(page.getByText('En construcción')).toBeVisible();
});

test('playground page shows coming soon', async ({ page }) => {
  await page.goto('/playground');
  await expect(page.getByText('En construcción')).toBeVisible();
  await expect(page.getByText(/asistente de IA/i)).toBeVisible();
});

test('API endpoint returns 200', async ({ request }) => {
  const response = await request.post('/api/chat', {
    data: { message: 'test' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('reply');
});
```

- [ ] **Step 3: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 4: Run E2E tests**

```bash
npx playwright test
```
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add e2e/ playwright.config.ts
git commit -m "test: add Playwright E2E smoke tests"
```

---

## Task 12: Deploy to Vercel

- [ ] **Step 1: Create GitHub repository**

Go to https://github.com/new and create a public repo named `codeninja`.

- [ ] **Step 2: Push to GitHub**

> Replace `YOUR_GITHUB_USER` with your actual GitHub username before running.

```bash
git remote add origin https://github.com/YOUR_GITHUB_USER/codeninja.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

1. Go to https://vercel.com/new
2. Import the `codeninja` GitHub repo
3. Vercel auto-detects Astro — click **Deploy**
4. Wait for deploy to complete

- [ ] **Step 4: Verify live URL**

Open the Vercel URL (e.g. `codeninja.vercel.app`) and check:
- Home page renders with dark theme
- All nav links work
- Professor section shows "BCG" avatar

- [ ] **Step 5: Update LinkedIn/GitHub links in Footer and ProfeSection**

Replace `YOUR_LINKEDIN` and `YOUR_GITHUB` placeholders in:
- `src/components/Footer.astro`
- `src/components/ProfeSection.astro`

With your actual profile URLs, then:

```bash
git add src/components/Footer.astro src/components/ProfeSection.astro
git commit -m "chore: add real social links"
git push
```
Vercel auto-deploys on push.

---

## Done ✓

The site is live on Vercel with:
- Full CodeNinja design (dark mode, lime accents)
- Home page: Hero + Features (with fade-in) + Professor section + CTA
- Inner pages: Cursos, Presentaciones, Playground (all with "en construcción")
- API endpoint `/api/chat` ready for LLM integration
- E2E smoke tests passing
- Auto-deploy on push to `main`
