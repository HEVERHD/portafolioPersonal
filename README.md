# hevert.dev

Portafolio personal de Hevert Gelis, desarrollador Frontend (React · Next.js · React Native).
Bilingüe ES/EN, exportado como sitio estático.

## Stack

Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript · Tailwind CSS 4

## Desarrollo

```bash
npm ci
npm run dev
```

`npm run build` genera el sitio estático en `out/`, listo para cualquier hosting de archivos estáticos.

## Editar contenido

Todo el texto (en ambos idiomas), la experiencia, los proyectos y los datos de contacto viven en
[`src/content.ts`](src/content.ts). Los componentes en `src/components/` solo se encargan de la presentación.

- **CV descargable:** copia el PDF en `public/` y pon su ruta en `contact.cv`. Si está vacío, el botón no aparece.
- **Capturas de proyectos:** `public/projects/*.jpg`, a 1200px de ancho.

## Dependencias

Las versiones están fijadas (`save-exact`) y `.npmrc` desactiva los scripts de instalación (`ignore-scripts`).
Antes de actualizar cualquier paquete, revisa `npm audit` y su historial de versiones.
