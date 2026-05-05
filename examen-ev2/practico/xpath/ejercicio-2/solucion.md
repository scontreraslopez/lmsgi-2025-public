# Solucion — Ejercicio B (XPath) — Practica 2

## Documento: datos-B2.xml (Expedientes academicos)

---

### Expresion 1: Nombres (texto) de todos los estudiantes

Hay varias opciones, pero usando navagacion absoluta y el nodo de texto es la mas directa:

```xpath
/campus/expediente/estudiante/nombre/text()
```

**Resultado:** Recupera los 17 nombres de los estudiantes, incluyendo repeticiones. El resultado es una secuencia de texto con los nombres.
---

### Expresion 2: Expedientes de convocatoria extraordinaria

En este caso filtramos los expedientes con un predicado que accede al elemento `<convocatoria>` dentro de `<calificacion>` y compara su valor con el string "extraordinaria":

```xpath
/campus/expediente[calificacion/convocatoria="extraordinaria"]
```

**Resultado:** Devuelve EXP003 (Carlos / Sistemas Operativos / 6.0), EXP008 (Sofia / Algebra Lineal / 5.5), EXP014 (Pedro / Redes de Computadores / 5.0). Total: 3 expedientes.

---

### Expresion 3: Contar el total de expedientes

Usando la funcion `count()` sobre la ruta que selecciona todos los expedientes obtenemos el total:

```xpath
count(/campus/expediente)
```

**Resultado:** `17`

---

### Expresion 4: Expedientes con nota mayor o igual que 8

En este caso el predicado compara el valor del elemento `<nota>` con el numero 8. XPath 1.0 hace la conversion automaticamente al detectar que el otro operando es numerico.

```xpath
/campus/expediente[calificacion/nota >= 8]
```

**Por que funciona:** XPath 1.0 compara el contenido de texto del elemento `<nota>` como numero en cuanto detecta que el otro operando es numerico. No hace falta funcion de conversion.

**Resultado:** EXP004 (Maria / 9.0), EXP005 (Pedro / 8.5), EXP010 (Pedro / 9.5), EXP012 (Maria / 8.0), EXP016 (Carlos / 8.5). Total: 5 expedientes.

---

### Expresion 5: Nombres de profesores que imparten asignaturas obligatorias

Este caso es un poco mas complejo porque el filtro se hace sobre un elemento hijo de `<asignatura>`, pero el resultado que queremos recuperar es un elemento hijo de `<profesor>`. Sin embargo, como ambos elementos son hijos directos de `<expediente>`, podemos usar un mismo predicado para filtrar los expedientes y luego recuperar el nombre del profesor:


```xpath
/campus/expediente[asignatura/tipo='obligatoria']/profesor/nombre
```

**Resultado:** Devuelve los nombres con repeticiones: Ana Garcia Lopez (x2), Elena Blanco Campos (x3), Jorge Fernandez Mora (x2), Luis Martinez Perez (x3), Roberto Castro Vega (x2). Los profesores de asignaturas optativas (Sofia Ruiz Navarro) no aparecen.

---

### Expresion 6: Expedientes de la facultad "Informatica" con nota mayor que 6

En este caso el predicado combina dos condiciones: una sobre el elemento `<facultad>` dentro de `<asignatura>` y otra sobre el elemento `<nota>` dentro de `<calificacion>`. Ambas condiciones se evalúan en el contexto del mismo `<expediente>`, lo que permite recuperar solo aquellos que cumplen ambas condiciones a la vez.

```xpath
/campus/expediente[asignatura/facultad='Informatica' and calificacion/nota > 6]
```

**Por que funciona:** El predicado combina dos condiciones sobre elementos hijo de distinto nivel (`asignatura/facultad` y `calificacion/nota`). Ambas se evaluan en el contexto del mismo `<expediente>`.

**Resultado:** EXP001 (Laura / 7.5), EXP003 (Carlos / 6.0 — no, es igual, no mayor), EXP005 (Pedro / 8.5), EXP009 (Carlos / 7.0), EXP010 (Pedro / 9.5), EXP011 (Laura / 6.5), EXP016 (Carlos / 8.5). Total: 6 expedientes.

---

### Expresion 7: Expedientes de convocatoria extraordinaria con nota >= 5

Similar al anterior, pero con condiciones sobre convocatoria y nota. Ambas condiciones se combinan con `and` para asegurar que se recuperen solo los expedientes que cumplen ambas a la vez:

```xpath
/campus/expediente[calificacion/convocatoria='extraordinaria' and calificacion/nota >= 5]
```

**Por que funciona:** El operador `and` exige que las dos condiciones del predicado se cumplan a la vez. Ambas navegan al hijo `<calificacion>` desde el contexto `<expediente>`, pero acceden a subelementos distintos.

**Resultado:** EXP003 (Carlos / 6.0), EXP008 (Sofia / 5.5), EXP014 (Pedro / 5.0). Las tres recuperaciones exitosas.

---

### Expresion 8: Suma de creditos del estudiante con DNI "44332211D"

Este es el mas complejo porque requiere combinar un filtro por atributo (`@dni`) con una funcion de agregacion (`sum()`) sobre los creditos de las asignaturas. La ruta dentro de `sum()` selecciona los créditos de las asignaturas de los expedientes del estudiante filtrado por DNI. Si entendéis bien este ejercicio, el examen va a resultaros muy sencillo.

```xpath
sum(/campus/expediente[estudiante/@dni='44332211D']/asignatura/@creditos)
```

**Por que funciona:** El predicado filtra los expedientes del estudiante por atributo `@dni`. Sobre esa seleccion, `sum()` acumula los valores del atributo `@creditos` de cada `<asignatura>`. Al ser un XML denormalizado, RED102 cuenta dos veces (Pedro la tiene en ordinaria y en extraordinaria).

**Resultado:** POO202(6) + AGIL205(4) + RED102(6) + RED102(6) = `22`
