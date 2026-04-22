# Cheatsheet: YAML

---

## 1. Fundamentos

- Basado en **indentación** (espacios, **NUNCA tabuladores**)
- Pares clave-valor: `clave: valor` (espacio obligatorio tras `:`)
- **Strings:** sin comillas generalmente; con comillas si contienen `:`, `#` u otros caracteres especiales
- Números y booleanos se escriben sin comillas
- **Comentarios** con `#` (hasta el final de la línea)
- Los documentos pueden separarse con `---`

---

## 2. Tipos

| Tipo              | Ejemplo                                      |
|-------------------|----------------------------------------------|
| String            | `nombre: Juan`                               |
| String (forzado)  | `codigo: "123"` o `codigo: '123'`            |
| Number (entero)   | `edad: 25`                                   |
| Number (decimal)  | `precio: 4.99`                               |
| Boolean           | `activo: true` / `activo: false`             |
| Null              | `apellido: null` o `apellido: ~`             |
| Lista             | `- item` (guion + espacio, indentado)        |
| Objeto anidado    | Clave seguida de salto de línea e indentación|
| Multilinea literal | `\|` — preserva saltos de línea             |
| Multilinea plegado | `>` — une líneas en una sola               |

**Lista:**
```yaml
idiomas:
  - español
  - inglés
  - francés
```

**Multilinea literal (`|`):**
```yaml
descripcion: |
  Primera línea.
  Segunda línea.
  Tercera línea.
```

**Multilinea plegado (`>`):**
```yaml
resumen: >
  Esta es una línea larga
  que se une en una sola.
```

---

## 3. Ejemplo completo

```yaml
# Configuración de la API de productos
api:
  version: "2.1"
  baseUrl: https://api.ejemplo.com
  timeout: 30          # segundos
  autenticacion:
    tipo: bearer
    tokenExpira: true

productos:
  - id: P001
    nombre: Teclado mecánico
    precio: 89.99
    disponible: true
    etiquetas:
      - electronica
      - oferta
    descripcion: |
      Teclado con switches Cherry MX.
      Compatible con Windows y macOS.

  - id: P002
    nombre: Ratón inalámbrico
    precio: 34.50
    disponible: false
    etiquetas:
      - electronica
    descripcion: ~
```

---

## 4. YAML → JSON — Equivalencias

| YAML                              | JSON                                  |
|-----------------------------------|---------------------------------------|
| `nombre: Ana`                     | `"nombre": "Ana"`                     |
| `edad: 28`                        | `"edad": 28`                          |
| `activo: true`                    | `"activo": true`                      |
| `valor: ~`                        | `"valor": null`                       |
| `- uno`<br>`- dos`                | `["uno", "dos"]`                      |
| Indentación anidada               | Objeto `{}` anidado                   |
| `# comentario`                    | *(no existe en JSON)*                 |
| `precio: "9.99"`                  | `"precio": "9.99"` (string, no number)|
