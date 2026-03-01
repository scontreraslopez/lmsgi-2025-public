/* ============================================================
   MINIPROYECTO: TechShop — Tu primera tienda en JavaScript
   ============================================================
   Cada fase construye sobre la anterior.
   Ejecuta con: node js/UP10-actividades.js
   ============================================================ */


/* === FASE 1: Variables y tipos ==============================
   Fundamentos §3 (Variables) y §4 (Tipos de datos)

   Declaramos los datos de nuestra tienda usando los tipos
   básicos de JavaScript: string, number y boolean.
   Usamos const para valores fijos y let para los que cambian.
   ============================================================ */

// --- Datos de la tienda (constantes, no cambian) ---
const nombreTienda = "TechShop";
const IVA = 0.21;                 // 21 % expresado como proporción

// --- Catálogo de productos ---
// Cada producto tiene: nombre (string), precio (number), disponible (boolean)
const producto1 = "Teclado mecánico";
const precio1 = 79.99;
const disponible1 = true;

const producto2 = "Ratón inalámbrico";
const precio2 = 34.50;
const disponible2 = true;

const producto3 = "Monitor 24\"";
const precio3 = 229.00;
const disponible3 = false;       // agotado

// --- Datos del cliente ---
let nombreCliente = "Laura";
let saldoCliente = 150.00;       // euros disponibles

// Inspeccionamos los tipos con typeof (fundamentos §4)
console.log("=== FASE 1: Variables y tipos ===");
console.log(`Bienvenido a ${nombreTienda}`);
console.log(`Tipo de nombreTienda: ${typeof nombreTienda}`);   // string
console.log(`Tipo de precio1:      ${typeof precio1}`);        // number
console.log(`Tipo de disponible1:  ${typeof disponible1}`);    // boolean
console.log(`Cliente: ${nombreCliente} — Saldo: ${saldoCliente} €`);

/* -------------------------------------------------------
   EJERCICIO 1.1
   Declara 3 productos más de tu tienda inventada.
   Cada uno necesita tres variables: nombre, precio y
   disponible. Usa const y nombres en camelCase.
   Imprime cada producto con console.log y typeof.
   ------------------------------------------------------- */

// Escribe aquí tus productos:


/* === FASE 2: Operadores =====================================
   Fundamentos §5 (Operadores)

   Calculamos el total de una compra aplicando IVA.
   Vemos el operador módulo (%) en un contexto real.
   ============================================================ */

// El cliente quiere 2 teclados
let cantidadCompra = 2;
let subtotal = precio1 * cantidadCompra;          // multiplicación
let totalConIVA = subtotal + subtotal * IVA;      // suma y multiplicación
let cambio = saldoCliente - totalConIVA;          // resta

console.log("\n=== FASE 2: Operadores ===");
console.log(`Producto:  ${producto1}`);
console.log(`Cantidad:  ${cantidadCompra}`);
console.log(`Subtotal:  ${subtotal.toFixed(2)} €`);
console.log(`IVA (21%): ${(subtotal * IVA).toFixed(2)} €`);
console.log(`Total:     ${totalConIVA.toFixed(2)} €`);
console.log(`Cambio:    ${cambio.toFixed(2)} €`);

// Módulo: ¿es par la cantidad? (fundamentos §5 — módulo)
let esCantidadPar = cantidadCompra % 2 === 0;
console.log(`¿Cantidad par? ${esCantidadPar}`);   // true si es par

/* -------------------------------------------------------
   EJERCICIO 2.1
   El cliente también quiere 3 ratones inalámbricos.
   Calcula:
     a) El subtotal (precio2 × 3)
     b) El total con IVA
     c) Si la cantidad es par o impar
   Imprime los resultados con console.log.
   ------------------------------------------------------- */

// Escribe aquí tus cálculos:


/* -------------------------------------------------------
   EJERCICIO 2.2
   Una tablet cuesta 349.99 €. El cliente quiere 1.
   ¿Le alcanza el saldo de 150 € para pagarla?
   Calcula cuánto le faltaría (o cuánto le sobra).
   ------------------------------------------------------- */

// Escribe aquí:


/* === FASE 3: Condicionales ===================================
   Fundamentos §6 (Condiciones)

   Comprobamos saldo, disponibilidad y aplicamos descuentos
   por tramos con if / else if / else.
   ============================================================ */

