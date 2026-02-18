# Actividad Intermodular: Diseño de API REST para Sistema de Reservas

## Índice

1. [Introducción: Del Monolito a las Aplicaciones Modernas](#1-introducción-del-monolito-a-las-aplicaciones-modernas)
2. [Arquitectura de 3 Capas](#2-arquitectura-de-3-capas)
3. [HTTP: El Lenguaje de la Web](#3-http-el-lenguaje-de-la-web)
4. [APIs REST: El Contrato entre Frontend y Backend](#4-apis-rest-el-contrato-entre-frontend-y-backend)
5. [Flujo Completo de Datos](#5-flujo-completo-de-datos)
6. [Tu Proyecto: Sistema de Reservas](#6-tu-proyecto-sistema-de-reservas)
7. [La Tarea: Diseñar tu API REST](#7-la-tarea-diseñar-tu-api-rest)
8. [Criterios de Evaluación](#8-criterios-de-evaluación)
9. [Recursos y Herramientas](#9-recursos-y-herramientas)
10. [Preguntas Frecuentes](#10-preguntas-frecuentes)

---

>[!NOTE]
> Si no estás matriculado de Proyecto Intermodular, **esta actividad sigue siendo obligatoria**. Consulta la sección de Preguntas Frecuentes al final (pregunta: "¿No estoy matriculado en Proyecto Intermodular?") donde encontrarás un **diseño de base de datos mínimo de ejemplo** (sistema de reservas de mostradores de facturación AENA) que podrás usar para completar la actividad sin necesidad de haber diseñado tu propia base de datos. Es importante que antes de ponerte a hacer esta actividad hayas leído los contenidos de la unidad, en especial el punto donde se documenta con **swagger-ui** la API REST de ejemplo, para entender el formato y la estructura que se espera en tu entrega.

## 1. Introducción: Del Monolito a las Aplicaciones Modernas

Esto que vas a leer es un **resumen** de los conceptos clave que necesitas para entender cómo funcionan las aplicaciones web modernas y por qué es importante diseñar una API REST bien documentada. La API REST que diseñaremos aquí será una primera aproximación que en el próximo curso seguramente mejoraréis e implementaréis con lo que aprendáis.

### 1.1. ¿Cómo eran las aplicaciones web tradicionalmente?

Hasta los años 2000-2010, la mayoría de aplicaciones web funcionaban así:

```text
┌─────────────────────────────────────────┐
│         SERVIDOR (PHP, Java, ASP)       │
│                                         │
│  1. Recibe petición del navegador       │
│  2. Consulta la base de datos           │
│  3. Genera HTML completo                │
│  4. Envía la página entera al cliente   │
└─────────────────────────────────────────┘
                    ↓
            HTML completo
                    ↓
         ┌──────────────────┐
         │    NAVEGADOR     │
         │ (muestra la pág) │
         └──────────────────┘
```

**Problema:** Cada clic recarga la página entera. Lento, mucho tráfico de red, experiencia de usuario pobre.

**Aclaración importante**: Independientemente del comentario anterior que pretende registrar lo que es una tendencia moderna, PHP sigue siendo todavía la tecnología más usada para el desarrollo web y la gran mayoría de los sitios todavía se apoyan en server-side rendering. Sin embargo, la tendencia es clara: cada vez más aplicaciones se dividen en frontend y backend separados.

### 1.2. ¿Cómo funcionan las aplicaciones modernas?

Hoy en día, las aplicaciones se dividen en **dos partes separadas**:

```text
┌──────────────────┐              ┌─────────────────┐
│   FRONTEND       │◄────JSON────►│    BACKEND      │
│  (JavaScript)    │              │  (Node, Java,   │
│  React, Vue,     │              │   Python, C#)   │
│  Angular...      │              │                 │
│                  │              │                 │
│ - Interfaz       │              │ - Lógica        │
│ - Interacción    │              │ - Base de datos │
└──────────────────┘              └─────────────────┘
     En el                             En el
   navegador                          servidor
```

**Ventajas:**

- **Velocidad**: Solo se transfieren datos (JSON), no HTML completo.
- **Experiencia fluida**: Sin recargas de página (como apps móviles)
- **Reutilización**: El mismo backend sirve web, móvil, APIs públicas
- **Equipos separados**: Frontend y backend pueden trabajar en paralelo

### 1.3. El Problema: ¿Cómo se comunican?

Si frontend y backend están **separados**, necesitan un **contrato claro**:

- **Frontend necesita saber:** ¿Qué datos puedo pedir? ¿En qué formato? ¿Qué URLs uso?
- **Backend necesita saber:** ¿Qué datos espera el frontend? ¿Qué responder?

**Solución:** Diseñar una **API REST** documentada con **OpenAPI**.

---

## 2. Arquitectura de 3 Capas

### 2.1. Las Tres Capas

Una aplicación moderna se divide en **3 capas** independientes:

```text
┌─────────────────────────────────────────────────────────┐
│  CAPA 1: PRESENTACIÓN (Frontend)                        │
│  ─────────────────────────────────────                  │
│  Responsabilidad: Interfaz de usuario                   │
│  Tecnologías: HTML, CSS, JavaScript (React, Vue, etc.)  │
│  Ubicación: Navegador del usuario                       │
│                                                          │
│  Ejemplo: Formulario para crear una reserva            │
└─────────────────────────────────────────────────────────┘
                         ↕ HTTP (JSON)
┌─────────────────────────────────────────────────────────┐
│  CAPA 2: LÓGICA DE NEGOCIO (Backend)                    │
│  ────────────────────────────────────                   │
│  Responsabilidad: Procesar peticiones, validar datos,   │
│                   aplicar reglas de negocio             │
│  Tecnologías: Node.js, Java, Python, C#, PHP            │
│  Ubicación: Servidor                                    │
│                                                          │
│  Ejemplo: Validar que la fecha de reserva es futura,   │
│           que no haya solapamiento, calcular precio     │
└─────────────────────────────────────────────────────────┘
                         ↕ SQL
┌─────────────────────────────────────────────────────────┐
│  CAPA 3: DATOS (Base de Datos)                          │
│  ──────────────────────────────                         │
│  Responsabilidad: Almacenar y recuperar información     │
│  Tecnologías: MySQL, PostgreSQL, MongoDB, Oracle        │
│  Ubicación: Servidor de base de datos                   │
│                                                          │
│  Ejemplo: Tabla 'reservas' con campos id, fecha_inicio, │
│           fecha_fin, usuario_id, estado, etc.           │
└─────────────────────────────────────────────────────────┘
```

### 2.2. Ventajas de la Separación en Capas

En general en informática siempre se busca una aproximación del tipo *divide y vencerás*, es decir, dividir un problema complejo en partes más pequeñas y manejables. En el caso de las aplicaciones web, esta división en capas tiene varias ventajas:

| Ventaja | Descripción |
| ------- | ----------- |
| **Mantenibilidad** | Cambiar la interfaz no afecta a la base de datos |
| **Escalabilidad** | Puedo tener 10 servidores de frontend y 3 de backend |
| **Reutilización** | El mismo backend sirve para web, móvil y APIs públicas |
| **Trabajo en paralelo** | Equipos separados trabajando simultáneamente |
| **Seguridad** | El cliente nunca accede directamente a la base de datos |

En mi opinión, la popularidad de este tipo de arquitectura es la consecuencia de que, las páginas que cargan rápido y tienen una experiencia fluida, tienen mejor retención y más descubribilidad. Respecto a la complejidad, si bien es cierto que cada parte individalmente es más sencilla, tenemos que tener en cuenta que el sistema global es más complejo, ya que hay que diseñar correctamente la comunicación entre capas (API REST) y gestionar la infraestructura de servidores, despliegues, etc. En general, cuanto más distribuido está el sistema, más complejidad de gestión tiene, aunque también más ventajas en cuanto a escalabilidad y flexibilidad.

### 2.3. Conexión con lo que Ya Sabes

Para que puedas entender como se enmarca esta actividad con lo que ya has trabajado del proyecto intermodular, este es un poco el *roadmap* de lo que has hecho, harás y harás en el futuro:

- **BBDD (antes):** Diseñaste la **Capa 3** (tablas, relaciones, tipos de datos)
- **LMSGI (ahora):** Diseñas el contrato (intercambio de datos) para la **comunicación entre Capa 2 y Capa 1** (API). El entregable que se busca en esta unidad es el diseño de la API REST, no su implementación. Tampoco es necesariamente el diseño final, sino una primera aproximación (MVP) que luego se irá mejorando.
- **Programación (futuro):** Implementarás la **Capa 2** (lógica en Java/C#/Python) a nivel prototipo funcional.
- **Módulos profesionales de segundo curso:** Finalizarás la implementación de la **Capa 1** (interfaz) y más de **Capa 2** para crear una aplicación completa.

---

## 3. HTTP: El Lenguaje de la Web

Repasemos algunos conceptos para hacer un poco de *tabula rasa* y asegurarnos de que todos tenemos claro cómo funciona la comunicación entre frontend y backend a través de HTTP, que es el protocolo que se usa para enviar peticiones y recibir respuestas.

### 3.1. ¿Qué es HTTP?

**HTTP** (HyperText Transfer Protocol) es el protocolo que usan navegadores y servidores para comunicarse. Es un sistema de **petición-respuesta**.

```text
┌──────────────┐                    ┌──────────────┐
│   CLIENTE    │                    │   SERVIDOR   │
│ (navegador)  │                    │  (backend)   │
└──────────────┘                    └──────────────┘
       │                                    │
       │  1. REQUEST (petición)             │
       │  ─────────────────────────────────>│
       │                                    │
       │     GET /reservas/42               │
       │     Host: api.ejemplo.com          │
       │     Authorization: Bearer xyz...   │
       │                                    │
       │                                    │
       │  2. RESPONSE (respuesta)           │
       │  <─────────────────────────────────│
       │                                    │
       │     HTTP/1.1 200 OK                │
       │     Content-Type: application/json │
       │                                    │
       │     {"id": 42, "fecha": "..."}     │
       │                                    │
```

### 3.2. Métodos HTTP (Verbos)

Cada petición HTTP usa un **método** que indica la acción deseada. Hemos visto ya algunas de estas cuando estabamos con los formularios HTML (`GET` para mostrar el formulario, `POST` para enviarlo). En APIs REST se usan principalmente estos métodos:

| Método | Significado | Uso en APIs | Ejemplo |
| ------ | ----------- | ----------- | ------- |
| **GET** | **Leer** datos | Obtener información | `GET /reservas` → Lista de reservas |
| **POST** | **Crear** nuevo recurso | Enviar datos para crear | `POST /reservas` → Crear nueva reserva |
| **PUT** | **Actualizar** (reemplazar completo) | Modificar todos los campos | `PUT /reservas/42` → Actualizar reserva 42 |
| **PATCH** | **Actualizar** (parcial) | Modificar algunos campos | `PATCH /reservas/42` → Cambiar solo la fecha |
| **DELETE** | **Eliminar** recurso | Borrar | `DELETE /reservas/42` → Eliminar reserva 42 |

**Analogía con CRUD de bases de datos:**

El mapeo de esto con las operaciones **CRUD** (Create, Read, Update, Delete) es casi directo:

| SQL | HTTP | Operación |
| --- | ---- | --------- |
| SELECT | GET | Leer |
| INSERT | POST | Crear |
| UPDATE | PUT/PATCH | Actualizar |
| DELETE | DELETE | Eliminar |

Al final esta capa hace de *interfaz* entre el frontend y el backend, y es importante entender que cada método tiene un propósito específico.

### 3.3. Códigos de Estado HTTP

Cada respuesta HTTP incluye, en su cabecera (concretamente en la línea de estado, `status line`), un **código de estado** que indica el resultado. Esto es similar a los códigos de retorno en programación, pero estandarizados para la web. Estos códigos se agrupan en categorías según su primer dígito:

#### Éxito (2xx)

Los códigos que comienzan con 2 indican que la petición fue procesada correctamente. Algunos comunes son:

| Código | Nombre | Significado | Cuándo usarlo |
| ------ | ------ | ----------- | ------------- |
| **200** | OK | Petición exitosa | GET, PUT, PATCH exitosos |
| **201** | Created | Recurso creado | POST exitoso (reserva creada) |
| **204** | No Content | Éxito sin contenido | DELETE exitoso |

#### Errores del Cliente (4xx)

Los códigos que comienzan con 4 indican que hubo un error en la petición del cliente. Algunos comunes son:

| Código | Nombre | Significado | Ejemplo |
| ------ | ------ | ----------- | ------- |
| **400** | Bad Request | Datos inválidos | Fecha de inicio posterior a fecha fin |
| **401** | Unauthorized | No autenticado | Token JWT faltante o inválido |
| **403** | Forbidden | Sin permisos | Intentar borrar reserva de otro usuario |
| **404** | Not Found | Recurso no existe | `GET /reservas/999` (no existe) |

#### Errores del Servidor (5xx)

Los códigos que comienzan con 5 indican que hubo un error en el servidor al procesar la petición. Algunos comunes son:

| Código | Nombre | Significado | Ejemplo |
| ------ | ------ | ----------- | ------- |
| **500** | Internal Server Error | Error en el servidor | Excepción no controlada |
| **503** | Service Unavailable | Servidor caído | Base de datos inaccesible |

### 3.4. Ejemplo Completo de Petición HTTP

Si cacharreamos con las *dev tools* del navegador, (o con soluciones específicas como `curl` o `Postman`) podemos ver exactamente qué se envía al backend cuando el frontend hace una petición para crear una reserva. Aquí tienes un ejemplo de cómo sería esa petición HTTP y la respuesta del servidor:

**Cliente envía:**

```http
POST /api/v1/reservas HTTP/1.1
Host: reservas.ejemplo.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "fecha_inicio": "2026-03-15",
  "fecha_fin": "2026-03-17",
  "recurso_id": 5,
  "num_personas": 2
}
```

Analicemos esta petición, encontramos:

- El método es `POST`, lo que indica que queremos crear un nuevo recurso (reserva).
- El endpoint es `/api/v1/reservas`, que es la URL a la que se envía la petición.
- En las cabeceras (`headers`) vemos `Content-Type: application/json`, lo que indica que el cuerpo de la petición está en formato JSON, y `Authorization: Bearer ...`, que es un token JWT para autenticación.Este token sólo estará presente cuando haga falta autenticarse, en otros casos (como un `GET` público) no sería necesario.
- Por último, el cuerpo de la petición (`body`) contiene un objeto JSON con los datos necesarios para crear la reserva: fechas, recurso y número de personas.

**Servidor responde (éxito):**

Del mismo modo que el cliente envía una petición, el servidor responde con un mensaje HTTP que incluye un código de estado, cabeceras y un cuerpo con la información resultante. En este caso, si la reserva se crea correctamente, el servidor podría responder así:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/reservas/123

{
  "id": 123,
  "fecha_inicio": "2026-03-15",
  "fecha_fin": "2026-03-17",
  "recurso_id": 5,
  "num_personas": 2,
  "estado": "pendiente",
  "usuario_id": 42,
  "creado_en": "2026-02-13T10:30:00Z"
}
```

Analicemos ahora esta respuesta:

- El código de estado es `201 Created`, lo que indica que la reserva se ha creado exitosamente.
- La cabecera `Content-Type: application/json` indica que el cuerpo de la respuesta está en formato JSON.
- La cabecera `Location: /api/v1/reservas/123` es una buena práctica que indica la URL del nuevo recurso creado (reserva con ID 123).
- El cuerpo de la respuesta contiene un objeto JSON con los detalles de la reserva recién creada, incluyendo su ID, fechas, recurso, número de personas, estado, usuario que la creó y timestamp de creación. Esto ha sido una decisión de diseño: el backend podría haber respondido solo con un mensaje de éxito, pero es más útil devolver el recurso completo para que el frontend pueda mostrarlo inmediatamente sin necesidad de hacer otra petición para obtener los detalles.

**Servidor responde (error):**

Si el cliente envía datos inválidos (por ejemplo, una fecha de inicio posterior a la fecha de fin), el servidor (*suponiendo que está gestionando errores en el backend*) debería responder con un código de error y un mensaje que explique qué ha fallado.

Digo lo de suponiendo, porque en los proyectos mal diseñados o ejecutados, se comete el pecado capital de sólo validar en el frontend y creer que esto es suficiente, lo cual es un grave error de seguridad y robustez. Siempre hay que validar en el backend, aunque también se valide en el frontend, porque el cliente es un entorno hostil donde el usuario puede modificar las peticiones a su antojo (con herramientas como Postman o incluso con JavaScript en la consola del navegador) y enviar datos maliciosos o erróneos.

Veamos un ejemplo de cómo podría responder el servidor ante un error de validación:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Fecha de inicio debe ser anterior a fecha de fin",
  "campo": "fecha_inicio"
}
```

En este caso el código de estado `400 Bad Request` indica que la petición no se pudo procesar debido a un error en los datos enviados por el cliente. El cuerpo de la respuesta contiene un objeto JSON con un mensaje de error claro y específico, y opcionalmente se puede incluir información adicional como el campo que causó el error para facilitar la corrección por parte del cliente. De nuevo esto es una decisión de diseño: el backend podría haber respondido simplemente con un mensaje genérico de error, pero es mucho más útil proporcionar detalles específicos sobre qué ha fallado para que el frontend pueda mostrar un mensaje claro al usuario y guiarlo para corregirlo.

Poder gestionar eso requiere que el frontend esté preparado para manejar tanto respuestas de éxito como de error, y mostrar mensajes adecuados al usuario en cada caso. Si el frontend ignora esto, es cuando vemos una página en blanco y toca abrir la consola del navegador para entender qué ha pasado, lo cual es una mala experiencia de usuario. Tristemente sigue ocurriendo.

---

## 4. APIs REST: El Contrato entre Frontend y Backend

### 4.1. ¿Qué es una API?

**API** es sin duda una de las palabras más populares en informática. Se usa para hablar de cualquier tipo de interfaz de programación, pero en el contexto de aplicaciones web modernas, cuando hablamos de API nos referimos a la **interfaz que expone el backend para que el frontend pueda interactuar con él**.

**API** (Application Programming Interface) = Interfaz de Programación de Aplicaciones **Definición simple:** Un **conjunto de reglas** que define cómo dos programas se comunican.

**Analogía:** Como un menú de restaurante

- El menú lista qué puedes pedir (endpoints)
- Cada plato tiene ingredientes definidos (parámetros). Por ejemplo puedes pedir tu carness: *Al punto, poco hecho, bien hecho*.
- Sabes qué recibirás (respuestas)
- No necesitas saber cómo se cocina (implementación interna)

### 4.2. ¿Qué es REST?

**REST** (Representational State Transfer) es un **estilo arquitectónico** para diseñar APIs. No es el único estilo, pero es el más popular y ampliamente adoptado. Las APIs REST siguen ciertos principios que las hacen fáciles de entender y usar.

**Principios REST:**

1. **Recursos identificados por URLs**

Es importante entender que en REST todo se trata como un *recurso*, y cada recurso tiene una URL única que lo identifica. Un recurso lo podríamos definir como cualquier entidad o concepto que queremos representar en nuestra aplicación. En el caso de un sistema de reservas, los recursos podrían ser `usuarios`, `reservas`, `recursos` (lo que se reserva), etc. Cada uno de estos recursos tendría su propia URL para acceder a ellos.

Por ejemplo, si tienes una API de reservas, podrías tener URLs como estas:

   ```text
   /usuarios         → Colección de usuarios
   /usuarios/42      → Usuario específico (ID 42)
   /reservas         → Colección de reservas
   /reservas/123     → Reserva específica (ID 123)
   ```

REST tiene además la convención de usar sustantivos en plural para los recursos (no verbos), y de estructurar las URLs de forma jerárquica para reflejar las relaciones entre recursos (por ejemplo, `/usuarios/42/reservas` podría ser la colección de reservas del usuario 42).

<!-- markdownlint-disable MD029 -->
2. **Métodos HTTP estándar**

Estos ya los hemos visto antes, básicamente cada método HTTP tiene un propósito específico:

- GET para leer
- POST para crear
- PUT/PATCH para actualizar
- DELETE para eliminar

Aprovechamos para recordar el concepto de *idempotencia*: un método es idempotente si realizar la misma operación varias veces tiene el mismo efecto que realizarla una sola vez. En REST, GET, PUT y DELETE son idempotentes, mientras que POST no lo es (crear varias veces el mismo recurso no es lo mismo que crearlo una sola vez).

3. **Sin estado (stateless)**

*Stateless* significa que cada petición HTTP es independiente y el servidor no guarda ningún tipo de "memoria" entre peticiones. Esto implica que toda la información necesaria para procesar una petición debe estar incluida en esa misma petición. Por ejemplo, si una API requiere autenticación, el cliente debe enviar un token de autenticación (como un JWT) en cada petición, ya que el servidor no recordará quién es el cliente entre peticiones.

Es importante no confundir esto con el concepto de "estado" en programación. En REST, el "estado" se refiere a la información que el servidor podría guardar sobre el cliente entre peticiones. En una API REST bien diseñada, el servidor no guarda ese estado, lo que hace que la API sea más escalable y fácil de mantener. Pero eso no quiere decir que el cliente no pueda mantener su propio estado (por ejemplo, el carrito de compras en una aplicación web), lo que no es contradictorio con el principio de stateless del servidor.

- Cada petición es independiente
- El servidor no guarda "memoria" entre peticiones
- Toda la info necesaria va en cada request (ej: token de autenticación)

4. **Representaciones estándar**

- Los datos se intercambian en formato JSON (principalmente)
- También puede ser XML, YAML, etc.

Precisamente por esto es tan importante documentar la API REST con una herramienta como OpenAPI, porque el formato de las peticiones y respuestas (qué campos se esperan, qué tipo de datos, etc.) es parte fundamental del contrato entre frontend y backend. Si no se documenta correctamente, el frontend no sabrá qué enviar ni qué esperar, lo que puede llevar a errores y malentendidos.
<!-- markdownlint-restore -->

### 4.3. Ejemplo de API REST para Reservas

Encuentra a continuación otro ejemplo de cómo podría ser la API REST de un sistema de reservas, con sus endpoints y métodos HTTP correspondientes:

**URIs (Endpoints):**

```text
GET    /api/v1/reservas              → Listar todas mis reservas
GET    /api/v1/reservas/{id}         → Obtener detalles de reserva 123
POST   /api/v1/reservas              → Crear nueva reserva
PUT    /api/v1/reservas/{id}         → Actualizar reserva 123 (completo)
PATCH  /api/v1/reservas/{id}         → Actualizar reserva 123 (parcial)
DELETE /api/v1/reservas/{id}         → Eliminar reserva 123
```

**Nota:** `/api/v1/` es un prefijo común que indica:

- `/api/` → Es una API (no una página web)
- `/v1/` → Versión 1 de la API

La URL del recurso quedaría formada por la base URL del servidor (ej: `https://reservas.ejemplo.com`) más la URI del endpoint (ej: `/api/v1/reservas/123`), lo que da como resultado la URL completa `https://reservas.ejemplo.com/api/v1/reservas/123` para acceder a la reserva con ID 123.

### 4.4. ¿Por Qué Necesitamos Documentar la API?

Las ventajas de documentar la API REST con OpenAPI son muchas, pero aquí te dejo algunas de las más importantes.

Imagina que trabajas en equipo:

- **María (frontend)** necesita mostrar las reservas en la web
- **Carlos (backend)** creará el servidor que accede a la base de datos

**Sin documentación:**

- María: "¿Qué URL uso? ¿GET o POST? ¿Qué campos devuelves?"
- Carlos: "¿Qué datos necesitas? ¿En qué formato?"
- **Resultado:** Pérdida de tiempo, errores, frustración

Tradicionalmente, uno de ellos habría *crafteado* un .json de ejemplo a mano para mostrarlo al otro acompañado del "esto es lo que te voy a mandar". Pero esto es propenso a errores y no se mantiene actualizado.

**Con OpenAPI (documentación):**

Con OpenAPI, ambos consultan la misma especificación que describe la API de forma clara y estructurada, lo que les permite trabajar en paralelo sin necesidad de estar constantemente preguntándose qué espera el otro. OpenAPI se convierte en la Única Fuente de Verdad (Single Source of Truth). Si hay una duda sobre cómo funciona un endpoint, la respuesta no la tiene Carlos ni la tiene María: la tiene la documentación.

- Ambos consultan la spec
- Saben exactamente qué esperar
- Pueden trabajar **en paralelo**
- Permite probar la API con herramientas como Swagger UI
- Pueden **generar código automáticamente**

---

## 5. Flujo Completo de Datos

### 5.1. Flujo: Usuario Crea una Reserva

Veamos paso a paso qué ocurre cuando un usuario crea una reserva. Aquí hay una transformación intermedia un poco diferente a lo que sería mandar un formulario HTML tradicional, ya que el frontend (JavaScript) prepara una petición HTTP con datos en formato JSON y la envía al backend, que luego procesa esa petición, interactúa con la base de datos y devuelve una respuesta JSON. Conceptualmente es lo mismo que antes, pero con una capa de separación entre frontend y backend:

```text
┌────────────────────────────────────────────────────────────────┐
│ 1. USUARIO INTERACTÚA CON LA INTERFAZ                          │
└────────────────────────────────────────────────────────────────┘
   Usuario rellena formulario:
   - Fecha inicio: 15/03/2026
   - Fecha fin: 17/03/2026
   - Recurso: Sala de reuniones A
   - Personas: 4

                      ↓ Click en botón de "Reservar"
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 2. FRONTEND (JavaScript) PREPARA LA PETICIÓN                   │
└────────────────────────────────────────────────────────────────┘
   Código JavaScript (ejemplo con fetch):

   
   const datos = {
     fecha_inicio: "2026-03-15",
     fecha_fin: "2026-03-17",
     recurso_id: 5,
     num_personas: 4
   };

   fetch('https://api.ejemplo.com/reservas', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token
     },
     body: JSON.stringify(datos)
   })
   

                      ↓ Envía por Internet
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 3. BACKEND RECIBE LA PETICIÓN HTTP                             │
└────────────────────────────────────────────────────────────────┘
   POST /api/v1/reservas
   Content-Type: application/json

   {
     "fecha_inicio": "2026-03-15",
     "fecha_fin": "2026-03-17",
     "recurso_id": 5,
     "num_personas": 4
   }

                      ↓
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 4. BACKEND VALIDA LOS DATOS                                    │
└────────────────────────────────────────────────────────────────┘
   Comprueba (por ejemplo):

   - ¿Fecha inicio < fecha fin?
   - ¿Fechas son futuras?
   - ¿Recurso existe?
   - ¿Usuario autenticado?

   Si hay error → Responde 400 Bad Request
   Si todo OK → Continúa ↓
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 5. BACKEND APLICA LÓGICA DE NEGOCIO                            │
└────────────────────────────────────────────────────────────────┘
   - Comprueba disponibilidad (¿hay solapamiento?)
   - Calcula precio según duración y recurso
   - Asigna estado: "pendiente"
   - Obtiene ID del usuario autenticado

                      ↓
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 6. BACKEND INSERTA EN BASE DE DATOS                            │
└────────────────────────────────────────────────────────────────┘
   SQL ejecutado:

   INSERT INTO reservas
     (usuario_id, recurso_id, fecha_inicio, fecha_fin,
      num_personas, estado, precio, creado_en)
   VALUES
     (42, 5, '2026-03-15', '2026-03-17', 4,
      'pendiente', 150.00, NOW());

   → Base de datos devuelve ID: 123

                      ↓
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 7. BACKEND CONSTRUYE LA RESPUESTA JSON                         │
└────────────────────────────────────────────────────────────────┘
   HTTP/1.1 201 Created
   Content-Type: application/json

   {
     "id": 123,
     "usuario_id": 42,
     "recurso_id": 5,
     "fecha_inicio": "2026-03-15",
     "fecha_fin": "2026-03-17",
     "num_personas": 4,
     "estado": "pendiente",
     "precio": 150.00,
     "creado_en": "2026-02-13T10:30:00Z"
   }

                      ↓ Envía por Internet
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 8. FRONTEND RECIBE LA RESPUESTA                                │
└────────────────────────────────────────────────────────────────┘
   JavaScript:

   .then(response => response.json())
   .then(reserva => {
     console.log('Reserva creada con ID:', reserva.id);
     mostrarMensaje('Reserva creada exitosamente');
     redirigir('/mis-reservas');
   })
   

                      ↓
```

```text
┌────────────────────────────────────────────────────────────────┐
│ 9. USUARIO VE EL RESULTADO                                     │
└────────────────────────────────────────────────────────────────┘
   Mensaje en pantalla:
   " Reserva creada exitosamente"

   Redirigido a la página "Mis Reservas" donde aparece la nueva

```

¿Qué significa esto? Que en lo tangible para un proyecto típico como **sistema de reservas** que se hiciese en el stack React + Spring Boot + MySQL intervendrían los siguientes componentes, cosa que profundizaréis en otros módulos profesionales, pero conviene adelantar esta visión global para entender el contexto de lo que se va a hacer en esta unidad:

- El **frontend** (React) se encarga de mostrar la interfaz, recoger los datos del usuario y enviar peticiones HTTP al backend. Serían los .html, .css y .js que se ejecutan en el navegador. Al usuario que accede desde su navegador se los sirve un **servidor web** (como Apache o Nginx) que se encarga de entregar los archivos estáticos del frontend.
- El **backend** (Spring Boot) se encarga de recibir las peticiones HTTP, procesarlas, aplicar la lógica de negocio y acceder a la base de datos. Es el programa que corre en el **servidor de aplicaciones** (como Tomcat o Jetty) y expone la API REST.
- La **base de datos** (MySQL) se encarga de almacenar la información de forma estructurada. Es el programa que corre en el **servidor de base de datos** y responde a las consultas SQL del backend.

Estas tres piezas (que cambiarán ligeramente según el stack tecnológico) forman la arquitectura de 3 capas que hemos visto antes, y el diseño de la API REST es el contrato que define cómo se comunican frontend y backend.

### 5.2. Puntos Clave del Flujo

Algunas cuestiones que merece la pena destacar sobre este flujo:

1. **Frontend solo conoce la API** (no sabe de SQL ni tablas)
2. **Backend es el único que accede a la BBDD** (seguridad)
3. **Los datos viajan en JSON** (formato estándar)
4. **HTTP es el medio de transporte** (request/response)
5. **Cada capa tiene su responsabilidad** (separación de concerns)

### 5.3. Gestión de Errores

¿Qué Pasa si Hay un Error? Veamos un poco más en detalle el ejemplo que hemos adelantado antes de un usuario que intenta reservar unas fechas inválidas (fecha de inicio posterior a fecha de fin).

Supongamos que el responsable del backend ha estado espabilado y ha implementado validaciones robustas. En este caso, el backend debería validar los datos recibidos y responder con un error claro que el frontend pueda mostrar al usuario.

**Ejemplo: Usuario intenta reservar fechas pasadas:**

```text
Frontend envía:
{
  "fecha_inicio": "2025-01-15",  ← ¡Fecha pasada!
  "fecha_fin": "2025-01-17"
}

                ↓

Backend valida y detecta el error

                ↓

Backend responde:
HTTP/1.1 400 Bad Request
{
  "error": "La fecha de inicio debe ser futura",
  "campo": "fecha_inicio",
  "fecha_minima": "2026-02-14"
}

                ↓

Frontend muestra mensaje al usuario:
" Error: La fecha de inicio debe ser futura"
```

---

## 6. Tu Proyecto: Sistema de Reservas

### 6.1. Contexto

En el **proyecto intermodular**, estás desarrollando un sistema de gestión de reservas. Puede ser para:

- Reservas de salas de reuniones
- Reservas de vehículos de empresa
- Reservas de equipamiento deportivo
- Reservas de citas médicas
- Reservas de mesas en restaurante
- Etc.

**Ya has hecho, entre otras cosas (BBDD):**

- Diseño de base de datos (tablas, relaciones, tipos, consultas)

**Vas a hacer ahora (LMSGI):**

- Diseño de la API REST (el "contrato" entre frontend y backend)

**Harás después (EDE, DWES, DWEC):**

- Implementación del backend (lógica)
- Implementación del frontend (interfaz)

### 6.2. Entidades Mínimas

Tu sistema probablemente tiene al menos estas entidades:

#### **Reserva** (entidad principal)

Campos básicos: A modo de ejemplo, tu tabla `reservas` en la base de datos podría tener estos campos:

- `id` (integer, PK) → Identificador único
- `usuario_id` (integer, FK) → Quién reserva
- `recurso_id` (integer, FK) → Qué se reserva (sala, vehículo, etc.)
- `fecha_inicio` (date o datetime) → Inicio de la reserva
- `fecha_fin` (date o datetime) → Fin de la reserva
- `estado` (string/enum) → pendiente, confirmada, cancelada
- `creado_en` (datetime) → Timestamp de creación
- `actualizado_en` (datetime) → Timestamp de última modificación

Campos opcionales (según tu proyecto):

- `num_personas` (integer)
- `precio` (decimal)
- `notas` (text)
- `motivo_cancelacion` (text)

#### **Usuario** (puede ser simplificado)

- `id` (integer, PK)
- `email` (string)
- `nombre` (string)

Recuerda *los detalles completos están en tu diseño de BBDD* esto es un ejemplo.

#### **Asset** (lo que se reserva)

- `id` (integer, PK)
- `nombre` (string) → "Sala A", "Vehículo 001"
- `tipo` (string) → "sala", "vehiculo", "equipo"
- `capacidad` (integer)
- `disponible` (boolean)

### 6.3. Tu Objetivo en Esta Tarea

**NO vas a programar nada todavía.**

Solo vas a **diseñar** cómo se comunicarán frontend y backend:

1. **Identificar** qué datos necesita el frontend
2. **Diseñar** la estructura de esos datos en JSON
3. **Documentar** los endpoints con OpenAPI

**Analogía:** Eres el arquitecto que dibuja los planos, no el constructor que levanta las paredes.

---

## 7. La Tarea: Diseñar tu API REST

### 7.1. Objetivos de Aprendizaje

Al completar esta actividad serás capaz de:

- Entender la arquitectura de 3 capas a nivel conceptual
- Comprender cómo fluyen los datos en una aplicación web moderna
- Diseñar estructuras de datos JSON para tu dominio
- Documentar una API REST con OpenAPI 3.0
- Validar que tu especificación es correcta con herramientas

### 7.2. Entregables

**Sobre formatos de documentación:**

- **Markdown (.md):** Formato de texto plano que se renderiza con formato (negritas, listas, tablas). Muy usado en proyectos de software (README, documentación). Si eliges este formato, consulta la [Guía básica de Markdown](https://www.markdownguide.org/basic-syntax/).
- **Texto plano (.txt):** El más simple. Sin formato, solo texto.
- **Word (.docx):** Familiar para la mayoría. Permite formato visual fácilmente.
- **PDF (.pdf):** Formato final, no editable. Asegura que se vea igual en todos los dispositivos.

**Para el análisis de dominio, elije el formato que te sea más cómodo.**

Debes crear **3 entregables** dentro del repositorio de GitHub de tu Proyecto Intermodular, en la carpeta `docs/api/`:

```text
docs/api/
├── 1-analisis-dominio.md  (o .txt, .docx, .pdf - el formato que prefieras)
├── 2-ejemplos-json/
│   ├── post-reserva-request.json
│   ├── post-reserva-response-201.json
│   ├── get-reservas-response-200.json
│   └── error-400.json
└── 3-openapi/
    ├── openapi.yaml          (tu especificación OpenAPI)
    └── dist/      (carpeta generada con el proyecto starting-swagger - ver Parte 3)
        ├── index.html
        ├── swagger-ui-dist/

```

**Nota:** El análisis de dominio puede entregarse en el formato que te resulte más cómodo: `.txt` (texto plano), `.md` (Markdown), `.docx` (Word) o `.pdf`.

### 7.3. Parte 1: Análisis del Dominio (15%)

**Archivo:** `1-analisis-dominio` (formato `.txt`, `.md`, `.docx` o `.pdf`)

**Objetivo:** Explicar qué información de tu base de datos necesitas exponer en la API para soportar las operaciones CRUD de tu sistema de reservas.

**Extensión:** 1-2 páginas (500-800 palabras aprox.). No es necesario ser excesivamente detallado, pero sí claro y específico sobre qué datos maneja tu API y de dónde vienen, demuestra que eres consciente del flujo que va a seguir ese dato.

**Contenido (formato libre, narrativo):**

Escribe un documento explicando:

1. **¿Qué tablas de tu BBDD participan en la funcionalidad CRUD de reservas?**
   - Tabla principal (Reservas) y campos relevantes
   - Tablas relacionadas (Usuarios, Recursos, etc.) y qué información necesitas de ellas

2. **¿Qué campos de la entidad Reserva existen en tu BBDD y cuáles expondrás en la API?**
   - Lista los campos con su tipo de dato
   - Explica cuáles SÍ expones en la API y cuáles NO (y por qué)
   - Indica cuáles genera automáticamente la BBDD (id, timestamps)

3. **¿Qué validaciones o reglas de negocio aplicarás?**
   - Campos obligatorios
   - Restricciones de valores (fechas, rangos, enumeraciones)
   - Lógica específica de tu dominio

**Formato:** Redacción libre. Puedes usar listas, párrafos, viñetas, lo que prefieras. Lo importante es que se entienda claramente qué datos maneja tu API y de dónde vienen. Céntrate en el core, mentalidad de MVP (mínimo producto viable). Ya irás ampliando.

---

#### Ejemplos de Análisis de Dominio

Encuentra un [ejemplo-analisis-dominio.md](ejemplo-analisis-dominio.md)

- Extensión: ~1 página
- Va directo al grano
- Solo lo esencial
- Suficiente para diseñar la API

Si prefieres otro estilo adelante, pero recuerda que lo importante es la claridad y la especificidad sobre los datos que maneja tu API. No es necesario escribir un ensayo, pero sí demostrar que entiendes el flujo de datos y las necesidades de tu sistema de reservas.

**Recomendación:** Mira el ejemplo breve primero. Si quieres ampliar, consulta el completo.

**Notas importantes:**

- Este ejemplo es **orientativo**. Tu sistema debe basarse en lo que has diseñado en tu base de datos, no en este ejemplo.
- **Adapta** el contenido a tu proyecto específico
- **No copies** el ejemplo literalmente; úsalo como guía de estructura
- **Sé específico** con tus propios campos, validaciones y reglas

### 7.4. Parte 2: Ejemplos JSON (25%)

**Carpeta:** `2-ejemplos-json/`

Crea **archivos JSON de ejemplo** para cada escenario:

#### Archivo: `post-reserva-request.json`

Datos que envía el frontend para crear una reserva:

```json
{
  "fecha_inicio": "2026-03-15",
  "fecha_fin": "2026-03-17",
  "recurso_id": 5,
  "num_personas": 4,
  "notas": "Reunión trimestral del equipo de desarrollo"
}
```

**Nota:** NO incluyas aquellos campos que hayas delegado en el backend.

#### Archivo: `post-reserva-response-201.json`

Datos que devuelve el backend si la creación fue exitosa:

```json
{
  "id": 123,
  "usuario_id": 42,
  "recurso_id": 5,
  "fecha_inicio": "2026-03-15",
  "fecha_fin": "2026-03-17",
  "num_personas": 4,
  "estado": "pendiente",
  "precio": 150.00,
  "notas": "Reunión trimestral del equipo de desarrollo",
  "creado_en": "2026-02-13T10:30:00Z",
  "actualizado_en": "2026-02-13T10:30:00Z"
}
```

#### Archivo: `get-reservas-response-200.json`

Lista de reservas del usuario autenticado:

```json
[
  {
    "id": 123,
    "recurso_id": 5,
    "recurso_nombre": "Sala de Reuniones A",
    "fecha_inicio": "2026-03-15",
    "fecha_fin": "2026-03-17",
    "num_personas": 4,
    "estado": "confirmada",
    "precio": 150.00,
    "creado_en": "2026-02-13T10:30:00Z"
  },
  {
    "id": 98,
    "recurso_id": 12,
    "recurso_nombre": "Vehículo 001",
    "fecha_inicio": "2026-02-20",
    "fecha_fin": "2026-02-20",
    "num_personas": 1,
    "estado": "pendiente",
    "precio": 50.00,
    "creado_en": "2026-02-10T15:20:00Z"
  }
]
```

#### Archivo: `error-400.json`

Respuesta cuando hay error de validación. Puedes ser específico, o crear un formato genérico de error con detalles:

```json
{
  "error": "Datos de entrada inválidos",
  "detalles": [
    {
      "campo": "fecha_inicio",
      "mensaje": "La fecha de inicio debe ser posterior a hoy"
    },
    {
      "campo": "num_personas",
      "mensaje": "Debe ser mayor que 0"
    }
  ]
}
```

**Criterios:**

- JSON válido (sin errores de sintaxis)
- Datos realistas y coherentes
- Tipos de datos correctos (strings con comillas, números sin comillas, etc.)
- Fechas en formato ISO 8601 (`YYYY-MM-DD` o `YYYY-MM-DDTHH:MM:SSZ`)

### 7.5. Parte 3: Especificación OpenAPI (60%)

Este es el núcleo de la tarea. Aquí es donde vas a diseñar y documentar tu API REST de forma formal con OpenAPI 3.0.

**Flujo de trabajo:**

1. Clona el proyecto plantilla `starting-swagger` siguiendo la guía del tema (sección 4.7 de UP09).
2. Edita el archivo `openapi.yaml` con tu especificación (usando los ejemplos de esta sección como referencia).
3. Ejecuta `npm run build` para generar la carpeta `dist/` con la documentación interactiva Swagger UI.
4. Copia el contenido de `dist/` a `docs/api/3-openapi/swagger-ui-dist/` de tu repositorio de GitHub, junto con el `openapi.yaml` que has creado.

**Archivo a editar:** `openapi.yaml` del proyecto `starting-swagger`

Crea una especificación OpenAPI 3.0 completa con:

#### 7.5.1. Metadata

La spec comienza con los metadatos de la API: título, descripción, versión y servidores donde está disponible. Consulta el ejemplo completo del tema (sección 4.7 de UP09) para ver la estructura exacta. Recuerda adaptar el título y la descripción a tu proyecto.

#### 7.5.2. Componentes (Schemas)

Define al menos estos tres modelos en `components/schemas`:

- **`TuEntidad`**: modelo completo que devuelve el servidor en las respuestas (incluye `id`, timestamps y campos calculados como el nombre del recurso relacionado).
- **`TuEntidadInput`**: modelo de entrada para crear/modificar (sin `id` ni campos auto-generados por el backend).
- **`Error`**: modelo genérico de respuesta de error.

Para cada propiedad, especifica su `type`, añade `example` y, si corresponde, validaciones como `minimum`, `maxLength` o `enum`. Para las fechas, usa `format: date` o `format: date-time`. Consulta los ejemplos del tema para ver cómo se definen estos campos.

#### 7.5.3. Endpoints (Paths)

Documenta al menos **4 endpoints** CRUD sobre tu entidad principal. Para cada uno incluye:

- `summary` y `description` claros
- `parameters` de ruta si los hay (`{id}`)
- `requestBody` con referencia al schema de entrada (en POST y PATCH)
- `responses` con los códigos de estado relevantes y sus schemas

Consulta el ejemplo completo del tema (sección 4.7 de UP09) para ver cómo combinar paths, métodos y referencias `$ref`. Lo importante es que los campos, rutas y validaciones sean los de **tu proyecto**, no una copia del ejemplo.

#### 7.5.4. Validación y exportación interactiva

**Paso 1: Valida tu especificación en [Swagger Editor](https://editor.swagger.io/)**

1. Abre [https://editor.swagger.io/](https://editor.swagger.io/)
2. Pega tu `openapi.yaml` en el panel izquierdo
3. Verifica que:
   - No hay errores en rojo
   - La documentación se renderiza correctamente en el panel derecho
   - Puedes expandir cada endpoint y ver ejemplos

**Paso 2: Genera la documentación interactiva con `starting-swagger`**

Siguiendo la guía del tema (sección 4.7 de UP09):

1. Asegúrate de que tu `openapi.yaml` está en el proyecto `starting-swagger`
2. Ejecuta `npm run build` en la terminal
3. Se generará la carpeta `dist/` con el `index.html` de Swagger UI
4. Copia esa carpeta como `swagger-ui-dist/` dentro de `docs/api/3-openapi/` en tu repositorio de GitHub

Añade una **captura de pantalla de tu documentación Swagger UI** funcionando correctamente (mostrando tus endpoints y ejemplos) y añádela a tu análisis de dominio (Parte 1) para demostrar que has validado la spec.

---

## 8. Criterios de Evaluación

### 8.1. Rúbrica de Evaluación

| Criterio | Peso | Insuficiente (0-4) | Suficiente (5-6) | Notable (7-8) | Sobresaliente (9-10) |
| -------- | ---- | ---------------_-- | ---------------- | ------------- | -------------------- |
| **Análisis del dominio** | 15% | No identifica campos o hay errores conceptuales | Identifica campos básicos | Identifica todos los campos y validaciones | Análisis completo con justificaciones |
| **Ejemplos JSON** | 25% | JSON inválido o datos irreales | JSON válido pero datos poco realistas | JSON válido con datos coherentes | Ejemplos completos, realistas y bien documentados |
| **Schemas OpenAPI** | 30% | Schemas incompletos o incorrectos | Schemas básicos funcionales | Schemas completos con validaciones | Schemas avanzados con descriptions, examples, constraints |
| **Endpoints OpenAPI** | 25% | Menos de 4 endpoints o incorrectos | 4 endpoints básicos | 4 endpoints completos con responses | Endpoints detallados con todos los códigos de estado |
| **Validación Swagger** | 5% | No valida o errores críticos | Valida con warnings | Valida sin errores | Valida perfectamente + captura |

### 8.2. Penalizaciones

Se aplicarán penalizaciones por errores graves o falta de entregables. Algunos ejemplos de penalizaciones que pudieran aplicarse son:

- -2 puntos: JSON o YAML con errores de sintaxis
- -1 punto: Spec con errores y no valida en Swagger Editor
- -0.5 puntos: Datos de ejemplo irreales o incoherentes

---

## 9. Recursos y Herramientas

### 9.1. Herramientas Recomendadas

Las siguientes herramientas te ayudarán a diseñar, validar y documentar tu API REST de forma efectiva:

| Herramienta | URL | Uso |
| ----------- | --- | --- |
| **Swagger Editor** | [https://editor.swagger.io/](https://editor.swagger.io/) | Editar y validar spec OpenAPI |
| **JSONLint** | [https://jsonlint.com/](https://jsonlint.com/) | Validar sintaxis JSON |
| **YAML Lint** | [http://www.yamllint.com/](http://www.yamllint.com/) | Validar sintaxis YAML |
| **JSON Crack** | [https://jsoncrack.com/](https://jsoncrack.com/) | Visualizar JSON como árbol |

Puedes probar si quieres a copiar y pegar [api-restaurante-v1.yaml](./api-restaurante-v1.yaml) en Swagger Editor para ver cómo se renderiza y entender la estructura de la spec. Recuerda que tu spec debe basarse en tu proyecto específico, no en este ejemplo.

### 9.2. Documentación de Referencia

Si te atascas o quieres profundizar, además de tu LLM de confianza, puedes consultar estos recursos oficiales y guías:

| Recurso | URL | Descripción |
| ------- | --- | ----------- |
| **OpenAPI 3.0 Spec** | [https://spec.openapis.org/oas/v3.0.3](https://spec.openapis.org/oas/v3.0.3) | Especificación oficial |
| **Tutorial OpenAPI** | [https://swagger.io/docs/specification/about/](https://swagger.io/docs/specification/about/) | Guía oficial de Swagger |
| **HTTP Status Codes** | [https://httpstatuses.com/](https://httpstatuses.com/) | Explicación de códigos HTTP |
| **JSON Schema** | [https://json-schema.org/](https://json-schema.org/) | Documentación de JSON Schema |

### 9.3. Ejemplos de APIs Reales

Para inspirarte, consulta especificaciones OpenAPI reales. Cógelas con calma porque evidentemente son más complejas que la tuya, pero te darán una idea de cómo se documentan APIs profesionales:

- **Stripe API:** [https://github.com/stripe/openapi](https://github.com/stripe/openapi)
- **GitHub API:** [https://github.com/github/rest-api-description](https://github.com/github/rest-api-description)
- **PetStore (ejemplo clásico):** [https://petstore.swagger.io/](https://petstore.swagger.io/)

### 9.4. Editores Recomendados

- **VSCode** con extensiones:
  - OpenAPI (Swagger) Editor: No la he probado pero con millones de descargas seguramente facilite la edición de YAML
  - YAML: De Red Hat, para validar sintaxis YAML
  - Prettier (formateador): Para mantener tu YAML ordenado.

---

## 10. Preguntas Frecuentes

### 10.1. Sobre el Alcance

**P: ¿Tengo que implementar la API?**
R: **NO**. Solo diseñas la especificación (el "contrato"). La implementación será en otros módulos profesionales.

**P: ¿Necesito base de datos funcionando?**
R: **NO**. Usas el diseño que hiciste en base de datos, pero no necesitas tener corriendo el motor de base de datos ni escribir SQL. Solo diseñas la API basándote en tu diseño de BBDD.

**P: ¿Puedo cambiar mi diseño de BBDD?**
R: Sí, si detectas que necesitas campos adicionales para la API, anótalo en el análisis.

### 10.2. Sobre JSON y YAML

**P: ¿Los ejemplos JSON deben estar en la spec OpenAPI?**
R: Deben estar **en ambos sitios**:

- Archivos `.json` independientes (carpeta `2-ejemplos-json/`)
- Integrados en la spec OpenAPI (en `example:` de cada schema)

**P: ¿Puedo usar JSON en lugar de YAML para la spec?**
R: Sí, pero YAML es más legible. Se recomienda YAML. Hacerlo en JSON es complicarse innecesariamente, pero si te sientes más cómodo puedes hacerlo. Solo asegúrate de que tu JSON es válido y sigue la estructura de OpenAPI.

**P: ¿Cómo convierto entre JSON y YAML?**
R: Usa [https://www.json2yaml.com/](https://www.json2yaml.com/)

### 10.3. Sobre OpenAPI

**P: ¿Qué diferencia hay entre `Reserva` y `ReservaInput`?**
R:

- `Reserva`: Modelo completo (con `id`, timestamps) → respuestas GET/POST
- `ReservaInput`: Solo datos editables → request body de POST/PATCH

**P: ¿Debo usar `PUT` o `PATCH` para modificar?**
R:

- `PUT`: Reemplaza todo el objeto (debes enviar todos los campos)
- `PATCH`: Modifica parcialmente (solo los campos que cambias)

Para esta tarea, usa `PATCH` (es más flexible).

**P: ¿Qué es `$ref`?**
R: Una referencia a un schema definido en `components/schemas`. Ejemplo:

```yaml
$ref: '#/components/schemas/Reserva'
```

Significa "usa el schema llamado **Reserva** que definí en components".

**P: ¿Cómo documento un array de objetos?**
R:

```yaml
schema:
  type: array
  items:
    $ref: '#/components/schemas/Reserva'
```

**P: ¿Qué significa `format: date` vs `format: date-time`?**
R:

- `date`: Solo fecha → `"2026-03-15"`
- `date-time`: Fecha y hora → `"2026-02-13T10:30:00Z"`

### 10.4. Sobre HTTP

**P: ¿Cuándo uso 200 vs 201?**
R:

- **201 Created**: Cuando creas un recurso (POST exitoso)
- **200 OK**: Para GET, PUT, PATCH exitosos

**P: ¿Cuándo uso 404 vs 400?**
R:

- **404 Not Found**: El recurso no existe (`GET /reservas/999`)
- **400 Bad Request**: Datos de entrada inválidos (fecha mal formateada)

**P: ¿Debo documentar el código 500?**
R: Opcional. Es un error genérico del servidor (no depende del diseño de la API). Con lo básico me conformo pero si quieres profundizar sientete libre.

### 10.5. Sobre el Proyecto

**P: Mi sistema no es de reservas, ¿puedo adaptarlo?**

R: **SÍ**. Adapta la tarea a tu dominio:

- Reservas → Pedidos, Citas, Incidencias, etc.
- Recurso → Producto, Servicio, etc.

### 10.6. Sobre la Entrega

**P: ¿Formato de entrega?**
R: Los 3 entregables subidos a la carpeta `docs/api/` del repositorio de GitHub de tu Proyecto Intermodular. No se entrega ningún `.zip`.

**P: ¿Puedo usar generadores automáticos?**
R: NO para el aprendizaje inicial. Debes escribir la spec manualmente. Puedes usarlos después para verificar.

**P: ¿No estoy matriculado en Proyecto Intermodular? ¿Cómo hago esta actividad sin base de datos?**

R: **No te preocupes, la actividad sigue siendo obligatoria pero tienes una alternativa simplificada.**

Como no has diseñado una base de datos en el módulo de BAE (Bases de Datos), hemos preparado un **diseño de base de datos mínimo** para que puedas completar la actividad.

**Lo que debes hacer:**

1. **Consulta el archivo [`ejemplo-bbdd-minima.md`](ejemplo-bbdd-minima.md)** en esta misma carpeta
   - Contiene un diseño simple de 3 tablas para un sistema de reservas de mostradores de facturación AENA
   - Es muy básico y fácil de entender (usuarios, mostradores, reservas)

2. **Usa ese diseño como base** para tu actividad:
   - En el análisis de dominio (Parte 1), describe las tablas y campos del ejemplo
   - Crea los ejemplos JSON (Parte 2) usando esos datos
   - Diseña la API OpenAPI (Parte 3) basándote en esa estructura

3. **Nivel de exigencia adaptado:**
   - No se espera que amplíes o compliques el diseño
   - Céntrate en entender bien los conceptos de API REST
   - Haz un trabajo sólido con lo básico antes que intentar añadir complejidad

**Ejemplo rápido de lo que tendrás:**

- Tabla `usuarios` (personal de aerolíneas que reserva)
- Tabla `mostradores` (qué se reserva: mostradores de facturación disponibles)
- Tabla `reservas` (las reservas de mostradores realizadas)

Con esto puedes completar perfectamente la actividad. El objetivo es que aprendas a diseñar APIs REST, no que seas experto en gestión aeroportuaria.

---

## Conclusión

Esta actividad te prepara para el **desarrollo real de aplicaciones web modernas**. Al completarla:

- Entenderás cómo se arquitecturan aplicaciones profesionales
- Dominarás el diseño de APIs REST
- Sabrás documentar con estándares de la industria (OpenAPI)
- Habrás creado el "contrato" que guiará tu implementación en otros módulos
- Podrás colaborar eficazmente en equipos frontend/backend

**Recuerda:** Estás diseñando el **plano**, no construyendo el edificio. Piensa en qué datos necesita tu aplicación, cómo fluyen, y documenta ese flujo de forma clara y estándar.

**¡Adelante con el diseño de tu API!**
