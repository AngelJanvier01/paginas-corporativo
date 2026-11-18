# Páginas Corporativo

Este repositorio reúne cinco sitios independientes. La página de VALMA ya existe; los demás directorios están preparados para incorporar sus respectivos sitios cuando se disponga de sus archivos y contenidos.

```text
sitios/
  valma/           Sitio de VALMA
  bioteczac/       BiotecZac
  pro-omnimedic/   Pro Omnimedic
  kilatek/         Kilatek
  corporativo-bv/  Corporativo BV
compartido/        Recursos comunes futuros
docs/              Guías de integración corporativa
.agents/skills/    Skills compartidas del repositorio
```

Cada sitio conserva su identidad y se publica de forma independiente, con su propio dominio y configuración. Al desplegar, copia únicamente los archivos públicos necesarios; mantén fuera del directorio público los archivos de contexto (`PRODUCT.md`, `DESIGN.md`, `README.md`) y los directorios ocultos como `.impeccable/`. La carpeta `compartido/` no se incluye automáticamente al publicar: si se utiliza en el futuro, el proceso de publicación tendrá que incorporarla.

## Probar VALMA localmente

Desde la raíz del repositorio:

```powershell
python -m http.server 8000 --directory sitios/valma
```

Abre `http://localhost:8000/`. Las demás carpetas no son sitios funcionales hasta agregar sus archivos.

## Herramientas y contexto

Impeccable y UI/UX Pro Max están instaladas una sola vez en `.agents/skills/`, en la raíz, y pueden utilizarse con cualquiera de los cinco sitios desde este repositorio. Cada marca debe tener su propia información de producto y diseño; los archivos de VALMA están en `sitios/valma/` y no describen a las demás empresas. Las herramientas no ejecutan cambios por sí solas: se invocan para la tarea correspondiente.

Consulta [la guía de sitios y catálogo](docs/GUIA_SITIOS_Y_CATALOGO_CORPORATIVO.md) y [el estándar de vacantes](docs/ESTANDAR_VACANTES_CORPORATIVAS.md). La conexión con la intranet, SICAR y Odoo sigue siendo una propuesta pendiente de implementación.
