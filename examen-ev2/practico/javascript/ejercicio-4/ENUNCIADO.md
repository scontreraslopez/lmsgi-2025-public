# Ejercicio DOM — Rellenar formulario (JavaScript + DOM)
## Formulario de Registro

### Instrucciones

Abre el fichero [index.html](index.html) en el navegador y [starting.js](starting.js) en tu editor.

- Abre la consola del navegador (F12) para ver posibles errores
- No cambies el HTML
- Al terminar, comprueba que al hacer click en el botón todos los campos se rellenan

---

### Lo que debes implementar

El formulario tiene 6 campos: nombre, apellidos, email, telefono, ciudad y edad.

Hay un botón con id `btn-rellenar`. Al hacer click en ese botón, todos los campos del formulario deben rellenarse automáticamente con datos ficticios.

**Pistas:**
- Selecciona el botón con `document.querySelector('#btn-rellenar')`
- Añade un evento `click` con `addEventListener`
- Para rellenar un campo: `document.querySelector('#id-del-campo').value = 'valor'`