# Solucion — Ejercicio B (XPath) — Practica 1

## Documento: datos-B1.xml (Filmoteca)

---

### Expresion 1: Titulos de todas las peliculas

Hay que prestar atención a que el enunciado dice "de todas las las películas del catálogo", por lo que una expresión como `//titulo` no sería correcta, ya que podría haber otros elementos `<titulo>` en el documento (por ejemplo, dentro de `<director>`). Es necesario incluir la relación con `<pelicula>` para asegurarnos de que solo seleccionamos los títulos de las películas.

```xpath
//pelicula/titulo
```

o equivalentemente:

```xpath
/filmoteca/pelicula/titulo
```

**Resultado:** Devuelve los 15 nodos `<titulo>` del catalogo.

---

### Expresion 2: Peliculas de genero "drama"

Aquí directamente podemos filtrar de manera sencilla usando un predicado que compruebe el atributo `@genero` del elemento `<pelicula>`. No es necesario navegar a ningún otro nivel, ya que el género es un atributo directo de `<pelicula>`.

```xpath
//pelicula[@genero="drama"]
```

**Resultado:** Devuelve las peliculas P002 (El laberinto del fauno), P006 (Amelie), P009 (Schindler's List), P012 (Volver), P015 (El orfanato).

---

### Expresion 3: Peliculas cuyo director sea de Espana

En esta consulta tenemos que navegar desde `<pelicula>` al elemento hijo `<director>` para comprobar su atributo `@pais`. Es importante no confundirlo con un predicado que intente acceder directamente a un atributo de `<pelicula>`, ya que el país del director no es un atributo de la película, sino del director.

```xpath
//pelicula[director/@pais="ES"]
```

Hay expresiones equivalentes más complejas navegando a través de ejes, pero esta es la forma más directa y clara de expresar la consulta.

**Por que funciona:** El predicado navega al elemento hijo `<director>` y comprueba su atributo `@pais`. Es un predicado de un nivel de profundidad.

**Resultado:** P008 (Juan Jose Campanella), P012 (Pedro Almodovar), P015 (Juan Antonio Bayona).

---

### Expresion 4: Peliculas con duracion superior a 120 minutos

En este caso, el predicado debe comparar el valor numérico del elemento `<duracion>` con 120. Es importante recordar que el valor de `<duracion>` es un texto, pero XPath lo convertirá automáticamente a número para la comparación.

```xpath
//pelicula[duracion > 120]
```

**Resultado:** Devuelve P001 (169), P004 (127), P005 (125), P006 (122), P007 (164), P008 (129), P009 (195), P012 (121), P013 (155). Total: 9 peliculas.

---

### Expresion 5: Contar el total de peliculas

Aquí se pide contar, es decir deberemos devolver un número, no una lista de nodos. Para eso usamos la función `count()`, que toma como argumento una expresión que selecciona los nodos a contar. En este caso, queremos contar todos los elementos `<pelicula>` del documento.

```xpath
count(//pelicula)
```

**Resultado:** `15`

---

### Expresion 6: Contar el total de actores en toda la filmoteca

De manera similar al ejercicio anterior, pero esta vez queremos contar los elementos `<actor>`. Es importante no confundirlo con contar películas, ya que cada película tiene varios actores. La expresión `//actor` selecciona todos los actores del documento, y `count()` devuelve su número total.

```xpath
count(//actor)
```

**Resultado:** `32` (la mayoria de peliculas tienen 2 actores; P001 Interstellar y P013 Dune tienen 3).

---

### Expresion 7: Contar peliculas con presupuesto registrado

Aquí debemos contar las películas que tienen un elemento hijo `<presupuesto>`. No es necesario comparar el valor del presupuesto, solo verificar su existencia. Para eso, podemos usar un predicado de existencia dentro de `count()`. De nuevo, cabe prestar atención a que decimos contar películas, no presupuestos, por lo que el nodo a contar es `<pelicula>`, no `<presupuesto>`.

```xpath
count(//pelicula[presupuesto])
```

**Por que funciona:** El predicado `[presupuesto]` es un predicado de existencia: selecciona los `<pelicula>` que tienen al menos un hijo `<presupuesto>`. Dos peliculas no tienen ese elemento (P008 y P014), por lo que no las cuenta.

**Resultado:** `13`

---

### Expresion 8: Peliculas cuyo titulo contiene la palabra "El"

En este caso basta con hacer uso del predicado `contains()` para comprobar si el texto del elemento `<titulo>` contiene la subcadena "El". Es importante usar `contains()` en lugar de una comparación de igualdad, ya que queremos cualquier título que incluya "El" en cualquier parte del texto, no solo aquellos que sean exactamente "El".

```xpath
//pelicula[contains(titulo, 'El')]
```

**Resultado:** Devuelve P002 (El laberinto del fauno), P005 (El viaje de Chihiro), P008 (El secreto de sus ojos), P015 (El orfanato).

### Expresion 9: Peliculas de autor español y presupuesto superior a 1000000 EUR

En esta consulta combinamos tres condiciones: el director debe ser español, el presupuesto debe existir y ser superior a 1000000, y la moneda del presupuesto debe ser EUR. Para eso, usamos un predicado con varias condiciones combinadas con `and`.

```xpath
//pelicula[director/@pais="ES" and presupuesto and presupuesto > 1000000 and presupuesto/@moneda="EUR"]
``` 

**Por que funciona:** El predicado combina varias condiciones: el director debe ser español (`director/@pais="ES"`), debe existir un presupuesto (`presupuesto`), el valor del presupuesto debe ser mayor que 1000000 (`presupuesto > 1000000`), y la moneda del presupuesto debe ser EUR (`presupuesto/@moneda="EUR"`). 

**Resultado:** Ninguna película cumple todas las condiciones, por lo que el resultado es una lista vacía. Podrías probar que funciona modificando la moneda de la película P015 a EUR.
