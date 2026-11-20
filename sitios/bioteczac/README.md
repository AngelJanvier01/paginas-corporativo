# BiotecZac

Sitio comercial de **Servicios y Equipos en Biotecnología de Zacatecas**: insumos para la salud, venta y renta de equipo médico, para particulares, profesionales, consultorios, veterinarias, negocios e instituciones, con base en Zacatecas y atención en todo México. HTML, CSS y JavaScript sin dependencias de ejecución ni compilación.

## Estado y alcance

- Identidad tecnológica propia: azul noche, azul eléctrico y cian, navegación lateral en escritorio y cabecera compacta en móvil. Logotipo con transparencia, tipografías Barlow Condensed e Instrument Sans alojadas localmente.
- `index.html`: líneas de productos desplegables, explorador de marcas, compra/renta, cobertura, presentación de la empresa y consulta comercial.
- El catálogo no se anuncia ni aparece en navegación. `catalogo.html` redirige a `index.html#contacto` para conservar enlaces antiguos. Las 18 subcategorías preparan consultas con la línea seleccionada; no representan modelos, precios ni existencias.
- `aviso-privacidad.html`: aviso propio para el flujo real de consulta. `terminos.html`: condiciones de compra/renta sujetas a cotización, sin cifras ni servicios garantizados.
- El formulario exige nombre, ciudad, consulta, interés sin preselección, al menos un teléfono o correo válido y consentimiento. Si se proporcionan ambos medios de contacto, ambos se validan y se incluyen en el mensaje. La categoría seleccionada es visible y puede quitarse sin borrar el texto del visitante. Prepara un mensaje para revisar. El visitante lo envía desde WhatsApp o su aplicación de correo. No hay backend, persistencia ni envío automático.
- Contacto confirmado: `coord.zac@bioteczac.com`, WhatsApp y llamadas `4922937465` (enlace internacional `524922937465`).
- Odoo es la fuente prevista para el catálogo futuro. No existe integración ni API implementada. La futura conexión debe resolverse en el servidor, sin credenciales en el navegador.
- **Solo desarrollo local. No publicar todavía**, según la aclaración expresa del usuario del 20/11/2026. Dominio futuro confirmado: `bioteczac.com`; servidor previsto: `192.168.0.143`. Esta entrega no cambia DNS, túneles ni servicios en producción.
- Dirección y horario figuran en contacto y pie; datos y procedencia en `PRODUCT.md`. No distribuir la constancia fiscal con el sitio.

## Vista previa

Con el servidor del repositorio en puerto 2222:
http://127.0.0.1:2222/sitios/bioteczac/

También puede servirse de forma independiente desde la raíz del repositorio:

```powershell
python -m http.server 8001 --bind 127.0.0.1 --directory sitios/bioteczac
```

Abrir http://localhost:8001/. Todas las rutas de ejecución son relativas y todos los recursos residen dentro del sitio.

## Archivos para publicación

