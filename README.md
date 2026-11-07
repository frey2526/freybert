# freybert

Página personal de Freybert. Estática, sin dependencias: HTML, CSS y un poco de JS.
Estética copiada de Omarchy: oscuro, monoespaciada, acento de color y temas intercambiables.

## Verla

```sh
cd ~/Projects/freybert
python3 -m http.server 8765
```

Abre <http://127.0.0.1:8765>. Para pararla, `Ctrl+C` en esa terminal.

## Qué hay dentro

```
index.html            todo el texto y la estructura
assets/styles.css     colores, tipografía, tarjetas, responsive
assets/app.js         cambio de tema (botón o tecla T)
assets/fonts/         Geist y JetBrains Mono, servidas en local
```

## Cambiar cosas

- **Textos**: `index.html`. Busca el bloque `<!-- ... -->` o directamente el texto.
- **Colores y temas**: arriba de `assets/styles.css`, un bloque por tema
  (`tokyo-night`, `catppuccin`, `gruvbox`, `everforest`, `rose-pine`).
- **Tema por defecto**: el atributo `data-theme` del `<html>` en `index.html`.
- **Probar un tema sin tocar nada**: `?theme=gruvbox` en la URL.

## Pendiente

- [ ] Enlaces reales: GitHub y correo (ahora son `#`).
- [ ] Dominio y publicación.
- [ ] Añadir `url` y `sameAs` al JSON-LD del `<head>` cuando existan.
- [ ] Una captura para `og:image`.
