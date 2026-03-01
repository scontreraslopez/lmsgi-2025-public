# UP10 — Actividades evaluables: Miniproyecto TechShop

En este miniproyecto vas a construir **TechShop**, una tienda de tecnología ficticia, usando JavaScript puro. La idea es sencilla: una tienda tiene productos con nombre, precio y disponibilidad; un cliente tiene saldo; y la caja registradora calcula subtotales, aplica IVA y gestiona descuentos por volumen de compra.

El proyecto está dividido en **6 fases progresivas**. Cada fase introduce un concepto nuevo y construye sobre lo que ya tienes:

| Fase | Concepto | Qué harás |
| --- | --- | --- |
| 1 | Variables y tipos | Declarar los productos y el cliente de la tienda |
| 2 | Operadores | Calcular totales, IVA y cambio |
| 3 | Condicionales | Comprobar saldo, disponibilidad y aplicar descuentos |
| 4 | Bucles | Recorrer el carrito e imprimir un ticket |
| 5 | Funciones | Refactorizar la lógica en funciones reutilizables |
| 6 | DOM | Llevar la tienda al navegador con una interfaz interactiva |

Las fases 1-5 se ejecutan en la terminal con Node.js. La fase 6 se abre en el navegador. En ambos casos verás resultados reales inmediatamente, lo que te permitirá comprobar tu código en cada paso.

---

**Archivos que debes editar:**

- Fases 1-5 → `js/UP10-actividades.js`
- Fase 6 (DOM) → `js/main.js`

**Cómo ejecutar las fases 1-5** (desde la raíz del proyecto):

```bash
node js/UP10-actividades.js
```

**Cómo ejecutar la fase 6:**
Abre `main.html` en el navegador.

---

## Fase 1 — Variables y tipos

*Sección §3-§4 de los fundamentos.*

El archivo ya declara la tienda TechShop con tres productos. Localiza el bloque **EJERCICIO 1.1** en `js/UP10-actividades.js` y complétalo:

**Ejercicio 1.1** — Declara 3 productos más de tu tienda inventada. Cada producto necesita tres variables: nombre (`string`), precio (`number`) y disponible (`boolean`). Usa `const` y nombres en camelCase. Imprime cada uno con `console.log` y muestra su tipo con `typeof`.

Ejemplo de resultado esperado en consola:

```text
Auriculares Bluetooth — string
49.95 — number
true — boolean
```

---

## Fase 2 — Operadores

*Sección §5 de los fundamentos.*

El código de ejemplo calcula el total de 2 teclados con IVA y el cambio del cliente. Localiza los bloques **EJERCICIO 2.1** y **EJERCICIO 2.2** en `js/UP10-actividades.js`.

**Ejercicio 2.1** — El cliente quiere 3 ratones inalámbricos (`precio2 = 34.50 €`). Calcula:

- El subtotal (precio × cantidad).
- El total con IVA (21 %).
- Si la cantidad es par o impar (usa el operador `%`).

Imprime los tres resultados con `console.log`.

**Ejercicio 2.2** — Una tablet cuesta 349,99 €. El cliente tiene un saldo de 150 €. ¿Le alcanza? Calcula cuánto le falta (o cuánto le sobra) y muéstralo en consola.

---

## Fase 3 — Condicionales

*Sección §6 de los fundamentos.*

El código de ejemplo comprueba disponibilidad, saldo y aplica descuentos por tramos. Localiza los bloques **EJERCICIO 3.1** y **EJERCICIO 3.2** en `js/UP10-actividades.js`.

**Ejercicio 3.1** — Escribe un bloque `if / else if / else` que clasifique al cliente según su saldo:

| Saldo | Categoría |
| --- | --- |
| 500 € o más | Cliente VIP |
| Entre 100 € y 499 € | Cliente estándar |
| Menos de 100 € | Saldo bajo |

Prueba tu código cambiando manualmente el valor de `saldoCliente` (declarado en la Fase 1) y verifica que el mensaje cambia.

