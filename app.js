const btnEvaluar = document.getElementById("btnEvaluar");
const btnLimpiar = document.getElementById("btnLimpiar");
btnEvaluar.addEventListener("click", evaluarEstudiante);
btnLimpiar.addEventListener("click", limpiarFormulario);

function evaluarEstudiante() {

    const nombre = document.getElementById("nombre").value.trim();
    const carrera = document.getElementById("carrera").value;
    const nota1 = document.getElementById("nota1").value;
    const nota2 = document.getElementById("nota2").value;
    const nota3 = document.getElementById("nota3").value;
    const nota4 = document.getElementById("nota4").value;
    if (nombre === "" || carrera === "" || nota1 === "" || nota2 === "" || nota3 === "" || nota4 === "") {
        alert("Todos los campos son obligatorios");
        return;
    }
    if (nombre.length < 5) {
        alert("Nombre muy corto");
        return;
    }
    const notas = [Number(nota1), Number(nota2), Number(nota3), Number(nota4)];
    if (existenValoresInvalidos(notas)) {
        mostrarResultado("Cada nota debe estar entre 0 y 20", "warning");
        return;
    }
    const promedio = calcularPromedio(notas);
    const estado = clasificarEstado(promedio);
    const estudiante = {
        nombre: nombre,
        carrera: carrera,
        notas: notas,
        promedio: promedio,
        estado: estado,
    };
    mostrarResultado(construirMensaje(estudiante), obtenerColorEstado(estado), mostrarBeca(estudiante));
    mostrarJSON(estudiante);
    console.table(estudiante);
}
function calcularPromedio(notas) {
    let suma = 0;
    for (const nota of notas) {
        suma = suma + nota;
    }
    return suma / notas.length;
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
        if (Number.isNaN(nota) || nota < 0 || nota > 20) {
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
function construirMensaje(estudiante) {
    const notaMasAlta = Math.max(...estudiante.notas);
    const notaMasBaja = Math.min(...estudiante.notas);
    const cantNotasAprobadas = CantidadNotasAprobadas(estudiante);
    const cantNotasDesaprobadas = CantidadNotasDesaprobadas(estudiante);
    return `estudiante: ${estudiante.nombre}, carrera: ${estudiante.carrera}, promedio: ${estudiante.promedio.toFixed(2)}, estado: ${estudiante.estado},Nota Mas Alta: ${notaMasAlta}, Nota Mas Baja: ${notaMasBaja}, Cantidad Notas Aprobadas: ${cantNotasAprobadas}, Cantidad Notas Desaprobadas: ${cantNotasDesaprobadas}`;
}
function mostrarResultado(mensaje, tipo) {
    const resultado = document.getElementById("resultado");
    resultado.className = `alert alert-${tipo} mt-4`;
    resultado.textContent = mensaje;
}

function mostrarJSON(estudiante) {
    const salida = document.getElementById("salidaJSON");
    salida.classList.remove("d-none");
    salida.innerHTML = JSON.stringify(estudiante, null, 2);
}
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("carrera").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("nota4").value = "";
    document.getElementById("resultado").className = "alert mt-4 d-none";
    document.getElementById("salidaJSON").className = "bg-dark text-white p-3 rounded d-none";
    document.getElementById("beca").className = "alert mt-4 d-none";
}

function CantidadNotasAprobadas(estudiante) {
    let contadorAprobados = 0;
    for (const nota of estudiante.notas) {
        if (nota >= 14) {
            contadorAprobados++;
        }
    }
    return contadorAprobados;
}
function CantidadNotasDesaprobadas(estudiante) {
    let contadorDesaprobados = 0;
    for (const nota of estudiante.notas) {
        if (nota < 14) {
            contadorDesaprobados++;
        }
    }
    return contadorDesaprobados;
}
function calcularBeca(estudiante) {
    if (estudiante.promedio >= 18) {
        return "Aplica para beca del 50%";
    } else if (estudiante.promedio >= 15) {
        return "Aplica para beca del 25%";
    } else {
        return "No aplica para beca";
    }
}
function mostrarBeca(estudiante) {
    const beca = document.getElementById("beca");
    beca.className = "alert mt-4";
    beca.textContent = calcularBeca(estudiante);
}