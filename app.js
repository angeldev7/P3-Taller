let estudiantes = [];

const btnEvaluar = document.getElementById("btnEvaluar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnListar = document.getElementById("btnListar");
const btnRanking = document.getElementById("btnRanking");
const btnBuscar = document.getElementById("btnBuscar");
const btnRestaurarBuscar = document.getElementById("btnRestaurarBuscar");

btnEvaluar.addEventListener("click", evaluarEstudiante);
btnLimpiar.addEventListener("click", limpiarFormulario);
btnListar.addEventListener("click", () => listarEstudiantes(estudiantes));
btnRanking.addEventListener("click", generarRanking);
btnBuscar.addEventListener("click", buscarEstudiante);
btnRestaurarBuscar.addEventListener("click", restaurarBusqueda);

function evaluarEstudiante() {
    const nombre = document.getElementById("nombre").value.trim();
    const carrera = document.getElementById("carrera").value;
    const n1 = document.getElementById("nota1").value;
    const n2 = document.getElementById("nota2").value;
    const n3 = document.getElementById("nota3").value;
    const n4 = document.getElementById("nota4").value;

    if (nombre === "" || carrera === "" || n1 === "" || n2 === "" || n3 === "" || n4 === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (nombre.length < 5) {
        alert("El nombre del estudiante debe tener al menos 5 caracteres.");
        return;
    }

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
        alert("El nombre solo debe contener letras y espacios.");
        return;
    }

    const nota1 = parseFloat(n1);
    const nota2 = parseFloat(n2);
    const nota3 = parseFloat(n3);
    const nota4 = parseFloat(n4);
    const notas = [nota1, nota2, nota3, nota4];

    if (existenValoresInvalidos(notas)) {
        alert("Cada nota debe ser un número comprendido entre 0 y 20.");
        return;
    }

    const existeEstudiante = estudiantes.some(est => est.nombre.toLowerCase() === nombre.toLowerCase());
    if (existeEstudiante) {
        alert(`Error: Ya existe un estudiante registrado con el nombre "${nombre}".`);
        return;
    }

    const promedio = calcularPromedio(notas);
    const promedioEspecial = calcularPromedioEspecial(notas);
    const notaMayor = obtenerNotaAlta(notas);
    const notaMenor = obtenerNotaBaja(notas);
    const estado = clasificarEstado(promedio);
    const rendimiento = clasificarRendimiento(promedio);
    const infoBeca = calcularBeca(carrera, promedio);
    const recomendacion = generarRecomendacion(promedio);

    const estudiante = {
        nombre: nombre,
        carrera: carrera,
        notas: notas,
        promedio: promedio,
        promedioEspecial: promedioEspecial,
        notaMayor: notaMayor,
        notaMenor: notaMenor,
        estado: estado,
        rendimiento: rendimiento,
        beca: infoBeca.mensaje,
        recomendacion: recomendacion
    };

    estudiantes.push(estudiante);

    mostrarResultadosIndividuales(estudiante, infoBeca);
    mostrarJSON(estudiantes);
    actualizarEstadisticasCurso();
    listarEstudiantes(estudiantes);
    limpiarcampos();
}

function calcularPromedio(notas) {
    let suma = 0;
    for (const nota of notas) {
        suma += nota;
    }
    return suma / notas.length;
}

function calcularPromedioEspecial(notas) {
    const minNota = Math.min(...notas);
    let descartado = false;
    
    const notasFiltradas = notas.filter(nota => {
        if (nota === minNota && !descartado) {
            descartado = true;
            return false;
        }
        return true;
    });
    
    const suma = notasFiltradas.reduce((acc, curr) => acc + curr, 0);
    return suma / notasFiltradas.length;
}

function clasificarEstado(promedio) {
    if (promedio >= 14) {
        return "Aprobado";
    } else if (promedio >= 10) {
        return "Habilitar";
    } else {
        return "Reprobado";
    }
}

function existenValoresInvalidos(notas) {
    for (const nota of notas) {
        if (isNaN(nota) || nota < 0 || nota > 20) {
            return true;
        }
    }
    return false;
}

function obtenerColorEstado(estado) {
    switch (estado) {
        case "Aprobado":
            return "success";
        case "Habilitar":
            return "warning";
        case "Reprobado":
            return "danger";
        default:
            return "secondary";
    }
}

function obtenerNotaAlta(notas) {
    return Math.max(...notas);
}

function obtenerNotaBaja(notas) {
    return Math.min(...notas);
}

function contarNotasPorEstado(notas) {
    let aprobadas = 0;
    let recuperacion = 0;
    let reprobadas = 0;
    for (const nota of notas) {
        if (nota >= 14) {
            aprobadas++;
        } else if (nota >= 10) {
            recuperacion++;
        } else {
            reprobadas++;
        }
    }
    return { aprobadas, recuperacion, reprobadas };
}

function generarRecomendacion(promedio) {
    if (promedio >= 18 && promedio <= 20) {
        return "18 a 20: Mantener el desempeño y apoyar a compañeros.";
    } else if (promedio >= 14 && promedio < 18) {
        return "14 a 17.99: Reforzar temas específicos.";
    } else if (promedio >= 10 && promedio < 14) {
        return "10 a 13.99: Asistir a tutorías y practicar ejercicios.";
    } else {
        return "0 a 9.99: Repetir contenidos base y solicitar acompañamiento.";
    }
}

function clasificarRendimiento(promedio) {
    if (promedio >= 18 && promedio <= 20) {
        return "Alto";
    } else if (promedio >= 14 && promedio < 18) {
        return "Medio";
    } else if (promedio >= 10 && promedio < 14) {
        return "Básico";
    } else {
        return "Bajo";
    }
}

function calcularBeca(carrera, promedio) {
    let mensaje = "No aplica para beca";
    let clase = "alert-secondary";

    if (carrera === "TI" && promedio > 18) {
        mensaje = "Aplica para beca del 100%";
        clase = "alert-success";
    } else if (carrera === "Software" && promedio > 17) {
        mensaje = "Aplica para beca del 80%";
        clase = "alert-primary";
    } else if (carrera === "Sistemas" && promedio > 16) {
        mensaje = "Aplica para beca del 60%";
        clase = "alert-warning";
    }

    return { mensaje, clase };
}

function construirMensaje(estudiante) {
    const counts = contarNotasPorEstado(estudiante.notas);
    return `Estudiante: ${estudiante.nombre}, carrera: ${estudiante.carrera}, promedio: ${estudiante.promedio.toFixed(2)}, estado: ${estudiante.estado}, Nota Más Alta: ${estudiante.notaMayor.toFixed(2)}, Nota Más Baja: ${estudiante.notaMenor.toFixed(2)}, Aprobadas: ${counts.aprobadas}, Recuperación: ${counts.recuperacion}, Reprobadas: ${counts.reprobadas}`;
}

function mostrarResultadosIndividuales(estudiante, infoBeca) {
    document.getElementById("sinResultados").classList.add("d-none");
    document.getElementById("resultadosDetalle").classList.remove("d-none");

    const resultadoDiv = document.getElementById("resultado");
    const colorEstado = obtenerColorEstado(estudiante.estado);
    resultadoDiv.className = `alert alert-${colorEstado} mt-2 fw-semibold`;
    resultadoDiv.textContent = construirMensaje(estudiante);

    const becaDiv = document.getElementById("beca");
    becaDiv.className = `alert ${infoBeca.clase} fw-bold`;
    becaDiv.textContent = `Beca: ${infoBeca.mensaje}`;

    document.getElementById("promedioNormal").textContent = estudiante.promedio.toFixed(2);
    document.getElementById("promedioEspecial").textContent = estudiante.promedioEspecial.toFixed(2);
    document.getElementById("notaMayor").textContent = estudiante.notaMayor.toFixed(2);
    document.getElementById("notaMenor").textContent = estudiante.notaMenor.toFixed(2);
    
    const rendimientoSpan = document.getElementById("rendimiento");
    rendimientoSpan.textContent = estudiante.rendimiento;
    if (estudiante.rendimiento === "Alto") {
        rendimientoSpan.className = "fs-4 fw-bold text-uppercase text-success";
    } else if (estudiante.rendimiento === "Medio") {
        rendimientoSpan.className = "fs-4 fw-bold text-uppercase text-primary";
    } else if (estudiante.rendimiento === "Básico") {
        rendimientoSpan.className = "fs-4 fw-bold text-uppercase text-warning";
    } else {
        rendimientoSpan.className = "fs-4 fw-bold text-uppercase text-danger";
    }

    document.getElementById("recomendacion").textContent = estudiante.recomendacion;

    const counts = contarNotasPorEstado(estudiante.notas);
    document.getElementById("conteoNotas").textContent = `Ap: ${counts.aprobadas} | Rec: ${counts.recuperacion} | Rep: ${counts.reprobadas}`;
}

function mostrarJSON(datos) {
    const salida = document.getElementById("salidaJSON");
    salida.classList.remove("d-none");
    salida.textContent = JSON.stringify(datos, null, 2);
    
    const noJsonMsg = document.getElementById("noJsonMsg");
    if (noJsonMsg) noJsonMsg.classList.add("d-none");
}

function limpiarcampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("carrera").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("nota4").value = "";
}

