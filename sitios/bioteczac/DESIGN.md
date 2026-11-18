---
name: "BiotecZac"
description: "Identidad tecnológica de Servicios y Equipos en Biotecnología de Zacatecas."
colors:
  night: "#080e22"
  blue: "#1557ff"
  blue-hover: "#0641d7"
  cyan: "#33d7ed"
  ink: "#101a32"
  muted: "#526079"
  paper: "#fff"
  ice: "#f1f4fa"
  line: "#cbd2e0"
  input-line: "#8995ab"
  on-dark-body: "#d1def7"
  on-blue-body: "#e7edff"
  night-line: "#34415e"
  error: "#a62337"
  error-surface: "#fff9fa"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(4rem, 7.3vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-.015em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.75rem, 4.8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-.015em"
  title:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-.02em"
  body:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  action:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.4
  navigation:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  field: "4px"
  control: "6px"
  equipment-image: "12px"
spacing:
  field-gap: "8px"
  control-inset: "12px"
  text-rhythm: "18px"
  content-gap: "20px"
  section-heading-gap: "40px"
  gutter: "clamp(24px, 4.5vw, 72px)"
  section: "clamp(64px, 7vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-white:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-white-hover:
    backgroundColor: "{colors.cyan}"
    textColor: "{colors.night}"
  text-link:
    textColor: "{colors.blue}"
    padding: "6px 0"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px"
  input-invalid:
    backgroundColor: "{colors.error-surface}"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "18px 0"
  product-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "25px 0"
  message-preview:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "20px"
  contact-channel:
    textColor: "{colors.ink}"
    padding: "18px 28px 18px 0"
---

# Design System: BiotecZac

## Overview

**Creative North Star: "Pabellón de tecnología biomédica"**

BiotecZac se presenta como un pabellón de tecnología biomédica: fondos de noche, azul intenso, acentos cian y titulares condensados de gran escala. La composición es atrevida, con superficies amplias y una navegación blanca que conserva una referencia estable. La identidad corresponde a Servicios y Equipos en Biotecnología de Zacatecas.

La fotografía panorámica de equipo convive con contenido abierto, divisores y controles compactos. Instrument Sans sostiene la lectura y el trabajo de consulta; Barlow Condensed da presencia a los titulares. Este sistema describe la implementación terminada en `index.html`, `catalogo.html`, `bioteczac.css` y `bioteczac.js`; las decisiones propias de esas páginas permanecen en `.impeccable/surfaces/index-html.md`.

**Key Characteristics:**

- Azul intenso y fondo de noche como superficies de marca; cian para énfasis sobre oscuro.
- Barlow Condensed en titulares e Instrument Sans en lectura y controles.
- Navegación lateral blanca en escritorio y cabecera compacta en tablet y celular.
- Fotografía panorámica, filas abiertas y acordeones nativos con divisores.
- Logotipo suministrado en `assets/logo-bioteczac-transparente.png`, sin deformación; original conservado.

## Colors

Azul eléctrico, noche y cian sostienen la presencia tecnológica; blanco y hielo facilitan la lectura y la consulta.

### Primary

- **Azul intenso** (`blue`): superficies de conversión y cobertura, botones, enlaces, selección de texto y estados activos.
- **Azul de interacción** (`blue-hover`): respuesta del botón principal al pasar el puntero.

### Secondary

- **Cian luminoso** (`cyan`): énfasis de titulares sobre noche, enlaces en secciones oscuras y foco sobre noche o azul; también el hover del botón blanco.

### Neutral

- **Noche** (`night`): escenarios de equipo y catálogo.
- **Tinta** (`ink`) y **texto secundario** (`muted`): lectura sobre superficies claras.
- **Blanco** (`paper`) e **hielo** (`ice`): navegación, contenido y espacio de consulta.
- **Divisor claro** (`line`), **borde de campo** (`input-line`) y **divisor nocturno** (`night-line`): límites funcionales.
- **Lectura sobre noche** (`on-dark-body`) y **lectura sobre azul** (`on-blue-body`): párrafos secundarios sobre fondos intensos.
- **Error** (`error`) y **fondo de error** (`error-surface`): validación textual y visual de campos; el color acompaña un mensaje.

**The Acción con contraste Rule.** Usar azul con texto blanco sobre superficies claras; usar el botón blanco sobre noche o azul. En los fondos oscuros y azules, el foco visible es cian.

## Typography

**Display Font:** Barlow Condensed, con respaldo sans-serif. Archivo local de peso 700.
**Body Font:** Instrument Sans, con respaldo sans-serif. Archivo local variable de pesos 400–700.

La condensación y las mayúsculas dan presencia a los títulos; la familia de lectura conserva una voz clara y cercana. Ambos archivos se cargan con `font-display: swap`.

### Hierarchy

- **Display:** token `display`; portada con interlineado específico de 0.94 y 0.98 en celular.
- **Headline:** token `headline`; títulos de sección en mayúsculas. Las opciones de compra y renta usan la misma familia, con escala `clamp(3rem, 5vw, 4.5rem)`.
- **Title:** token `title`; nombres de familias y subtítulos. En el formulario, el interlineado es 1.3.
- **Body:** token `body`; párrafos con anchos observados de 38–65ch según el bloque. Las descripciones generales pasan a 16px en celular.
- **Label / Action / Navigation:** tokens correspondientes; etiquetas persistentes y acciones legibles. Campos de entrada a 16px y 1.5 de interlineado.

**The Dos voces Rule.** Reservar Barlow Condensed en mayúsculas para titulares y grandes opciones de compra o renta. Mantener Instrument Sans en lectura, navegación, formularios y acciones.

## Layout

En escritorio, un riel fijo blanco de 194px ocupa el lado izquierdo y el contenido comienza a su derecha. El margen lateral y el espacio vertical de sección son fluidos mediante `gutter` y `section`. Las imágenes panorámicas atraviesan el área de contenido; los textos, filas y formularios comparten su alineación interior.

- **Desde 1600px:** el contenido interior se centra con una referencia de 1240px; la fotografía de portada tiene un máximo de 1400px.
- **De 901px a 1150px:** el riel baja a 170px y el margen lateral a 32px. Los encabezados se apilan; la consulta usa una columna.
- **Hasta 900px:** el riel se convierte en cabecera sticky, de al menos 88px; margen de 28px y espacio de sección de 64px. El menú se despliega con JavaScript y permanece accesible sin él.
- **Hasta 600px:** cabecera de al menos 82px, margen de 22px y secciones de 54px. Acordeones, compra/renta, acerca de y campos se apilan; las acciones principales de consulta ocupan el ancho disponible.

El detalle de productos usa una relación 1.35:1; el formulario de escritorio, 0.85:1.15. El correo del bloque de ayuda de catálogo conserva el ancho necesario para leerse mediante un grupo de acciones que no se contrae.

## Elevation & Depth

La profundidad procede de alternar noche, azul, blanco e hielo, con fotografía y divisores finos. La cabecera móvil se integra en el flujo y se mantiene visible al desplazarse; no añade sombra.

**The Profundidad tonal Rule.** Separar las superficies mediante color, espacio y divisores. La interfaz implementada no utiliza sombras.

## Shapes

Las grandes superficies son rectangulares. Los controles usan esquinas discretas del token `control`; los campos, `field`; las imágenes dentro de los acordeones, `equipment-image`. Los bordes funcionales son de 1px. Los iconos son SVG de trazo, normalmente de 22px con grosor 1.7; nunca sustituyen el texto de una acción.

## Components

### Buttons

Acciones sólidas y compactas. El botón azul y su variante blanca comparten un mínimo de 50px de altura, espacio entre texto e icono de 22px y los tokens del frontmatter. El hover cambia el fondo durante 0.18s con `ease-out`. El foco tiene contorno de 3px y separación de 5px; su color depende de la superficie.

### Text links

Enlaces abiertos con flecha SVG, área mínima de 44px y subrayado al pasar el puntero. Son azules en claro y cian dentro de las opciones de equipo sobre noche. El texto y el icono conservan un espacio de 18px.

### Product accordions

Filas nativas `details/summary` entre divisores. El título y el icono pasan a azul al abrir; el signo de suma gira 45° durante 0.2s. Las familias se leen en dos columnas; en celular la imagen aparece antes de la descripción. No necesitan JavaScript para abrirse.

### Inputs / Fields

Campos blancos, borde visible, etiquetas persistentes y separación de 8px entre etiqueta y control. Los errores usan borde, fondo suave y mensaje junto al campo. El área de texto permite ajuste vertical y parte de 148px de altura. No hay un estado disabled diseñado en la implementación actual.

### Navigation

Riel blanco con enlaces separados por líneas; el enlace activo y el hover son azules. La flecha aparece en hover, foco o página actual. Hasta 900px se transforma en menú expandible; hasta 600px, los enlaces se apilan y sus flechas permanecen visibles. Escape cierra el menú y devuelve el foco al botón.

### Contact and message preview

Los canales de contacto se presentan como filas abiertas con etiqueta secundaria, dato destacado e icono direccional. El borrador de mensaje usa una superficie blanca con borde y radio de control; preserva saltos de línea y permite romper texto largo. La revisión conserva acciones para abrir WhatsApp, abrir correo y editar: todavía no confirma recepción.

Toda transición y animación se desactiva con `prefers-reduced-motion: reduce`; el desplazamiento suave pasa a automático.

## Do's and Don'ts

### Do:

- **Do** conservar la proporción y transparencia del logotipo suministrado.
- **Do** usar los tokens propios de BiotecZac y las dos familias locales.
- **Do** mantener foco visible, etiquetas persistentes y errores junto al campo.
- **Do** respetar movimiento reducido y los acordeones nativos.
- **Do** identificar la fotografía de equipo como ilustrativa.

### Don't:

- **Don't** reutilizar la identidad visual, logotipos o datos de otras empresas.
- **Don't** estirar el logotipo ni sustituirlo por una marca generada.
- **Don't** presentar el catálogo pendiente, la fotografía ilustrativa o el borrador de consulta como inventario o envío confirmado.

