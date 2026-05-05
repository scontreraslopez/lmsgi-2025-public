# Ejercicio XML + DTD
## Plataforma de Videojuegos

### Descripcion

Se desea modelar una plataforma de videojuegos que almacena informacion sobre el catalogo de juegos disponibles y los jugadores registrados.

### Reglas de negocio

A partir de las siguientes reglas, escribe:
1. Una DTD completa y valida
2. Un documento XML de ejemplo que valide contra esa DTD, con al menos **3 juegos** y **2 jugadores**

---

**Reglas:**

1. El elemento raiz es `<plataforma>`. Contiene exactamente un `<catalogo>` seguido de uno o mas elementos `<jugador>`.
2. El elemento `<catalogo>` contiene uno o mas elementos `<juego>`.
3. El elemento `<juego>` tiene:
   - Un atributo `id` de tipo ID, obligatorio
   - Los siguientes elementos hijos, en este orden:
     - `<titulo>`: texto
     - `<genero>`: tiene un atributo `tipo` con valores enumerados: `accion`, `rpg`, `puzzle` o `deporte` (obligatorio). El elemento no tiene contenido de texto.
     - `<plataforma_juego>`: texto. Puede aparecer una o mas veces.
     - `<precio>`: texto
     - `<multijugador>`: texto, opcional (puede aparecer 0 o 1 vez)
4. El elemento `<jugador>` tiene:
   - Un atributo `id` de tipo ID, obligatorio
   - Los siguientes elementos hijos, en este orden:
     - `<nombre>`: texto
     - Uno o mas elementos `<juego_favorito>`, cada uno con:
       - Atributo `id_juego` de tipo IDREF, obligatorio
       - Elemento hijo opcional `<horas_jugadas>`: texto

---

### Lo que debes entregar

**Apartado A.1** — Escribe el DTD completo.

**Apartado A.2** — Escribe el documento XML de ejemplo. Debe incluir:
- El prologo XML con declaracion `DOCTYPE` que referencie la DTD
- 3 juegos en el catalogo (generos variados)
- 2 jugadores, cada uno con al menos 2 juegos favoritos
- Al menos un jugador con el elemento `<horas_jugadas>` en alguno de sus juegos favoritos
- Al menos un juego con el elemento `<multijugador>`

> **Nota:** El DTD y el XML se evaluaran validandolos con un parser XML. Asegurate de que son sintacticamente correctos.
