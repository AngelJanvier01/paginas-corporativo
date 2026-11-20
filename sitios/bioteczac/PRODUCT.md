# BiotecZac

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS y JavaScript. El usuario delegó la elección del stack y pidió una web potente, de buen gusto y bonita. Se elige una implementación estática ligera para esta fase, con posibilidad de añadir la integración de catálogo más adelante.

## Product Purpose

Presentar BiotecZac, su oferta de insumos para la salud y la venta y renta de equipos médicos. Facilitar el contacto para cotización. El catálogo detallado no se ofrece al público hasta contar con productos reales; se cotiza por línea.

## Positioning

Empresa situada en Zacatecas con servicio a nivel nacional. El usuario confirma una oferta amplia de insumos para la salud y equipos médicos para venta y renta.

## Users

Público confirmado por el usuario: cualquier persona que necesite insumos o equipo. Incluye particulares, familias, profesionales, consultorios, veterinarias, laboratorios, negocios, empresas e instituciones. La comunicación no debe limitar las ventas a instituciones ni exigir pertenecer a una organización.

## Capabilities and Constraints

- Sitio completamente adaptable a celular, tablet y escritorio.
- Sección de marcas escalable: búsqueda por nombre, páginas de 12 logos y ficha por marca. La consulta conserva marca y línea de producto de forma independiente. Incorporación de imágenes mediante `tools/actualizar_marcas.py`, con textos en `assets/marcas-provv/marcas.json`.
- Las 18 subcategorías llevan a una consulta contextualizada; cobertura descrita como atención a solicitudes de todo México desde Zacatecas.
- Contenido de alcance similar al sitio de VALMA, con diseño e identidad propios.
- Instrucción actual (20/11/2026): retirar el catálogo del menú y de las promesas públicas mientras no esté listo. `catalogo.html` conserva una redirección a contacto para enlaces antiguos. No hay pago en línea; las líneas generales no son inventario.
- Odoo será la fuente futura del catálogo; todavía no hay conexión, API ni sincronización implementadas. No presentar las propuestas de vacantes o catálogo corporativo como funciones existentes.
- No publicar direcciones, números telefónicos, correos comerciales, años de experiencia, marcas representadas, certificaciones o sucursales sin confirmación.
- Contacto comercial confirmado: `coord.zac@bioteczac.com`, WhatsApp y llamadas `4922937465` (México, enlace internacional `524922937465`).
- Dirección confirmada con la constancia proporcionada por el usuario: Calle Llano de la Isabelica 3000, Fracc. Lomas de la Isabelica, C.P. 98099, Zacatecas, Zacatecas. No se publica la constancia ni su RFC.
- Redes sociales confirmadas por el usuario: Facebook `https://www.facebook.com/BiotecZac/` e Instagram `https://www.instagram.com/bioteczac/`.
- Horario confirmado por el usuario: lunes a viernes de 9:00 a 17:00 h, hora central.
- Condiciones de compra/renta, entrega, garantías y servicios sujetos a cotización; sin políticas, certificaciones ni clientes documentados para publicarlos.
- Construcción local en esta fase. Los mensajes se preparan en el navegador y el visitante decide enviarlos por WhatsApp o correo. El formulario exige un teléfono o correo válido, interés explícito y consentimiento; incluye esos datos en el borrador. No hay recepción ni almacenamiento de solicitudes en el sitio. El usuario confirmó el dominio previsto `bioteczac.com`, pero aclaró expresamente que todavía NO debe publicarse ni cambiarse DNS.

## Brand Commitments

- Nombre comercial: BiotecZac.
- Nombre completo: Servicios y Equipos en Biotecnología de Zacatecas. La constancia proporcionada el 20/11/2026 confirma Sociedad Anónima de Capital Variable (S.A. de C.V.); se usa en el aviso de privacidad.
- Dirección visual elegida por el usuario: tecnológica, con azul intenso, contraste oscuro y composición atrevida. Navegación lateral en escritorio, tipografía condensada y presentación panorámica de equipo médico.
- Base de la nueva identidad: `LOGO BIOTEC.png`, proporcionado por el usuario. Preservar el logotipo.
- Se autoriza retirar el fondo del logotipo y crear una versión PNG con transparencia; conservar el archivo original.
- Voz cercana, clara y profesional en español de México.
- Diferente de VALMA; no reutilizar su identidad, datos comerciales o fiscales.

## Evidence on Hand

- Solicitud del usuario en esta conversación: sede en Zacatecas, servicio nacional, insumos para la salud, venta y renta de equipos médicos.
- Logotipo de BiotecZac y logos de marcas/proveedores proporcionados por el usuario. Las imágenes de equipos siguen siendo ilustrativas.
- Respuestas del usuario: futura fuente Odoo, contactos comerciales, dirección en su constancia, horario, condiciones sujetas a cotización y desarrollo local sin publicar. No se recibieron fotos propias adicionales.
- `docs/GUIA_SITIOS_Y_CATALOGO_CORPORATIVO.md`: guía de arquitectura, no fuente de productos o API existente.
- El usuario proporcionó logos de 3M Health Care, Hergom y Zegen en `assets/marcas-provv/` como marcas/proveedores que maneja y confirmó que se agregarán muchas más. Las descripciones generales se contrastaron con sus sitios oficiales; no se afirma distribución autorizada ni stock.
- No se ha entregado una lista de SKU, precios ni existencias para BiotecZac. Los ejemplos se presentarán como familias para consulta.

## Product Principles

- Permitir encontrar una familia de productos y explicar la necesidad en pocos pasos.
- Separar claramente compra y renta sin prometer disponibilidad inmediata.
- Mantener todos los recursos de publicación dentro de esta carpeta.
- No simular recepción de solicitudes ni pedidos.
