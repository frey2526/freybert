# freybert

Página personal de Freybert. Estática y sin dependencias: HTML, CSS y un poco de JS.
Estética de Omarchy: oscuro, monoespaciada, acento morado y temas intercambiables.

Contenido real: **ajedrecista, programador y desarrollador de sistemas** — automatizaciones con IA,
paneles y herramientas que se ven y se usan, más una guía de indexación.

## Verla

```sh
cd ~/Projects/freybert
python3 -m http.server 8765
```

Abre <http://127.0.0.1:8765>. Para pararla, `Ctrl+C`.

## Qué hay dentro

```
index.html            estructura, textos y metadatos (contenido real)
assets/styles.css     paletas, tipografía, tarjetas, animaciones
assets/app.js         temas, terminal que se escribe sola, efectos de ratón
assets/fonts/         Geist y JetBrains Mono, servidas en local
assets/og.html        fuente de la imagen para compartir (noindex)
assets/og-image.png   la imagen ya renderizada (1200x630)
guia-indexacion.html  guía de indexación con checklist interactiva
assets/guia.js        checklist que se guarda en localStorage
robots.txt            permite el rastreo y apunta al sitemap
sitemap.xml           dos URLs, con lastmod
llms.txt              resumen en texto para IAs que lo lean
404.html              página de error
scripts/              ping de IndexNow
```

## Indexación

### Lo que ya está puesto

- `robots.txt` abierto y con la línea `Sitemap:`.
- `sitemap.xml` con URLs absolutas y `lastmod`.
- `<link rel="canonical">` absoluto y `meta robots: index, follow`.
- Título y descripción únicos; `og:` y `twitter:` completos, con imagen 1200x630.
- JSON-LD `WebSite` + `Person` (nombre, alias, GitHub) en la home; `Article` en la guía.
- `llms.txt` para asistentes que lo consulten.
- Clave de IndexNow en la raíz (`2366afa0c7ccfc4a2e38eb9c342dd4c4.txt`).
- HTML semántico, fuentes locales, cero dependencias externas: carga rápida.

### Lo que acelera de verdad

1. **Publicar en una URL pública** (esto va primero: sin URL no hay nada que indexar).
2. **Google Search Console**: verificar el sitio y enviar `sitemap.xml`. Para una página
   concreta, *Inspeccionar URL* → *Solicitar indexación*.
3. **Bing Webmaster Tools**: dar de alta el sitio (importa desde Search Console) y enviar el sitemap.
4. **IndexNow**: avisar a Bing/Yandex/Naver de cada cambio. Aquí: `scripts/ping-indexnow.sh`.
5. **Enlaces entrantes**: el factor que más pesa para que te descubran. GitHub, LinkedIn, foros.
6. **Contenido real**: una página con huecos se rastrea, pero no se indexa. Texto propio y útil
   es el requisito que no se puede saltar.

Google **no** usa IndexNow. Su Indexing API solo vale para ofertas de empleo y directos.
Para Google: sitemap + Search Console.

### Si cambias de dominio

Busca y reemplaza `https://frey2526.github.io/freybert/` en `index.html`, `robots.txt`,
`sitemap.xml`, `llms.txt` y `scripts/ping-indexnow.sh`.

## Animaciones

- **Fondo**: tres orbes morados que flotan, rejilla que se desplaza despacio y un grano fino.
- **Ratón**: un halo persigue al cursor, el fondo hace parallax y la terminal se inclina.
- **Tarjetas**: foco de luz que sigue al ratón dentro de cada una.
- **Entrada**: el nombre se escribe de izquierda a derecha y la terminal teclea sola.
- **Teclado**: pulsa `T` para cambiar de tema (con transición de vista si el navegador la tiene).
- **Botones**: el reflejo cruza el primario y se hunde al pulsar.
- **Scroll**: cada sección aparece al entrar en pantalla y una barra fina marca el progreso.
- **Terminal**: al pasar el ratón, los tres puntos se encienden.

Los efectos de ratón solo se activan con puntero fino (no en pantallas táctiles) y se
apagan con `?motion=off` o si el sistema pide reducir movimiento.

## Trucos para probar

| URL | Qué hace |
| --- | --- |
| `?theme=gruvbox` | Fuerza un tema sin tocar nada |
| `?motion=off` | Quita todas las animaciones (útil para capturas) |

## Cambiar cosas

- **Colores y temas**: arriba de `assets/styles.css`, un bloque por tema
  (`tokyo-night`, `catppuccin`, `gruvbox`, `everforest`, `rose-pine`). El acento es `--brand`.
- **Tema por defecto**: el atributo `data-theme` del `<html>` en `index.html`.
- **Textos**: `index.html`, dentro de las secciones y tarjetas.

## Pendiente

- [x] Rellenar los huecos (bio, proyectos, enlaces) — contenido real.
- [ ] Publicar (repo público + GitHub Pages) o dominio propio.
- [ ] Verificar en Search Console y Bing, enviar el sitemap.
- [ ] Lanzar `scripts/ping-indexnow.sh` tras publicar.
