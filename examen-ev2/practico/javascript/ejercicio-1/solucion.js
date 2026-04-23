// ============================================================
// SOLUCION — Ejercicio D: Tienda Electronica
// ============================================================


// ------------------------------------------------------------
// FUNCION 1 — calcularPrecioConIVA
// ------------------------------------------------------------
function calcularPrecioConIVA(precio, porcentajeIVA) {
  return precio + (precio * porcentajeIVA / 100);
}


// ------------------------------------------------------------
// FUNCION 2 — clasificarProducto
// ------------------------------------------------------------
function clasificarProducto(precio) {
  if (precio < 50) {
    return "economico";
  } else if (precio <= 200) {
    return "estandar";
  } else {
    return "premium";
  }
}


// ------------------------------------------------------------
// FUNCION 3 — contarProductosDisponibles
// ------------------------------------------------------------
function contarProductosDisponibles(productos) {
  let contador = 0;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].disponible === true) {
      contador++;
    }
  }
  return contador;
}

// Alternativa con filter:
// function contarProductosDisponibles(productos) {
//   return productos.filter(p => p.disponible === true).length;
// }


// ------------------------------------------------------------
// FUNCION 4 — buscarProductoPorNombre
// ------------------------------------------------------------
function buscarProductoPorNombre(productos, nombre) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombre) {
      return productos[i];
    }
  }
  return null;
}

// Alternativa con find:
// function buscarProductoPorNombre(productos, nombre) {
//   return productos.find(p => p.nombre === nombre) || null;
// }


// ============================================================
// DATOS DE PRUEBA
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
// PRUEBAS
// ============================================================

console.log("=== Funcion 1: calcularPrecioConIVA ===");
console.log(calcularPrecioConIVA(100, 21));   // 121
console.log(calcularPrecioConIVA(50, 10));    // 55
console.log(calcularPrecioConIVA(200, 4));    // 208

console.log("\n=== Funcion 2: clasificarProducto ===");
console.log(clasificarProducto(29.99));       // economico
console.log(clasificarProducto(89.99));       // estandar
console.log(clasificarProducto(50));          // estandar
console.log(clasificarProducto(200));         // estandar
console.log(clasificarProducto(329.00));      // premium

console.log("\n=== Funcion 3: contarProductosDisponibles ===");
console.log(contarProductosDisponibles(catalogoProductos)); // 5

console.log("\n=== Funcion 4: buscarProductoPorNombre ===");
console.log(buscarProductoPorNombre(catalogoProductos, "Webcam HD"));
// { nombre: 'Webcam HD', precio: 75, disponible: false }
console.log(buscarProductoPorNombre(catalogoProductos, "Tablet"));
// null