function limpiarFormulario() {
    limpiarcampos();
    
    document.getElementById("resultadosDetalle").classList.add("d-none");
    document.getElementById("sinResultados").classList.remove("d-none");

    const salida = document.getElementById("salidaJSON");
    salida.classList.add("d-none");
    salida.textContent = "";

    const noJsonMsg = document.getElementById("noJsonMsg");
    if (noJsonMsg) noJsonMsg.classList.remove("d-none");
}

function listarEstudiantes(lista) {
    const tbody = document.getElementById("tablaHistorial");

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-muted py-4">No hay estudiantes registrados.</td></tr>`;
        return;
    }

    tbody.innerHTML = lista.map(est => `
        <tr>
            <td class="fw-bold">${est.nombre}</td>
            <td>${est.carrera}</td>
            <td>[${est.notas.join(", ")}]</td>
            <td class="fw-bold">${est.promedio.toFixed(2)}</td>
            <td class="text-success fw-bold">${est.promedioEspecial.toFixed(2)}</td>
            <td>${est.notaMayor.toFixed(2)}</td>
            <td class="text-danger">${est.notaMenor.toFixed(2)}</td>
            <td><span class="badge bg-${obtenerColorEstado(est.estado)}">${est.estado}</span></td>
            <td>
                <span class="badge bg-${est.rendimiento === "Alto" ? "success" : est.rendimiento === "Medio" ? "primary" : est.rendimiento === "Básico" ? "warning text-dark" : "danger"}">
                    ${est.rendimiento}
                </span>
            </td>
            <td><small class="fw-semibold">${est.beca}</small></td>
        </tr>
    `).join("");
}

