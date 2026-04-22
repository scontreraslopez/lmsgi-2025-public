# Cheatsheet: XML y DTD

---

## 1. Declaración XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

- Debe ser la **primera línea** del documento (sin nada antes, ni espacio).
- `encoding` más habitual: `UTF-8` (también `ISO-8859-1` para caracteres latinos).
- Es opcional pero muy recomendable.

---

## 2. Reglas de buena formación (Well-Formed)

Un documento XML está bien formado si cumple:

| Regla | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|
| Un único elemento raíz | `<catalogo>...</catalogo>` | Dos elementos raíz al mismo nivel |
| Todas las etiquetas cerradas | `<item/>` o `<item></item>` | `<item>` sin cerrar |
| Anidación correcta (sin solapamiento) | `<a><b></b></a>` | `<a><b></a></b>` |
| Atributos entre comillas (simples o dobles) | `id="1"` o `id='1'` | `id=1` |
| Case sensitive | `<Libro>` es distinto de `<libro>` | Mezclar mayúsculas/minúsculas |
| Nombre de etiqueta no empieza por número | `<item1>` | `<1item>` |
| Nombre de etiqueta sin espacios | `<mi-elemento>` | `<mi elemento>` |
| Nombre de etiqueta no empieza por `xml` (en mayúsculas o minúsculas) | `<data>` | `<xmlData>` |

---

## 3. Caracteres especiales (Entidades predefinidas)

| Carácter | Entidad | Uso |
|---|---|---|
| `<` | `&lt;` | `precio &lt; 100` |
| `>` | `&gt;` | `valor &gt; 0` |
| `&` | `&amp;` | `H&amp;M` |
| `"` | `&quot;` | Dentro de atributos con comillas dobles |
| `'` | `&apos;` | Dentro de atributos con comillas simples |

```xml
<descripcion>El precio es &lt;10 &amp; disponible &gt; 0</descripcion>
<item nombre="H&amp;M" />
```

---

## 4. Estructura básica de un elemento

```xml
<!-- Elemento con contenido de texto -->
<titulo>El nombre del viento</titulo>

<!-- Elemento vacío (auto-cerrado) -->
<imagen src="foto.jpg" alt="Foto del producto" />

<!-- Elemento con atributos y contenido -->
<libro id="B001" categoria="ficcion" disponible="true">
  <titulo>Dune</titulo>
  <autor>Frank Herbert</autor>
  <precio>15.99</precio>
</libro>

<!-- Elemento con contenido mixto (texto + hijos) -->
<parrafo>Este es un texto con <negrita>énfasis</negrita> incluido.</parrafo>
```

**Reglas de nombres de elementos y atributos:**
- Pueden contener letras, dígitos, `-`, `_`, `.`
- Deben empezar por letra o `_`
- Sin espacios

---

## 5. Sección CDATA

Permite incluir texto con caracteres especiales **sin escapar**.

```xml
<script>
  <![CDATA[
    if (precio < 100 && stock > 0) {
      document.write("Disponible: <b>Sí</b>");
    }
  ]]>
</script>
```

- Todo el contenido entre `<![CDATA[` y `]]>` se trata como texto literal.
- No se pueden anidar secciones CDATA.
- La secuencia `]]>` no puede aparecer dentro del CDATA.

---

## 6. DTD — Declaración de elementos (`<!ELEMENT>`)

```
<!ELEMENT nombre (modelo-de-contenido)>
```

| Modelo de contenido | Significado | Ejemplo |
|---|---|---|
| `(#PCDATA)` | Solo texto (Parsed Character DATA) | `<!ELEMENT titulo (#PCDATA)>` |
| `EMPTY` | Elemento vacío, sin contenido | `<!ELEMENT imagen EMPTY>` |
| `ANY` | Cualquier contenido válido | `<!ELEMENT root ANY>` |
| `(hijo1, hijo2)` | Secuencia exacta y en ese orden | `<!ELEMENT persona (nombre, apellido)>` |
| `(opcion1 \| opcion2)` | Una sola de las opciones | `<!ELEMENT pago (tarjeta \| efectivo)>` |
| `(#PCDATA \| elem)*` | Contenido mixto (texto y/o elementos) | `<!ELEMENT parrafo (#PCDATA \| negrita)*>` |

> En contenido mixto, `#PCDATA` debe ir primero y el grupo lleva `*`.

---

## 7. DTD — Cardinalidad (cuantificadores)

Se aplican a elementos dentro del modelo de contenido:

| Símbolo | Significado | Ejemplo DTD | Instancias válidas |
|---|---|---|---|
| (ninguno) | Exactamente 1 | `(nombre)` | Uno solo, obligatorio |
| `?` | 0 ó 1 (opcional) | `(apellido?)` | Puede aparecer o no |
| `*` | 0 ó más | `(item*)` | Ninguno, uno o varios |
| `+` | 1 ó más | `(linea+)` | Al menos uno |

