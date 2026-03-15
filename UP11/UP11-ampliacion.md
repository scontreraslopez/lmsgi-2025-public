# UP11: Contenido de Ampliación — Funciones de Orden Superior

---

## Advertencia importante

> [!NOTE]
> ESTE CONTENIDO ES NO EVALUABLE Y COMPLETAMENTE OPCIONAL

Este documento contiene material de ampliación para estudiantes que quieran ir un paso más allá en JavaScript. El material incluido aquí:

- **NO es obligatorio** para superar la unidad UP11
- **NO será evaluado** en exámenes ni actividades
- Se proporciona como **recurso adicional** muy recomendable si tienes intención de trabajar en desarrollo web frontend
- Es especialmente útil si en el futuro vas a trabajar con frameworks como React, Vue o Angular

Si tu objetivo es aprobar el curso, puedes ignorar este documento y centrarte en el contenido principal de UP11.md.

---

## Recurso principal

Este contenido se basa en el capítulo 5 de **Eloquent JavaScript**, libro de referencia en la comunidad JavaScript, cuya traducción al español ha sido realizada por [midudev](https://www.twitch.tv/midudev), uno de los desarrolladores hispanohablantes más reconocidos del sector:

- **[Funciones de Orden Superior — Eloquent JavaScript en español](https://www.eloquentjavascript.es/05_higher_order.html)**
- **[Eloquent JavaScript (libro completo en español)](https://www.eloquentjavascript.es/)**

Se recomienda leer el capítulo directamente desde ahí. Lo que encontrarás aquí es una introducción y guía de lectura para orientarte antes de enfrentarte al libro.

---

## Índice

- [1. ¿Qué es una función de orden superior?](#1-qué-es-una-función-de-orden-superior)
- [2. Repaso: arrow functions](#2-repaso-arrow-functions)
- [3. Callbacks](#3-callbacks)
- [4. El método `map()`](#4-el-método-map)
- [5. El método `filter()`](#5-el-método-filter)
- [6. El método `reduce()`](#6-el-método-reduce)
- [7. Encadenamiento de métodos](#7-encadenamiento-de-métodos)
- [8. ¿Por qué importa todo esto?](#8-por-qué-importa-todo-esto)
- [9. Bonus: función que devuelve función](#9-bonus-función-que-devuelve-función)

---

## 1. ¿Qué es una función de orden superior?

En JavaScript, las funciones son valores como cualquier otro. Puedes guardarlas en variables, pasarlas como argumentos a otras funciones, o devolverlas como resultado. Esto es una cuestión que en una lectura superficial puede parecer un detalle, pero lo que pasas como **argumento es la propia función**, no el resultado de la función. Esto es lo que hace que JavaScript sea un lenguaje tan flexible y poderoso.

Una **función de orden superior** es simplemente una función que:

- **recibe otra función como argumento**, o
- **devuelve una función como resultado**

Esto no es un concepto inventado: ya lo has usado sin saberlo. Cada vez que escribes un `addEventListener`, estás pasando una función como argumento:

```javascript
boton.addEventListener("click", function() {
  console.log("¡Botón pulsado!");
});
```

La función anónima que le pasas a `addEventListener` se llama **callback** — es la función que se "llamará de vuelta" cuando ocurra el evento. Eso es una función de orden superior en acción.

En roman paladino, ese *snippet* de código se puede leer como: "Cuando el botón reciba un click, ejecuta esta función". La función que le pasas a `addEventListener` no se ejecuta en ese momento, sino que se guarda para ejecutarse más tarde, cuando ocurra el evento. Esa es la magia de las funciones de orden superior: te permiten definir **qué** quieres que pase, sin preocuparte de **cuándo** va a pasar. Podría por ejemplo imprimir la fecha y hora exacta del click, o hacer una petición a un servidor, o cualquier cosa que se te ocurra. La función de orden superior se encarga de llamar a tu función en el momento adecuado.

---

## 2. Repaso: arrow functions

Antes de continuar, conviene introducir la sintaxis de **arrow functions** (`=>`), porque se usan constantemente junto a las funciones de orden superior. Sinceramente, no es difícil acostumbrarse a esta sintaxis, y una vez que lo haces, no quieres volver atrás. Es más concisa y clara, especialmente cuando el cuerpo de la función es una sola expresión.

Nota que Javascript usa una *fat arrow* (`=>`), no una flecha normal (`->`). Kotlin por su parte usa la flecha normal (`->`). Es un detalle, pero es importante para no confundirse.

### Sintaxis según el número de argumentos

```javascript
// Sin argumentos: paréntesis vacíos obligatorios
const sinArgs = () => console.log("Hola");

// Un argumento: los paréntesis son opcionales
const unArg        = x => x * 2;       // sin paréntesis (más habitual)
const unArgConParen = (x) => x * 2;    // con paréntesis (también válido)

// Varios argumentos: paréntesis obligatorios
const dosArgs  = (a, b) => a + b;
const tresArgs = (a, b, c) => a + b + c;
```

### Cuerpo: una línea vs. multilínea

Si el cuerpo es una sola expresión, no necesitas llaves ni `return` — se devuelve implícitamente:

```javascript
const doblar = x => x * 2;           // return implícito
const saludar = nombre => "Hola, " + nombre;
```

Si necesitas varias líneas, sí necesitas llaves y `return` explícito:

```javascript
const saludarFormal = (nombre) => {
  const mensaje = "Hola, " + nombre;
  return mensaje;
};
```

> [!TIP]
> Las arrow functions no son solo azúcar sintáctico: tienen un comportamiento diferente con `this`. Esto es importante cuando se usan dentro de clases u objetos, aunque para los ejemplos de esta unidad no afecta. Javascript tiene muchas cosas un poco raras, y el comportamiento de su `this` es una de ellas.

---

## 3. Callbacks

Un **callback** es una función que se pasa como argumento a otra función para que esta la ejecute en algún momento.

Ya los has visto en los eventos. Pero también aparecen en operaciones asíncronas como peticiones a servidores, temporizadores, etc.

```javascript
// setTimeout recibe un callback y lo ejecuta después de 2 segundos
setTimeout(() => {
  console.log("Han pasado 2 segundos");
}, 2000);
```

El patrón es siempre el mismo: **defines qué quieres que pase**, y la función de orden superior decide **cuándo ejecutarlo**.

---

## 4. El método `map()`

`map()` transforma un array aplicando una función a cada elemento, y devuelve un **nuevo array** con los resultados. El array original no se modifica.

**Sintaxis:**

```javascript
const nuevoArray = array.map(elemento => transformacion(elemento));
```

**Ejemplo:**

```javascript
const precios = [10, 20, 30, 40];

// Aplicar un 21% de IVA a cada precio
const preciosConIva = precios.map(precio => precio * 1.21);

console.log(preciosConIva); // [12.1, 24.2, 36.3, 48.4]
console.log(precios);       // [10, 20, 30, 40] — sin cambios
```

**Con objetos:**

```javascript
const productos = [
  { nombre: "Teclado", precio: 50 },
  { nombre: "Ratón", precio: 25 },
  { nombre: "Monitor", precio: 300 }
];

// Extraer solo los nombres
const nombres = productos.map(producto => producto.nombre);
console.log(nombres); // ["Teclado", "Ratón", "Monitor"]
```

> [!NOTE]
> `map()` siempre devuelve un array de la **misma longitud** que el original. Si quieres filtrar elementos, usa `filter()`.

---

## 5. El método `filter()`

`filter()` devuelve un **nuevo array** con solo los elementos que cumplen una condición. La función que le pasas debe devolver `true` o `false`.

**Sintaxis:**

```javascript
const nuevoArray = array.filter(elemento => condicion(elemento));
```

**Ejemplo:**

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Solo los números pares
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]
```

**Con objetos:**

```javascript
const productos = [
  { nombre: "Teclado", precio: 50, stock: true },
  { nombre: "Ratón", precio: 25, stock: false },
  { nombre: "Monitor", precio: 300, stock: true }
];

// Solo los que tienen stock
const disponibles = productos.filter(producto => producto.stock);
console.log(disponibles);
// [{ nombre: "Teclado", ... }, { nombre: "Monitor", ... }]
```

---

## 6. El método `reduce()`

`reduce()` es el más potente y el más difícil de los tres. Recorre el array y va **acumulando** un resultado en una variable que tú defines. Al final devuelve ese valor acumulado (que puede ser un número, un objeto, un array...).

**Sintaxis:**

```javascript
const resultado = array.reduce((acumulador, elemento) => {
  // operación con acumulador y elemento
  return nuevoAcumulador;
}, valorInicial);
```

- `acumulador`: el valor que se va acumulando en cada iteración
- `elemento`: el elemento actual del array
- `valorInicial`: el valor con el que empieza el acumulador

**Ejemplo clásico — sumar todos los elementos:**

```javascript
const numeros = [1, 2, 3, 4, 5];

const suma = numeros.reduce((acum, n) => acum + n, 0);
console.log(suma); // 15
```

Así funciona paso a paso:

| Iteración | `acum` | `n` | resultado |
|-----------|--------|-----|-----------|
| 1ª        | 0      | 1   | 1         |
| 2ª        | 1      | 2   | 3         |
| 3ª        | 3      | 3   | 6         |
| 4ª        | 6      | 4   | 10        |
| 5ª        | 10     | 5   | **15**    |

**Ejemplo más real — calcular el total de un carrito:**

```javascript
const carrito = [
  { producto: "Teclado", precio: 50, cantidad: 1 },
  { producto: "Ratón", precio: 25, cantidad: 2 },
  { producto: "Alfombrilla", precio: 15, cantidad: 1 }
];

const total = carrito.reduce((acum, item) => {
  return acum + item.precio * item.cantidad;
}, 0);

console.log(total); // 115
```

> [!WARNING]
> No olvides el **valor inicial** (el segundo argumento de `reduce`). Si lo omites, JavaScript usa el primer elemento del array como acumulador inicial, lo que puede dar resultados inesperados.

---

## 7. Encadenamiento de métodos

La auténtica potencia aparece cuando combinas estos métodos en cadena. Como cada uno devuelve un array (excepto `reduce`), puedes encadenarlos directamente.

**Ejemplo: del carrito, calcular el total solo de los productos con precio > 20, aplicando un descuento del 10%:**

```javascript
const carrito = [
  { producto: "Teclado", precio: 50 },
  { producto: "Cable USB", precio: 8 },
  { producto: "Ratón", precio: 25 },
  { producto: "Pegatinas", precio: 5 },
  { producto: "Monitor", precio: 300 }
];

const total = carrito
  .filter(item => item.precio > 20)           // filtra los caros
  .map(item => item.precio * 0.9)             // aplica el descuento
  .reduce((acum, precio) => acum + precio, 0); // suma todo

console.log(total); // (50 + 25 + 300) * 0.9 = 337.5
```

Esto que en un bucle `for` ocuparía 10-15 líneas, aquí son 3 líneas perfectamente legibles.

---

## 8. ¿Por qué importa todo esto?

Puede parecer que esto es solo una forma elegante de escribir bucles. Pero hay razones de peso para aprenderlo:

**1. Es el estándar del sector.** Todo código JavaScript moderno y profesional usa `map`, `filter` y `reduce`. Si lees código de cualquier proyecto real en GitHub, los verás constantemente.

**2. Es la base de frameworks como React.** En React, renderizar listas de elementos se hace casi siempre con `map()`. No hay alternativa real.

**3. Evita errores.** Al no mutar arrays, el código es más predecible y menos propenso a bugs difíciles de encontrar.

**4. Mejora la legibilidad.** Un `filter` dice exactamente qué está haciendo. Un bucle `for` con una condición dentro requiere leerlo con más cuidado.

---

## 9. Bonus: función que devuelve función

Una función de orden superior también puede **devolver** una función. Esto permite crear "fábricas" de funciones configurables — un patrón muy usado en la práctica:

```javascript
function crearMultiplicador(factor) {
  return (numero) => numero * factor;
}

const doble    = crearMultiplicador(2);
const triple   = crearMultiplicador(3);
const porCinco = crearMultiplicador(5);

console.log(doble(4));    // 8
console.log(triple(4));   // 12
console.log(porCinco(4)); // 20

// Y se puede combinar con map directamente:
const numeros = [1, 2, 3, 4, 5];
console.log(numeros.map(triple)); // [3, 6, 9, 12, 15]
```

`crearMultiplicador(3)` no multiplica nada: devuelve una función que multiplicará por 3 cada vez que la llames. En el momento en que escribes `numeros.map(triple)`, le estás pasando esa función a `map` como callback.

---

## Código ejecutable

Todo el contenido de este documento está disponible en formato ejecutable en [UP11-ampliacion.js](./UP11-ampliacion.js). Puedes abrirlo en Visual Studio Code y ejecutarlo con:

```bash
node UP11-ampliacion.js
```

---

## Siguiente paso

Lee el [Capítulo 5 de Eloquent JavaScript en español](https://www.eloquentjavascript.es/05_higher_order.html). Es denso, pero cada párrafo vale la pena. Si algo no queda claro a la primera, reléelo — es normal. Este es de los temas que "hacen clic" después de varios intentos.

Si te quedas atascado o quieres profundizar más, no dudes en consultarme.
