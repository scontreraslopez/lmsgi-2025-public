// ============================================================
// EXAMEN PRACTICO — Ejercicio D: Tienda Electronica
// Completa las 4 funciones. No modifiques los console.log.
// Ejecuta con: node starting.js
// ============================================================


// ------------------------------------------------------------
// FUNCIÓN 1 — calcularPrecioConIVA
// Recibe: precio (numero), porcentajeIVA (numero, ej: 21)
// Devuelve: el precio con el IVA incluido
// Ejemplo: calcularPrecioConIVA(100, 21) => 121
//          calcularPrecioConIVA(50, 10)  => 55
// ------------------------------------------------------------
function calcularPrecioConIVA(precio, porcentajeIVA) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCIÓN 2 — clasificarProducto
// Recibe: precio (numero)
// Devuelve: "economico" si precio < 50
//           "estandar"  si precio >= 50 y precio <= 200
//           "premium"   si precio > 200
// Ejemplo: clasificarProducto(30)  => "economico"
//          clasificarProducto(100) => "estandar"
//          clasificarProducto(350) => "premium"
// ------------------------------------------------------------
function clasificarProducto(precio) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCIÓN 3 — contarProductosDisponibles
// Recibe: productos (array de objetos { nombre, precio, disponible })
// Devuelve: el numero de productos con disponible === true
// Ejemplo: si hay 5 productos y 3 tienen disponible: true => devuelve 3
// ------------------------------------------------------------
function contarProductosDisponibles(productos) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCIÓN 4 — buscarProductoPorNombre
// Recibe: productos (array de objetos { nombre, precio }),
//         nombre (string con el nombre a buscar)
// Devuelve: el objeto cuyo nombre coincida exactamente,
//           o null si no se encuentra
// Ejemplo: buscarProductoPorNombre(lista, "Raton") => { nombre: "Raton", precio: 25 }
//          buscarProductoPorNombre(lista, "Tablet") => null
// ------------------------------------------------------------
function buscarProductoPorNombre(productos, nombre) {
  // ESCRIBE TU CODIGO AQUI

}


// ============================================================
// DATOS DE PRUEBA — NO MODIFICAR
// ============================================================

const catalogoProductos = [
  { nombre: "Teclado Mecanico",  precio: 89.99,  disponible: true  },
  { nombre: "Raton Inalambrico", precio: 34.99,  disponible: true  },
  { nombre: "Monitor 27\"",      precio: 329.00, disponible: false },
  { nombre: "Auriculares USB",   precio: 49.99,  disponible: true  },
  { nombre: "Webcam HD",         precio: 75.00,  disponible: false },
  { nombre: "Hub USB-C",         precio: 22.50,  disponible: true  },
  { nombre: "SSD Externo 1TB",   precio: 110.00, disponible: true  },
];


// ============================================================
// PRUEBAS — No modificar
// ============================================================

function comprobar(etiqueta, obtenido, esperado) {
  const ok = (typeof obtenido === "number" && typeof esperado === "number")
    ? Math.abs(obtenido - esperado) < 0.0001
    : JSON.stringify(obtenido) === JSON.stringify(esperado);
  console.log(`${ok ? "✓" : "✗"} ${etiqueta}`);
  console.log(`  Obtenido: ${JSON.stringify(obtenido)}`);
  console.log(`  Esperado: ${JSON.stringify(esperado)}`);
}

console.log("=== Funcion 1: calcularPrecioConIVA ===");
comprobar("calcularPrecioConIVA(100, 21)", calcularPrecioConIVA(100, 21), 121);
comprobar("calcularPrecioConIVA(50, 10)",  calcularPrecioConIVA(50, 10),  55);
comprobar("calcularPrecioConIVA(200, 4)",  calcularPrecioConIVA(200, 4),  208);

console.log("\n=== Funcion 2: clasificarProducto ===");
comprobar("clasificarProducto(29.99)",  clasificarProducto(29.99),  "economico");
comprobar("clasificarProducto(89.99)",  clasificarProducto(89.99),  "estandar");
comprobar("clasificarProducto(50)",     clasificarProducto(50),     "estandar");
comprobar("clasificarProducto(200)",    clasificarProducto(200),    "estandar");
comprobar("clasificarProducto(329.00)", clasificarProducto(329.00), "premium");

console.log("\n=== Funcion 3: contarProductosDisponibles ===");
comprobar("contarProductosDisponibles(catalogoProductos)", contarProductosDisponibles(catalogoProductos), 5);

console.log("\n=== Funcion 4: buscarProductoPorNombre ===");
comprobar(
  'buscarProductoPorNombre(catalogoProductos, "Webcam HD")',
  buscarProductoPorNombre(catalogoProductos, "Webcam HD"),
  { nombre: "Webcam HD", precio: 75.00, disponible: false }
);
comprobar(
  'buscarProductoPorNombre(catalogoProductos, "Tablet")',
  buscarProductoPorNombre(catalogoProductos, "Tablet"),
  null
);
