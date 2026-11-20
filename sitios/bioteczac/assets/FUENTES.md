# Fuentes y procedencia de activos

Entrega local del 18 de noviembre de 2026. Los recursos de ejecución residen en esta carpeta; documentos y sidecars son material de trabajo.

| Archivo | Procedencia y tratamiento | Uso |
| --- | --- | --- |
| `logo-bioteczac-transparente.png` | Edición con `image_gen.imagegen` del original `../LOGO BIOTEC.png` proporcionado por el usuario. Fondo retirado con transparencia real; marca conservada visualmente, sin afirmar igualdad de píxeles. Optimización web a 508 × 378 PNG RGBA. Original intacto. | Cabecera, pie e icono. |
| `tecnologia-medica.webp` | Generación independiente con `image_gen.imagegen`. Escena panorámica genérica de equipo médico sobre fondo oscuro. Conversión a WebP, 2172 × 724. | Portada. |
| `equipo-medico.webp` | Generación independiente de equipo médico genérico, convertida a WebP. | Desplegable de equipo médico. |
| `insumos.webp` | Generación independiente de materiales de curación y consumibles genéricos, convertida a WebP. | Desplegable de insumos. |
| `laboratorio.webp` | Generación independiente de microscopio y centrífuga genéricos, convertida a WebP. | Desplegable de laboratorio y mobiliario. |
| `fonts/barlow-condensed-bold.ttf` | [Barlow Condensed en Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlowcondensed). Licencia SIL Open Font License 1.1 en `fonts/OFL-BarlowCondensed.txt`. | Títulos grandes. |
| `fonts/instrument-sans.ttf` | [Instrument Sans en Google Fonts](https://github.com/google/fonts/tree/main/ofl/instrumentsans). Licencia SIL Open Font License 1.1 en `fonts/OFL-InstrumentSans.txt`. | Cuerpo, controles y etiquetas. |
| `mexico.svg` | Geometría estatal reutilizada del SVG existente en VALMA. Fuente documentada del recurso: [Catálogo Único de INEGI](https://www.inegi.org.mx/servicios/catalogoUnico.html), corte diciembre de 2025. Colores propios y Zacatecas destacado. | Base en Zacatecas; atención a solicitudes de todo México. |

Las imágenes de equipo y materiales son **ilustrativas**, no fotografías de inventario, instalaciones, marcas representadas ni productos disponibles. Son activos independientes, no recortes de un concepto de página. Prompts en [provenance.json](provenance.json), [provenance-v2.json](provenance-v2.json), metadata PNG y sidecars WebP.

El mapa mantiene atribución visible a INEGI. Solo se reutiliza geometría: no incluye sucursales, identidad ni contactos de VALMA. El corte cartográfico corresponde a la documentación del recurso existente; no se descargó una nueva cartografía para esta entrega.

Los iconos de interfaz son trazos SVG integrados en los HTML. Al distribuir las fuentes, conservar ambas licencias OFL.

Los archivos `logo-bioteczac.png`, `fonts/figtree.ttf` y `fonts/OFL.txt` pertenecen a la versión anterior, no tienen referencias en las páginas actuales y no forman parte de la lista de publicación.

## Marcas y proveedores

Logos proporcionados por el usuario en `marcas-provv/`: `3M_Healthcare.png`, `61dc53cc625ea2e72768a16a_Hergom_logo-01.jpg` y `LOGO_ZEGEN_NUEVO-700x156-1-1.png`. Originales conservados sin modificaciones. Se adaptan con CSS manteniendo la proporción; el logo de 3M recibe un ajuste de encuadre para compensar sus márgenes blancos internos.

Descripciones breves y líneas generales contrastadas el 20/11/2026 con las fuentes de las propias marcas:

- [3M México, productos para cuidado de la salud](https://www.3m.com.mx/3M/es_MX/p/c/i/cuidado-de-la-salud/): cintas, apósitos, primeros auxilios y protección. Se conserva el nombre del logo aportado; no se infiere ninguna relación de distribución autorizada.
- [Hergom, sitio corporativo](https://www.byhergom.com/): equipo, instrumental, suministros, salud/bienestar y rehabilitación.
- [Zegen Medical](https://zegenmedical.com/): diagnóstico, monitoreo y línea veterinaria.

Los textos describen las marcas de forma general. No son un inventario de BiotecZac; productos, modelos y disponibilidad se confirman en cotización. La relación comercial y los logos fueron aportados por el usuario. Las futuras marcas sin ficha reciben solo una invitación genérica a consultar productos.
