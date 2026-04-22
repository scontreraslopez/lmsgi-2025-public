# Cheatsheet: JSON

---

## 1. Tipos de datos

| Tipo    | Ejemplo                        |
|---------|--------------------------------|
| String  | `"hola"`, `"texto con espacios"` |
| Number  | `42`, `3.14`, `-7`             |
| Boolean | `true`, `false`                |
| Null    | `null`                         |
| Array   | `[1, "dos", true]`             |
| Object  | `{"clave": "valor"}`           |

> **Importante:** NO existe tipo `Date` nativo. NO se permiten comentarios.

---

## 2. Sintaxis

- Las **claves** van SIEMPRE entre comillas dobles: `"clave"`
- Los **strings** van SIEMPRE entre comillas dobles
- **Sin coma final** (*trailing comma*) en el último elemento de un objeto o array
- **Sin comentarios** (`//` ni `/* */`)
- `{}` para objetos, `[]` para arrays

```json
{
  "nombre": "Ana García",
  "edad": 28,
  "activo": true,
  "puntuacion": 9.5,
  "direccion": {
    "ciudad": "Valencia",
    "cp": "46001"
  },
  "idiomas": ["español", "inglés", "francés"]
}
```

---

## 3. Errores comunes

| Error                       | Incorrecto                        | Correcto                         |
|-----------------------------|-----------------------------------|----------------------------------|
| Comillas simples            | `{'nombre': 'Ana'}`               | `{"nombre": "Ana"}`              |
| Coma final                  | `{"a": 1, "b": 2,}`               | `{"a": 1, "b": 2}`               |
| Clave sin comillas          | `{nombre: "Ana"}`                 | `{"nombre": "Ana"}`              |
| Comentario                  | `{"a": 1 // comentario}`          | `{"a": 1}`                       |
| Falta coma entre pares      | `{"a": 1 "b": 2}`                 | `{"a": 1, "b": 2}`               |
| String sin cerrar           | `{"nombre": "Ana}`                | `{"nombre": "Ana"}`              |

---

## 4. Mapeo XML → JSON

**XML original:**

```xml
<producto id="P01" disponible="true">
  <nombre>Teclado</nombre>
  <precio>49.99</precio>
  <etiquetas>
    <etiqueta>oferta</etiqueta>
    <etiqueta>electronica</etiqueta>
  </etiquetas>
  <descripcion/>
</producto>
```

**JSON equivalente:**

```json
{
  "producto": {
    "id": "P01",
    "disponible": true,
    "nombre": "Teclado",
    "precio": 49.99,
    "etiquetas": ["oferta", "electronica"],
    "descripcion": null
  }
}
```

| Concepto XML              | Equivalente JSON                         |
|---------------------------|------------------------------------------|
| Elemento con texto        | Propiedad con valor string               |
| Atributo XML              | Propiedad en el mismo objeto             |
| Elementos repetidos       | Array `[]`                               |
| Elemento vacío / auto-cierre | `null` o cadena vacía `""`            |
| Elemento anidado          | Objeto anidado `{}`                      |

---

## 5. JSON vs XML — Comparativa rápida

| Aspecto             | JSON                          | XML                              |
|---------------------|-------------------------------|----------------------------------|
| Tamaño              | Más ligero                    | Más verboso                      |
| Arrays nativos      | Sí `[]`                       | No (elementos repetidos)         |
| Tipos de datos      | Sí (number, boolean, null)    | No (todo es texto)               |
| Comentarios         | No                            | Sí `<!-- -->`                    |
| Validación          | JSON Schema                   | DTD / XSD                        |
| Uso principal       | APIs REST, configuración       | Empresarial, SOAP, documentos    |
