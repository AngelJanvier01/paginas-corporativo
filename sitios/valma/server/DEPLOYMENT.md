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
