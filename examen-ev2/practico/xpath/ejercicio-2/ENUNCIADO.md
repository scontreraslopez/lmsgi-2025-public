# Ejercicio B — XPath (2 puntos)
## Expedientes academicos

### Descripcion

Tienes disponible el fichero [datos-B2.xml](datos-B2.xml) con expedientes academicos de una universidad. Cada `<expediente>` es un registro autocontenido que incluye los datos del estudiante, la asignatura, el profesor y la calificacion obtenida.

Estudia la estructura del documento y escribe las **8 expresiones XPath** que se piden a continuacion.

Escribe cada expresion en una linea. No es necesario explicar el resultado, solo la expresion XPath.

Este es significativamente más complejo que el anterior. Por lo que no te frustres si cuesta un poco, el objetivo es que llegues entrenado al examen.

---

### Expresiones que debes escribir

1. Obtener el texto con los nombres de todos los estudiantes que aparecen en el documento.

2. Obtener los `<expediente>` cuya calificacion sea de convocatoria `extraordinaria`.

3. Contar cuantos expedientes hay en total.

4. Obtener los `<expediente>` donde la nota es mayor o igual que 8.

5. Obtener los nombres de los profesores que imparten asignaturas de tipo `obligatoria`.

6. Obtener los `<expediente>` de la facultad `Informatica` cuya nota sea mayor que 6.

7. Obtener los `<expediente>` de convocatoria `extraordinaria` donde la nota es mayor o igual que 5.
   *(Usa un predicado con `and`.)*

8. Sumar los creditos de todos los expedientes del estudiante con DNI `44332211D`.
   *(Usa `sum()`.)*

---

> **Recuerda:** Puedes usar rutas absolutas o relativas. Usa funciones como `count()`, `sum()` y predicados combinados con `and` cuando sea necesario.
