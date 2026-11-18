# Imágenes de productos

Coloca las imágenes del carrusel en `images/` (JPG, JPEG, JFIF, PNG, APNG, WebP, GIF, AVIF, SVG, BMP o ICO). El carrusel consulta esa carpeta automáticamente cuando el servidor permite listar sus archivos. La visualización de cada formato depende de que el navegador del visitante lo admita.

Antes de publicar, actualiza también la lista de respaldo desde PowerShell:

```powershell
./sitios/valma/actualizar-imagenes.ps1
```

Publica `images/`, `images.json` y `productos-carrusel.js` junto con los demás archivos del sitio. Si el alojamiento no permite listar directorios, el carrusel utilizará `images.json`; vuelve a ejecutar el comando después de agregar o quitar imágenes y publica la lista actualizada.

## Procedencia de imágenes añadidas

- `images/estetoscopio-wikimedia.png`: fotografía ilustrativa de Sprinno, [Stethoscope.png en Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Stethoscope.png), dedicada al dominio público mediante CC0 1.0. No identifica una marca o modelo específico de VALMA.

## Formularios y correo

El servicio de `server/` sirve el sitio y recibe los formularios de contacto y postulación. Envía los mensajes a `direccion@ingenieriavalma.com` mediante la cuenta real `it@bioteczac.com`; la dirección de la persona que escribe queda como dirección de respuesta. El currículum es opcional, debe ser PDF y tener un tamaño máximo de 5 MB. El servicio adjunta el archivo en memoria y no lo guarda en el servidor.

La contraseña de aplicación se configura exclusivamente como `SMTP_APP_PASSWORD` en el archivo privado del servidor `/home/janvier/apps/valma-secrets/smtp.env`. No subir ese archivo ni contraseñas al repositorio. El contenedor escucha únicamente en `127.0.0.1:3012`; para acceso público necesita un proxy o túnel HTTPS y una ruta de dominio configurada. No modificar las rutas de otros servicios sin revisarlas.

Para las pruebas locales del servicio, desde `sitios/valma/server` ejecuta `npm ci` y `npm test`. Las pruebas usan un transporte simulado y no envían correos.
