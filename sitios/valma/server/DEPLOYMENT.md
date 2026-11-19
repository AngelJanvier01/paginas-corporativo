# Publicación de VALMA

Configuración verificada el 19 de noviembre de 2026.

## Dominio y túnel

- Sitio: `https://ingenieriavalma.com` y `https://www.ingenieriavalma.com`.
- Cuenta de Cloudflare del dominio: `c09e2c589302723d35b7b9b09a8c003e`.
- Túnel administrado desde Cloudflare: `valma-web`.
- ID del túnel: `e3340391-6a95-43a0-ae34-ab589f80e933`.
- CNAME principal, con proxy: `e3340391-6a95-43a0-ae34-ab589f80e933.cfargotunnel.com`.
- CNAME `www`, con proxy: `ingenieriavalma.com`.
- Las dos rutas publicadas del túnel apuntan a `http://127.0.0.1:3012`.

El dominio y el túnel deben pertenecer a la misma cuenta de Cloudflare. El error 1033 se resolvió reemplazando un túnel de otra cuenta; no era un problema de propagación pendiente. [Referencia de Cloudflare](https://developers.cloudflare.com/tunnel/concepts/routing/).

## Servidor

Acceso existente: `janvier@192.168.0.143`. Es un servidor compartido; operar únicamente sobre los contenedores de VALMA.

| Componente | Contenedor | Configuración |
| --- | --- | --- |
| Web y formularios | `valma-sitio` | Puerto local `127.0.0.1:3012`, reinicio `unless-stopped` |
| Conector activo | `valma-cloudflared-web` | Imagen `cloudflare/cloudflared:2026.10.0`, red del host, reinicio `unless-stopped` |
| Conector anterior | `valma-cloudflared` | Detenido, reinicio desactivado; conservado como referencia |

El token del conector reside únicamente en el archivo privado `/home/janvier/apps/valma-secrets/tunnel-token`, con permisos `600`. Se monta como `/etc/cloudflared/token:ro` y se consume mediante `--token-file`. No copiar su contenido al repositorio, documentación, comandos de instalación compartidos ni registros.

La configuración del túnel anterior y el destino DNS previo se conservaron en `/home/janvier/apps/valma-config/backups/20261119T185148Z/`. El túnel anterior pertenece a otra cuenta y no debe restaurarse como destino del dominio.

Los registros de correo se conservaron. La configuración SMTP permanece en `/home/janvier/apps/valma-secrets/smtp.env`.

## Comprobación

Desde cualquier equipo con acceso a Internet:

```sh
curl -I https://ingenieriavalma.com/
curl -I https://www.ingenieriavalma.com/
curl https://ingenieriavalma.com/health
```

Se esperan respuestas HTTP 200 y `{"ok":true}` para `/health`.

En el servidor:

```sh
docker ps --filter name=valma --format 'table {{.Names}}\t{{.Status}}'
curl -s http://127.0.0.1:20244/metrics
```

El conector dispone de cuatro conexiones; `cloudflared_tunnel_request_errors` permite comprobar errores de solicitudes. Si el dominio vuelve a mostrar 1033, revisar primero la cuenta y el destino CNAME, y después el estado del conector. No reiniciar los túneles de otros servicios.

Este documento es operativo y no se incluye en la imagen pública del sitio.

## Corrección de carga de imágenes, 19 de noviembre de 2026

- Imagen web activa: `valma-sitio:assets-20261119b`.
- Esta versión fue sustituida posteriormente por la publicación de contacto y cobertura descrita abajo.
- Fuentes de esa publicación: `/home/janvier/apps/valma-assets-20261119/`.
- Contenedor anterior conservado y detenido: `valma-sitio-before-assets-20261119`, con reinicio desactivado.
- Se comprobó que las 50 imágenes públicas responden con HTTP 200 y coinciden con los archivos locales; no había archivos de imagen dañados.
- El carrusel descarga como máximo cuatro imágenes a la vez, con prioridad baja, espera su decodificación antes de iniciar el movimiento y evita solicitar el directorio `/images/`, que no tiene listado público. La portada tiene prioridad alta.
- Chrome conservaba un service worker `/sw.js` recibido el 10 de noviembre del alojamiento anterior. El nuevo `sw.js` toma el control sin interceptar solicitudes y se desregistra; `site-update.js` solicita la actualización solo si existe ese registro antiguo. No se borran cookies, almacenamiento local ni formularios.
- La URL del JavaScript del carrusel incluye una versión para evitar reutilizar la copia anterior del CDN.
- Validación en Chrome: escritorio y móvil emulado de 400 px; con caché desactivada y Slow 4G las 50 imágenes terminaron con HTTP 200, sin reintentos en la versión final. Se comprobó movimiento del carrusel y navegación de los logos de clientes. La única solicitud fallida fue el beacon externo de estadísticas de Cloudflare (`ERR_ADDRESS_INVALID`); no es un recurso necesario para mostrar el sitio.
- Las cinco pruebas automatizadas del servidor pasan usando correo simulado; no se enviaron nuevos correos reales durante esta revisión.

## Cobertura por estados y contacto, 19 de noviembre de 2026

- Imagen activa: `valma-sitio:contacto-20261119`.
- Fuentes: `/home/janvier/apps/valma-contacto-20261119/`.
- Respaldo detenido: `valma-sitio-before-contacto-20261119`, con reinicio desactivado. Conserva la versión anterior de imágenes.
- Se mantienen el puerto `127.0.0.1:3012`, la configuración privada SMTP y el túnel existente.
- El sitio ahora sirve `contacto-flotante.js` y `assets/contacto/whatsapp-valma.png`. Los cinco HTML utilizan una nueva versión de CSS para evitar estilos anteriores en caché.
- Verificación: cinco pruebas del servidor aprobadas con correo simulado; QR decodificado a tamaño original y 225 px; 15 capitales dentro de su estado; recursos nuevos verificados en el dominio público. Revisión visual local en escritorio y emulación móvil de 400 px y 320 px.
