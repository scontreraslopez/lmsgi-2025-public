# Ejercicio Práctica JavaScript 3

## Gestión de Notas

### Instrucciones

Abre el fichero [starting.js](starting.js) y completa las **4 funciones** indicadas.

Recuerda que puedes clonar el repo o copiar el código a tu editor local, lo que te sea más cómodo. Si lo haces, asegúrate de mantener la estructura de carpetas para que el código funcione correctamente.

- Lee los comentarios del fichero: describen exactamente lo que debe hacer cada función
- Al finalizar, ejecuta el fichero con Node.js para comprobar que los resultados son correctos. Debes ejecutarlo con el directorio de trabajo dentro de `ejercicio-3` para que encuentre el fichero `starting.js`:

```bash
node starting.js
```

- No cambies los nombres de las funciones ni los `console.log` de prueba
- Puedes agregar variables locales dentro de las funciones si lo necesitas

---

### Funciones que debes implementar

**Función 1 — `calcularMedia(notas)`**

Recibe un array de números. Devuelve la media aritmética de todos los valores.

Ejemplo: `calcularMedia([4, 6, 8])` debe devolver `6`

---

**Función 2 — `determinarCalificacion(nota)`**

Recibe una nota numérica y devuelve su calificación textual:

- Si la nota es menor que 5: devuelve `"Suspenso"`
- Si la nota está entre 5 y 6.9 (inclusive): devuelve `"Aprobado"`
- Si la nota está entre 7 y 8.9 (inclusive): devuelve `"Notable"`
- Si la nota es mayor o igual a 9: devuelve `"Sobresaliente"`

Ejemplo: `determinarCalificacion(7.5)` debe devolver `"Notable"`

---

**Función 3 — `filtrarPorCalificacion(alumnos, calificacion)`**

Recibe un array de objetos con la forma `{ nombre, nota }` y una cadena de texto con una calificación (`"Suspenso"`, `"Aprobado"`, `"Notable"` o `"Sobresaliente"`).

Devuelve un **nuevo array** con los objetos cuya nota corresponda a esa calificación.

Pista: puedes usar `determinarCalificacion` dentro de esta función.

Ejemplo: `filtrarPorCalificacion([{ nombre: "Ana", nota: 8.5 }, { nombre: "Luis", nota: 3.1 }], "Suspenso")` debe devolver `[{ nombre: "Luis", nota: 3.1 }]`

---

**Función 4 — `aplicarBonificacion(alumnos, puntos)`**

Recibe un array de objetos con la forma `{ nombre, nota }` y un número de puntos de bonificación.

Suma los puntos a la nota de **cada alumno**, con un máximo de 10 (ninguna nota puede superar 10).

Devuelve el mismo array modificado.

Ejemplo: `aplicarBonificacion([{ nombre: "Ana", nota: 9.4 }, { nombre: "Luis", nota: 3.1 }], 1)` debe devolver `[{ nombre: "Ana", nota: 10 }, { nombre: "Luis", nota: 4.1 }]`