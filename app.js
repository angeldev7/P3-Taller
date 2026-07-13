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
    if (nombre === "" || carrera === "" || nota1 === "" || nota2 === "" || nota3 === "") {
        alert("Todos los campos son obligatorios");
        return;
    }
    const notas = [Number(nota1), Number(nota2), Number(nota3)];
    if (existenValoresInvalidos(notas)) {
        mostrarResultado("Cada nota debe estar entre 0 y 20", "warning");
        return;
    }
    const promedio = calcularPromedio(notas);
    const estado = clasificarEstado(promedio);
    const estudiante = {
        nombre: nombre,
        carrera: carrera,
        promedio: promedio,
        estado: estado,
    };
    mostrarResultado(construirMensaje(estudiante), obtenerColor(estado));
    mostrarJSON(estudiante);
    console.table(estudiante);
}
function calcularPromedio(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += i;
    }
    return suma / notas.length;
}