```
<!ELEMENT catalogo (libro+)>
<!ELEMENT libro (titulo, autor+, precio?, descripcion*)>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT precio (#PCDATA)>
<!ELEMENT descripcion (#PCDATA)>
```

Combinación con opciones:

```
<!ELEMENT contacto (email | telefono)+>
```

---

## 8. DTD — Declaración de atributos (`<!ATTLIST>`)

```
<!ATTLIST elemento  atributo  tipo  modificador>
```

Varios atributos del mismo elemento en un solo `ATTLIST`:

```
<!ATTLIST libro
    id        ID        #REQUIRED
    categoria CDATA     #IMPLIED
    formato   (papel|digital|audio)  "papel"
    version   NMTOKEN   #FIXED "1.0"
>
```

### Tipos de atributo

| Tipo | Descripción | Ejemplo |
|---|---|---|
| `CDATA` | Cualquier texto | `categoria CDATA #IMPLIED` |
| `ID` | Identificador único en el documento | `id ID #REQUIRED` |
| `IDREF` | Referencia a un ID existente | `autor-ref IDREF #IMPLIED` |
| `IDREFS` | Varias referencias a IDs (separadas por espacio) | `tags IDREFS #IMPLIED` |
| `NMTOKEN` | Nombre XML válido (letras, dígitos, `-`, `_`, `.`) | `version NMTOKEN "1"` |
| `NMTOKENS` | Varios NMTOKEN separados por espacio | — |
| `(val1\|val2\|val3)` | Enumeración: solo esos valores | `(papel\|digital)` |

### Modificadores de atributo

| Modificador | Descripción |
|---|---|
| `#REQUIRED` | El atributo es obligatorio |
| `#IMPLIED` | El atributo es opcional (sin valor por defecto) |
| `#FIXED "valor"` | El atributo tiene siempre ese valor (no se puede cambiar) |
| `"valor"` | Valor por defecto si no se especifica |

---

## 9. DTD — DOCTYPE (vinculación)

```xml
<!-- DTD interno (definido en el propio documento) -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE catalogo [
  <!ELEMENT catalogo (libro+)>
  <!ELEMENT libro (titulo, precio)>
  <!ATTLIST libro id ID #REQUIRED>
  <!ELEMENT titulo (#PCDATA)>
  <!ELEMENT precio (#PCDATA)>
]>

<!-- DTD externo local (archivo .dtd en el sistema) -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE catalogo SYSTEM "catalogo.dtd">

<!-- DTD externo público (con identificador público + URL) -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- `SYSTEM`: referencia local o URL directa.
- `PUBLIC`: identificador público (para DTDs estándar conocidas).

---

## 10. Ejemplo completo

### Archivo: `catalogo.dtd`

```dtd
<!ELEMENT catalogo (libro+)>

<!ELEMENT libro (titulo, autor+, precio, descripcion?)>
<!ATTLIST libro
    id          ID                  #REQUIRED
    categoria   (ficcion|tecnico|infantil)  "ficcion"
    disponible  (true|false)        "true"
>

<!ELEMENT titulo      (#PCDATA)>
<!ELEMENT autor       (#PCDATA)>
<!ELEMENT precio      (#PCDATA)>
<!ELEMENT descripcion (#PCDATA)>
```

### Archivo: `catalogo.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE catalogo SYSTEM "catalogo.dtd">

<catalogo>

  <libro id="B001" categoria="ficcion" disponible="true">
    <titulo>Dune</titulo>
    <autor>Frank Herbert</autor>
    <precio>15.99</precio>
    <descripcion>Épica ciencia ficción ambientada en el desierto.</descripcion>
  </libro>

  <libro id="B002" categoria="tecnico">
    <titulo>Clean Code</titulo>
    <autor>Robert C. Martin</autor>
    <precio>29.95</precio>
  </libro>

  <libro id="B003" categoria="infantil" disponible="false">
    <titulo>El Principito</titulo>
    <autor>Antoine de Saint-Exupéry</autor>
    <autor>Traductor: Rosa Castells</autor>
    <precio>8.50</precio>
  </libro>

</catalogo>
```

---

## Resumen rápido: validación

| Concepto | Descripción |
|---|---|
| **Bien Formado** | Cumple las reglas sintácticas de XML (*well-formed* en inglés) |
| **Válido** | Bien formado + cumple las reglas de la DTD (o XML Schema) |
| DTD interna | Definida dentro del mismo `.xml` en el `DOCTYPE` |
| DTD externa | Archivo `.dtd` separado, referenciado con `SYSTEM` o `PUBLIC` |