function actualizarEstadisticasCurso() {
    const total = estudiantes.length;
    document.getElementById("statsTotal").textContent = total;

    if (total === 0) {
        document.getElementById("statsPromedioCurso").textContent = "0.00";
        document.getElementById("statsAprobados").textContent = "0";
        document.getElementById("statsRecuperacion").textContent = "0";
        document.getElementById("statsReprobados").textContent = "0";
        document.getElementById("statsMejorEstudiante").textContent = "N/A";
        document.getElementById("statsPeorEstudiante").textContent = "N/A";
        return;
    }

    let sumaPromedios = 0;
    let aprobados = 0;
    let recuperacion = 0;
    let reprobados = 0;

    let mejorEst = estudiantes[0];
    let peorEst = estudiantes[0];

    for (const est of estudiantes) {
        sumaPromedios += est.promedio;
        
        if (est.estado === "Aprobado") {
            aprobados++;
        } else if (est.estado === "Habilitar") {
            recuperacion++;
        } else {
            reprobados++;
        }

        if (est.promedio > mejorEst.promedio) {
            mejorEst = est;
        }
        if (est.promedio < peorEst.promedio) {
            peorEst = est;
        }
    }

    const promedioCurso = sumaPromedios / total;
    document.getElementById("statsPromedioCurso").textContent = promedioCurso.toFixed(2);
    document.getElementById("statsAprobados").textContent = aprobados;
    document.getElementById("statsRecuperacion").textContent = recuperacion;
    document.getElementById("statsReprobados").textContent = reprobados;

    document.getElementById("statsMejorEstudiante").textContent = `${mejorEst.nombre} (${mejorEst.promedio.toFixed(2)})`;
    document.getElementById("statsPeorEstudiante").textContent = `${peorEst.nombre} (${peorEst.promedio.toFixed(2)})`;
}

function buscarEstudiante() {
    const query = document.getElementById("txtBuscar").value.trim().toLowerCase();
    if (query === "") {
        alert("Por favor ingrese un término de búsqueda.");
        return;
    }

    const filtrados = estudiantes.filter(est => est.nombre.toLowerCase().includes(query));
    listarEstudiantes(filtrados);
}

// Resetear búsqueda
function restaurarBusqueda() {
    document.getElementById("txtBuscar").value = "";
    listarEstudiantes(estudiantes);
}

function generarRanking() {
    if (estudiantes.length === 0) {
        alert("No hay estudiantes en el historial para ordenar.");
        return;
    }
    const ranking = [...estudiantes].sort((a, b) => b.promedio - a.promedio);
    listarEstudiantes(ranking);
}