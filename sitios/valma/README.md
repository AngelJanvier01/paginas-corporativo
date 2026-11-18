# Imágenes de productos

Coloca las imágenes del carrusel en `images/` (JPG, JPEG, JFIF, PNG, APNG, WebP, GIF, AVIF, SVG, BMP o ICO). El carrusel consulta esa carpeta automáticamente cuando el servidor permite listar sus archivos. La visualización de cada formato depende de que el navegador del visitante lo admita.

Antes de publicar, actualiza también la lista de respaldo desde PowerShell:

```powershell
./sitios/valma/actualizar-imagenes.ps1
```

Publica `images/`, `images.json` y `productos-carrusel.js` junto con los demás archivos del sitio. Si el alojamiento no permite listar directorios, el carrusel utilizará `images.json`; vuelve a ejecutar el comando después de agregar o quitar imágenes y publica la lista actualizada.

## Procedencia de imágenes añadidas

- `images/estetoscopio-wikimedia.png`: fotografía ilustrativa de Sprinno, [Stethoscope.png en Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Stethoscope.png), dedicada al dominio público mediante CC0 1.0. No identifica una marca o modelo específico de VALMA.
