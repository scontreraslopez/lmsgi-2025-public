// ============================================================
// SOLUCION — Ejercicio D: Biblioteca Digital
// ============================================================


// ------------------------------------------------------------
// FUNCION 1 — calcularMulta
// ------------------------------------------------------------
function calcularMulta(diasRetraso, multaPorDia) {
  if (diasRetraso <= 0) {
    return 0;
  }
  return diasRetraso * multaPorDia;
}


// ------------------------------------------------------------
// FUNCION 2 — categorizarLibro
// ------------------------------------------------------------
function categorizarLibro(paginas) {
  if (paginas < 150) {
    return "corto";
  } else if (paginas <= 400) {
    return "medio";
  } else {
    return "largo";
  }
}


// ------------------------------------------------------------
// FUNCION 3 — contarLibrosDisponibles
// ------------------------------------------------------------
function contarLibrosDisponibles(libros) {
  let contador = 0;
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].disponible === true) {
      contador++;
    }
  }
  return contador;
}

// Alternativa con filter:
// function contarLibrosDisponibles(libros) {
//   return libros.filter(l => l.disponible === true).length;
// }


// ------------------------------------------------------------
// FUNCION 4 — buscarLibroPorIsbn
// ------------------------------------------------------------
function buscarLibroPorIsbn(libros, isbn) {
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].isbn === isbn) {
      return libros[i];
    }
  }
  return null;
}

// Alternativa con find:
// function buscarLibroPorIsbn(libros, isbn) {
//   return libros.find(l => l.isbn === isbn) || null;
// }


// ============================================================
// DATOS DE PRUEBA
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
// PRUEBAS
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
