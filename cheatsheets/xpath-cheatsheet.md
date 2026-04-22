# Cheatsheet: XPath

---

## 1. ¿Qué es XPath?

**XPath** (XML Path Language) es un lenguaje para navegar y seleccionar nodos en un documento XML. Se usa en XSLT, XQuery, validadores, y desde JavaScript/Python para procesar XML.

- Versión de referencia: **XPath 1.0** (soportada de forma universal en navegadores y parsers).
- XPath 2.0/3.0 amplían las funciones pero requieren motores específicos.
- Una expresión XPath devuelve: un **conjunto de nodos**, un **booleano**, un **número** o una **cadena**.

---

## 2. Tipos de nodos

| Tipo | Descripción | Ejemplo |
|---|---|---|
| **Element** | Elemento XML | `<libro>` |
| **Attribute** | Atributo de un elemento | `id="B001"` |
| **Text** | Contenido de texto de un elemento | `Dune` dentro de `<titulo>` |
| **Comment** | Comentario XML | `<!-- comentario -->` |
| **Processing Instruction** | Instrucción de procesamiento | `<?xml-stylesheet ...?>` |
| **Namespace** | Declaración de espacio de nombres | `xmlns="..."` |
| **Document (Root)** | Nodo raíz del documento (no el elemento raíz) | El documento completo |

---

## 3. Rutas de localización

| Expresión | Selecciona |
|---|---|
| `/` | Raíz del documento (nodo documento) |
| `//` | Descendientes en cualquier nivel (busca en todo el árbol) |
| `.` | Nodo actual (contexto actual) |
| `..` | Nodo padre del nodo actual |
| `@nombre` | Atributo llamado "nombre" del nodo actual |
| `*` | Todos los elementos hijo (cualquier nombre) |
| `@*` | Todos los atributos del nodo actual |
| `node()` | Cualquier nodo (elementos, texto, comentarios...) |
| `text()` | Nodos de texto hijo del nodo actual |

### Rutas absolutas vs relativas

```
/catalogo/libro/titulo      → Ruta absoluta (desde la raíz)
libro/titulo                → Ruta relativa (desde el nodo actual)
//titulo                    → Todos los <titulo> en cualquier nivel
/catalogo//precio           → Todos los <precio> dentro de <catalogo>
```

---

## 4. Predicados (Filtros)

Los predicados se escriben entre corchetes `[ ]` y filtran el conjunto de nodos seleccionado.

| Predicado | Selecciona |
|---|---|
| `[1]` | Primer nodo del conjunto |
| `[last()]` | Último nodo del conjunto |
| `[position() <= 3]` | Los tres primeros nodos |
| `[@atributo]` | Nodos que tienen ese atributo (sea cual sea el valor) |
| `[@atrib="valor"]` | Nodos cuyo atributo tiene ese valor exacto |
| `[@atrib!="valor"]` | Nodos cuyo atributo NO tiene ese valor |
| `[precio > 20]` | Nodos con elemento hijo `precio` mayor que 20 |
| `[precio >= 10 and precio <= 30]` | Combinación con `and` |
| `[contains(titulo, "texto")]` | Nodos cuyo `titulo` contiene la cadena |
| `[starts-with(@id, "B")]` | Nodos cuyo atributo id empieza por "B" |
| `[not(@disponible="false")]` | Negación de condición |

Los predicados se pueden encadenar:

```
//libro[@categoria="tecnico"][precio < 30]
```

---

## 5. Ejes de navegación

Los ejes indican la **dirección** de la navegación desde el nodo de contexto.

| Eje | Descripción | Abreviado |
|---|---|---|
| `child::` | Hijos directos del nodo actual | (por defecto, se puede omitir) |
| `parent::` | Padre del nodo actual | `..` |
| `self::` | El propio nodo actual | `.` |
| `ancestor::` | Todos los ancestros (padre, abuelo...) | — |
| `ancestor-or-self::` | Ancestros incluyendo el nodo actual | — |
| `descendant::` | Todos los descendientes (hijos, nietos...) | `//` (parcialmente) |
| `descendant-or-self::` | Descendientes incluyendo el nodo actual | `//` |
| `following-sibling::` | Hermanos que aparecen **después** en el documento | — |
| `preceding-sibling::` | Hermanos que aparecen **antes** en el documento | — |
| `following::` | Todos los nodos que aparecen después en el documento | — |
| `preceding::` | Todos los nodos que aparecen antes en el documento | — |
| `attribute::` | Atributos del nodo actual | `@` |

### Sintaxis completa del eje

```
eje::prueba-de-nodo[predicado]
```

