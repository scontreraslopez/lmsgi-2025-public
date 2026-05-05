# Ejercicio A — XML + DTD (2 puntos)
## Recetario de Cocina

### Descripcion

Se desea crear un documento XML para almacenar un recetario de cocina con sus ingredientes y recetas.

### Reglas de negocio

A partir de las siguientes reglas, escribe:
1. Una DTD completa y valida
2. Un documento XML de ejemplo que valide contra esa DTD, con al menos **3 ingredientes** y **2 recetas**

---

**Reglas:**

1. El elemento raiz es `<recetario>`. Contiene exactamente un `<ingredientes>` seguido de una o mas `<receta>`.
2. El elemento `<ingredientes>` contiene uno o mas elementos `<ingrediente>`.
3. El elemento `<ingrediente>` tiene:
   - Un atributo `id` de tipo ID, obligatorio
   - Un atributo `tipo` con valores enumerados: `verdura`, `carne`, `lacteo`, `cereal` u `otro` (obligatorio)
   - Un elemento hijo `<nombre>`: texto
4. El elemento `<receta>` tiene:
   - Un atributo `dificultad` con valores enumerados: `facil`, `media` o `dificil` (obligatorio)
   - Los siguientes elementos hijos, en este orden:
     - `<nombre>`: texto
     - `<tiempo>`: texto (ej: "45 minutos")
     - Uno o mas elementos `<paso>`: texto
     - Uno o mas elementos `<ingrediente_usado>`, que son **vacios** (sin contenido de texto) y tienen:
       - Atributo `id_ingrediente` de tipo IDREF, obligatorio
       - Atributo `cantidad` de tipo texto (CDATA), obligatorio
     - `<valoracion>`: texto, **opcional**

---

### Lo que debes entregar

**Apartado A.1** — Escribe el DTD completo.

**Apartado A.2** — Escribe el documento XML de ejemplo. Debe incluir:
- El prologo XML con declaracion `DOCTYPE` que referencie la DTD
- Al menos 3 ingredientes de tipos distintos
- Al menos 2 recetas con dificultades distintas
- Las recetas deben usar ingredientes definidos en `<ingredientes>`
- Al menos una receta con el elemento `<valoracion>`

> **Nota:** El DTD y el XML se evaluaran validandolos con un parser XML. Asegurate de que son sintacticamente correctos.
