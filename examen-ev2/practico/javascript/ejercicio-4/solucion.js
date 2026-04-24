const boton = document.querySelector('#btn-rellenar');

boton.addEventListener('click', function() {
  document.querySelector('#nombre').value = 'Ana';
  document.querySelector('#apellidos').value = 'Garcia Lopez';
  document.querySelector('#email').value = 'ana.garcia@ejemplo.com';
  document.querySelector('#telefono').value = '612 345 678';
  document.querySelector('#ciudad').value = 'Valencia';
  document.querySelector('#edad').value = '28';
});