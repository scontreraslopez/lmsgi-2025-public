// ============================================================
// EXAMEN PRACTICO — Ejercicio D: Biblioteca Digital
// Completa las 4 funciones. No modifiques los console.log.
// Ejecuta con: node starting.js
// ============================================================


// ------------------------------------------------------------
// FUNCION 1 — calcularMulta
// Recibe: diasRetraso (numero), multaPorDia (numero)
// Devuelve: 0 si diasRetraso es 0 o negativo
//           diasRetraso * multaPorDia en caso contrario
// Ejemplo: calcularMulta(5, 0.50)  => 2.5
//          calcularMulta(0, 0.50)  => 0
//          calcularMulta(-2, 0.50) => 0
// ------------------------------------------------------------
function calcularMulta(diasRetraso, multaPorDia) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 2 — categorizarLibro
// Recibe: paginas (numero)
// Devuelve: "corto" si paginas < 150
//           "medio" si paginas >= 150 y paginas <= 400
//           "largo" si paginas > 400
// Ejemplo: categorizarLibro(120)  => "corto"
//          categorizarLibro(300)  => "medio"
//          categorizarLibro(600)  => "largo"
// ------------------------------------------------------------
function categorizarLibro(paginas) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 3 — contarLibrosDisponibles
// Recibe: libros (array de objetos { titulo, autor, isbn, disponible })
// Devuelve: el numero de libros con disponible === true
// Ejemplo: si hay 6 libros y 4 tienen disponible: true => devuelve 4
// ------------------------------------------------------------
function contarLibrosDisponibles(libros) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 4 — buscarLibroPorIsbn
// Recibe: libros (array de objetos { titulo, autor, isbn, disponible }),
//         isbn (string con el ISBN a buscar)
// Devuelve: el objeto cuyo isbn coincida exactamente,
//           o null si no se encuentra
// Ejemplo: buscarLibroPorIsbn(catalogo, "978-84-376-0494-7")
//          => { titulo: "Don Quijote...", autor: "...", isbn: "...", disponible: true }
// ------------------------------------------------------------
function buscarLibroPorIsbn(libros, isbn) {
  // ESCRIBE TU CODIGO AQUI

}


// ============================================================
// DATOS DE PRUEBA — No modificar
// ============================================================

const catalogoBiblioteca = [
  { titulo: "Don Quijote de la Mancha",    autor: "Miguel de Cervantes",  isbn: "978-84-376-0494-7", disponible: true  },
  { titulo: "Cien anos de soledad",         autor: "Gabriel Garcia Marquez", isbn: "978-84-397-2077-6", disponible: false },
  { titulo: "El principito",               autor: "Antoine de Saint-Exupery", isbn: "978-84-261-3289-3", disponible: true  },
  { titulo: "1984",                        autor: "George Orwell",        isbn: "978-84-233-0498-4", disponible: true  },
  { titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling",  isbn: "978-84-9838-021-4", disponible: false },
  { titulo: "El senor de los anillos",     autor: "J.R.R. Tolkien",      isbn: "978-84-450-7179-4", disponible: true  },
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

console.log("=== Funcion 1: calcularMulta ===");
comprobar("calcularMulta(5, 0.50)",    calcularMulta(5, 0.50),    2.5);
comprobar("calcularMulta(10, 0.25)",   calcularMulta(10, 0.25),   2.5);
comprobar("calcularMulta(0, 0.50)",    calcularMulta(0, 0.50),    0);
comprobar("calcularMulta(-3, 0.50)",   calcularMulta(-3, 0.50),   0);

console.log("\n=== Funcion 2: categorizarLibro ===");
comprobar("categorizarLibro(80)",   categorizarLibro(80),   "corto");
comprobar("categorizarLibro(149)",  categorizarLibro(149),  "corto");
comprobar("categorizarLibro(150)",  categorizarLibro(150),  "medio");
comprobar("categorizarLibro(300)",  categorizarLibro(300),  "medio");
comprobar("categorizarLibro(400)",  categorizarLibro(400),  "medio");
comprobar("categorizarLibro(401)",  categorizarLibro(401),  "largo");

console.log("\n=== Funcion 3: contarLibrosDisponibles ===");
comprobar("contarLibrosDisponibles(catalogoBiblioteca)", contarLibrosDisponibles(catalogoBiblioteca), 4);

console.log("\n=== Funcion 4: buscarLibroPorIsbn ===");
comprobar(
  'buscarLibroPorIsbn(catalogoBiblioteca, "978-84-233-0498-4")',
  buscarLibroPorIsbn(catalogoBiblioteca, "978-84-233-0498-4"),
  { titulo: "1984", autor: "George Orwell", isbn: "978-84-233-0498-4", disponible: true }
);
comprobar(
  'buscarLibroPorIsbn(catalogoBiblioteca, "000-00-000-0000-0")',
  buscarLibroPorIsbn(catalogoBiblioteca, "000-00-000-0000-0"),
  null
);
