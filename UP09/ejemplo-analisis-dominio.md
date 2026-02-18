# ANÁLISIS DEL DOMINIO - SISTEMA DE RESERVAS DE SALAS

## 1. Tablas de la base de datos que usaré

Para el CRUD de reservas necesito estas tablas:

- `reservas` (principal)
- `salas` (relacionada por FK)
- `usuarios` (relacionada por FK)

## 2. Campos de la tabla `reservas` y mapeo a la API

| Campo           | Tipo      | ¿En API? | Razón                          |
|-----------------|-----------|----------|--------------------------------|
| id              | INT       | SÍ       | Para identificar cada reserva  |
| usuario_id      | INT (FK)  | SÍ       | Saber de quién es la reserva   |
| sala_id         | INT (FK)  | SÍ       | Qué sala se reservó            |
| fecha_inicio    | DATE      | SÍ       | Cuándo empieza                 |
| hora_inicio     | TIME      | SÍ       | A qué hora empieza             |
| hora_fin        | TIME      | SÍ       | A qué hora termina             |
| num_asistentes  | INT       | SÍ       | Cuánta gente asistirá          |
| motivo          | VARCHAR   | SÍ       | Descripción opcional           |
| estado          | ENUM      | SÍ       | pendiente/confirmada/cancelada |
| creada_en       | TIMESTAMP | SÍ       | Cuándo se creó                 |
| actualizada_en  | TIMESTAMP | SÍ       | Última modificación            |
| deleted_at      | TIMESTAMP | NO       | Es soft delete (interno)       |

**Campos auto-generados por el backend:**

De estos campos, el backend generará automáticamente:

- `id` (AUTO_INCREMENT)
- `usuario_id` (del token JWT)
- `estado` (por defecto `'pendiente'`)
- `creada_en`, `actualizada_en` (timestamps automáticos)

Nota: No hace falta que te metas todavía en cosas como que el usuario se puede recuperar de los claims del JWT, pero es importante que sepas que ese dato no viene del cliente sino que lo genera el backend.

**Información adicional que incluiré** (JOIN con tabla `salas`):

Además de los campos de la tabla `reservas`, en las respuestas de la API incluiré el nombre de la sala para facilitar la lectura. Para ello haré un JOIN con la tabla `salas` y expondré el campo:

- `sala_nombre`: Para mostrar "Sala A" en lugar de solo el ID

## 3. Validaciones principales

Al crear/modificar reservas validaré:

**Campos obligatorios:**

- `sala_id`, `fecha_inicio`, `hora_inicio`, `hora_fin`, `num_asistentes`

**Lógica:**

- `hora_inicio` < `hora_fin`
- `fecha_inicio` >= HOY (no permitir fechas pasadas)
- `num_asistentes` >= 1
- `num_asistentes` <= capacidad de la sala
- No puede haber solapamiento de horarios en la misma sala

**Estados permitidos:**

Los estados los gestionará el backend, pero las opciones válidas serán:

- Solo: `'pendiente'`, `'confirmada'`, `'cancelada'`
- Al crear siempre `'pendiente'`

## 4. Ejemplos de JSON

**REQUEST** (crear reserva):

La petición que el cliente enviaría para crear una reserva podría ser:

```json
{
  "sala_id": 5,
  "fecha_inicio": "2026-03-15",
  "hora_inicio": "09:00",
  "hora_fin": "11:00",
  "num_asistentes": 8,
  "motivo": "Reunión del equipo"
}
```

**RESPONSE** (reserva creada):

La respuesta que el backend devolvería al crear la reserva incluiría los campos generados automáticamente y el nombre de la sala:

```json
{
  "id": 123,
  "usuario_id": 42,
  "sala_id": 5,
  "sala_nombre": "Sala A",
  "fecha_inicio": "2026-03-15",
  "hora_inicio": "09:00",
  "hora_fin": "11:00",
  "num_asistentes": 8,
  "motivo": "Reunión del equipo",
  "estado": "pendiente",
  "creada_en": "2026-02-13T10:30:00Z",
  "actualizada_en": "2026-02-13T10:30:00Z"
}
```

## Conclusión

Necesito 12 campos de la tabla `reservas` (expongo 11 en la API).
Aplicaré 5 validaciones básicas para garantizar integridad de datos.
El MVP permitirá crear, listar, modificar y eliminar reservas.
