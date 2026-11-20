# Imágenes de productos

Coloca las imágenes del carrusel en `images/` (JPG, JPEG, JFIF, PNG, APNG, WebP, GIF, AVIF, SVG, BMP o ICO). El carrusel consulta esa carpeta automáticamente cuando el servidor permite listar sus archivos. La visualización de cada formato depende de que el navegador del visitante lo admita.

Antes de publicar, actualiza también la lista de respaldo desde PowerShell:

```powershell
./sitios/valma/actualizar-imagenes.ps1
```

Publica `images/`, `images.json` y `productos-carrusel.js` junto con los demás archivos del sitio. Si el alojamiento no permite listar directorios, el carrusel utilizará `images.json`; vuelve a ejecutar el comando después de agregar o quitar imágenes y publica la lista actualizada.

En producción se consulta directamente `images.json`. La lectura de la carpeta se conserva para la vista previa en localhost. El carrusel descarga y decodifica como máximo cuatro imágenes a la vez. Inicia cuando hay suficientes imágenes listas para llenar la vista, sin esperar a las más lentas; reintenta una vez las fallidas y omite las que sigan sin estar disponibles. La descarga y la decodificación tienen tiempo límite. Durante el arranque conserva las imágenes iniciales del HTML.

Se pausa al pasar el mouse, al navegar por teclado dentro de la galería o al ocultar la pestaña. Tocar o hacer clic en una imagen no deja una pausa persistente: al retirar el mouse continúa. Conserva el avance al cambiar el ancho y no reinicia por cambios de altura de las barras del navegador móvil. Al volver desde otra página sincroniza la visibilidad. Respeta movimiento reducido y muestra cada archivo una sola vez por vuelta; la copia auxiliar permite cerrar el ciclo sin duplicados simultáneos en la vista.

`site-update.js` y `sw.js` retiran el service worker que quedó del alojamiento anterior, sin registrar uno para visitantes nuevos ni borrar cookies o datos de formularios. Mantén ambos archivos en futuras publicaciones. La configuración de publicación está en [server/DEPLOYMENT.md](server/DEPLOYMENT.md).

## Procedencia de imágenes añadidas

- `images/estetoscopio-wikimedia.png`: fotografía ilustrativa de Sprinno, [Stethoscope.png en Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Stethoscope.png), dedicada al dominio público mediante CC0 1.0. No identifica una marca o modelo específico de VALMA.

## Contacto rápido y cobertura

`contacto-flotante.js` añade en las cinco páginas un panel que se abre al pulsar «Contáctanos», con enlace a WhatsApp de la coordinadora (81 1005 0873), mensaje de cortesía y alternativa por correo. El QR local está en `assets/contacto/whatsapp-valma.png` y contiene el mismo enlace y mensaje. Si cambia alguno, regenerar también el QR. El formato internacional sigue la [indicación de WhatsApp para México](https://faq.whatsapp.com/1294841057948784).

El mapa conserva las 32 geometrías de INEGI. Resalta los 15 estados derivados de las ubicaciones confirmadas por el propietario, con un marcador por capital. Las coordenadas se consultaron en el [Catálogo Único de INEGI](https://www.inegi.org.mx/servicios/catalogoUnico.html), usando `/wscatgeo/v2/localidades/{clave}`. La proyección es Albers (`lat_1=17.5`, `lat_2=29.5`, `lat_0=23.5`, `lon_0=-102`, WGS84), igual que la geometría existente. Los marcadores son referencias estatales, no domicilios de sucursales.

## Servicio de formularios

El servicio de `server/` sirve el sitio y recibe los formularios de contacto y postulación. Envía los mensajes a `direccion@ingenieriavalma.com` mediante la cuenta real `it@bioteczac.com`; la dirección de la persona que escribe queda como dirección de respuesta. El currículum es opcional, debe ser PDF y tener un tamaño máximo de 5 MB. El servicio adjunta el archivo en memoria y no lo guarda en el servidor.

La contraseña de aplicación se configura exclusivamente como `SMTP_APP_PASSWORD` en el archivo privado del servidor `/home/janvier/apps/valma-secrets/smtp.env`. No subir ese archivo ni contraseñas al repositorio. El contenedor escucha únicamente en `127.0.0.1:3012`; para acceso público necesita un proxy o túnel HTTPS y una ruta de dominio configurada. No modificar las rutas de otros servicios sin revisarlas.

Para las pruebas locales del servicio, desde `sitios/valma/server` ejecuta `npm ci` y `npm test`. Las pruebas usan un transporte simulado y no envían correos.