```text
index.html
catalogo.html
aviso-privacidad.html
terminos.html
bioteczac.css
bioteczac.js
marcas.css
marcas.js
assets/marcas-provv/ (logos de las marcas publicadas)
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

Revisión del 20/11/2026 en Chromium con el Playwright ya instalado en el equipo. El plugin Browser no estaba disponible; se utilizó la alternativa local. Sin instalar dependencias y sin build/lint configurados para este sitio estático.

- Inicio: 360, 390, 768, 1024 y 1920 px, con desplazamiento real por todas las secciones y los tres acordeones abiertos; imágenes y fuentes cargadas, sin scroll horizontal ni errores de consola/red detectados.
- Menú móvil: abrir/cerrar, Escape con devolución de foco y navegación a contacto. Formularios, imágenes y pie revisados visualmente.
- Formulario: vacío, contacto ausente, teléfono/correo inválidos, teléfono solo, correo solo, ambos, consentimiento, opción neutral, vista previa, edición, 18 subcategorías y contenido codificado en WhatsApp/mailto. No se enviaron mensajes ni se afirmó entrega externa.
- Aviso y términos: 360, 390 y 1920 px. Enlace antiguo redirige a contacto. Sin JavaScript siguen disponibles navegación, acordeones y contacto directo.
- Todas las rutas locales y anclas comprobadas. WhatsApp redirige al número confirmado y la página de INEGI respondió HTTP 200. Mailto verificado por destino y contenido; sin envío externo.
- Contraste calculado: texto principal del pie/riel sobre blanco 17.27:1; texto secundario sobre fondo claro 5.76:1; enlaces azules sobre fondo claro 4.96:1.
- `node --check sitios/bioteczac/bioteczac.js` y `git diff --check` sin errores.
- Evidencia local fuera del repositorio: `%TEMP%/bioteczac-qa/`; script de verificación `%TEMP%/bioteczac-qa.cjs`. No se distribuyen con el sitio.

## Pendientes de contenido

No se publican productos, modelos, marcas, existencias, precios, certificaciones, clientes ni testimonios sin información real autorizada. Las fotografías actuales se identifican como ilustrativas; sustituirlas cuando se entreguen fotos propias. La integración con Odoo y el despliegue quedan pendientes de una solicitud posterior.

El aviso describe la operación de este formulario, no un servicio de recepción automática. Si cambia el flujo (backend, analítica, nuevos datos o finalidades), actualizar el aviso y la validación antes de habilitarlo. Referencia normativa consultada: [LFPDPPP vigente, artículos 14–16](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf).

## Referencias

- [PRODUCT.md](PRODUCT.md): alcance y datos confirmados.
- [DESIGN.md](DESIGN.md) y [.impeccable/design.json](.impeccable/design.json): sistema visual.
- [.impeccable/surfaces/index-html.md](.impeccable/surfaces/index-html.md): dirección de estas páginas.
- [assets/FUENTES.md](assets/FUENTES.md): procedencia de imágenes, logo, tipografías y mapa.

## Agregar marcas y proveedores

1. Copiar los logos a `assets/marcas-provv/`. Se admiten PNG, JPG/JPEG, WebP, AVIF, GIF, SVG y BMP; extensiones en mayúsculas o minúsculas. Usar archivos aptos para navegador y nombres descriptivos.
2. Añadir o ajustar su ficha en `assets/marcas-provv/marcas.json`, usando el nombre exacto del archivo como clave. Campos: `name`, `description`, `lines` (lista de categorías) y `source` (referencia documental). `enabled: false` permite omitir una imagen. No publicar disponibilidad o autorizaciones comerciales sin confirmación.
3. Ejecutar desde la raíz del repositorio:

```powershell
python sitios/bioteczac/tools/actualizar_marcas.py
```

El script detecta las imágenes de la carpeta y actualiza únicamente el bloque `marcas:start` / `marcas:end` de `index.html`. No requiere instalar paquetes. Una imagen sin ficha usa el nombre del archivo y un texto genérico de consulta; no se inventan características. La actualización no ocurre solo por copiar archivos: ejecutar el comando y recargar la vista previa. Revisar nombres y descripciones antes de publicar.

El navegador busca por nombre sin distinguir acentos o mayúsculas y muestra hasta 12 marcas por página, con logos sin deformar y carga diferida. Seleccionar una marca muestra su ficha; «Consultar productos» la lleva al formulario. Marca y línea se pueden quitar por separado sin perder la consulta escrita. La organización es opcional para atender también a particulares. Sin JavaScript, todos los logos enlazan al contacto directo.

Fuentes de las tres fichas iniciales en `assets/FUENTES.md`. `marcas.json` y `tools/` son archivos de mantenimiento; el sitio publicado consume el HTML generado, las dos hojas de estilos, los dos scripts y los logos, sin llamadas a APIs ni dependencia del listado de carpetas del servidor. Esta sección sigue en desarrollo local.

Verificación de la sección de marcas: Chromium/Playwright local (Browser plugin no disponible), anchos 320, 390, 768, 1024 y 1440 px; selección táctil y por teclado, búsqueda, estado sin resultados y envío de marca a la vista previa sin borrar datos. Prueba temporal externa al repositorio con 52 marcas: cinco páginas de 12, búsquedas con acentos/mayúsculas, vuelta a la primera página y nombres largos. Las tres fichas reales y los 170 enlaces/recursos locales pasaron la revisión; sin errores de aplicación. La revisión general de inicio, imágenes, formulario y páginas legales también pasó hasta 1920 px. No se enviaron mensajes ni se publicó el sitio. Scripts y capturas en `%TEMP%/bioteczac-qa/` y `%TEMP%/bioteczac-brands-qa.cjs`; prueba móvil emulada, sin Safari físico.