console.log("\n=== FASE 3: Condicionales ===");

// --- Comprobar disponibilidad ---
if (disponible1) {
    console.log(`"${producto1}" está disponible.`);
} else {
    console.log(`"${producto1}" está agotado.`);
}

// --- Comprobar saldo suficiente ---
if (saldoCliente >= totalConIVA) {
    console.log(`Compra aprobada. Cambio: ${cambio.toFixed(2)} €`);
} else {
    console.log(`Saldo insuficiente. Faltan ${(totalConIVA - saldoCliente).toFixed(2)} €`);
}

// --- Descuento por tramos ---
// > 100 € → 20% dto  |  > 50 € → 10% dto  |  resto → sin dto
function calcularPorcentajeDescuento(importe) {
    if (importe > 100) {
        return 20;
    } else if (importe > 50) {
        return 10;
    } else {
        return 0;
    }
}

let descuentoPct = calcularPorcentajeDescuento(totalConIVA);
console.log(`Total: ${totalConIVA.toFixed(2)} € → Descuento aplicado: ${descuentoPct}%`);

/* -------------------------------------------------------
   EJERCICIO 3.1
   Escribe un bloque if/else if/else que clasifique
   al cliente según su saldo:
     - saldo >= 500 → "Cliente VIP"
     - saldo >= 100 → "Cliente estándar"
     - saldo < 100  → "Saldo bajo"
   Pruébalo con distintos valores de saldo.
   ------------------------------------------------------- */

// Escribe aquí:


/* -------------------------------------------------------
   EJERCICIO 3.2
   Comprueba si el producto3 (Monitor) está disponible.
   Si lo está, aplica el descuento correspondiente a su
   precio. Si no, muestra un mensaje de agotado.
   ------------------------------------------------------- */

// Escribe aquí:


/* === FASE 4: Bucles ==========================================
   Fundamentos §7 (Bucles)

   Creamos un array con el carrito de la compra y usamos
   un bucle for para recorrerlo, calcular el total e
   imprimir el ticket línea por línea.
   ============================================================ */

// --- El carrito: array de objetos ---
// (Objetos: los verás en profundidad más adelante; por ahora
//  piensa en ellos como "fichas" con propiedades)
const carrito = [
    { nombre: "Teclado mecánico",   precio: 79.99,  cantidad: 1 },
    { nombre: "Ratón inalámbrico",  precio: 34.50,  cantidad: 2 },
    { nombre: "Alfombrilla XL",     precio: 19.95,  cantidad: 1 },
];

console.log("\n=== FASE 4: Bucles ===");
console.log(`--- Ticket de ${nombreTienda} ---`);

let subtotalCarrito = 0;

// Recorremos el carrito con un bucle for
for (let i = 0; i < carrito.length; i++) {
    let item = carrito[i];
    let lineaTotal = item.precio * item.cantidad;
    subtotalCarrito += lineaTotal;   // acumulador

    console.log(`${item.nombre.padEnd(22)} x${item.cantidad}  ${lineaTotal.toFixed(2)} €`);
}

let ivaCarrito = subtotalCarrito * IVA;
let totalCarrito = subtotalCarrito + ivaCarrito;

console.log("------------------------------");
console.log(`${"Subtotal".padEnd(28)} ${subtotalCarrito.toFixed(2)} €`);
console.log(`${"IVA (21%)".padEnd(28)} ${ivaCarrito.toFixed(2)} €`);
console.log(`${"TOTAL".padEnd(28)} ${totalCarrito.toFixed(2)} €`);

// Patrón "encontrar máximo": producto más caro del carrito
let indiceMasCaro = 0;
for (let i = 1; i < carrito.length; i++) {
    if (carrito[i].precio > carrito[indiceMasCaro].precio) {
        indiceMasCaro = i;
    }
}
console.log(`Producto más caro: ${carrito[indiceMasCaro].nombre} (${carrito[indiceMasCaro].precio.toFixed(2)} €)`);

/* -------------------------------------------------------
   EJERCICIO 4.1
   Añade 2 productos más al array carrito (edita el array
   de arriba directamente) y vuelve a ejecutar el programa.
   Comprueba que el ticket se actualiza automáticamente.
   ------------------------------------------------------- */

/* -------------------------------------------------------
   EJERCICIO 4.2
   Usa un bucle for para encontrar el producto MÁS BARATO
   del carrito (patrón "encontrar mínimo", igual que el
   de máximo pero al revés). Imprime su nombre y precio.
   ------------------------------------------------------- */

