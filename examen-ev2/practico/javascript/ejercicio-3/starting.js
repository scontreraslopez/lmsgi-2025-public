// ============================================================
// EXAMEN PRACTICO — Ejercicio D: Gestion de Notas
// Completa las 4 funciones. No modifiques los console.log.
// Ejecuta con: node starting.js
// ============================================================


// ------------------------------------------------------------
// FUNCION 1 — calcularMedia
// Recibe: notas (array de numeros)
// Devuelve: la media aritmetica de todos los valores
// Ejemplo: calcularMedia([4, 6, 8])  => 6
//          calcularMedia([0, 10])    => 5
// ------------------------------------------------------------
function calcularMedia(notas) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 2 — determinarCalificacion
// Recibe: nota (numero)
// Devuelve: "Suspenso"      si nota < 5
//           "Aprobado"      si nota >= 5 y nota < 7
//           "Notable"       si nota >= 7 y nota < 9
//           "Sobresaliente" si nota >= 9
// Ejemplo: determinarCalificacion(4.9) => "Suspenso"
//          determinarCalificacion(7.5) => "Notable"
// ------------------------------------------------------------
function determinarCalificacion(nota) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 3 — filtrarPorCalificacion
// Recibe: alumnos (array de objetos { nombre, nota }),
//         calificacion (string: "Suspenso", "Aprobado", "Notable" o "Sobresaliente")
// Devuelve: un NUEVO array con los alumnos cuya nota corresponda a esa calificacion
// Pista: puedes usar determinarCalificacion() dentro de esta funcion
// Ejemplo: filtrarPorCalificacion(lista, "Suspenso")
//          => [ { nombre: "Carlos Lopez", nota: 4.2 }, { nombre: "Luis Martinez", nota: 3.1 } ]
// ------------------------------------------------------------
function filtrarPorCalificacion(alumnos, calificacion) {
  // ESCRIBE TU CODIGO AQUI

}


// ------------------------------------------------------------
// FUNCION 4 — aplicarBonificacion
// Recibe: alumnos (array de objetos { nombre, nota }),
//         puntos (numero a sumar a cada nota)
// Modifica la nota de cada alumno sumando los puntos,
// con un maximo de 10 (Math.min puede ayudarte)
// Devuelve: el mismo array modificado
// Ejemplo: aplicarBonificacion([{ nombre: "Ana", nota: 9.4 }], 1)
//          => [ { nombre: "Ana", nota: 10 } ]
// ------------------------------------------------------------
function aplicarBonificacion(alumnos, puntos) {
  // ESCRIBE TU CODIGO AQUI

}


// ============================================================
// DATOS DE PRUEBA — No modificar
// ============================================================

const listaAlumnos = [
  { nombre: "Ana Garcia",    nota: 8.5 },
  { nombre: "Carlos Lopez",  nota: 4.2 },
  { nombre: "Maria Ruiz",    nota: 6.8 },
  { nombre: "Pedro Sanchez", nota: 9.4 },
  { nombre: "Sofia Torres",  nota: 5.0 },
  { nombre: "Luis Martinez", nota: 3.1 },
  { nombre: "Elena Vega",    nota: 7.5 },
  { nombre: "David Mora",    nota: 9.0 },
];

const grupoReducido = [
  { nombre: "Ana Garcia",    nota: 8.5 },
  { nombre: "Pedro Sanchez", nota: 9.4 },
  { nombre: "Luis Martinez", nota: 3.1 },
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

console.log("=== Funcion 1: calcularMedia ===");
comprobar("calcularMedia([4, 6, 8])",  calcularMedia([4, 6, 8]),  6);
comprobar("calcularMedia([0, 10])",    calcularMedia([0, 10]),    5);
comprobar("calcularMedia([5, 5, 5])",  calcularMedia([5, 5, 5]),  5);

console.log("\n=== Funcion 2: determinarCalificacion ===");
comprobar("determinarCalificacion(4.9)", determinarCalificacion(4.9), "Suspenso");
comprobar("determinarCalificacion(5)",   determinarCalificacion(5),   "Aprobado");
comprobar("determinarCalificacion(6.9)", determinarCalificacion(6.9), "Aprobado");
comprobar("determinarCalificacion(7)",   determinarCalificacion(7),   "Notable");
comprobar("determinarCalificacion(8.9)", determinarCalificacion(8.9), "Notable");
comprobar("determinarCalificacion(9)",   determinarCalificacion(9),   "Sobresaliente");

console.log("\n=== Funcion 3: filtrarPorCalificacion ===");
comprobar(
  'filtrarPorCalificacion(listaAlumnos, "Suspenso")',
  filtrarPorCalificacion(listaAlumnos, "Suspenso"),
  [{ nombre: "Carlos Lopez", nota: 4.2 }, { nombre: "Luis Martinez", nota: 3.1 }]
);
comprobar(
  'filtrarPorCalificacion(listaAlumnos, "Notable")',
  filtrarPorCalificacion(listaAlumnos, "Notable"),
  [{ nombre: "Ana Garcia", nota: 8.5 }, { nombre: "Elena Vega", nota: 7.5 }]
);

console.log("\n=== Funcion 4: aplicarBonificacion ===");
comprobar(
  "aplicarBonificacion(grupoReducido, 1)",
  aplicarBonificacion(grupoReducido, 1),
  [{ nombre: "Ana Garcia", nota: 9.5 }, { nombre: "Pedro Sanchez", nota: 10 }, { nombre: "Luis Martinez", nota: 4.1 }]
);
