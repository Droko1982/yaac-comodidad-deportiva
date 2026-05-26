# YAAC — Comodidad Deportiva

Sitio web oficial de **YAAC**, marca colombiana de ropa deportiva seamless (sin costuras) con base en **Pereira, Risaralda** y envíos a todo el país.

**Producción:** https://droko1982.github.io/yaac-comodidad-deportiva/

## Stack
- HTML + CSS + JS vanilla, sin frameworks ni build step.
- Tema dark/light con persistencia (`localStorage` clave `yaac-theme`).
- Fuentes: Anton (display) + Bricolage Grotesque (headings) + Manrope (body) vía Google Fonts.
- SEO: JSON-LD (`Organization`, `Store`, `ItemList`, `FAQPage`, `BreadcrumbList`), Open Graph, Twitter Cards, geo-meta Pereira.
- Pedidos: WhatsApp `+57 305 472 7101` + Instagram `@yaac_comodidadeportiva` / `@yaac.comodidadeportiva`.

## Estructura
```
yaac-comodidad-deportiva/
├── index.html           ← Home (todas las secciones)
├── privacidad.html      ← Política de privacidad (Ley 1581 CO)
├── 404.html             ← Página de error
├── styles.css           ← Estilos (paleta fucsia + cream + dark/light)
├── script.js            ← Theme toggle, nav móvil, reveal-on-scroll
├── sitemap.xml          ← Sitemap para Google
├── robots.txt
├── site.webmanifest     ← PWA básica
└── assets/img/
    ├── logo.svg         ← Wordmark YAAC
    ├── logo-mark.svg    ← Avatar / icon
    ├── favicon.svg
    └── og-image.svg     ← Open Graph 1200×630
```

## Antes de publicar (placeholders que se deben revisar)
1. **Fotos del lookbook y productos**: actualmente usan Unsplash (uso libre). Cuando el cliente entregue las fotos reales de las prendas, reemplazar en `index.html` los `src=` con las imágenes optimizadas en `assets/photos/`.
2. **Precios**: la página no muestra precios fijos. Si se quieren listar, agregarlos en cada card de `.product` y también en el JSON-LD `ItemList` (`offers.price`).
3. **Dirección física exacta**: solo se indica "Pereira, Risaralda". Si hay punto de entrega o showroom, agregarlo a `.contact-loc` y al JSON-LD `Store.address.streetAddress`.
4. **Cuenta de Google Business Profile + Search Console**: registrar el sitio una vez publicado para mejorar el SEO local.
5. **OG Image**: el SVG `assets/img/og-image.svg` se puede exportar a JPG 1200×630 con `sharp` para mejor compatibilidad con WhatsApp/Facebook.

## Despliegue
GitHub Pages servido desde la rama `master`, carpeta raíz `/`. Push automático → rebuild ~30–60s.

```bash
git add .
git commit -m "tu mensaje"
git push origin master
```

## Contacto del proyecto
- Cliente: YAAC Comodidad Deportiva
- Ubicación: Pereira, Risaralda, Colombia
- WhatsApp: +57 305 472 7101
- Instagram: @yaac_comodidadeportiva · @yaac.comodidadeportiva
