# Ejercicio B — XPath (2 puntos)
## Filmoteca

### Descripcion

Tienes disponible el fichero [datos-B1.xml](../datos-B1.xml) con un catalogo de peliculas de una filmoteca.

Estudia la estructura del documento y escribe las **9 expresiones XPath** que se piden a continuacion.

Escribe cada expresion en una linea. No es necesario explicar el resultado, solo la expresion XPath. Si el enunciado establece una relación entre elementos, tenlo en cuenta para escribir la expresion correcta.
---

### Expresiones que debes escribir

1. Obtener los titulos de todas las peliculas del catalogo.

2. Obtener los elementos `<pelicula>` cuyo genero sea `drama`.

3. Obtener las peliculas cuyo director sea de Espana (atributo `pais="ES"`).

4. Obtener las peliculas con una duracion superior a 120 minutos.

5. Contar el numero total de peliculas en el catalogo.

6. Contar el numero total de actores registrados en toda la filmoteca.

7. Contar cuantas peliculas tienen presupuesto registrado (elemento `<presupuesto>`).

8. Obtener las peliculas cuyo titulo contenga la palabra `El`.

9. Obtener las películas de autor español y presupuesto superior a 1000000 euros `EUR`.

---

> **Recuerda:** Puedes usar rutas absolutas (desde la raiz `/`) o relativas (`//`). Usa funciones XPath como `count()`, `contains()` cuando sea necesario.
