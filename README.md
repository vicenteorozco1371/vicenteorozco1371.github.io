# Portafolio Web

Portafolio estático (HTML + CSS + JavaScript, sin build) con los sitios y aplicaciones
web que he desarrollado. Pensado para publicarse gratis en **GitHub Pages**.

## Estructura

```
.
├── index.html          # Página única
├── assets/
│   ├── styles.css      # Estilos (tema oscuro minimalista)
│   └── main.js         # Datos de los proyectos + render + filtros
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

## Capturas de pantalla

Las imágenes de cada tarjeta se generan automáticamente con el servicio gratuito
**WordPress mShots** (`s.wordpress.com/mshots`). La primera carga de un sitio nuevo
puede tardar unos segundos mientras el servicio genera la captura; el código reintenta
varias veces y, si falla, muestra un recuadro con las iniciales del proyecto.

Si prefieres imágenes propias (más rápidas y estables), guarda un JPG/PNG por proyecto
en `assets/` y cambia la función `shotUrl()` de `main.js` para que devuelva esa ruta.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `portafolio`).
2. Sube estos archivos:
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/portafolio.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `main` / carpeta `/ (root)` → **Save**
4. En 1–2 minutos el sitio quedará en `https://TU_USUARIO.github.io/portafolio/`.

> Si nombras el repo `TU_USUARIO.github.io`, el sitio se sirve directo en
> `https://TU_USUARIO.github.io/` sin subcarpeta.

## Ver en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```