```
child::libro                    → hijos <libro> (equivale a: libro)
parent::catalogo                → padre <catalogo> (equivale a: ..)
ancestor::biblioteca            → ancestro <biblioteca>
descendant::precio              → todos los <precio> descendientes
following-sibling::libro        → hermanos <libro> que siguen
attribute::id                   → atributo id (equivale a: @id)
self::libro                     → el nodo actual si es <libro>
```

---

## 6. Funciones de cadena

| Función | Descripción | Ejemplo |
|---|---|---|
| `contains(s, sub)` | `true` si `s` contiene `sub` | `contains(titulo, "amor")` |
| `starts-with(s, pre)` | `true` si `s` empieza por `pre` | `starts-with(@id, "B")` |
| `string-length(s)` | Longitud de la cadena `s` | `string-length(titulo) > 10` |
| `normalize-space(s)` | Elimina espacios al inicio/fin y colapsa internos | `normalize-space(descripcion)` |
| `concat(s1, s2, ...)` | Concatena varias cadenas | `concat(nombre, " ", apellido)` |
| `substring(s, pos, len)` | Subcadena de `s` desde posición `pos` con longitud `len` | `substring(titulo, 1, 4)` |
| `substring-before(s, sep)` | Parte de `s` antes de `sep` | `substring-before(fecha, "-")` |
| `substring-after(s, sep)` | Parte de `s` después de `sep` | `substring-after(fecha, "-")` |
| `translate(s, orig, repl)` | Reemplaza caracteres | `translate(s, "aeiou", "AEIOU")` |
| `string(obj)` | Convierte un objeto a cadena | `string(precio)` |
| `text()` | Nodo(s) de texto hijo del elemento | `//titulo/text()` |

> `pos` en `substring` empieza en **1** (no en 0).

---

## 7. Funciones numéricas y de conjunto de nodos

| Función | Descripción | Ejemplo |
|---|---|---|
| `count(nodeset)` | Número de nodos en el conjunto | `count(//libro)` |
| `sum(nodeset)` | Suma los valores numéricos del conjunto | `sum(//precio)` |
| `position()` | Posición del nodo actual dentro de su contexto | `[position() = 2]` |
| `last()` | Número total de nodos en el contexto actual | `[last()]` |
| `round(n)` | Redondea al entero más cercano | `round(3.6)` → 4 |
| `floor(n)` | Redondea hacia abajo | `floor(3.9)` → 3 |
| `ceiling(n)` | Redondea hacia arriba | `ceiling(3.1)` → 4 |
| `number(obj)` | Convierte a número | `number("42")` |
| `boolean(obj)` | Convierte a booleano | `boolean(0)` → false |

---

## 8. Operadores

### Comparación

| Operador | Significado |
|---|---|
| `=` | Igual |
| `!=` | Distinto |
| `<` | Menor que (en XML escribir `&lt;` si está en atributo) |
| `>` | Mayor que |
| `<=` | Menor o igual |
| `>=` | Mayor o igual |

### Lógicos

| Operador | Significado | Ejemplo |
|---|---|---|
| `and` | Y lógico | `[@cat="tec" and precio < 30]` |
| `or` | O lógico | `[@cat="tec" or @cat="inf"]` |
| `not(condición)` | Negación | `[not(@disponible="false")]` |

### Unión y aritmética

| Operador | Significado | Ejemplo |
|---|---|---|
| `\|` | Unión de dos conjuntos de nodos | `//titulo \| //autor` |
| `+` | Suma | `precio + iva` |
| `-` | Resta | `precio - descuento` |
| `*` | Multiplicación | `precio * 1.21` |
| `div` | División (no `/`) | `total div count(//libro)` |
| `mod` | Módulo (resto) | `position() mod 2` |

---

## 9. Ejemplos prácticos frecuentes

Documento de referencia:

```xml
<biblioteca>
  <libro id="B001" categoria="ficcion" disponible="true">
    <titulo>Dune</titulo>
    <autor>Frank Herbert</autor>
    <precio>15.99</precio>
  </libro>
  <libro id="B002" categoria="tecnico" disponible="true">
    <titulo>Clean Code</titulo>
    <autor>Robert C. Martin</autor>
    <precio>29.95</precio>
  </libro>
  <libro id="B003" categoria="ficcion" disponible="false">
    <titulo>El nombre del viento</titulo>
    <autor>Patrick Rothfuss</autor>
    <precio>12.50</precio>
  </libro>
  <libro id="B004" categoria="infantil" disponible="true">
    <titulo>El Principito</titulo>
    <autor>Antoine de Saint-Exupéry</autor>
    <precio>8.50</precio>
  </libro>
  <libro id="B005" categoria="tecnico" disponible="true">
    <titulo>The Pragmatic Programmer</titulo>
    <autor>David Thomas</autor>
    <precio>35.00</precio>
  </libro>
</biblioteca>
```

