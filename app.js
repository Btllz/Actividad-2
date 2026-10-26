const form = document.getElementById('task-form');
const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const fecha_inicio = document.getElementById('fecha_inicio');
const fecha_fin = document.getElementById('fecha_fin');
const registros = document.getElementById('registros_tareas');

let tareas = []
let idTareaEnEdicion = null;


class Tarea {
    constructor(nombre, descripcion, fecha_inicio, fecha_fin) {
        this.id = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_fin = fecha_fin;
        this.fecha_inicio = fecha_inicio;
        this.completo = false;
    }

}

function mostrar_tareas() {
    registros.innerHTML = '';

    tareas.forEach(function (tarea) {
        const li = document.createElement('li');

        const estiloCompletado = tarea.completo ? 'style="text-decoration: line-through; color: gray;"' : '';

        li.innerHTML = `
            <span ${estiloCompletado}>
                <strong>${tarea.nombre}</strong> - ${tarea.descripcion} 
                <small>(Del ${tarea.fecha_inicio} al ${tarea.fecha_fin})</small>
            </span>
            <button onclick="cambiarEstado(${tarea.id})">
                ${tarea.completo ? 'Desmarcar' : 'Completar'}
            </button>
            <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>    
            <button onclick="actualizarTarea(${tarea.id})">Actualizar</button>    
        `;
        registros.appendChild(li);

    });

}

form.addEventListener('submit', function (event) {

    event.preventDefault();

    if (idTareaEnEdicion != null) {
        tareas = tareas.map(function (tarea) {
            if (tarea.id == idTareaEnEdicion) {
                return {
                    ...tarea,
                    nombre: nombre.value.trim(),
                    descripcion: descripcion.value.trim(),
                    fecha_inicio: fecha_inicio.value,
                    fecha_fin: fecha_fin.value
                };
            }
            return tarea;
        });

        idTareaEnEdicion = null;
    } else {

        event.preventDefault();

        const nueva_tarea = new Tarea(
            nombre.value.trim(),
            descripcion.value.trim(),
            fecha_inicio.value,
            fecha_fin.value
        )
        tareas.push(nueva_tarea);
    }

    mostrar_tareas();
    form.reset();

    });

function eliminarTarea(idTarea) {
    tareas = tareas.filter(function (tarea) {
        return tarea.id !== idTarea;
    });

    mostrar_tareas();
}

function cambiarEstado(idTarea) {

    const tareaEncontrada = tareas.find(function (tarea) {
        return tarea.id === idTarea;
    });

    if (tareaEncontrada) {
        tareaEncontrada.completo = !tareaEncontrada.completo;

        mostrar_tareas();
    }
}

function actualizarTarea(idTarea) {
    const tareaEncontrada = tareas.find(function (tarea) {
        return tarea.id == idTarea;
    });

    if (tareaEncontrada) {
        nombre.value = tareaEncontrada.nombre;
        descripcion.value = tareaEncontrada.descripcion;
        fecha_inicio.value = tareaEncontrada.fecha_inicio;
        fecha_fin.value = tareaEncontrada.fecha_fin;

        idTareaEnEdicion = idTarea;
    }
}
