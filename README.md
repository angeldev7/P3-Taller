# Evaluador Académico y Dashboard de Historial

Este proyecto es una aplicación web interactiva desarrollada para la asignatura de Fundamentos de Tecnologías Web de la Universidad de las Fuerzas Armadas ESPE. Su propósito es evaluar el rendimiento académico individual de los estudiantes y consolidar la información en un historial general y un panel de analíticas del curso.

## Funcionalidades Implementadas

1. **Evaluador de Notas**: Formulario para el ingreso del nombre del estudiante, carrera y 4 notas cuantitativas.
2. **Validaciones de Seguridad**:
   - Campos obligatorios requeridos.
   - El nombre debe tener al menos 5 caracteres.
   - El nombre solo admite letras y espacios.
   - Las notas deben estar comprendidas en el rango de `0` a `20`.
   - Prevención de duplicados (no permite registrar alumnos con el mismo nombre).
3. **Cálculos Estadísticos**:
   - Promedio normal de las 4 notas.
   - Promedio especial (calculado automáticamente descartando la nota más baja).
   - Identificación de la nota máxima y mínima obtenida.
   - Conteo de notas aprobadas (>=14), en recuperación (10-13.99) y reprobadas (<10).
4. **Clasificación y Becas**:
   - Estado académico (Aprobado, Habilitar, Reprobado).
   - Nivel de rendimiento (Alto, Medio, Básico, Bajo).
   - Recomendación de desempeño personalizada.
   - Asignación de beca automática según carrera y promedio (100%, 80%, 60% o sin beca, con alertas de color Bootstrap).
5. **Dashboard del Curso**: Muestra el total de estudiantes evaluados, promedio general de la clase, cantidad de aprobados/recuperación/reprobados, y quiénes tienen el mejor y peor promedio.
6. **Historial Interactivo**:
   - Tabla dinámica que renderiza la lista de estudiantes registrados.
   - Búsqueda en tiempo real por nombre del estudiante.
   - Ranking de estudiantes ordenados de mayor a menor promedio.
7. **Representación JSON**: Exportación del objeto del estudiante actual y la lista general en formato de objeto JSON legible.

## Instrucciones de Ejecución

1. Descarga o clona este repositorio en tu computadora.
2. Abre la carpeta del proyecto en tu editor de código preferido (como Visual Studio Code).
3. Inicia un servidor local. Si utilizas la extensión **Live Server** de VS Code:
   - Haz clic derecho sobre el archivo `index.html`.
   - Selecciona **Open with Live Server**.
4. La aplicación se abrirá automáticamente en tu navegador web en la dirección local por defecto `http://127.0.0.1:5500` (o el puerto configurado).
5. Completa el formulario de entrada y haz clic en **Evaluar** para comenzar a registrar estudiantes.
