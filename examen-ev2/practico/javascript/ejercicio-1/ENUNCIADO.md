# Ejercicio Práctica JavaScript 1

## Tienda Electronica

### Instrucciones

Abre el fichero [starting.js](starting.js) y completa las **4 funciones** indicadas.

Recuerda que puedes clonar el repo o copiar el código a tu editor local, lo que te sea más cómodo. Si lo haces, asegúrate de mantener la estructura de carpetas para que el código funcione correctamente.

- Lee los comentarios del fichero: describen exactamente lo que debe hacer cada función
- Al finalizar, ejecuta el fichero con Node.js para comprobar que los resultados son correctos. Debes ejecutarlo con el directorio de trabajo dentro de `ejercicio-1` para que encuentre el fichero `starting.js`:

```bash
node starting.js
```

- No cambies los nombres de las funciones ni los `console.log` de prueba
- Puedes agregar variables locales dentro de las funciones si lo necesitas

---

### Funciones que debes implementar

**Función 1 — `calcularPrecioConIVA(precio, porcentajeIVA)`**

Recibe un precio base y un porcentaje de IVA. Devuelve el precio final con el IVA incluido.

Ejemplo: `calcularPrecioConIVA(100, 21)` debe devolver `121`

---

**Función 2 — `clasificarProducto(precio)`**

Recibe el precio de un producto y devuelve una cadena de texto con su categoría:

- Si el precio es menor que 50: devuelve `"economico"`
- Si el precio está entre 50 y 200 (ambos inclusive): devuelve `"estandar"`
- Si el precio es mayor que 200: devuelve `"premium"`

Ejemplo: `clasificarProducto(30)` debe devolver `"economico"`

---

**Función 3 — `contarProductosDisponibles(productos)`**

Recibe un array de objetos con la forma `{ nombre, precio, disponible }`.
Devuelve el numero de productos cuya propiedad `disponible` sea `true`.

Ejemplo: `contarProductosDisponibles([{ nombre: "TV", precio: 300, disponible: true }, { nombre: "Radio", precio: 50, disponible: false }])` debe devolver `1`

---

**Función 4 — `buscarProductoPorNombre(productos, nombre)`**

Recibe un array de objetos con la forma `{ nombre, precio }` y un nombre a buscar.
Devuelve el objeto cuya propiedad `nombre` coincida exactamente con el parámetro `nombre`.
Si no existe ningún producto con ese nombre, devuelve `null`.

Ejemplo: `buscarProductoPorNombre([{ nombre: "TV", precio: 300 }, { nombre: "Radio", precio: 50 }], "Radio")` debe devolver `{ nombre: "Radio", precio: 50 }`
