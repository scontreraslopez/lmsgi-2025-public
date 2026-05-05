# Ejercicio C — JSON
## Catalogo de series

---

## Convertir XML a JSON

Convierte el siguiente documento XML a su equivalente en JSON **bien formado y completo**.

```xml
<catalogo plataforma="StreamMax" pais="ES">

  <actores>
    <actor id="A01">
      <nombre>Alvaro Morte</nombre>
      <nacionalidad>ES</nacionalidad>
    </actor>
    <actor id="A02">
      <nombre>Ursula Corbero</nombre>
      <nacionalidad>ES</nacionalidad>
    </actor>
    <actor id="A03">
      <nombre>Maggie Civantos</nombre>
      <nacionalidad>ES</nacionalidad>
    </actor>
    <actor id="A04">
      <nombre>Alba Flores</nombre>
      <nacionalidad>ES</nacionalidad>
    </actor>
    <actor id="A05">
      <nombre>Pedro Alonso</nombre>
      <nacionalidad>ES</nacionalidad>
    </actor>
  </actores>

  <series>
    <serie id="S01" genero="drama" temporadas="5" reparto="A01 A02 A05">
      <titulo>La Casa de Papel</titulo>
      <nota>8.3</nota>
      <disponible>true</disponible>
    </serie>
    <serie id="S02" genero="thriller" temporadas="4" reparto="A03 A04">
      <titulo>Vis a Vis</titulo>
      <nota>7.9</nota>
      <disponible>false</disponible>
    </serie>
    <serie id="S03" genero="comedia" temporadas="3" reparto="A02 A05">
      <titulo>Paquita Salas</titulo>
      <nota>7.2</nota>
      <disponible>true</disponible>
    </serie>
  </series>

</catalogo>
```

---
