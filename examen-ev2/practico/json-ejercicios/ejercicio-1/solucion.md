# Solucion — Ejercicio Catalogo de series

---

## Opcion A: actores referenciados (normalizado)

Se mantiene el catálogo de actores y las series apuntan a ellos por ID. Evita duplicar datos cuando un actor aparece en varias series (Ursula Corbero en S01 y S03, Pedro Alonso en S01 y S03).

```json
{
  "catalogo": {
    "plataforma": "StreamMax",
    "pais": "ES",
    "actores": [
      { "id": "A01", "nombre": "Alvaro Morte", "nacionalidad": "ES" },
      { "id": "A02", "nombre": "Ursula Corbero", "nacionalidad": "ES" },
      { "id": "A03", "nombre": "Maggie Civantos", "nacionalidad": "ES" },
      { "id": "A04", "nombre": "Alba Flores", "nacionalidad": "ES" },
      { "id": "A05", "nombre": "Pedro Alonso", "nacionalidad": "ES" }
    ],
    "series": [
      {
        "id": "S01",
        "genero": "drama",
        "temporadas": 5,
        "titulo": "La Casa de Papel",
        "nota": 8.3,
        "disponible": true,
        "reparto": ["A01", "A02", "A05"]
      },
      {
        "id": "S02",
        "genero": "thriller",
        "temporadas": 4,
        "titulo": "Vis a Vis",
        "nota": 7.9,
        "disponible": false,
        "reparto": ["A03", "A04"]
      },
      {
        "id": "S03",
        "genero": "comedia",
        "temporadas": 3,
        "titulo": "Paquita Salas",
        "nota": 7.2,
        "disponible": true,
        "reparto": ["A02", "A05"]
      }
    ]
  }
}
```

---

## Opcion B: actores empotrados (denormalizado)

Los datos del actor se incrustan directamente en cada serie. Más simple de consumir, pero Ursula Corbero y Pedro Alonso aparecen duplicados.

```json
{
  "catalogo": {
    "plataforma": "StreamMax",
    "pais": "ES",
    "series": [
      {
        "id": "S01",
        "genero": "drama",
        "temporadas": 5,
        "titulo": "La Casa de Papel",
        "nota": 8.3,
        "disponible": true,
        "reparto": [
          { "nombre": "Alvaro Morte", "nacionalidad": "ES" },
          { "nombre": "Ursula Corbero", "nacionalidad": "ES" },
          { "nombre": "Pedro Alonso", "nacionalidad": "ES" }
        ]
      },
      {
        "id": "S02",
        "genero": "thriller",
        "temporadas": 4,
        "titulo": "Vis a Vis",
        "nota": 7.9,
        "disponible": false,
        "reparto": [
          { "nombre": "Maggie Civantos", "nacionalidad": "ES" },
          { "nombre": "Alba Flores", "nacionalidad": "ES" }
        ]
      },
      {
        "id": "S03",
        "genero": "comedia",
        "temporadas": 3,
        "titulo": "Paquita Salas",
        "nota": 7.2,
        "disponible": true,
        "reparto": [
          { "nombre": "Ursula Corbero", "nacionalidad": "ES" },
          { "nombre": "Pedro Alonso", "nacionalidad": "ES" }
        ]
      }
    ]
  }
}
```

---

## Puntos clave (ambas opciones)

- `plataforma` y `pais` son atributos del elemento raíz → campos del objeto `catalogo`
- `temporadas` es entero, `nota` es decimal, `disponible` es booleano — nunca strings
- Los tres `<serie>` forman un array `series`
- El atributo `reparto` con IDREFS se convierte en array (de IDs en opción A, de objetos en opción B)

Salvo que el enunciado, te lo pida explícitamente o haya algún detalle que haga una opción claramente mejor, ambas son válidas. En la práctica, la opción A es más común en APIs REST y la opción B en documentos JSON de configuración o datos autocontenidos.