// Escribe aquí:


/* -------------------------------------------------------
   EJERCICIO 4.3
   Cuenta cuántos artículos hay en total en el carrito
   (suma de todas las cantidades, no el número de líneas).
   Pista: un acumulador dentro del bucle for.
   ------------------------------------------------------- */

// Escribe aquí:


/* === FASE 5: Funciones =======================================
   Fundamentos §8 (Funciones)

   Refactorizamos la lógica de las fases anteriores en
   funciones reutilizables y las componemos en procesarCompra().
   ============================================================ */

console.log("\n=== FASE 5: Funciones ===");

// --- Funciones de cálculo ---

function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function aplicarIVA(subtotal) {
    return subtotal * (1 + IVA);   // subtotal + 21%
}

function aplicarDescuento(total, porcentaje) {
    return total * (1 - porcentaje / 100);
}

// --- Función que imprime el ticket completo ---

function imprimirTicket(carrito) {
    console.log(`\n====== ${nombreTienda} ======`);
    let subtotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let lineaTotal = calcularSubtotal(item.precio, item.cantidad);
        subtotal += lineaTotal;
        console.log(`${item.nombre.padEnd(22)} x${item.cantidad}  ${lineaTotal.toFixed(2)} €`);
    }

    let pctDto = calcularPorcentajeDescuento(subtotal);
    let subtotalConDto = aplicarDescuento(subtotal, pctDto);
    let total = aplicarIVA(subtotalConDto);

    console.log("------------------------------");
    if (pctDto > 0) {
        console.log(`${"Subtotal".padEnd(28)} ${subtotal.toFixed(2)} €`);
        console.log(`${"Descuento (" + pctDto + "%)".padEnd(28)} -${(subtotal - subtotalConDto).toFixed(2)} €`);
    }
    console.log(`${"Base imponible".padEnd(28)} ${subtotalConDto.toFixed(2)} €`);
    console.log(`${"IVA (21%)".padEnd(28)} ${(total - subtotalConDto).toFixed(2)} €`);
    console.log(`${"TOTAL".padEnd(28)} ${total.toFixed(2)} €`);

    return total;
}

// --- Función principal que orquesta todo ---

function procesarCompra(carrito, cliente, saldo) {
    let total = imprimirTicket(carrito);

    console.log(`\nCliente: ${cliente}`);
    if (saldo >= total) {
        let cambio = saldo - total;
        console.log(`Pago aceptado. Cambio: ${cambio.toFixed(2)} €`);
    } else {
        console.log(`Saldo insuficiente. Faltan ${(total - saldo).toFixed(2)} €`);
    }
}

procesarCompra(carrito, nombreCliente, saldoCliente);

/* -------------------------------------------------------
   EJERCICIO 5.1
   Escribe una función encontrarProducto(carrito, nombre)
   que recorra el array carrito y devuelva el objeto del
   producto cuyo nombre coincida exactamente, o null si
   no lo encuentra.

   Ejemplo de uso:
     let resultado = encontrarProducto(carrito, "Ratón inalámbrico");
     console.log(resultado);   // { nombre: "Ratón ...", precio: 34.5, cantidad: 2 }

   Pista: usa un bucle for y compara item.nombre === nombre.
         Si encuentras el producto, haz return del item.
         Después del bucle, haz return null.
   ------------------------------------------------------- */

// Escribe aquí:
function encontrarProducto(carrito, nombre) {
    // Tu código aquí
}

// Prueba (descomenta cuando tengas la función lista):
// console.log(encontrarProducto(carrito, "Ratón inalámbrico"));
// console.log(encontrarProducto(carrito, "Disco duro"));   // null

/* -------------------------------------------------------
   EJERCICIO 5.2 (desafío)
   Crea un carrito2 con 4 o 5 productos de tu elección
   y un cliente2 con saldo 300 €.
   Llama a procesarCompra(carrito2, cliente2, 300) para
   generar el ticket completo del segundo cliente.
   ------------------------------------------------------- */

// Escribe aquí:


/* ============================================================
   FASE 6: DOM — la tienda en el navegador
   ============================================================
   Para esta fase abre el archivo main.html en el navegador.
   Escribe tu código JavaScript en js/main.js.
   ============================================================ */
