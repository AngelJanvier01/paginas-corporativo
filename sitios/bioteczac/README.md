# BiotecZac

Sitio institucional de **Servicios y Equipos en Biotecnología de Zacatecas**: insumos para la salud, venta y renta de equipo médico, con sede en Zacatecas y servicio nacional. HTML, CSS y JavaScript sin dependencias de ejecución ni compilación.

## Estado y alcance

- Identidad tecnológica propia: azul noche, azul eléctrico y cian, navegación lateral en escritorio y cabecera compacta en móvil. Logotipo con transparencia, tipografías Barlow Condensed e Instrument Sans alojadas localmente.
- `index.html`: líneas de productos desplegables, compra/renta, cobertura, presentación de la empresa y consulta comercial.
- `catalogo.html`: catálogo **en construcción**. Las familias ilustradas son contenido institucional; no representan inventario, precios ni existencias.
- El formulario valida los campos y prepara un mensaje para revisar. El visitante lo envía desde WhatsApp o su aplicación de correo. No hay backend, persistencia ni envío automático.
- Contacto confirmado: `coord.zac@bioteczac.com`, WhatsApp `4922937465` (enlace internacional `524922937465`).
- Odoo es la fuente prevista para el catálogo futuro. No existe integración ni API implementada. La futura conexión debe resolverse en el servidor, sin credenciales en el navegador.
- Construcción local. No se ha publicado ni configurado un dominio para esta entrega.

## Vista previa

Con el servidor del repositorio en puerto 2222:
http://127.0.0.1:2222/sitios/bioteczac/

También puede servirse de forma independiente desde la raíz del repositorio:

```powershell
python -m http.server 8001 --directory sitios/bioteczac
```

Abrir http://localhost:8001/. Todas las rutas de ejecución son relativas y todos los recursos residen dentro del sitio.

## Archivos para publicación

```text
index.html
catalogo.html
bioteczac.css
bioteczac.js
assets/logo-bioteczac-transparente.png
assets/tecnologia-medica.webp
assets/equipo-medico.webp
assets/insumos.webp
assets/laboratorio.webp
assets/mexico.svg
assets/fonts/barlow-condensed-bold.ttf
assets/fonts/instrument-sans.ttf
assets/fonts/OFL-BarlowCondensed.txt
assets/fonts/OFL-InstrumentSans.txt
```

Conservar las licencias de fuentes. Excluir documentación, `.impeccable/`, sidecars y archivos de trabajo. El original `LOGO BIOTEC.png` se conserva intacto; la versión transparente fue obtenida por edición generativa y optimizada para web. Los activos anteriores no incluidos en esta lista no son necesarios para publicar.

## Verificación

Chrome mediante Playwright, en 1471, 1024, 768, 390 y 320 px, para ambas páginas: sin desbordamientos horizontales, imágenes rotas ni errores de carga o JavaScript detectados. Se probaron fuentes locales, menú con Escape, desplegables por teclado, selección de renta, errores de formulario, preparación y edición del mensaje, codificación de acentos y destinos externos. También se revisó el uso sin JavaScript y con movimiento reducido.

No se enviaron mensajes ni se verificó entrega externa. Las capturas de revisión están en `.impeccable/review/` y no se publican.

## Referencias

- [PRODUCT.md](PRODUCT.md): alcance y datos confirmados.
- [DESIGN.md](DESIGN.md) y [.impeccable/design.json](.impeccable/design.json): sistema visual.
- [.impeccable/surfaces/index-html.md](.impeccable/surfaces/index-html.md): dirección de estas páginas.
- [assets/FUENTES.md](assets/FUENTES.md): procedencia de imágenes, logo, tipografías y mapa.
