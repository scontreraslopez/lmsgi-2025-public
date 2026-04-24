# Cheatsheet: JavaScript

---

## 1. Variables

```js
let x = 5;        // mutable: se puede reasignar
const PI = 3.14;  // inmutable: no se puede reasignar
```

- **No** puede empezar por un número: **INVÁLIDO** (`1nombre`)
- **No** puede contener espacios: **INVÁLIDO** (`mi variable`)
- **No** se puede usar palabras **reservadas**: **INVÁLIDO** (`let`, `function`, `if`, etc.)
- **Sí** puede contener letras, dígitos, `_` y `$`: **VÁLIDO** (`_nombre`, `$precio`, `nombre1`)
- Convención de nombres **camelCase** (`nombreCompleto`, `precioTotal`)

---

## 2. Tipos de datos y `typeof`

| Valor           | `typeof`       | Nota                                 |
|  -------------- | -------------- | ------------------------------------ |
| `42`            | `"number"`     |                                      |
| `3.14`          | `"number"`     | No hay tipo separado para decimales  |
| `"hola"`        | `"string"`     |                                      |
| `true` / `false`| `"boolean"`    |                                      |
| `null`          | `"object"`     | Cosa rara histórica de JavaScript    |
| `undefined`     | `"undefined"`  | Variable declarada sin valor         |
| `function() {}` | `"function"`   |                                      |

```js
typeof 42         // "number"
typeof "hola"     // "string"
typeof true       // "boolean"
typeof null       // "object"  ← ¡ojo!
typeof undefined  // "undefined"
```

---

## 3. Strings e interpolación

```js
const nombre = "Ana";
const precio = 49.99;

// Concatenación con +
console.log("Hola " + nombre);                // "Hola Ana"

// Interpolación con template literals (backticks `)
console.log(`Hola ${nombre}`);                // "Hola Ana"
console.log(`Total: ${precio * 1.21} €`);    // "Total: 60.4879 €"
console.log(`Resultado: ${2 + 2}`);           // "Resultado: 4"
```

- Los **template literals** usan backticks `` ` `` (no comillas)
- Dentro de `${}` se puede poner cualquier expresión JS

---

## 4. Operadores

### Aritméticos

| Operador | Significado   | Ejemplo           |
|----------|---------------|-------------------|
| `+`      | Suma          | `5 + 3` → `8`     |
| `-`      | Resta         | `5 - 3` → `2`     |
| `*`      | Multiplicación| `5 * 3` → `15`    |
| `/`      | División      | `10 / 4` → `2.5`  |
| `%`      | Módulo (resto)| `10 % 3` → `1`    |
| `**`     | Potencia      | `2 ** 8` → `256`  |

### Comparación

| Operador | Tipo          | Ejemplo                    |
| -------- | ------------- | -------------------------- |
| `===`    | Estricta      | `5 === "5"` → `false`      |
| `!==`    | Distinto estricto | `5 !== "5"` → `true`   |
| `==`     | Débil (coerciona) | `5 == "5"` → `true`    |
| `<`, `>`, `<=`, `>=` | Numérica | `3 < 5` → `true`    |

> **Regla:** En general (prácticamente siempre) usar `===` y `!==`. El operador `==` hace coerción de tipos y puede dar resultados inesperados.

### Lógicos

| Operador | Significado | Ejemplo                          |
|----------|-------------|----------------------------------|
| `&&`     | AND (y)     | `true && false` → `false`        |
| `\|\|`   | OR (o)      | `true \|\| false` → `true`       |
| `!`      | NOT (no)    | `!true` → `false`                |

### Coerción con `+`

```js
"5" + 3   // "53"  - el + con un string concatena
"5" - 3   // 2     - el - convierte el string a número
"5" * 2   // 10    - igual con * y /
```

---

## 5. Condicionales

```js
if (edad >= 18) {
  console.log("Mayor de edad");
} else if (edad >= 16) {
  console.log("Adolescente");
} else {
  console.log("Menor de edad");
}
```

**Operador ternario** (para condiciones simples en una línea):

```js
const resultado = edad >= 18 ? "mayor" : "menor";
// equivale a: si (edad >= 18) entonces "mayor", si no entonces "menor"
```

---

## 6. Bucles

```js
// for - cuando sabes cuántas veces se repite
for (let i = 0; i < 5; i++) {
  console.log(i); // imprime 0, 1, 2, 3, 4
}

// for con array
const frutas = ["manzana", "pera", "naranja"];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// while - cuando depende de una condición
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

- `i++` equivale a `i = i + 1`
- `i--` equivale a `i = i - 1`
- Cuidado con los **bucles infinitos** en `while`: la condición debe volverse `false` en algún momento

---

## 7. Funciones

```js
// Declaración
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

