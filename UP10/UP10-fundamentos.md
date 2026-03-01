# Fundamentos de algoritmia y programación

> Este documento es para alumnos que llegan a JavaScript **sin experiencia previa en programación**. Si ya cursas el módulo de Programación, puedes saltarte esta parte.

---

## Índice

- [1. ¿Qué es un programa?](#1-qué-es-un-programa)
- [2. ¿Qué es un algoritmo?](#2-qué-es-un-algoritmo)
- [3. Variables](#3-variables)
- [4. Tipos de datos](#4-tipos-de-datos)
- [5. Operadores](#5-operadores)
- [6. Condiciones](#6-condiciones)
- [7. Bucles](#7-bucles)
- [8. Funciones](#8-funciones)
- [9. Ejecutar JavaScript en VS Code](#9-ejecutar-javascript-en-vs-code)

---

## 1. ¿Qué es un programa?

Hasta ahora con HTML y CSS has escrito código que **describe** cosas: "este texto es un título", "este elemento tiene fondo azul". El navegador lee esa descripción y la muestra.

Un **programa** es diferente: en lugar de describir, **ordena acciones**. Le dices al ordenador exactamente qué hacer, en qué orden y bajo qué condiciones.

Piénsalo como la diferencia entre:

- Un **plano de una casa** (HTML/CSS) → describe cómo es algo.
- Un **manual de instrucciones** (JavaScript) → dice qué hacer paso a paso.

JavaScript es el lenguaje que permite que una página web haga cosas: responder a clics, validar formularios, mostrar u ocultar elementos, calcular resultados...

---

## 2. ¿Qué es un algoritmo?

Un **algoritmo** es una secuencia de pasos ordenados para resolver un problema. No es un concepto de informática: los algoritmos están en todas partes.

### Ejemplo cotidiano: hacer un café

```text
1. Llenar el depósito de agua
2. Poner el filtro en el soporte
3. Añadir el café molido
4. Colocar la taza debajo
5. Pulsar el botón de inicio
6. Esperar hasta que termine
7. Retirar la taza
```

Ese es un algoritmo. Tiene pasos concretos, en un orden concreto, con un objetivo concreto.

### ¿Qué tiene que cumplir un buen algoritmo?

| Característica | Qué significa |
| --- | --- |
| **Finito** | Tiene un principio y un final (no se repite infinitamente) |
| **Preciso** | Cada paso es claro, sin ambigüedad |
| **Ordenado** | Los pasos tienen un orden que importa |
| **Con entrada y salida** | Parte de unos datos y produce un resultado |

### Del algoritmo al código

Antes de escribir código, los programadores suelen pensar el algoritmo en lenguaje natural o con pseudocódigo (una mezcla de español y código):

```text
INICIO
  Pedir al usuario su nombre
  Guardar el nombre en una variable
  Mostrar "Hola, " + el nombre
FIN
```

Este mismo algoritmo en JavaScript:

```javascript
let nombre = prompt("¿Cuál es tu nombre?");
console.log("Hola, " + nombre);
```

---

## 3. Variables

### El concepto

Una **variable** es una caja con nombre donde guardas un valor que puede cambiar.

Imagina que tienes una pizarra y escribes en ella el número `42`. Esa pizarra tiene un nombre: "puntuación". En cualquier momento puedes borrar el 42 y escribir otro número. La pizarra (la variable) sigue existiendo, pero su contenido cambia.

```text
pizarra "puntuación"
┌─────────────────┐
│       42        │
└─────────────────┘
```

Más tarde, el jugador gana 10 puntos más:

```text
pizarra "puntuación"
┌─────────────────┐
│       52        │
└─────────────────┘
```

### En JavaScript

```javascript
let puntuacion = 42;      // Creo la variable y guardo 42
puntuacion = 52;          // Cambio el contenido a 52
```

La palabra `let` significa "declaro una variable con este nombre". Solo se usa la primera vez. Después, simplemente escribes el nombre para usarla o cambiarla.

### `let` vs `const`

Si el valor **nunca va a cambiar**, usa `const` (constante):

```javascript
const PI = 3.14159;       // Siempre será PI, no cambia
let radio = 5;            // El radio sí puede cambiar
```

Intentar cambiar una constante produce un error:

```javascript
const PI = 3.14159;
PI = 3;                   // ERROR: no se puede reasignar una constante
```

> **Regla práctica:** usa `const` por defecto. Cambia a `let` solo si sabes que el valor va a cambiar.

### Nombres de variables

Los nombres pueden contener letras, números, `_` y `$`, pero no pueden empezar con un número ni contener espacios:

```javascript
let miNombre = "Ana";     // correcto (camelCase, el estilo habitual en JS)
let mi_nombre = "Ana";    // correcto (snake_case, menos habitual en JS)
let 1nombre = "Ana";      // ERROR: no puede empezar con número
let mi nombre = "Ana";    // ERROR: no puede contener espacios
```

En javaScript, tradicionalmente se usaba `var` para declarar variables, pero hoy en día se recomienda usar `let` y `const` por sus ventajas en seguridad y claridad. Respecto a la convención, lo propio es usar **camelCase** para nombrar variables: la primera palabra en minúscula y las siguientes con mayúscula. Esto hace que el código sea más legible.

### Comentarios

Un **comentario** es texto que el programador escribe para anotar el código. JavaScript lo ignora por completo: no se ejecuta.

```javascript
// Esto es un comentario de una línea

/*
  Esto es un comentario
  de varias líneas
*/

let radio = 5;   // también puedes comentar al final de una línea
```

Úsalos para explicar por qué haces algo, no qué haces (el código ya dice qué). Al empezar, también son útiles para "desactivar" una línea temporalmente sin borrarla.

---

## 4. Tipos de datos

JavaScript maneja distintos tipos de datos. Los más importantes al empezar:

### Número (`number`)

Valores numéricos, con o sin decimales:

```javascript
let edad = 17;
let precio = 9.99;
let temperatura = -5;
```

### Texto (`string`)

Cualquier secuencia de caracteres entre comillas (simples, dobles, o backticks):

```javascript
let nombre = "María";
let saludo = '¡Hola!';
let frase = `Bienvenida, ${nombre}`;   // Backtick permite insertar variables
```

Los backticks (`` ` ``) son especialmente útiles para combinar texto con variables:

```javascript
let producto = "café";
let precio = 1.20;
console.log(`El ${producto} cuesta ${precio} euros`);
// Resultado: El café cuesta 1.2 euros
```

Esto se conoce como **interpolación de cadenas** (*string interpolation*), una forma muy cómoda de construir textos dinámicos.

### Booleano (`boolean`)

Solo dos valores posibles: `true` (verdadero) o `false` (falso):

```javascript
let esMayorDeEdad = true;
let tieneDescuento = false;
```

Parece simple, pero los booleanos son la base de toda la lógica condicional: tomar decisiones en un programa siempre se reduce a "¿esto es verdad o mentira?".

### Vacío: `null` y `undefined`

- `null`: el programador asigna explícitamente "sin valor".
- `undefined`: la variable existe pero nunca se le ha asignado valor.

```javascript
let resultado = null;         // Intencionalmente vacío
let sinAsignar;               // undefined (existe pero no tiene valor)
const alsoUndefined = undefined; // también se puede usar undefined explícitamente
```

### Comprobación de tipo

Puedes saber el tipo de un valor con `typeof`:

```javascript
console.log(typeof 42);           // "number"
console.log(typeof "hola");       // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
```

Esto es muy útil para depurar cuando algo no funciona como esperas.

### El caso curioso del tipado dinámico

JavaScript es de **tipado dinámico** (como Python): una variable puede guardar un número ahora y un texto después. Esto es diferente a Java, donde el tipo se fija al crear la variable.

Esto también provoca comportamientos sorprendentes con el operador `+`:

```javascript
console.log(5 + 3);        // 8       (suma de números)
console.log("5" + 3);      // "53"    (concatenación: trata el 3 como texto)
console.log("5" - 3);      // 2       (resta: convierte "5" a número)
```

La regla es: con `+`, si alguno de los dos valores es texto, JavaScript los une como texto. Con `-`, `*` y `/`, siempre intenta convertir a número. Si no puedes evitar mezclar tipos, usa `typeof` para comprobar antes de operar.

---

## 5. Operadores

### Aritméticos

```javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13  (suma)
console.log(a - b);   // 7   (resta)
console.log(a * b);   // 30  (multiplicación)
console.log(a / b);   // 3.333... (división)
console.log(a % b);   // 1   (módulo: el resto de la división entera)
console.log(a ** b);  // 1000 (potencia: 10³)
```

El **módulo** (`%`) es muy útil para saber si un número es par o impar:

```javascript
let numero = 7;
console.log(numero % 2);   // 1 → es impar (si fuera 0, sería par)
```

### Asignación: `=` no es "igual a"

Este es uno de los conceptos más confusos para quienes vienen de matemáticas.

En matemáticas, `x = 5` significa "x es igual a 5".
En programación, `=` significa **"guarda este valor en esta variable"**.

```javascript
let x = 5;    // "guarda 5 en x"
x = x + 1;   // "suma 1 al valor actual de x y guarda el resultado en x"
              // x ahora vale 6
```

La segunda línea sería imposible en matemáticas (`x = x + 1` no tiene solución), pero en programación tiene todo el sentido.

### Comparación: `==` y `===`

Para **comparar** valores (no asignar) se usan doble o triple igual:

```javascript
let edad = 18;

console.log(edad == 18);    // true
console.log(edad == 17);    // false
```

La diferencia entre `==` y `===`:

- `==` compara el valor, haciendo conversiones de tipo si hace falta.
- `===` compara el valor **y el tipo**. Es más estricto y más seguro.

```javascript
console.log(5 == "5");    // true  (convierte "5" a número antes de comparar)
console.log(5 === "5");   // false (5 es number, "5" es string: diferentes)
```

> **Regla:** usa siempre `===`. El `==` puede dar resultados inesperados.

### Otros operadores de comparación

```javascript
console.log(10 > 5);     // true  (mayor que)
console.log(10 < 5);     // false (menor que)
console.log(10 >= 10);   // true  (mayor o igual)
console.log(10 <= 9);    // false (menor o igual)
console.log(5 !== 6);    // true  (distinto de)
```

### Operadores lógicos

Combinan condiciones:

```javascript
let edad = 20;
let tieneDNI = true;

// AND (&&): las DOS condiciones deben ser verdaderas
console.log(edad >= 18 && tieneDNI);   // true

// OR (||): al menos UNA condición debe ser verdadera
let esSocio = false;
console.log(esSocio || edad >= 18);    // true

// NOT (!): invierte el valor
console.log(!tieneDNI);               // false
```

---

## 6. Condiciones

### El concepto de los condicionales

Una condición permite que el programa **tome decisiones**: ejecutar un bloque de código u otro según si algo es verdadero o falso.

Algoritmia en lenguaje natural:

```text
SI la temperatura es mayor de 30
    mostrar "Hace calor"
SINO
    mostrar "Temperatura agradable"
```

### `if` / `else` en JavaScript

```javascript
let temperatura = 35;

if (temperatura > 30) {
    console.log("Hace calor");
} else {
    console.log("Temperatura agradable");
}
```

Las llaves `{ }` delimitan el bloque de código que se ejecuta en cada caso. Todo lo que está dentro de las llaves "pertenece" a esa condición.

### `else if` para múltiples casos

```javascript
let nota = 75;

if (nota >= 90) {
    console.log("Sobresaliente");
} else if (nota >= 70) {
    console.log("Notable");
} else if (nota >= 50) {
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}
```

JavaScript evalúa las condiciones de arriba abajo y ejecuta el primero bloque cuya condición sea verdadera. El `else` final es el caso por defecto si ninguna condición se cumple.

### Condiciones anidadas

Puedes poner un `if` dentro de otro:

```javascript
let edad = 20;
let tieneCarne = true;

if (edad >= 18) {
    if (tieneCarne) {
        console.log("Puede conducir");
    } else {
        console.log("Mayor de edad pero sin carnet");
    }
} else {
    console.log("Menor de edad");
}
```

Aunque con operadores lógicos a veces puedes simplificarlo:

```javascript
if (edad >= 18 && tieneCarne) {
    console.log("Puede conducir");
}
```

---

## 7. Bucles

### El concepto de los bucles

Un **bucle** repite un bloque de código varias veces. Sin bucles, si quisieras mostrar los números del 1 al 100, tendrías que escribir 100 líneas. Con un bucle, son 3.

Algoritmia en lenguaje natural:

```text
REPETIR desde 1 hasta 100
    mostrar el número actual
FIN REPETIR
```

### Bucle `for`

El más habitual cuando sabes cuántas veces quieres repetir:

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// Imprime: 1, 2, 3, 4, 5
```

El `for` tiene tres partes separadas por `;`:

| Parte | Qué hace | En el ejemplo |
| --- | --- | --- |
| `let i = 1` | **Inicio:** crea el contador y le da valor inicial | Empezamos en 1 |
| `i <= 5` | **Condición:** mientras esto sea verdad, sigue | Mientras no pase de 5 |
| `i++` | **Actualización:** qué cambia en cada repetición | Suma 1 al contador |

`i++` es equivalente a `i = i + 1`. Es la forma corta de incrementar en 1.

### Traza de un bucle `for`

Para entender qué hace un bucle, es útil "trazar" su ejecución paso a paso:

```text
Inicio: i = 1
  ¿1 <= 5? → sí → imprime 1 → i++ → i = 2
  ¿2 <= 5? → sí → imprime 2 → i++ → i = 3
  ¿3 <= 5? → sí → imprime 3 → i++ → i = 4
  ¿4 <= 5? → sí → imprime 4 → i++ → i = 5
  ¿5 <= 5? → sí → imprime 5 → i++ → i = 6
  ¿6 <= 5? → no → fin del bucle
```

### Bucle `while`

Cuando no sabes cuántas veces se va a repetir, sino que repites **mientras** se cumpla una condición:

```javascript
let intentos = 0;

while (intentos < 3) {
    console.log("Intento número " + (intentos + 1));
    intentos++;
}
// Imprime: Intento número 1, Intento número 2, Intento número 3
```

### Cuidado: el bucle infinito

Un error muy común al empezar: olvidar actualizar la variable de control. El bucle nunca termina y el programa se queda colgado:

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    // ERROR: falta i++ → i nunca cambia → bucle infinito
}
```

Si en VS Code tu programa parece colgado, probablemente sea un bucle infinito. Pulsa `Ctrl + C` en la terminal para detenerlo.

---

## 8. Funciones

### El concepto de las funciones

Una **función** es un bloque de código con nombre que puedes ejecutar cuando quieras. Sirve para:

1. **Reutilizar código:** escribes la lógica una vez, la llamas muchas veces.
2. **Organizar el código:** cada función hace una cosa concreta y tiene un nombre descriptivo.

Imagina que cada vez que quieres saludar a alguien tienes que escribir tres líneas. Con una función, las escribes una vez y las reutilizas:

Sin función:

```javascript
console.log("---");
console.log("¡Hola, Ana!");
console.log("---");

console.log("---");
console.log("¡Hola, Luis!");
console.log("---");
```

Con función:

```javascript
function saludar(nombre) {
    console.log("---");
    console.log("¡Hola, " + nombre + "!");
    console.log("---");
}

saludar("Ana");    // llamada a la función
saludar("Luis");   // misma función, diferente nombre
```

### Partes de una función

```javascript
function nombreDeLaFuncion(parametro1, parametro2) {
    // cuerpo: lo que hace la función
    return resultado;   // (opcional) devuelve un valor
}
```

- **Nombre:** describe qué hace (`calcularTotal`, `validarEmail`, `mostrarMensaje`).
- **Parámetros:** valores de entrada que la función necesita (entre paréntesis). Puede no tener ninguno.
- **Cuerpo:** el código que se ejecuta cuando se llama a la función.
- **`return`:** el valor que devuelve. No todas las funciones devuelven algo.

> [!NOTE]
> En JavaScript, las funciones son "ciudadanos de primera clase": se pueden guardar en variables, pasar como argumentos a otras funciones, e incluso devolver desde otras funciones. Esto las hace muy poderosas y flexibles.

Breve apunte a la diferencia entre parámetros y argumentos: los **parámetros** son las variables que se definen en la función (como `nombre` en el ejemplo), mientras que los **argumentos** son los valores reales que se pasan a la función cuando la llamas (`"Ana"` y `"Luis"` en el ejemplo).

### Función con retorno

```javascript
function suma(a, b) {
    return a + b;
}

let resultado = suma(3, 5);
console.log(resultado);   // 8
```

Lo que devuelve `return` se puede guardar en una variable o usar directamente:

```javascript
console.log(suma(10, 20));         // 30
let total = suma(100, suma(5, 5)); // suma anidada: suma(100, 10) → 110
```

### Diferencia entre definir y llamar

Esto confunde mucho al principio:

```javascript
// DEFINIR la función (solo la describe, no la ejecuta)
function duplicar(numero) {
    return numero * 2;
}

// LLAMAR a la función (aquí se ejecuta de verdad)
let resultado = duplicar(7);   // → 14
```

Puedes definir la función al principio del archivo y llamarla al final, o al revés. La definición solo dice "esta función existe y hace esto". La llamada es cuando realmente ocurre.

---

## 9. Ejecutar JavaScript en VS Code

Hasta ahora en esta asignatura hemos usado VS Code para HTML y CSS, que el navegador interpreta directamente. Para ejecutar JavaScript sin HTML, usaremos **Node.js**: un entorno que permite ejecutar JavaScript fuera del navegador.

### Paso 1 — Instalar Node.js

1. Ve a [nodejs.org](https://nodejs.org) y descarga la versión **LTS** (la recomendada, más estable).
2. Ejecuta el instalador y sigue los pasos (siguiente, siguiente, instalar).
3. Comprueba que se instaló correctamente abriendo una terminal en VS Code (`Ctrl + ñ`) y escribiendo:

```bash
node --version
```

Debería mostrarse algo como `v22.x.x`. (o posterior). La cuestión es que si sale un número, Node está instalado.

### Paso 2 — Crear un archivo `.js`

1. En VS Code, crea una carpeta para tus ejercicios de JavaScript.
2. Dentro, crea un archivo nuevo con extensión `.js`, por ejemplo `prueba.js`.
3. Escribe algo de código:

```javascript
let nombre = "Mundo";
console.log("¡Hola, " + nombre + "!");
```

### Paso 3 — Ejecutar el archivo

Con la terminal abierta en VS Code (`Ctrl + ñ`), navega a la carpeta donde está el archivo y ejecútalo con:

```bash
node prueba.js
```

Verás el resultado directamente en la terminal:

```text
¡Hola, Mundo!
```

### Alternativa: extensión Code Runner

Si prefieres ejecutar el archivo con un solo clic:

1. En VS Code, abre el panel de extensiones (`Ctrl + Shift + X`).
2. Busca **Code Runner** e instálala.
3. Con el archivo `.js` abierto, pulsa el botón ▶ (triángulo) en la esquina superior derecha, o `Ctrl + Alt + N`.

El resultado aparece en el panel de salida de VS Code.

### La consola del navegador (alternativa rápida)

Para probar fragmentos de código pequeños sin crear un archivo, puedes usar la consola del navegador que ya conoces de HTML/CSS:

1. Abre cualquier página web en Chrome o Firefox.
2. Pulsa `F12` para abrir las DevTools.
3. Ve a la pestaña **Consola**.
4. Escribe JavaScript directamente y pulsa Enter.

```javascript
> 2 + 2
  4
> let nombre = "Ana"
  undefined
> "Hola, " + nombre
  "Hola, Ana"
```

La consola del navegador es perfecta para experimentar. Node.js es mejor para ejercicios más largos en archivos.

---

## Siguiente paso

Con estos conceptos claros, ya tienes la base para entender el tutorial de JavaScript de Eniun. Lo que allí verás como "sintaxis nueva" tendrá sentido porque ya entiendes qué es una variable, un bucle o una función.

Cuando algo no funcione como esperas, prueba estas estrategias:

1. **Usa `console.log`** para ver el valor de las variables en cada paso.
2. **Usa `typeof`** si no sabes qué tipo tiene un valor.
3. **Traza el algoritmo a mano** antes de buscar el error en el código.

[→ Continuar con el tutorial de JavaScript básico en Eniun](https://www.eniun.com/tutorial-javascript-basico/)