**Ejercicio 3.2** — Comprueba si el `producto3` (Monitor 24") está disponible. Si lo está, muestra su precio y qué descuento por tramos le correspondería. Si no lo está, muestra un mensaje de agotado.

---

## Fase 4 — Bucles

*Sección §7 de los fundamentos.*

El código de ejemplo recorre el array `carrito` con un bucle `for`, imprime un ticket e identifica el producto más caro. Localiza los bloques **EJERCICIO 4.1**, **4.2** y **4.3** en `js/UP10-actividades.js`.

**Ejercicio 4.1** — Añade 2 productos más al array `carrito` que ya existe en el archivo (edita el array directamente). Vuelve a ejecutar el programa y comprueba que el ticket se actualiza automáticamente sin cambiar nada más.

**Ejercicio 4.2** — Usando el patrón "encontrar mínimo" (igual que el de máximo del ejemplo, pero al revés), encuentra el producto más barato del carrito. Imprime su nombre y precio.

**Ejercicio 4.3** — Calcula cuántos artículos hay en total en el carrito sumando las cantidades de todas las líneas (no el número de líneas). Imprime el resultado. *Pista: usa un acumulador dentro del bucle `for`.*

Ejemplo:

```text
Artículos en el carrito: 6
```

---

## Fase 5 — Funciones

*Sección §8 de los fundamentos.*

El código de ejemplo refactoriza la lógica en funciones (`calcularSubtotal`, `aplicarIVA`, `aplicarDescuento`, `imprimirTicket`) y las compone en `procesarCompra()`. Localiza los bloques **EJERCICIO 5.1** y **5.2** en `js/UP10-actividades.js`.

**Ejercicio 5.1** — Completa la función `encontrarProducto(carrito, nombre)` que ya tiene su declaración en el archivo. Debe:

- Recorrer el array `carrito` con un bucle `for`.
- Devolver el objeto del producto cuyo `nombre` coincida exactamente con el parámetro.
- Devolver `null` si no se encuentra ningún producto con ese nombre.

Descomenta las líneas de prueba que hay justo debajo para verificar que funciona:

```js
console.log(encontrarProducto(carrito, "Ratón inalámbrico"));
// → { nombre: 'Ratón inalámbrico', precio: 34.5, cantidad: 2 }

console.log(encontrarProducto(carrito, "Disco duro"));
// → null
```

**Ejercicio 5.2** *(desafío)* — Crea un `carrito2` con 4 o 5 productos de tu elección y un `cliente2` con saldo de 300 €. Llama a `procesarCompra(carrito2, cliente2, 300)` para generar el ticket completo del segundo cliente.

---

## Fase 6 — DOM: la tienda en el navegador

*Para esta fase trabaja en `js/main.js`. Abre `main.html` en el navegador para ver los cambios en tiempo real. El scaffold HTML y CSS ya están dados.*

### Paso previo obligatorio — Porta tus funciones de la Fase 5

Antes de escribir ningún ejercicio, copia las siguientes funciones de `js/UP10-actividades.js` al bloque reservado al inicio de `js/main.js` (está marcado como `/* --- PEGA AQUÍ TUS FUNCIONES --- */`):

| Qué copiar | Dónde está en `js/UP10-actividades.js` |
| --- | --- |
| `const IVA = 0.21` | Al principio del archivo, en la Fase 1 |
| `function calcularSubtotal(precio, cantidad)` | Fase 5 |
| `function aplicarIVA(subtotal)` | Fase 5 |
| `function aplicarDescuento(total, porcentaje)` | Fase 5 |
| `function calcularPorcentajeDescuento(importe)` | Fase 3 |

> **¿Por qué?** La función `actualizarResumen()` de `js/main.js` llama directamente a `calcularPorcentajeDescuento`, `aplicarDescuento` y `aplicarIVA`. Si no las pegas, el navegador lanzará un error y el carrito no funcionará.

Una vez pegadas, abre `main.html` en el navegador: si el carrito muestra `0,00 €` correctamente al cargar, las funciones están bien colocadas y puedes continuar con los ejercicios.

---

El archivo `js/main.js` incluye el código base funcionando (pasos 1-6): puedes añadir productos al carrito, ver el total actualizado y vaciar el carrito. Tu tarea es completar los tres ejercicios al final del archivo.

**Ejercicio 6.1** — Muestra el número de artículos en el título de la sección "Carrito":

- 0 artículos → `Carrito`
- 1 artículo → `Carrito (1 artículo)`
- 2 o más → `Carrito (3 artículos)`

El contador debe actualizarse cada vez que se añade o elimina un artículo. *Pista: modifica la función `actualizarResumen()`.*

**Ejercicio 6.2** — Cuando el carrito está vacío, muestra el texto "El carrito está vacío." dentro de la lista. Cuando hay artículos, ese texto debe desaparecer. *Pista: comprueba `itemsCarrito.length` dentro de `actualizarResumen()`.*

**Ejercicio 6.3** *(desafío)* — Evita que el mismo producto se pueda añadir más de una vez al carrito. En lugar de crear una línea nueva, incrementa la cantidad de la línea existente y actualiza su texto:

```text
Teclado mecánico x2 — 159,98 €
```

*Pista: en la función `añadirAlCarrito()`, busca primero si el producto ya está en `itemsCarrito` con `findIndex()`. Las instrucciones detalladas están en el comentario del ejercicio dentro del archivo.*

---

## Entrega

Una vez completadas las fases que se indiquen, comprime **toda la carpeta del proyecto** en un archivo `.zip` y súbelo a la tarea correspondiente de Aules.

Antes de comprimir, comprueba que:

- `node js/UP10-actividades.js` se ejecuta sin errores en la terminal.
- `main.html` abre correctamente en el navegador y el carrito funciona.
- Los ejercicios que has completado tienen código escrito (no están en blanco ni comentados).

El nombre del archivo debe seguir el formato: `APELLIDOS_NOMBRE_TechShop.zip`
