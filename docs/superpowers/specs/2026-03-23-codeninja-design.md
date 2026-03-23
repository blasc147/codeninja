# CodeNinja — Diseño del sitio web

**Fecha:** 2026-03-23
**Proyecto:** Sitio web para curso de programación UTN
**Autor:** Profesor UTN

---

## Resumen

Sitio web para el curso de programación de la UTN, inspirado visualmente en programierds (Astro + Tailwind, modo oscuro, color primario lima/verde). Incluye mejoras: animaciones fade-in al scroll, sección del profesor, y un endpoint API preparado para integrar un LLM en el futuro. Deploy en Vercel.

---

## Stack tecnológico

- **Framework:** Astro v5
- **CSS:** Tailwind CSS v4
- **Deploy:** Vercel (conectado a GitHub, auto-deploy en push a `main`)
- **Repo:** GitHub
- **Carpeta local:** `~/Documents/proyectos propios/codeninja`

---

## Estructura del proyecto

```
codeninja/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cursos.astro
│   │   ├── presentaciones.astro
│   │   ├── playground.astro
│   │   └── api/
│   │       └── chat.ts
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HeroSection.astro
│   │   ├── FeaturesSection.astro
│   │   ├── ProfeSection.astro
│   │   └── CTASection.astro
│   └── layouts/
│       └── Layout.astro
├── public/
│   └── favicon.svg
└── package.json
```

---

## Diseño visual

- **Paleta:** idéntica a programierds — modo oscuro por defecto (`class="dark"`), primario lima/verde (`--color-primary`), fondos slate oscuros
- **Tipografía:** sistema de Tailwind (sans-serif)
- **Modo oscuro:** activado por defecto via clase en `<html>`

### Mejoras sobre el original
- Animaciones **fade-in al scroll** en las cards de features (Intersection Observer, sin librerías extra)
- Badge `🚧 Próximamente` en el link de Playground del navbar
- Sección "Tu profe" con avatar de iniciales (sin foto), nombre, bio corta, links a redes

---

## Páginas

### Home (`/`)
1. **Hero** — Headline: "Aprendé a programar en la UTN (sin morir en el intento)" + subtítulo del curso + botones "Ver Cursos" y "Playground"
2. **¿Por qué CodeNinja?** — 3 cards con fade-in: Proyectos Reales, Comunidad UTN, Mentoría directa
3. **Tu profe** — Avatar con iniciales "BCG", nombre "Ing. Blas Cabas Geat", bio: "Desarrollador Full Stack con años de experiencia en el mercado tech, construyendo productos reales que usan personas reales. Hoy comparte todo lo que aprendió (y lo que nadie le enseñó) en el aula de la UTN. Cree que programar bien es mitad lógica, mitad actitud — y que cualquiera puede aprenderlo si alguien se toma el tiempo de explicarlo como corresponde." + íconos LinkedIn/GitHub (a completar)
4. **CTA** — "Dejá de copiar código de Stack Overflow sin entender nada"
5. **Footer** — Logo CodeNinja + redes del profesor

### Cursos (`/cursos`)
Página simple con hero "Próximamente" estilizado, lista para agregar contenido.

### Presentaciones (`/presentaciones`)
Página simple con hero "Próximamente" estilizado.

### Playground (`/playground`)
Página "En Construcción" con mensaje sobre el futuro LLM integrado.

---

## API / Backend

### `POST /api/chat`
Endpoint vacío preparado para integrar un LLM en el futuro.

```ts
export async function POST({ request }) {
  // TODO: integrar modelo LLM aquí
  return new Response(JSON.stringify({ message: "coming soon" }), { status: 200 })
}
```

---

## Deploy

1. Crear repo en GitHub: `codeninja`
2. Conectar repo a Vercel (import project)
3. Vercel detecta Astro automáticamente
4. Auto-deploy en cada push a `main`
5. URL final: `codeninja.vercel.app` (o dominio custom)

---

## Lo que NO incluye (por ahora)
- Integración real con LLM (placeholder listo)
- Sistema de autenticación
- Base de datos
- Contenido real de cursos y presentaciones
