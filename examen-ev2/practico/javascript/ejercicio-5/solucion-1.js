let numeroActual = 1;

const spanNumero = document.querySelector('#numero');
const historial = document.querySelector('#historial');
const btnNumero   = document.querySelector('#btn-numero');
const btnFizz     = document.querySelector('#btn-fizz');
const btnBuzz     = document.querySelector('#btn-buzz');
const btnFizzBuzz = document.querySelector('#btn-fizzbuzz');

function registrar(opcion) {
  const li = document.createElement('li');
  li.textContent = numeroActual + ' → ' + opcion;
  historial.appendChild(li);
  numeroActual++;
  spanNumero.textContent = numeroActual;
}

btnNumero.addEventListener('click', function() { registrar(String(numeroActual)); });
btnFizz.addEventListener('click', function() { registrar('Fizz'); });
btnBuzz.addEventListener('click', function() { registrar('Buzz'); });
btnFizzBuzz.addEventListener('click', function() { registrar('FizzBuzz'); });