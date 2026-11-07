# freybert

Página personal de Freybert. Estática y sin dependencias: HTML, CSS y un poco de JS.
Estética de Omarchy: oscuro, monoespaciada, acento morado y temas intercambiables.

Ahora mismo **no tiene información**: solo la estructura y los huecos donde irá.

## Verla

```sh
cd ~/Projects/freybert
python3 -m http.server 8765
```

Abre <http://127.0.0.1:8765>. Para pararla, `Ctrl+C`.

## Qué hay dentro

```
index.html            estructura y textos (huecos marcados como "placeholder")
assets/styles.css     paletas, tipografía, tarjetas, animaciones
assets/app.js         temas, terminal que se escribe sola, aparición al bajar
assets/fonts/         Geist y JetBrains Mono, servidas en local
```

## Animaciones

- **Fondo**: tres orbes morados que flotan, rejilla que se desplaza despacio y un grano fino.
- **Ratón**: un halo persigue al cursor, el fondo hace parallax y la terminal se inclina.
- **Tarjetas**: foco de luz que sigue al ratón dentro de cada una.
- **Entrada**: el nombre se escribe de izquierda a derecha y la terminal teclea sola.
- **Teclado**: pulsa `T` para cambiar de tema (con transición de vista si el navegador la tiene).
- **Botones**: el primario tiene reflejo al pasar por encima y se hunde al pulsar.
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
- **Textos**: `index.html`, dentro de los bloques `placeholder` y las tarjetas vacías.

## Pendiente

- [ ] Rellenar los huecos (bio, proyectos, enlaces).
- [ ] Dominio y publicación.
- [ ] `url` y `sameAs` en el JSON-LD cuando existan.
