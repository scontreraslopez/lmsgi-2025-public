# Ejercicio Práctica JavaScript 2

## Biblioteca Digital

### Instrucciones

Abre el fichero [starting.js](starting.js) y completa las **4 funciones** indicadas.

Recuerda que puedes clonar el repo o copiar el código a tu editor local, lo que te sea más cómodo. Si lo haces, asegúrate de mantener la estructura de carpetas para que el código funcione correctamente.

- Lee los comentarios del fichero: describen exactamente lo que debe hacer cada funcion
- Al finalizar, ejecuta el fichero con Node.js para comprobar que los resultados son correctos. Debes ejecutarlo con el directorio de trabajo dentro de `ejercicio-2` para que encuentre el fichero `starting.js`:

```bash
node starting.js
```

- No cambies los nombres de las funciones ni los `console.log` de prueba
- Puedes agregar variables locales dentro de las funciones si lo necesitas

---

### Funciones que debes implementar

**Funcion 1 — `calcularMulta(diasRetraso, multaPorDia)`**

Calcula la multa por devolucion tardıa de un libro.
- Si `diasRetraso` es 0 o negativo, devuelve `0` (sin multa)
- En caso contrario, devuelve el resultado de multiplicar `diasRetraso` por `multaPorDia`

Ejemplo: `calcularMulta(5, 0.50)` debe devolver `2.5`

---

**Funcion 2 — `categorizarLibro(paginas)`**

Clasifica un libro segun su numero de paginas:
- Menos de 150 paginas: devuelve `"corto"`
- Entre 150 y 400 (ambos inclusive): devuelve `"medio"`
- Mas de 400 paginas: devuelve `"largo"`

Ejemplo: `categorizarLibro(120)` debe devolver `"corto"`

---

**Funcion 3 — `contarLibrosDisponibles(libros)`**

Recibe un array de objetos con la forma `{ titulo, autor, isbn, disponible }`.
Devuelve el numero de libros cuya propiedad `disponible` sea `true`.

Ejemplo: `contarLibrosDisponibles([{ titulo: "Dune", autor: "Herbert", isbn: "111", disponible: true }, { titulo: "1984", autor: "Orwell", isbn: "222", disponible: false }])` debe devolver `1`

---

**Funcion 4 — `buscarLibroPorIsbn(libros, isbn)`**

Recibe un array de objetos con la forma `{ titulo, autor, isbn, disponible }` y un ISBN a buscar.
Devuelve el objeto cuya propiedad `isbn` coincida exactamente con el parametro.
Si no existe ningun libro con ese ISBN, devuelve `null`.

Ejemplo: `buscarLibroPorIsbn([{ titulo: "Dune", autor: "Herbert", isbn: "111", disponible: true }, { titulo: "1984", autor: "Orwell", isbn: "222", disponible: false }], "222")` debe devolver `{ titulo: "1984", autor: "Orwell", isbn: "222", disponible: false }`