### Selección básica

```xpath
//libro
```
Todos los elementos `<libro>` en cualquier nivel del documento.

```xpath
/biblioteca/libro/titulo
```
Los `<titulo>` que son hijos directos de `<libro>`, a su vez hijo directo de `<biblioteca>` (ruta absoluta).

```xpath
//libro/autor/text()
```
El texto contenido en cada `<autor>` (devuelve nodos de texto, no elementos).

---

### Filtro por atributo

```xpath
//libro[@categoria="ficcion"]
```
Todos los `<libro>` cuyo atributo `categoria` sea exactamente "ficcion".

```xpath
//libro[@disponible]
```
Todos los `<libro>` que tengan el atributo `disponible` (con cualquier valor).

---

### Negación

```xpath
//libro[not(@disponible="false")]
```
Todos los `<libro>` cuyo atributo `disponible` no sea "false" (incluye los que no tienen el atributo o lo tienen a "true").

```xpath
//libro[@categoria!="tecnico"]
```
Todos los `<libro>` que no sean de categoría técnica.

---

### Rango numérico

```xpath
//libro[precio >= 10 and precio <= 30]
```
Libros con precio entre 10 y 30 (inclusive).

```xpath
//libro[precio < 15]
```
Libros con precio inferior a 15.

---

### Funciones de cadena

```xpath
//libro[contains(titulo, "o")]
```
Libros cuyo `<titulo>` contiene la letra "o".

```xpath
//libro[starts-with(@id, "B")]
```
Libros cuyo atributo `id` empieza por "B".

```xpath
//libro[string-length(titulo) > 10]
```
Libros cuyo título tiene más de 10 caracteres.

---

### Funciones de conjunto de nodos

```xpath
count(//libro[@categoria="tecnico"])
```
Cuenta cuántos libros son de categoría técnica. Devuelve un número (2 en el ejemplo).

```xpath
sum(//precio)
```
Suma todos los valores de `<precio>` en el documento. Devuelve 101.94 en el ejemplo.

---

### Posición

```xpath
//libro[1]
```
El primer `<libro>` hijo de su padre (Dune).

```xpath
//libro[last()]
```
El último `<libro>` hijo de su padre (The Pragmatic Programmer).

```xpath
//libro[position() <= 3]
```
Los tres primeros libros.

---

### Ejes: hermanos

```xpath
//libro[@id="B002"]/following-sibling::libro
```
Todos los `<libro>` hermanos que aparecen **después** del libro con id "B002" (B003, B004, B005).

```xpath
//libro[@id="B003"]/preceding-sibling::libro[1]
```
El hermano `<libro>` inmediatamente **anterior** al libro con id "B003" (B002).

---

### Ejes: ancestros y descendientes

```xpath
//titulo/ancestor::biblioteca
```
El elemento `<biblioteca>` ancestro de cualquier `<titulo>`.

```xpath
//libro[@id="B001"]/descendant::*
```
Todos los elementos descendientes del libro con id "B001" (titulo, autor, precio).

---

### Unión de conjuntos

```xpath
//titulo | //autor
```
Todos los elementos `<titulo>` y todos los elementos `<autor>` del documento (unidos en un único conjunto de nodos).

---

## 10. Resumen de expresiones frecuentes

| Objetivo | Expresión XPath |
|---|---|
| Todos los elementos de tipo X | `//libro` |
| Elemento raíz | `/biblioteca` |
| Hijos directos de un nodo | `/biblioteca/libro` |
| Por valor de atributo | `//libro[@categoria="ficcion"]` |
| Que tengan cierto atributo | `//libro[@disponible]` |
| Texto contiene cadena | `//libro[contains(titulo, "viento")]` |
| Texto empieza por cadena | `//libro[starts-with(titulo, "El")]` |
| Negación de condición | `//libro[not(@disponible="false")]` |
| Rango numérico | `//libro[precio >= 10 and precio <= 30]` |
| Primer elemento | `//libro[1]` |
| Último elemento | `//libro[last()]` |
| Contar nodos | `count(//libro[@categoria="tecnico"])` |
| Sumar valores | `sum(//precio)` |
| Hermanos siguientes | `//libro[@id="B002"]/following-sibling::libro` |
| Ancestro específico | `//titulo/ancestor::biblioteca` |
| Nodo padre | `//titulo/..` o `//titulo/parent::libro` |
| Unión de dos selecciones | `//titulo \| //autor` |
