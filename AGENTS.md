# Sitios del corporativo

Este repositorio contiene sitios independientes en `sitios/`. Las skills instaladas en `.agents/skills/` son compartidas y se usan desde la raíz para trabajar en cualquiera de ellos.

- Antes de modificar un sitio, lee su propio `PRODUCT.md`, `DESIGN.md` y documentación, si existen. No uses los de VALMA como identidad de otra empresa.
- Conserva dominios, logotipos, textos, correos y datos fiscales propios de cada empresa. No inventes información ni copies datos de VALMA a otras empresas.
- Cada sitio se publica desde su carpeta. Mantén sus rutas y archivos necesarios dentro de esa carpeta, salvo que su proceso de publicación incluya explícitamente recursos compartidos.
- La intranet corporativa es un proyecto separado. Las conexiones de vacantes y catálogo están documentadas como propuestas, no como funciones ya implementadas.
- `compartido/` se reserva para recursos realmente comunes. Comprueba cómo los consume cada sitio antes de incorporarlos y verifica los sitios afectados después de cambiarlos.
- Para Impeccable, ejecuta desde la raíz `.agents/skills/impeccable/scripts/impeccable.cmd context --target sitios/<sitio>/<archivo>` en Windows y utiliza el contexto del sitio indicado.
