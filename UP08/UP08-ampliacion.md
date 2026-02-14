# UP08: Contenido de Ampliación - XSLT y XSD

---

## ADVERTENCIA IMPORTANTE

>[!NOTE]
> ESTE CONTENIDO ES NO EVALUABLE Y COMPLETAMENTE OPCIONAL

Este documento contiene material de ampliación avanzado para estudiantes que deseen profundizar en tecnologías XML más allá del contenido básico del curso. El material incluido aquí:

- **NO es obligatorio** para superar la unidad UP08
- **NO será evaluado** en exámenes ni actividades
- Se proporciona como **recurso adicional** para el aprendizaje autónomo
- Es recomendable solo si tienes interés profesional en trabajar con XML en entornos empresariales

Si tu objetivo es aprobar el curso, puedes ignorar completamente este documento y centrarte en el contenido principal de UP08.md.

>[!NOTE]
> DEBIDO A SU NATURALEZA OPCIONAL, ESTE CONTENIDO ESTÁ EN VERSIÓN ALPHA Y PUEDE CONTENER ERRORES O INCONSISTENCIAS. SI ENCUENTRAS ALGÚN PROBLEMA, POR FAVOR REPÓRTALO PARA SU CORRECCIÓN.

---

## Índice

- [1. XSLT: Lenguaje de Transformación](#1-xslt-lenguaje-de-transformación)
  - [1.1. Fundamentos de XSLT](#11-fundamentos-de-xslt)
(#112-arquitectura-de-una-transformación-xslt)
  - [1.2. Estructura Básica de un Documento XSLT](#12-estructura-básica-de-un-documento-xslt)
  - [1.3. Plantillas (Templates)](#13-plantillas-templates)
(#132-ejemplo-completo-xml-a-html)
  - [1.4. Elementos Fundamentales de XSLT](#14-elementos-fundamentales-de-xslt)
  - [1.5. Ejemplo Avanzado: Transformación Completa](#15-ejemplo-avanzado-transformación-completa)
  - [1.6. Modos de Plantilla (Template Modes)](#16-modos-de-plantilla-template-modes)
  - [1.7. Funciones Adicionales en XSLT](#17-funciones-adicionales-en-xslt)
  - [1.8. Importación e Inclusión de Hojas XSLT](#18-importación-e-inclusión-de-hojas-xslt)
- [2. XSD: XML Schema Definition](#2-xsd-xml-schema-definition)
  - [2.1. ¿Qué es XSD y por qué es importante?](#21-qué-es-xsd-y-por-qué-es-importante)
(#212-por-qué-xsd-es-core-en-la-industria)
  - [2.2. Estructura Básica de un Esquema XSD](#22-estructura-básica-de-un-esquema-xsd)
(#222-asociar-xsd-a-un-documento-xml)
  - [2.3. Tipos de Datos en XSD](#23-tipos-de-datos-en-xsd)
(#233-facets-restricciones)
  - [2.4. Elementos y Atributos](#24-elementos-y-atributos)
  - [2.5. Tipos Complejos (complexType)](#25-tipos-complejos-complextype)
  - [2.6. Ejemplo Completo: Biblioteca](#26-ejemplo-completo-biblioteca)
  - [2.7. Herramientas para Trabajar con XSD](#27-herramientas-para-trabajar-con-xsd)
  - [2.8. Patrones Comunes de XSD](#28-patrones-comunes-de-xsd)
(#283-fecha-de-nacimiento-persona-adulta)
(#285-lista-de-valores-separados-por-espacio)
  - [2.9. XSD en la Práctica: Casos de Uso Reales](#29-xsd-en-la-práctica-casos-de-uso-reales)
(#293-configuraciones-de-aplicaciones)
  - [2.10. XSD vs Alternativas Modernas](#210-xsd-vs-alternativas-modernas)
  - [2.11. Recursos para Profundizar](#211-recursos-para-profundizar)
- [3. Casos de Uso Reales](#3-casos-de-uso-reales)
  - [3.1. RSS Feed a HTML](#31-rss-feed-a-html)
  - [3.2. Factura XML a PDF](#32-factura-xml-a-pdf)
  - [3.3. Migración de Datos](#33-migración-de-datos)
  - [3.4. Documentación Técnica](#34-documentación-técnica)
- [4. Herramientas Avanzadas](#4-herramientas-avanzadas)
  - [4.1. Herramientas Online](#41-herramientas-online)
  - [4.2. Herramientas de Escritorio](#42-herramientas-de-escritorio)
  - [4.3. Procesadores XSLT](#43-procesadores-xslt)
  - [4.4. Extensiones de Visual Studio Code](#44-extensiones-de-visual-studio-code)
  - [4.5. Documentación Oficial](#45-documentación-oficial)
  - [4.6. Libros Recomendados](#46-libros-recomendados)

---

## 1. XSLT: Lenguaje de Transformación

**Contenido de ampliación**: Este apartado es de contenido adicional para aquellos que quieran profundizar en XSLT. No es obligatorio para superar el curso, pero es muy recomendable si vais a trabajar con XML de forma profesional.

XSLT fue en su momento el estándar de facto para transformar XML. Aunque hoy en día existen alternativas más modernas (como JSON y herramientas basadas en JavaScript), XSLT sigue siendo muy relevante en muchos entornos empresariales y aplicaciones heredadas (por decirlo así). En particular resiste en sectores como la publicación, finanzas y administración pública.

### 1.1. Fundamentos de XSLT

#### 1.1.1. ¿Qué es XSLT?

**XSLT** (eXtensible Stylesheet Language Transformations) es un lenguaje **declarativo basado en XML** que permite **transformar** documentos XML en:
    - Otros documentos XML con estructura diferente
    - HTML para visualización en navegadores
    - Texto plano
    - CSV, JSON u otros formatos

**Características clave:**
    - Es en sí mismo un documento XML
    - Usa XPath para seleccionar nodos
    - Basado en **plantillas** (templates) y **reglas**
    - Procesamiento funcional (sin efectos secundarios)

Vídeo de introducción a XSLT, está en inglés pero hoy en día con los subtítulos automáticos es bastante accesible: [https://www.youtube.com/watch?v=W--Yhp0m35A](https://www.youtube.com/watch?v=W--Yhp0m35A)

#### 1.1.2. Arquitectura de una Transformación XSLT

```text
┌─────────────┐
│  XML Origen │
│ (Entrada)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│  Procesador │◄─────┤ Hoja de      │
│    XSLT     │      │ Estilo XSLT  │
└──────┬──────┘      └──────────────┘
       │
       ▼
┌─────────────┐
│  Documento  │
│   Resultado │
│ (HTML/XML/  │
│   Texto)    │
└─────────────┘
```

**Procesadores XSLT comunes:**
    - **Navegadores** (Chrome, Firefox): XSLT 1.0
    - **Saxon** (Java): XSLT 2.0 y 3.0
    - **xsltproc** (Linux): XSLT 1.0
    - **libxslt** (Python): XSLT 1.0

---

### 1.2. Estructura Básica de un Documento XSLT

La estructura mínima de una hoja de estilo XSLT incluye la declaración XML, el elemento raíz `<xsl:stylesheet>` y al menos una plantilla.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Plantilla raíz: punto de entrada -->
    <xsl:template match="/">
        <!-- Aquí va la transformación -->
    </xsl:template>

    <!-- Más plantillas -->

</xsl:stylesheet>
```

**Elementos obligatorios:**
    1. **Declaración XML**: `<?xml version="1.0" encoding="UTF-8"?>`
    2. **Elemento raíz**: `<xsl:stylesheet>` o `<xsl:transform>` (equivalentes)
    3. **Espacio de nombres**: `xmlns:xsl="http://www.w3.org/1999/XSL/Transform"`
    4. **Versión**: `version="1.0"` (o 2.0, 3.0)
    5. **Al menos una plantilla**: `<xsl:template match="...">`

Ejemplo mínimo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <body>
                <h1>Hola, Mundo!</h1>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
```

---

### 1.3. Plantillas (Templates)

Las **plantillas** son el corazón de XSLT. Definen **qué hacer** cuando se encuentra un nodo específico.

#### 1.3.1. Sintaxis de Template

```xml
<xsl:template match="expresion-xpath">
    <!-- Contenido de salida -->
</xsl:template>
```

- `match`: Expresión XPath que indica qué nodos procesa esta plantilla

#### 1.3.2. Ejemplo Completo: XML a HTML

**XML de entrada (biblioteca.xml):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<biblioteca>
    <libro>
        <titulo>Don Quijote</titulo>
        <autor>Cervantes</autor>
        <precio>25.50</precio>
    </libro>
    <libro>
        <titulo>Cien años de soledad</titulo>
        <autor>García Márquez</autor>
        <precio>22.00</precio>
    </libro>
</biblioteca>
```

**Hoja XSLT (biblioteca.xsl):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Plantilla para la raíz -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Catálogo de Biblioteca</title>
                <style>
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #4CAF50; color: white; }
                </style>
            </head>
            <body>
                <h1>Catálogo de Libros</h1>
                <table>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Precio</th>
                    </tr>
                    <!-- Aplicar plantillas a todos los libros -->
                    <xsl:apply-templates select="biblioteca/libro"/>
                </table>
            </body>
        </html>
    </xsl:template>

    <!-- Plantilla para cada libro -->
    <xsl:template match="libro">
        <tr>
            <td><xsl:value-of select="titulo"/></td>
            <td><xsl:value-of select="autor"/></td>
            <td><xsl:value-of select="precio"/>€</td>
        </tr>
    </xsl:template>

</xsl:stylesheet>
```

**Resultado HTML:**

```html
<html>
    <head>
        <title>Catálogo de Biblioteca</title>
        <style>...</style>
    </head>
    <body>
        <h1>Catálogo de Libros</h1>
        <table>
            <tr><th>Título</th><th>Autor</th><th>Precio</th></tr>
            <tr>
                <td>Don Quijote</td>
                <td>Cervantes</td>
                <td>25.50€</td>
            </tr>
            <tr>
                <td>Cien años de soledad</td>
                <td>García Márquez</td>
                <td>22.00€</td>
            </tr>
        </table>
    </body>
</html>
```

---

### 1.4. Elementos Fundamentales de XSLT

#### 1.4.1. `<xsl:value-of>` - Extraer Valores

Obtiene el **valor de cadena** de un nodo.

```xml
<!-- Sintaxis -->
<xsl:value-of select="expresion-xpath"/>

<!-- Ejemplos -->
<xsl:value-of select="titulo"/>
<xsl:value-of select="@id"/>
<xsl:value-of select="sum(//precio)"/>
```

**Con formato:**

```xml
<!-- Deshabilitar escape de HTML (output raw) -->
<xsl:value-of select="descripcion" disable-output-escaping="yes"/>
```

#### 1.4.2. `<xsl:apply-templates>` - Aplicar Plantillas

Invoca plantillas para procesar nodos seleccionados.

```xml
<!-- Sintaxis -->
<xsl:apply-templates select="expresion-xpath"/>

<!-- Ejemplos -->
<xsl:apply-templates select="libro"/>
<xsl:apply-templates select="//autor"/>
<xsl:apply-templates/>  <!-- Aplica a todos los hijos -->
```

#### 1.4.3. `<xsl:for-each>` - Bucles

Itera sobre un conjunto de nodos.

```xml
<!-- Sintaxis -->
<xsl:for-each select="expresion-xpath">
    <!-- Contenido a repetir -->
</xsl:for-each>

<!-- Ejemplo -->
<xsl:for-each select="biblioteca/libro">
    <div class="libro">
        <h3><xsl:value-of select="titulo"/></h3>
        <p>Autor: <xsl:value-of select="autor"/></p>
    </div>
</xsl:for-each>
```

**Con ordenación:**

```xml
<xsl:for-each select="biblioteca/libro">
    <!-- Ordenar por precio (numérico, ascendente) -->
    <xsl:sort select="precio" data-type="number" order="ascending"/>

    <div class="libro">
        <h3><xsl:value-of select="titulo"/></h3>
        <p>Precio: <xsl:value-of select="precio"/>€</p>
    </div>
</xsl:for-each>
```

#### 1.4.4. `<xsl:if>` - Condicionales Simples

Evaluación condicional **sin** `else`.

```xml
<!-- Sintaxis -->
<xsl:if test="condicion-xpath">
    <!-- Contenido si la condición es verdadera -->
</xsl:if>

<!-- Ejemplos -->
<xsl:if test="precio &gt; 20">
    <span class="caro">¡Oferta!</span>
</xsl:if>

<xsl:if test="@categoria='ficcion'">
    <img src="ficcion.png" alt="Ficción"/>
</xsl:if>
```

**Nota:** En XML, `<` debe escribirse como `&lt;` y `>` como `&gt;`

#### 1.4.5. `<xsl:choose>` - Condicionales Múltiples

Equivalente a `if-else if-else` en programación.

```xml
<xsl:choose>
    <xsl:when test="precio &lt; 15">
        <span class="barato">Económico</span>
    </xsl:when>
    <xsl:when test="precio &lt; 25">
        <span class="medio">Precio medio</span>
    </xsl:when>
    <xsl:otherwise>
        <span class="caro">Premium</span>
    </xsl:otherwise>
</xsl:choose>
```

#### 1.4.6. `<xsl:attribute>` - Crear Atributos Dinámicos

```xml
<!-- Sintaxis -->
<elemento>
    <xsl:attribute name="nombre-atributo">
        <!-- Valor del atributo -->
    </xsl:attribute>
</elemento>

<!-- Ejemplo -->
<a>
    <xsl:attribute name="href">
        <xsl:text>libro.php?id=</xsl:text>
        <xsl:value-of select="@id"/>
    </xsl:attribute>
    <xsl:value-of select="titulo"/>
</a>

<!-- Resultado: -->
<!-- <a href="libro.php?id=1">Don Quijote</a> -->
```

#### 1.4.7. `<xsl:element>` - Crear Elementos Dinámicos

```xml
<!-- Sintaxis -->
<xsl:element name="nombre-elemento">
    <!-- Contenido del elemento -->
</xsl:element>

<!-- Ejemplo -->
<xsl:element name="h{$nivel}">
    <xsl:value-of select="titulo"/>
</xsl:element>

<!-- Si $nivel=2, resultado: <h2>Don Quijote</h2> -->
```

#### 1.4.8. `<xsl:variable>` - Variables

```xml
<!-- Sintaxis -->
<xsl:variable name="nombre" select="expresion-xpath"/>

<!-- O con contenido: -->
<xsl:variable name="nombre">
    <!-- Contenido -->
</xsl:variable>

<!-- Ejemplo -->
<xsl:variable name="precioConIVA" select="precio * 1.21"/>
<xsl:variable name="totalLibros" select="count(//libro)"/>

<!-- Uso de variables -->
<p>Precio con IVA: <xsl:value-of select="$precioConIVA"/>€</p>
<p>Total de libros: <xsl:value-of select="$totalLibros"/></p>
```

**Importante:** Las variables en XSLT son **inmutables** (no se pueden modificar después de asignadas).

#### 1.4.9. `<xsl:output>` - Configurar Salida

Define el formato del documento de salida.

```xml
<!-- Para HTML -->
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<!-- Para XML -->
<xsl:output method="xml" encoding="UTF-8" indent="yes"/>

<!-- Para texto plano -->
<xsl:output method="text"/>
```

---

### 1.5. Ejemplo Avanzado: Transformación Completa

**Escenario:** Convertir un catálogo XML a una página HTML interactiva con filtros.

**XML de entrada (catalogo.xml):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalogo>
    <libro id="1" categoria="ficcion" disponible="true">
        <titulo>Don Quijote de la Mancha</titulo>
        <autor>Miguel de Cervantes</autor>
        <precio>25.50</precio>
        <stock>5</stock>
    </libro>
    <libro id="2" categoria="poesia" disponible="true">
        <titulo>Veinte poemas de amor</titulo>
        <autor>Pablo Neruda</autor>
        <precio>18.00</precio>
        <stock>12</stock>
    </libro>
    <libro id="3" categoria="ficcion" disponible="false">
        <titulo>Cien años de soledad</titulo>
        <autor>Gabriel García Márquez</autor>
        <precio>22.00</precio>
        <stock>0</stock>
    </libro>
    <libro id="4" categoria="ensayo" disponible="true">
        <titulo>El laberinto de la soledad</titulo>
        <autor>Octavio Paz</autor>
        <precio>20.00</precio>
        <stock>8</stock>
    </libro>
</catalogo>
```

**Hoja XSLT (catalogo.xsl):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <!-- Plantilla raíz -->
    <xsl:template match="/">
        <html lang="es">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Catálogo de Libros</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: #f5f5f5;
                        padding: 20px;
                    }
                    .container { max-width: 1200px; margin: 0 auto; }
                    h1 {
                        color: #2c3e50;
                        margin-bottom: 30px;
                        text-align: center;
                        font-size: 2.5em;
                    }
                    .stats {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                    }
                    .stat-item {
                        text-align: center;
                        padding: 10px;
                    }
                    .stat-value {
                        font-size: 2em;
                        font-weight: bold;
                        color: #3498db;
                    }
                    .stat-label {
                        color: #7f8c8d;
                        margin-top: 5px;
                    }
                    .categorias {
                        margin-bottom: 30px;
                    }
                    .categoria-section {
                        background: white;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .categoria-titulo {
                        font-size: 1.5em;
                        color: #2c3e50;
                        margin-bottom: 15px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #3498db;
                        text-transform: capitalize;
                    }
                    .libro-card {
                        background: #f9f9f9;
                        padding: 15px;
                        margin-bottom: 15px;
                        border-radius: 5px;
                        border-left: 4px solid #3498db;
                        transition: transform 0.2s;
                    }
                    .libro-card:hover {
                        transform: translateX(5px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    .libro-titulo {
                        font-size: 1.3em;
                        color: #2c3e50;
                        margin-bottom: 8px;
                        font-weight: 600;
                    }
                    .libro-autor {
                        color: #7f8c8d;
                        margin-bottom: 10px;
                        font-style: italic;
                    }
                    .libro-detalles {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .precio {
                        font-size: 1.4em;
                        font-weight: bold;
                        color: #27ae60;
                    }
                    .stock {
                        background: #3498db;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 3px;
                        font-size: 0.9em;
                    }
                    .agotado {
                        background: #e74c3c;
                    }
                    .disponible {
                        background: #27ae60;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Catálogo de Libros</h1>

                    <!-- Estadísticas -->
                    <div class="stats">
                        <div class="stat-item">
                            <div class="stat-value">
                                <xsl:value-of select="count(//libro)"/>
                            </div>
                            <div class="stat-label">Libros totales</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                <xsl:value-of select="count(//libro[@disponible='true'])"/>
                            </div>
                            <div class="stat-label">Disponibles</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                <xsl:value-of select="format-number(sum(//libro/precio) div count(//libro), '#.00')"/>€
                            </div>
                            <div class="stat-label">Precio medio</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                <xsl:value-of select="sum(//libro/stock)"/>
                            </div>
                            <div class="stat-label">Total en stock</div>
                        </div>
                    </div>

                    <!-- Libros por categoría -->
                    <div class="categorias">
                        <!-- Ficción -->
                        <xsl:if test="//libro[@categoria='ficcion']">
                            <div class="categoria-section">
                                <h2 class="categoria-titulo">Ficción</h2>
                                <xsl:apply-templates select="//libro[@categoria='ficcion']">
                                    <xsl:sort select="titulo"/>
                                </xsl:apply-templates>
                            </div>
                        </xsl:if>

                        <!-- Poesía -->
                        <xsl:if test="//libro[@categoria='poesia']">
                            <div class="categoria-section">
                                <h2 class="categoria-titulo">Poesía</h2>
                                <xsl:apply-templates select="//libro[@categoria='poesia']">
                                    <xsl:sort select="titulo"/>
                                </xsl:apply-templates>
                            </div>
                        </xsl:if>

                        <!-- Ensayo -->
                        <xsl:if test="//libro[@categoria='ensayo']">
                            <div class="categoria-section">
                                <h2 class="categoria-titulo">Ensayo</h2>
                                <xsl:apply-templates select="//libro[@categoria='ensayo']">
                                    <xsl:sort select="titulo"/>
                                </xsl:apply-templates>
                            </div>
                        </xsl:if>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>

    <!-- Plantilla para cada libro -->
    <xsl:template match="libro">
        <div class="libro-card">
            <div class="libro-titulo">
                <xsl:value-of select="titulo"/>
            </div>
            <div class="libro-autor">
                por <xsl:value-of select="autor"/>
            </div>
            <div class="libro-detalles">
                <span class="precio">
                    <xsl:value-of select="precio"/>€
                </span>
                <xsl:choose>
                    <xsl:when test="@disponible='false'">
                        <span class="stock agotado">Agotado</span>
                    </xsl:when>
                    <xsl:when test="stock &lt; 5">
                        <span class="stock" style="background: #f39c12;">
                            Últimas <xsl:value-of select="stock"/> unidades
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span class="stock disponible">
                            En stock (<xsl:value-of select="stock"/> unid.)
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>
```

**Para aplicar la transformación en el navegador**, añade al XML:

```xml
<?xml-stylesheet type="text/xsl" href="catalogo.xsl"?>
```

---

### 1.6. Modos de Plantilla (Template Modes)

Los **modos** permiten procesar los mismos nodos de diferentes maneras.

```xml
<!-- Definir plantillas con diferentes modos -->
<xsl:template match="libro" mode="lista">
    <li><xsl:value-of select="titulo"/></li>
</xsl:template>

<xsl:template match="libro" mode="detalle">
    <div class="detalle">
        <h3><xsl:value-of select="titulo"/></h3>
        <p><xsl:value-of select="autor"/></p>
        <p>Precio: <xsl:value-of select="precio"/>€</p>
    </div>
</xsl:template>

<!-- Aplicar con modo específico -->
<ul>
    <xsl:apply-templates select="//libro" mode="lista"/>
</ul>

<div class="detalles">
    <xsl:apply-templates select="//libro" mode="detalle"/>
</div>
```

---

### 1.7. Funciones Adicionales en XSLT

#### 1.7.1. `format-number()`

```xml
<!-- Formato con 2 decimales -->
<xsl:value-of select="format-number(precio, '#.00')"/>
<!-- 25.5 → 25.50 -->

<!-- Separador de miles -->
<xsl:value-of select="format-number(precio, '#,##0.00')"/>
<!-- 1250.5 → 1,250.50 -->

<!-- Con símbolo de moneda -->
<xsl:value-of select="format-number(precio, '€#,##0.00')"/>
```

#### 1.7.2. `generate-id()`

Genera un ID único para un nodo (útil para atributos HTML `id`).

```xml
<div>
    <xsl:attribute name="id">
        <xsl:value-of select="generate-id()"/>
    </xsl:attribute>
    <xsl:value-of select="titulo"/>
</div>

<!-- Resultado: <div id="idN12345">Don Quijote</div> -->
```

#### 1.7.3. `current()`

Referencia al **nodo actual** en contextos donde `.` podría ser ambiguo.

```xml
<xsl:for-each select="//libro">
    <!-- Libros del mismo autor que el actual -->
    <xsl:value-of select="count(//libro[autor = current()/autor])"/>
</xsl:for-each>
```

---

### 1.8. Importación e Inclusión de Hojas XSLT

#### 1.8.1. `<xsl:include>`

Incluye otra hoja XSLT (mismo nivel de precedencia).

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:include href="comunes.xsl"/>
    <xsl:include href="utilidades.xsl"/>

    <!-- Plantillas propias -->
</xsl:stylesheet>
```

#### 1.8.2. `<xsl:import>`

Importa otra hoja (menor precedencia, puede ser sobrescrita).

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Debe ir ANTES de cualquier otra cosa -->
    <xsl:import href="base.xsl"/>

    <!-- Sobrescribir plantillas de base.xsl -->
    <xsl:template match="libro">
        <!-- Nueva implementación -->
    </xsl:template>
</xsl:stylesheet>
```

---

## 2. XSD: XML Schema Definition

**Contenido de ampliación**: Este apartado es de contenido adicional para aquellos que quieran profundizar en la validación avanzada de XML. No es obligatorio para superar el curso, pero XSD es un estándar fundamental en la industria para definir la estructura y tipos de datos en documentos XML.

### 2.1. ¿Qué es XSD y por qué es importante?

**XML Schema Definition (XSD)** es un lenguaje basado en XML que define la **estructura, contenido y tipos de datos** que puede contener un documento XML. Es el estándar moderno del W3C para validación de XML, superando las limitaciones de DTD.

#### 2.1.1. Evolución: DTD vs XSD

En UP07 estudiamos **DTD (Document Type Definition)**, el mecanismo tradicional para validar XML. Sin embargo, DTD tiene importantes limitaciones:

| Característica | DTD | XSD |
| -------------- | ----- | ----- |
| **Sintaxis** | Propia (no XML) | XML nativo |
| **Tipos de datos** | Muy limitados (solo CDATA, ID, IDREF...) | +50 tipos primitivos (string, int, date, boolean, decimal...) |
| **Namespaces** | No soportados | Soporte completo |
| **Restricciones** | Básicas | Avanzadas (patrones regex, rangos, longitudes) |
| **Tipos personalizados** | No | Sí (simpleType, complexType) |
| **Herencia** | No | Sí (extension, restriction) |
| **Validación de contenido** | Limitada | Precisa y estricta |

**Ejemplo de la diferencia:**

**DTD:**

```dtd
<!ELEMENT precio (#PCDATA)>
```

Solo valida que `precio` contiene texto. Podría ser "abc" o "-999" y sería válido.

**XSD:**

```xml
<xs:element name="precio" type="xs:decimal">
  <xs:restriction>
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="9999.99"/>
    <xs:fractionDigits value="2"/>
  </xs:restriction>
</xs:element>
```

Valida que `precio` es un decimal positivo con máximo 2 decimales entre 0 y 9999.99.

#### 2.1.2. ¿Por qué XSD es core en la industria?

Aunque JSON ha ganado popularidad para APIs REST, **XSD sigue siendo fundamental** en:

1. **Servicios web empresariales (SOAP)**: Usan WSDL (Web Services Description Language) que se basa en XSD
2. **Interoperabilidad bancaria y financiera**: Estándares como SEPA, ISO 20022 usan XSD
3. **Intercambio de datos B2B**: EDI (Electronic Data Interchange) moderno
4. **Sistemas legacy**: Muchas grandes empresas tienen infraestructura XML con décadas de antigüedad
5. **Gobierno y administración pública**: Facturación electrónica, datos abiertos
6. **Industria aeroespacial y sanitaria**: Documentación técnica crítica

**Razones técnicas de su persistencia:**

- **Validación estricta**: Detecta errores antes de procesamiento costoso
- **Contratos formales**: Define exactamente qué datos se esperan
- **Documentación automática**: El esquema documenta la estructura
- **Herramientas maduras**: Generación automática de código desde XSD
- **Independencia de lenguaje**: No está atado a JavaScript como JSON

Un ejemplo aeronáutico real lo encontramos en el desarrollo de **AIXM** (Aeronautical Information Exchange Model), un estándar internacional basado en **XML** para el intercambio de información aeronáutica. AIXM utiliza **XML Schema (XSD)** para definir la estructura, los tipos de datos y las reglas de validación de elementos como aeródromos, rutas ATS, espacios aéreos, NAVAIDs, obstáculos o NOTAM digitales. AIXM es utilizado por proveedores de servicios de navegación aérea (ANSP) como EUROCONTROL, FAA o ENAIRE para publicar y consumir datos AIS digitales, incluidos los NOTAM estructurados del modelo AIXM 5.1.

Gracias a estos esquemas XSD, los sistemas de navegación aérea, aeropuertos y aerolíneas pueden intercambiar datos críticos de forma precisa, interoperable y segura, lo que contribuye directamente a la eficiencia y la seguridad de las operaciones aéreas.  
Más información en: [https://www.aixm.aero/](https://www.aixm.aero/)

### 2.2. Estructura Básica de un Esquema XSD

#### 2.2.1. Documento XSD Mínimo

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Definiciones de elementos, tipos, etc. -->

</xs:schema>
```

**Elementos obligatorios:**

- **Declaración XML**: `<?xml version="1.0" encoding="UTF-8"?>`
- **Elemento raíz**: `<xs:schema>`
- **Namespace**: `xmlns:xs="http://www.w3.org/2001/XMLSchema"`

Un namespace es esencial para evitar conflictos de nombres y para que los procesadores de XML reconozcan que estás utilizando elementos de XSD. El namespace `xs` es un prefijo comúnmente usado para referirse a los elementos de XML Schema. Puedes usar otro prefijo, pero `xs` es el estándar de facto.

#### 2.2.2. Asociar XSD a un Documento XML

**En el documento XML:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<biblioteca
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="biblioteca.xsd">
  <!-- Contenido del XML -->
</biblioteca>
```

**Con namespace:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<lib:biblioteca
    xmlns:lib="http://ejemplo.com/biblioteca"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://ejemplo.com/biblioteca biblioteca.xsd">
  <!-- Contenido del XML -->
</lib:biblioteca>
```

---

### 2.3. Tipos de Datos en XSD

#### 2.3.1. Tipos Primitivos (Built-in)

XSD proporciona más de 50 tipos de datos primitivos. Los más comunes:

<!-- markdownlint-disable -->
| Tipo | Descripción | Ejemplos |
| ---- | ----------- | -------- |
| `xs:string` | Cadena de texto | "Hola", "Don Quijote" |
| `xs:integer` | Entero (sin límite) | 42, -17, 1000000 |
| `xs:int` | Entero 32 bits | -2147483648 a 2147483647 |
| `xs:decimal` | Número decimal | 25.50, -0.33 |
| `xs:boolean` | Booleano | true, false, 1, 0 |
| `xs:date` | Fecha (YYYY-MM-DD) | 2024-03-15 |
| `xs:time` | Hora (HH:MM:SS) | 14:30:00 |
| `xs:dateTime` | Fecha y hora | 2024-03-15T14:30:00 |
| `xs:double` | Doble precisión | 3.14159, 2.5E10 |
| `xs:anyURI` | URI | http://ejemplo.com |
<!-- markdownlint-restore -->

**Ejemplo:**

```xml
<xs:element name="nombre" type="xs:string"/>
<xs:element name="edad" type="xs:integer"/>
<xs:element name="precio" type="xs:decimal"/>
<xs:element name="activo" type="xs:boolean"/>
<xs:element name="fechaNacimiento" type="xs:date"/>
```

#### 2.3.2. Tipos Simples Personalizados (simpleType)

Permiten crear nuevos tipos basados en los primitivos con **restricciones**.

**Restricción por patrón (regex):**

```xml
<xs:simpleType name="CodigoPostal">
  <xs:restriction base="xs:string">
    <xs:pattern value="[0-9]{5}"/>
  </xs:restriction>
</xs:simpleType>
```

**Restricción por rango:**

```xml
<xs:simpleType name="NotaExamen">
  <xs:restriction base="xs:decimal">
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="10"/>
    <xs:fractionDigits value="2"/>
  </xs:restriction>
</xs:simpleType>
```

**Restricción por longitud:**

```xml
<xs:simpleType name="DNI">
  <xs:restriction base="xs:string">
    <xs:length value="9"/>
    <xs:pattern value="[0-9]{8}[A-Z]"/>
  </xs:restriction>
</xs:simpleType>
```

**Enumeración (valores fijos):**

```xml
<xs:simpleType name="Categoria">
  <xs:restriction base="xs:string">
    <xs:enumeration value="ficcion"/>
    <xs:enumeration value="poesia"/>
    <xs:enumeration value="ensayo"/>
    <xs:enumeration value="tecnico"/>
  </xs:restriction>
</xs:simpleType>
```

#### 2.3.3. Facets (Restricciones)

Lista completa de restricciones disponibles:

| Facet | Descripción | Ejemplo |
| ----- | ----------- | ------- |
| `length` | Longitud exacta | `<xs:length value="5"/>` |
| `minLength` | Longitud mínima | `<xs:minLength value="3"/>` |
| `maxLength` | Longitud máxima | `<xs:maxLength value="50"/>` |
| `pattern` | Expresión regular | `<xs:pattern value="[A-Z]{3}[0-9]{3}"/>` |
| `enumeration` | Valores permitidos | `<xs:enumeration value="rojo"/>` |
| `minInclusive` | Valor mínimo (inclusivo) | `<xs:minInclusive value="0"/>` |
| `maxInclusive` | Valor máximo (inclusivo) | `<xs:maxInclusive value="100"/>` |
| `minExclusive` | Valor mínimo (exclusivo) | `<xs:minExclusive value="0"/>` |
| `maxExclusive` | Valor máximo (exclusivo) | `<xs:maxExclusive value="100"/>` |
| `totalDigits` | Dígitos totales | `<xs:totalDigits value="8"/>` |
| `fractionDigits` | Dígitos decimales | `<xs:fractionDigits value="2"/>` |
| `whiteSpace` | Manejo de espacios | `<xs:whiteSpace value="collapse"/>` |

Como puedes observar, la potencia expresiva del XSD es enorme, permitiendo definir con gran precisión qué datos son válidos en un documento XML, lo que es crucial para garantizar la integridad y calidad de los datos en aplicaciones empresariales y sistemas críticos. En el DTD esto sería imposible o extremadamente limitado, lo que demuestra por qué XSD es el estándar preferido en la industria para la validación de XML.

---

### 2.4. Elementos y Atributos

#### 2.4.1. Definir Elementos

**Elemento simple:**

```xml
<xs:element name="titulo" type="xs:string"/>
```

**Elemento con tipo personalizado:**

```xml
<xs:element name="precio" type="PrecioDecimal"/>
```

**Elemento con valor por defecto:**

```xml
<xs:element name="idioma" type="xs:string" default="es"/>
```

**Elemento con valor fijo:**

```xml
<xs:element name="version" type="xs:string" fixed="1.0"/>
```

**Elemento opcional:**

```xml
<xs:element name="descripcion" type="xs:string" minOccurs="0"/>
```

**Elemento repetible:**

```xml
<xs:element name="autor" type="xs:string" minOccurs="1" maxOccurs="unbounded"/>
```

**Atributos de cardinalidad:**

- `minOccurs="0"`: Opcional (por defecto es 1)
- `maxOccurs="1"`: Máximo una vez (por defecto)
- `maxOccurs="unbounded"`: Ilimitado
- `minOccurs="3" maxOccurs="10"`: Entre 3 y 10 veces

#### 2.4.2. Definir Atributos

**Atributo simple:**

```xml
<xs:attribute name="id" type="xs:integer"/>
```

**Atributo obligatorio:**

```xml
<xs:attribute name="categoria" type="xs:string" use="required"/>
```

**Atributo opcional (por defecto):**

```xml
<xs:attribute name="disponible" type="xs:boolean" use="optional"/>
```

**Atributo con valor por defecto:**

```xml
<xs:attribute name="idioma" type="xs:string" default="es"/>
```

**Atributo con valor fijo:**

```xml
<xs:attribute name="version" type="xs:string" fixed="2.0"/>
```

---

### 2.5. Tipos Complejos (complexType)

Los **tipos complejos** definen elementos que contienen:

- Otros elementos hijos
- Atributos
- Combinación de ambos

#### 2.5.1. Elemento con Atributos pero Sin Hijos

```xml
<xs:complexType name="LibroSimple">
  <xs:simpleContent>
    <xs:extension base="xs:string">
      <xs:attribute name="id" type="xs:integer" use="required"/>
      <xs:attribute name="isbn" type="xs:string"/>
    </xs:extension>
  </xs:simpleContent>
</xs:complexType>

<xs:element name="titulo" type="LibroSimple"/>
```

**XML válido:**

```xml
<titulo id="1" isbn="978-3-16-148410-0">Don Quijote de la Mancha</titulo>
```

#### 2.5.2. Elemento con Hijos (Secuencia)

```xml
<xs:complexType name="Libro">
  <xs:sequence>
    <xs:element name="titulo" type="xs:string"/>
    <xs:element name="autor" type="xs:string" maxOccurs="unbounded"/>
    <xs:element name="precio" type="xs:decimal"/>
    <xs:element name="isbn" type="xs:string" minOccurs="0"/>
  </xs:sequence>
  <xs:attribute name="id" type="xs:integer" use="required"/>
  <xs:attribute name="categoria" type="xs:string"/>
</xs:complexType>

<xs:element name="libro" type="Libro"/>
```

**XML válido:**

```xml
<libro id="1" categoria="ficcion">
  <titulo>Don Quijote</titulo>
  <autor>Miguel de Cervantes</autor>
  <precio>25.50</precio>
  <isbn>978-84-376-0494-7</isbn>
</libro>
```

#### 2.5.3. Indicadores de Orden

**xs:sequence** - Elementos en orden específico:

```xml
<xs:sequence>
  <xs:element name="nombre" type="xs:string"/>
  <xs:element name="apellido" type="xs:string"/>
</xs:sequence>
```

**xs:all** - Elementos en cualquier orden (máximo 1 cada uno):

```xml
<xs:all>
  <xs:element name="email" type="xs:string"/>
  <xs:element name="telefono" type="xs:string"/>
  <xs:element name="direccion" type="xs:string"/>
</xs:all>
```

**xs:choice** - Solo uno de los elementos:

```xml
<xs:choice>
  <xs:element name="efectivo" type="xs:decimal"/>
  <xs:element name="tarjeta" type="TarjetaCredito"/>
  <xs:element name="transferencia" type="DatosTransferencia"/>
</xs:choice>
```

#### 2.5.4. Grupos (groups)

Permiten reutilizar conjuntos de elementos:

```xml
<xs:group name="DatosContacto">
  <xs:sequence>
    <xs:element name="email" type="xs:string"/>
    <xs:element name="telefono" type="xs:string" minOccurs="0"/>
    <xs:element name="direccion" type="xs:string"/>
  </xs:sequence>
</xs:group>

<xs:complexType name="Cliente">
  <xs:sequence>
    <xs:element name="nombre" type="xs:string"/>
    <xs:group ref="DatosContacto"/>
  </xs:sequence>
</xs:complexType>
```

---

### 2.6. Ejemplo Completo: Biblioteca

**biblioteca.xsd:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Tipos simples personalizados -->
  <xs:simpleType name="Categoria">
    <xs:restriction base="xs:string">
      <xs:enumeration value="ficcion"/>
      <xs:enumeration value="poesia"/>
      <xs:enumeration value="ensayo"/>
      <xs:enumeration value="tecnico"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="ISBN">
    <xs:restriction base="xs:string">
      <xs:pattern value="978-\d{1,5}-\d{1,7}-\d{1,7}-\d"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="Precio">
    <xs:restriction base="xs:decimal">
      <xs:minInclusive value="0"/>
      <xs:maxInclusive value="9999.99"/>
      <xs:fractionDigits value="2"/>
    </xs:restriction>
  </xs:simpleType>

  <!-- Tipo complejo: Libro -->
  <xs:complexType name="LibroType">
    <xs:sequence>
      <xs:element name="titulo" type="xs:string"/>
      <xs:element name="autor" type="xs:string" maxOccurs="unbounded"/>
      <xs:element name="isbn" type="ISBN" minOccurs="0"/>
      <xs:element name="precio" type="Precio"/>
      <xs:element name="stock" type="xs:nonNegativeInteger"/>
      <xs:element name="descripcion" type="xs:string" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:integer" use="required"/>
    <xs:attribute name="categoria" type="Categoria" use="required"/>
    <xs:attribute name="disponible" type="xs:boolean" default="true"/>
  </xs:complexType>

  <!-- Tipo complejo: Biblioteca -->
  <xs:complexType name="BibliotecaType">
    <xs:sequence>
      <xs:element name="nombre" type="xs:string"/>
      <xs:element name="direccion" type="xs:string"/>
      <xs:element name="libro" type="LibroType" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

  <!-- Elemento raíz -->
  <xs:element name="biblioteca" type="BibliotecaType"/>

</xs:schema>
```

**biblioteca.xml (válido según el XSD):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<biblioteca
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="biblioteca.xsd">

  <nombre>Biblioteca Municipal</nombre>
  <direccion>Calle Mayor, 123</direccion>

  <libro id="1" categoria="ficcion" disponible="true">
    <titulo>Don Quijote de la Mancha</titulo>
    <autor>Miguel de Cervantes</autor>
    <isbn>978-84-376-0494-7</isbn>
    <precio>25.50</precio>
    <stock>5</stock>
    <descripcion>Obra maestra de la literatura española</descripcion>
  </libro>

  <libro id="2" categoria="poesia">
    <titulo>Veinte poemas de amor y una canción desesperada</titulo>
    <autor>Pablo Neruda</autor>
    <isbn>978-950-07-0020-9</isbn>
    <precio>18.00</precio>
    <stock>12</stock>
  </libro>

  <libro id="3" categoria="ficcion" disponible="false">
    <titulo>Cien años de soledad</titulo>
    <autor>Gabriel García Márquez</autor>
    <isbn>978-84-376-0494-8</isbn>
    <precio>22.00</precio>
    <stock>0</stock>
    <descripcion>Realismo mágico latinoamericano</descripcion>
  </libro>

</biblioteca>
```

---

### 2.7. Herramientas para Trabajar con XSD

#### 2.7.1. Validación Online

| Herramienta | URL | Características |
| ---------- | --- | --------------- |
| **Free Formatter** | [https://www.freeformatter.com/xml-validator-xsd.html](https://www.freeformatter.com/xml-validator-xsd.html) | Valida XML contra XSD |
| **Code Beautify** | [https://codebeautify.org/xmlvalidator](https://codebeautify.org/xmlvalidator) | Validador con errores detallados |

#### 2.7.2. Herramientas de Escritorio

**Visual Studio Code:**

- Extensión: **XML** (Red Hat)
- Features: Validación automática, autocompletado, snippets

**Oxygen XML Editor:**

- Validación en tiempo real
- Generación de XSD desde XML
- Generación de XML de ejemplo desde XSD

**XMLSpy:**

- Validación avanzada
- Diseñador gráfico de esquemas
- Depuración de esquemas complejos

Támbien es posible realizar la validación con Notepad++ usando el plugin XML Tools, aunque es más limitado que las opciones anteriores.

#### 2.7.3. Validación Programática

**Python (lxml):**

La librería **lxml** en Python es una opción muy robusta para validar documentos XML contra esquemas XSD, comparable en capacidades a las bibliotecas estándar disponibles en Java o Node.js. **Referencia:** [https://lxml.de/validation.html](https://lxml.de/validation.html)

Aunque **lxml** ofrece su propia implementación optimizada, mantiene compatibilidad con la API de **ElementTree**, que forma parte de la biblioteca estándar de Python. Sobre esta base, **lxml** añade soporte completo para XSD, XPath 1.0, XSLT 1.0, validación avanzada y un rendimiento superior gracias a **libxml2** y **libxslt**. Esto la convierte en una herramienta especialmente potente para trabajar con XML en Python. **Más información sobre ElementTree:** [https://docs.python.org/3/library/xml.etree.elementtree.html](https://docs.python.org/3/library/xml.etree.elementtree.html)

```python
from lxml import etree

# Cargar XSD
with open('biblioteca.xsd', 'r', encoding='utf-8') as f:
    schema_doc = etree.parse(f)
    schema = etree.XMLSchema(schema_doc)

# Cargar XML
with open('biblioteca.xml', 'r', encoding='utf-8') as f:
    xml_doc = etree.parse(f)

# Validar
is_valid = schema.validate(xml_doc)
print(f"¿Es válido? {is_valid}")

if not is_valid:
    print("Errores:")
    for error in schema.error_log:
        print(f"  Línea {error.line}: {error.message}")
```

**Python (lxml):**

```python
from lxml import etree

# Cargar XSD
with open('biblioteca.xsd', 'r', encoding='utf-8') as f:
    schema_doc = etree.parse(f)
    schema = etree.XMLSchema(schema_doc)

# Cargar XML
with open('biblioteca.xml', 'r', encoding='utf-8') as f:
    xml_doc = etree.parse(f)

# Validar
is_valid = schema.validate(xml_doc)
print(f"¿Es válido? {is_valid}")

if not is_valid:
    print("Errores:")
    for error in schema.error_log:
        print(f"  Línea {error.line}: {error.message}")
```

---

### 2.8. Patrones Comunes de XSD

#### 2.8.1. Email Válido

```xml
<xs:simpleType name="Email">
  <xs:restriction base="xs:string">
    <xs:pattern value="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"/>
  </xs:restriction>
</xs:simpleType>
```

#### 2.8.2. Teléfono Español

```xml
<xs:simpleType name="TelefonoES">
  <xs:restriction base="xs:string">
    <xs:pattern value="(\+34)?[6-9][0-9]{8}"/>
  </xs:restriction>
</xs:simpleType>
```

#### 2.8.3. Fecha de Nacimiento (Persona Adulta)

```xml
<xs:simpleType name="FechaNacimientoAdulto">
  <xs:restriction base="xs:date">
    <xs:maxInclusive value="2006-01-01"/>
  </xs:restriction>
</xs:simpleType>
```

#### 2.8.4. Porcentaje (0-100)

```xml
<xs:simpleType name="Porcentaje">
  <xs:restriction base="xs:decimal">
    <xs:minInclusive value="0"/>
    <xs:maxInclusive value="100"/>
    <xs:fractionDigits value="2"/>
  </xs:restriction>
</xs:simpleType>
```

#### 2.8.5. Lista de Valores Separados por Espacio

```xml
<xs:simpleType name="ListaIDs">
  <xs:list itemType="xs:integer"/>
</xs:simpleType>
```

**Uso:** `<ids>1 5 10 23 45</ids>`

---

### 2.9. XSD en la Práctica: Casos de Uso Reales

#### 2.9.1. Facturación Electrónica (Facturae)

En España, el formato **Facturae** para facturación electrónica está definido completamente mediante XSD. Las empresas deben generar facturas XML que cumplan este esquema para transacciones con la Administración Pública.

**Características:**

- XSD de más de 3000 líneas. [https://www.facturae.gob.es/content/dam/facturae/formato/versiones/Facturaev3_2_2.xml](https://www.facturae.gob.es/content/dam/facturae/formato/versiones/Facturaev3_2_2.xml)
- Define campos obligatorios: NIF, importe, IVA
- Valida formatos específicos (IBAN, fechas)
- Permite extensiones por sectores

#### 2.9.2. SOAP Web Services (WSDL)

Los servicios web SOAP definen sus contratos mediante WSDL, que internamente usa XSD para describir los tipos de mensajes.

Aunque no es core en esta asignatura, no viene de más que os vaya sonando lo que es un servicio SOAP, pues aún es muy común en entornos empresariales, especialmente en banca, seguros y administración pública. Alternativamente al servicio REST, que es el más común en la actualidad, el servicio SOAP es un protocolo de comunicación que utiliza XML para intercambiar información entre sistemas. La definición de los mensajes y tipos de datos en SOAP se realiza mediante WSDL (Web Services Description Language), que a su vez se basa en XSD para describir la estructura y tipos de los datos que se intercambian.

```xml
<xs:complexType name="GetClienteRequest">
  <xs:sequence>
    <xs:element name="clienteId" type="xs:integer"/>
  </xs:sequence>
</xs:complexType>

<xs:complexType name="GetClienteResponse">
  <xs:sequence>
    <xs:element name="nombre" type="xs:string"/>
    <xs:element name="email" type="Email"/>
    <xs:element name="saldo" type="xs:decimal"/>
  </xs:sequence>
</xs:complexType>
```

#### 2.9.3. Configuraciones de Aplicaciones

Muchas aplicaciones empresariales usan XML para configuración, validado con XSD:

```xml
<!-- Configuración de servidor validada por XSD -->
<servidor>
  <puerto>8080</puerto>
  <ssl enabled="true">
    <certificado>/path/to/cert.pem</certificado>
  </ssl>
  <conexionesBD>
    <conexion name="principal">
      <host>localhost</host>
      <puerto>5432</puerto>
      <usuario>admin</usuario>
    </conexion>
  </conexionesBD>
</servidor>
```

El XSD asegura que:

- Puertos sean números válidos (1-65535)
- Rutas de certificados existan
- Configuraciones obligatorias estén presentes

Todo sea dicho para el tema de **IaC (Infrastructure as Code)**, que es un enfoque moderno para gestionar la infraestructura de TI mediante código, el uso de **XML con XSD** para definir configuraciones de infraestructura es una práctica común en algunas herramientas y plataformas. Sin embargo, en la actualidad, muchas organizaciones están migrando hacia formatos más modernos como **YAML** o **JSON** para IaC debido a su simplicidad y legibilidad. Aun así, el conocimiento de **XML y XSD** sigue siendo relevante en entornos legacy o en casos donde se requiere una **validación estricta y formal** de las configuraciones. Ejemplos de esta transición a YAML lo encontramos en: **Ficheros docker-compose.yml** para Docker, el **netplan** de Ubuntu para configurar redes, o incluso las **pipelines de CI/CD** en plataformas como GitHub Actions o Jenkins, que también han adoptado YAML para definir **flujos de trabajo de integración y despliegue continuo**.

---

### 2.10. XSD vs Alternativas Modernas

#### 2.10.1. JSON Schema

**JSON Schema** es el equivalente de XSD para JSON:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "nombre": { "type": "string" },
    "edad": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["nombre", "email"]
}
```

**Comparación:**

| Aspecto | XSD | JSON Schema |
| ------- | --- | ----------- |
| Madurez | 20+ años | ~10 años |
| Herramientas | Abundantes | Creciendo |
| Industria | Banca, gobierno | APIs REST, microservicios |
| Complejidad | Alta | Media |

Si bien JSON Schema nació para dar soporte a la validación de JSON, también puede utilizarse para la validación de YAML, ya que YAML es un superconjunto de JSON. Esto lo convierte en una opción versátil para validar configuraciones de infraestructura definidas en YAML, como las utilizadas en herramientas de IaC (Infrastructure as Code). Sin embargo, es importante tener en cuenta que JSON Schema no tiene la misma capacidad de validación formal y estricta que XSD, lo que puede ser una limitación en entornos donde la precisión y la integridad de los datos son críticas. Por esta razón, aunque JSON Schema es adecuado para validar configuraciones de IaC en muchos casos, XSD sigue siendo la opción preferida en entornos empresariales y sistemas críticos donde se requiere una validación rigurosa.

#### 2.10.2. Protocol Buffers (Protobuf)

Google usa **Protobuf** para definición de esquemas en sus servicios. Protobuf es un formato de serialización binaria que ofrece alta eficiencia y rendimiento, aunque a costa de no ser legible por humanos. Es ideal para comunicaciones internas entre microservicios o para almacenamiento de datos en sistemas distribuidos.

**Ventajas sobre XSD:**

- Serialización binaria (más rápido)
- Esquemas más compactos
- Mejor rendimiento en alta escala

**Desventaja:**

- No es legible por humanos (XML sí)
- Menos estándar en integraciones legacy

#### 2.10.3. ¿Cuándo Usar XSD?

Usa XSD cuando:

- Necesitas validación estricta y formal
- Trabajas con sistemas legacy XML
- Integras con servicios SOAP
- Necesitas compatibilidad con estándares industriales (ISO, SEPA, etc.)
- El contrato de datos es complejo con muchas restricciones

Usa JSON Schema cuando:

- Construyes APIs REST modernas
- Frontend JavaScript consume los datos
- Prioriza simplicidad sobre formalidad
- Ecosistema Node.js/JavaScript

---

### 2.11. Recursos para Profundizar

**Documentación oficial:**

- W3C XML Schema Primer: [https://www.w3.org/TR/xmlschema-0/](https://www.w3.org/TR/xmlschema-0/)
- W3C XML Schema Part 1 (Structures): [https://www.w3.org/TR/xmlschema-1/](https://www.w3.org/TR/xmlschema-1/)
- W3C XML Schema Part 2 (Datatypes): [https://www.w3.org/TR/xmlschema-2/](https://www.w3.org/TR/xmlschema-2/)

**Tutoriales recomendados:**

- W3Schools XSD Tutorial: [https://www.w3schools.com/xml/schema_intro.asp](https://www.w3schools.com/xml/schema_intro.asp)
- XML Schema Tutorial (Eniun): [https://www.eniun.com/tutorial-xsd/](https://www.eniun.com/tutorial-xsd/)
- Ejercicios prácticos XSD (Eniun): [https://www.eniun.com/ejercicios-xsd-practicas-resueltas-ejemplos-examen/](https://www.eniun.com/ejercicios-xsd-practicas-resueltas-ejemplos-examen/)

---

## 3. Casos de Uso Reales

### 3.1. RSS Feed a HTML

Los **feeds RSS** son XML. XSLT puede convertirlos a HTML:

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/rss/channel">
        <html>
            <body>
                <h1><xsl:value-of select="title"/></h1>
                <xsl:for-each select="item">
                    <div class="noticia">
                        <h2><xsl:value-of select="title"/></h2>
                        <p><xsl:value-of select="description"/></p>
                        <a href="{link}">Leer más</a>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
```

### 3.2. Factura XML a PDF

Empresas usan XSLT para convertir facturas electrónicas (XML) a HTML, que luego se convierte a PDF.

### 3.3. Migración de Datos

XSLT puede transformar XML de un formato antiguo a uno nuevo:

```xml
<!-- Transformar estructura antigua a nueva -->
<xsl:template match="cliente_antiguo">
    <cliente>
        <nombre><xsl:value-of select="nombre"/></nombre>
        <email><xsl:value-of select="correo"/></email>
        <telefono><xsl:value-of select="tlf"/></telefono>
    </cliente>
</xsl:template>
```

### 3.4. Documentación Técnica

Proyectos como **DocBook** usan XSLT para generar documentación en múltiples formatos (HTML, PDF, ePub) desde un XML fuente. En otras soluciones como **Pandoc**, aunque no es su enfoque principal, también es posible usarlo para convertir XML a otros formatos, aunque su fortaleza radica más en la conversión de Markdown a diversos formatos de salida. Sin embargo, para proyectos que requieren una transformación compleja de XML a HTML o PDF, especialmente en el ámbito de la documentación técnica, XSLT sigue siendo una herramienta muy poderosa y ampliamente utilizada.

---

## 4. Herramientas Avanzadas

### 4.1. Herramientas Online

| Herramienta | URL | Descripción |
| ---------- | --- | ----------- |
| **XPather** | [https://xpather.com/](https://xpather.com/) | Probar expresiones XPath en tiempo real |
| **FreeFormatter** | [https://www.freeformatter.com/xpath-tester.html](https://www.freeformatter.com/xpath-tester.html) | Tester de XPath con ejemplos |
| **W3Schools XPath** | [https://www.w3schools.com/xml/xpath_intro.asp](https://www.w3schools.com/xml/xpath_intro.asp) | Tutorial interactivo de XPath |

### 4.2. Herramientas de Escritorio

**Editores XML/XSLT:**

- **Visual Studio Code** (con extensiones XML Tools, XSLT/XPath)
- **Oxygen XML Editor** (profesional, de pago)
- **XMLSpy** (profesional)
- **Notepad++** (con plugin XML Tools)

### 4.3. Procesadores XSLT

```bash
# xsltproc (Linux/Mac)
xsltproc -o salida.html hoja.xsl documento.xml

# Saxon (Java - XSLT 2.0/3.0)
java -jar saxon.jar -s:documento.xml -xsl:hoja.xsl -o:salida.html

# Python con lxml
python -c "from lxml import etree; ..."
```

### 4.4. Extensiones de Visual Studio Code

- **XML Tools** (dotjoshjohnson.xml)
- **XSLT/XPath for Visual Studio Code** (deltaxml.xslt-xpath)
- **XML Language Support** (redhat.vscode-xml)

### 4.5. Documentación Oficial

- **XPath 1.0 Spec**: [https://www.w3.org/TR/xpath-10/](https://www.w3.org/TR/xpath-10/)
- **XSLT 1.0 Spec**: [https://www.w3.org/TR/xslt-10/](https://www.w3.org/TR/xslt-10/)
- **XPath 2.0**: [https://www.w3.org/TR/xpath20/](https://www.w3.org/TR/xpath20/)
- **XSLT 2.0**: [https://www.w3.org/TR/xslt20/](https://www.w3.org/TR/xslt20/)
- **MDN Web Docs**: [https://developer.mozilla.org/es/docs/Web/XPath](https://developer.mozilla.org/es/docs/Web/XPath)

### 4.6. Libros Recomendados

- *XSLT 2.0 and XPath 2.0 Programmer's Reference* - Michael Kay
- *Learning XSLT* - Michael Fitzgerald (O'Reilly)
- *XPath and XPointer* - John Simpson (O'Reilly)

---

**FIN DEL CONTENIDO DE AMPLIACIÓN:**

Recuerda: Este material es completamente opcional y no será evaluado. Solo úsalo si tienes interés profesional específico en tecnologías XML avanzadas.
