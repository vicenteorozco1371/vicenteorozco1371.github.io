# Portafolio Web

Portafolio estático (HTML + CSS + JavaScript, sin build) con los sitios y aplicaciones
web que he desarrollado. Pensado para publicarse gratis en **GitHub Pages**.

## Estructura

```
.
├── index.html          # Página única
├── assets/
│   ├── styles.css      # Estilos (tema oscuro minimalista)
│   ├── main.js         # Datos de los proyectos + render + filtros
│   └── og-image.png    # Imagen de vista previa al compartir (1200×630)
├── .nojekyll           # Evita que GitHub Pages procese el sitio con Jekyll
└── README.md
```

## Personalizar

- **Nombre**: aparece como `Vicente Orozco Alvarado` en el `eyebrow` del hero, el
  footer y `<meta name="author">` de `index.html`.
- **Contacto**: correo y WhatsApp están en la sección `#contacto` de `index.html`
  (`mailto:orovic137@gmail.com` y `https://wa.me/593985190979`).
- **Proyectos**: edita el array `PROJECTS` en `assets/main.js`. Cada objeto acepta
  `name`, `url`, `category`, `description`, `tech` (array) y `private: true` opcional.
- **Colores**: variables CSS en `:root` dentro de `assets/styles.css`.
  Paleta actual: Azul Marino `#1E3A8A`, Verde Esmeralda `#10B981`,
  Gris Slate `#64748B`, Naranja Vibrante `#F59E0B`.
  El texto secundario usa `--text-mute` (`#94A3B8`), un gris más claro que el
  Gris Slate de marca, para cumplir el contraste mínimo de lectura (WCAG AA).
- **Vista previa al compartir**: `assets/og-image.png` (1200×630) se muestra al
  enviar el enlace por WhatsApp, LinkedIn o Facebook. Si cambias el titular, regenera
  la imagen. Las redes guardan la vista previa en caché; para forzar la actualización
  usa el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/).

## Capturas de pantalla

Las imágenes de cada tarjeta se generan automáticamente con el servicio gratuito
**WordPress mShots** (`s.wordpress.com/mshots`). La primera carga de un sitio nuevo
puede tardar unos segundos mientras el servicio genera la captura. Mientras tanto,
mShots devuelve una imagen provisional de otro tamaño; el código la detecta, reintenta
varias veces y, si falla, muestra un recuadro con las iniciales del proyecto.

Si prefieres imágenes propias (más rápidas y estables), guarda un JPG/PNG por proyecto
en `assets/` y cambia la función `shotUrl()` de `main.js` para que devuelva esa ruta.

## Publicación

El sitio se publica con **GitHub Pages** desde la rama `main` (carpeta raíz) del repo
[`vicenteorozco1371/vicenteorozco1371.github.io`](https://github.com/vicenteorozco1371/vicenteorozco1371.github.io)
y queda en vivo en <https://vicenteorozco1371.github.io/>.

Para actualizarlo basta con hacer commit y `git push origin main`; GitHub Pages
redespliega en 1–2 minutos.

## Ver en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```
