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

const btnNumero = document.getElementById("btn-numero")
btnNumero.addEventListener("click", () => {
    spanNumero.textContent = numeroActual;
    const li = document.createElement("li");
    li.textContent =`${numeroActual} → ${numeroActual}`;
    const historial = document.getElementById("historial");
    historial.appendChild(li);
    numeroActual++;
})

const btnFizz = document.getElementById("btn-fizz")
btnFizz.addEventListener("click", () => {
    spanNumero.textContent = numeroActual;
    const li = document.createElement("li");
    li.textContent =`${numeroActual} → Fizz`;
    const historial = document.getElementById("historial");
    historial.appendChild(li);
    numeroActual++;
})

const btnBuzz = document.getElementById("btn-buzz")
btnBuzz.addEventListener("click", () => {
    spanNumero.textContent = numeroActual;
    const li = document.createElement("li");
    li.textContent =`${numeroActual} → Buzz`;
    const historial = document.getElementById("historial");
    historial.appendChild(li);
    numeroActual++;
})

const btnFizzBuzz = document.getElementById("btn-fizzbuzz")
btnFizzBuzz.addEventListener("click", () => {
    spanNumero.textContent = numeroActual;
    const li = document.createElement("li");
    li.textContent =`${numeroActual} → FizzBuzz`;
    const historial = document.getElementById("historial");
    historial.appendChild(li);
    numeroActual++;
})