// Llamada
const mensaje = saludar("Ana"); // "Hola, Ana"
console.log(mensaje);

// Función con varios parámetros
function sumar(a, b) {
  return a + b;
}
console.log(sumar(3, 4)); // 7
```

- **Parámetros:** *variables* que aparecen en la *definición* de la función.
- **Argumentos:** *valores* concretos que se pasan en la *llamada*
- Sin `return` la función devuelve `undefined`.
- Una función puede llamar a otra función.

---

## 8. Arrays — Operaciones básicas

```js
const arr = [1, 2, 3];

  arr.push(4);          // añade al final:    [1, 2, 3, 4]
  arr.pop();            // elimina el último: [1, 2, 3]
  arr.length;           // número de elementos: 3
  arr[0];               // acceso por índice (empieza en 0): 1
  arr[arr.length - 1];  // último elemento: 3
```

**Recorrer con `for`:**

```js
const colores = ["rojo", "verde", "azul"];

for (let i = 0; i < colores.length; i++) {
  console.log(i, colores[i]);
  // 0 "rojo"
  // 1 "verde"
  // 2 "azul"
}
```

> Los índices empiezan en `0`. El último índice es `array.length - 1`.

También es posible recorrer con `for...in` y `for...of` (más moderno)

## 9. Objetos

```js
const producto = {
  nombre: "Teclado",
  precio: 49.99,
  disponible: true
};

// Acceso con punto
producto.nombre;        // "Teclado"

// Acceso con corchetes (útil si la clave es una variable)
producto["precio"];     // 49.99

// Modificar propiedad
producto.precio = 39.99;

// Añadir nueva propiedad
producto.marca = "Logitech";

// Objeto con método (función dentro de objeto)
const calculadora = {
  fabricante: "Casio",
  sumar: function(a, b) {
    return a + b;
  }
};
calculadora.sumar(3, 4); // 7
```

---

## 10. DOM — Selección y manipulación

```js
// --- SELECCIONAR ELEMENTOS ---

document.querySelector("#miId")         // por ID (devuelve el primero que encuentre)
document.querySelector(".miClase")      // por clase (devuelve el primero)
document.querySelector("p")             // por etiqueta (devuelve el primero)
document.getElementById("miId")         // por ID (equivalente al primero)
document.querySelectorAll(".miClase")   // TODOS los que coinciden (NodeList)


// --- MODIFICAR CONTENIDO ---

const titulo = document.querySelector("h1");
titulo.textContent = "Nuevo título";    // solo texto plano (más seguro)
titulo.innerHTML = "<em>Énfasis</em>";  // interpreta HTML (usar con cuidado)

// Para campos de formulario (input, select, textarea) usar .value
const campo = document.querySelector("#nombre");
campo.value = "Ana";          // leer o escribir el valor del input
console.log(campo.value);     // leer lo que el usuario ha escrito


// --- MODIFICAR ESTILOS Y CLASES ---

elemento.style.color = "red"; // modifica el estilo CSS directamente
elemento.classList.add("activo"); // añade la clase "activo"
elemento.classList.remove("activo"); // quita la clase "activo"
elemento.classList.toggle("activo");    // añade si no está, quita si está


// --- EVENTOS ---

const boton = document.querySelector("#miBoton");

boton.addEventListener("click", function() {
  console.log("Botón pulsado");
});

// Eventos comunes: "click", "input", "change", "submit", "mouseover"


// --- ESPERAR A QUE CARGUE EL DOM ---

// Usando defer en el script (recomendado para scripts externos)
<head>
  ...
<script src="script.js" defer></script>
</head>
```

Usa `DOMContentLoaded` si el script fuese inline. Alternativamente puedes insertar el script justo antes de cerrar el `</body>` para asegurarte de que el DOM ya está cargado.

```js
// --- CREAR E INSERTAR ELEMENTOS ---

const lista = document.querySelector("#miLista");

// 1. Crear el elemento
const li = document.createElement("li");

// 2. Asignarle contenido
li.textContent = "Nuevo elemento";

// 3. Insertarlo en el DOM
lista.appendChild(li);       // al final de la lista

// También útil:
lista.prepend(li);            // al principio
elemento.remove();            // eliminar un elemento del DOM
```

> **Flujo:** `createElement` -> asignar `textContent` -> `appendChild`. Estos tres pasos son siempre los mismos.
