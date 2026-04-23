// ============================================================
// SOLUCION — Ejercicio D: Gestion de Notas
// ============================================================


// ------------------------------------------------------------
// FUNCION 1 — calcularMedia
// ------------------------------------------------------------
function calcularMedia(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
}

// Alternativa con reduce:
// function calcularMedia(notas) {
//   return notas.reduce((acc, n) => acc + n, 0) / notas.length;
// }


// ------------------------------------------------------------
// FUNCION 2 — determinarCalificacion
// ------------------------------------------------------------
function determinarCalificacion(nota) {
  if (nota < 5) {
    return "Suspenso";
  } else if (nota < 7) {
    return "Aprobado";
  } else if (nota < 9) {
    return "Notable";
  } else {
    return "Sobresaliente";
  }
}


// ------------------------------------------------------------
// FUNCION 3 — filtrarPorCalificacion
// ------------------------------------------------------------
function filtrarPorCalificacion(alumnos, calificacion) {
  let resultado = [];
  for (let i = 0; i < alumnos.length; i++) {
    if (determinarCalificacion(alumnos[i].nota) === calificacion) {
      resultado.push(alumnos[i]);
    }
  }
  return resultado;
}

// Alternativa con filter:
// function filtrarPorCalificacion(alumnos, calificacion) {
//   return alumnos.filter(a => determinarCalificacion(a.nota) === calificacion);
// }


// ------------------------------------------------------------
// FUNCION 4 — aplicarBonificacion
// ------------------------------------------------------------
function aplicarBonificacion(alumnos, puntos) {
  for (let i = 0; i < alumnos.length; i++) {
    alumnos[i].nota = Math.min(alumnos[i].nota + puntos, 10);
  }
  return alumnos;
}


// ============================================================
// DATOS DE PRUEBA
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
