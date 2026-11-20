"""Genera la sección de marcas desde los logos y sus textos, sin dependencias.

Uso desde la raíz del repositorio: python sitios/bioteczac/tools/actualizar_marcas.py
Los archivos nuevos usan su nombre como marca y una descripción de consulta general.
Personaliza nombre, descripción y líneas en assets/marcas-provv/marcas.json.
"""

import json
import re
import unicodedata
from html import escape
from pathlib import Path
from urllib.parse import quote

SITE = Path(__file__).resolve().parents[1]
START = "<!-- marcas:start -->"
END = "<!-- marcas:end -->"
FORMATS = {".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg", ".bmp"}


def sort_key(value):
    return "".join(c for c in unicodedata.normalize("NFD", value.casefold()) if not unicodedata.combining(c))


def read_brands(folder):
    metadata_file = folder / "marcas.json"
    metadata = json.loads(metadata_file.read_text(encoding="utf-8-sig")) if metadata_file.exists() else {}
    brands = []
    for logo in sorted(folder.iterdir(), key=lambda file: file.name.casefold()):
        if not logo.is_file() or logo.suffix.lower() not in FORMATS or logo.name.startswith("."):
            continue
        item = metadata.get(logo.name, {})
        if item.get("enabled") is False:
            continue
        name = item.get("name") or re.sub(r"[_-]+", " ", logo.stem).strip()
        description = item.get("description") or f"¿Buscas un producto de {name}? Cuéntanos qué necesitas y revisamos las opciones contigo."
        lines = item.get("lines", [])
        if not isinstance(name, str) or not isinstance(description, str) or not isinstance(lines, list) or not all(isinstance(line, str) for line in lines):
            raise ValueError(f"Revisa los datos de {logo.name} en marcas.json")
        brands.append({"name": name, "description": description, "lines": lines,
                       "logo": "assets/marcas-provv/" + quote(logo.name)})
    return sorted(brands, key=lambda brand: sort_key(brand["name"]))


def render_section(brands):
    entries = []
    for brand in brands:
        name = escape(brand["name"], quote=True)
        description = escape(brand["description"], quote=True)
        lines = escape(json.dumps(brand["lines"], ensure_ascii=False), quote=True)
        entries.append(
            f'<li class="brand-item"><a class="brand-choice" href="#contacto" data-interest="venta" data-brand="{name}" '
            f'data-description="{description}" data-lines="{lines}">'
            f'<span class="brand-logo"><img src="{escape(brand["logo"], quote=True)}" alt="" loading="lazy" decoding="async"></span>'
            f'<span class="brand-name">{name}</span><span class="brand-choice-label">Ver marca</span></a></li>'
        )
    return '''<section id="marcas" class="brands section-pad" aria-labelledby="brands-title">
<div class="section-heading"><h2 id="brands-title">Marcas con las<br>que trabajamos.</h2><p>Para tu casa, tu consultorio, tu veterinaria o tu negocio. Elige una marca y descubre qué puedes consultar con nosotros.</p></div>
<div id="brand-tools" class="brand-tools" hidden><div class="brand-search"><label for="brand-search">Buscar marca</label><input id="brand-search" type="search" placeholder="Escribe el nombre de una marca" autocomplete="off" aria-controls="brand-grid"><button id="brand-clear" class="text-link" type="button" hidden>Limpiar búsqueda</button></div><p id="brand-count" class="brand-count" role="status" aria-live="polite" aria-atomic="true"></p></div>
<ul id="brand-grid" class="brand-grid" aria-label="Marcas disponibles para consulta">
''' + "\n".join(entries) + '''
</ul>
<div id="brand-empty" class="brand-empty" hidden><h3>No encontramos esa marca.</h3><p>Prueba con otro nombre o cuéntanos qué buscas.</p><button class="text-link" type="button" id="brand-reset">Ver todas las marcas</button><a class="text-link" href="#contacto">Consultar otra marca</a></div>
<div id="brand-pages" class="brand-pages" role="group" aria-label="Páginas de marcas" hidden><button id="brand-prev" class="brand-page-button" type="button" aria-controls="brand-grid">Anterior</button><span id="brand-page-number"></span><button id="brand-next" class="brand-page-button" type="button" aria-controls="brand-grid">Siguiente</button></div>
<section id="brand-detail" class="brand-detail" aria-labelledby="brand-title" hidden><div><p class="brand-eyebrow">Conoce la marca</p><h3 id="brand-title" tabindex="-1"></h3><p id="brand-description"></p><ul id="brand-lines" class="brand-lines" aria-label="Líneas de la marca"></ul></div><div class="brand-detail-actions"><a id="brand-quote" class="button" href="#contacto" data-interest="venta" data-brand="">Consultar productos</a><button id="brand-back" class="text-link" type="button">Volver a las marcas</button></div></section>
<p class="brand-note">Los productos, modelos y disponibilidad se confirman al cotizar.</p>
<noscript><p>Selecciona una marca para ir a nuestros medios de contacto y consultar sus productos.</p></noscript>
</section>'''


def main():
    brands = read_brands(SITE / "assets" / "marcas-provv")
    path = SITE / "index.html"
    original = path.read_bytes().decode("utf-8")
    if original.count(START) != 1 or original.count(END) != 1:
        raise ValueError("No se encontraron los marcadores únicos de la sección de marcas")
    newline = "\r\n" if "\r\n" in original else "\n"
    start = original.index(START) + len(START)
    end = original.index(END, start)
    content = original[:start] + newline + render_section(brands).replace("\n", newline) + newline + original[end:]
    if content != original:
        path.write_bytes(content.encode("utf-8"))
    print(f"Sección actualizada: {len(brands)} marcas.")


if __name__ == "__main__":
    main()
