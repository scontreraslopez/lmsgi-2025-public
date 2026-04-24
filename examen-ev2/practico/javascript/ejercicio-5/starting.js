// FizzBuzz Trainer
// Al pulsar un botón, añade una entrada al historial y avanza al siguiente número.

let numeroActual = 1;

const spanNumero = document.querySelector('#numero');
const historial = document.querySelector('#historial');

// TODO: selecciona los tres botones
// const btnNumero = ...
// const btnFizz   = ...
// const btnBuzz   = ...

// TODO: añade un evento 'click' a cada botón.
// Al hacer click debe:
//   1. Crear un <li> con el texto: numeroActual + " → " + opcion  (ej: "3 → Fizz")
//   2. Añadirlo al historial con appendChild
//   3. Incrementar numeroActual
//   4. Actualizar spanNumero.textContent con el nuevo valor
