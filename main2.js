class Alumno{
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};

    }

    inscribirEnMateria(materia) {
        this.materias.push(materia);
        this.calificaciones[materia] = null;  // Inicializa la calificación como null
    }

    asignarCalificacion(materia, calificacion) {
        if (this.materias.includes(materia)) {
            console.log(`se ha assigando la calificacion de: ${this.calificaciones[materia] = calificacion} a ${this.nombre} en la materia ${materia}`);
        } else {
            console.log(`El alumno no está inscrito en la materia ${materia}`);
        }
    }
    obtenerPromedio() {
        const calificaciones = Object.values(this.calificaciones).filter(function(c) {
            return c !== null;
        });  // Filtra calificaciones válidas
        const suma = calificaciones.reduce(function(acc, cal) {
            return acc + cal;
        }, 0);  // Suma todas las calificaciones
        const promedio = calificaciones.length ? suma / calificaciones.length : 0;
        console.log(`El promedio de ${this.nombre} es de: ${promedio}`);
        return promedio;  // Calcula y devuelve el promedio
    }

    
}

class Materia{
    constructor(materia){
        this.name = materia;
        this.alumnos = [];//los alumnos que se asgnan a la materia 
    }

    agregarAlumno(alumno){
        this.alumnos.push(alumno);
        console.log(`el alumno ${alumno.nombre} ha sido registrado en la materia ${this.name}`);
        this.alumnosInscritos();
        alumno.inscribirEnMateria(this.name);
    }
    alumnosInscritos() {
        console.log(`Lista de Alumnos registrados en: ${this.name}`);
        
        // Iterar sobre el array de alumnos y mostrarlos
        for (let index = 0; index < this.alumnos.length; index++) {
            console.log(this.alumnos[index]); // Muestra el objeto alumno completo
        }
        
    }
}

class Grupo {
    constructor(nombreGrupo) {
        this.nombreGrupo = nombreGrupo;
        this.alumnos = [];  // Usamos un Set para evitar duplicados
    }

    agregarAlumno(alumno) {
        if (!this.alumnos.includes(alumno)) {  // Evita agregar duplicados
            this.alumnos.push(alumno);
            console.log(`El alumno ${alumno.nombre} ha sido añadido al grupo ${this.nombreGrupo}`);
        } else {
            console.log(`El alumno ${alumno.nombre} ya está en el grupo ${this.nombreGrupo}`);
        }
    }

    obtenerAlumnos() {
        console.log(`Alumnos en el grupo ${this.nombreGrupo}:`);
        this.alumnos.forEach(function(alumno) {
            console.log(`${alumno.nombre} ${alumno.apellido}`);
        });
    }

    obtenerPromedioGrupo() {
        let sumaPromedios = 0;
        let totalAlumnos = this.alumnos.length;

        this.alumnos.forEach(function(alumno) {
            sumaPromedios += alumno.obtenerPromedio();
        });

        const promedioGrupo = totalAlumnos ? sumaPromedios / totalAlumnos : 0;
        console.log(`El promedio del grupo ${this.nombreGrupo} es de: ${promedioGrupo}`);
        return promedioGrupo;
    }

    buscarPorNombre(nombre) {
        return this.alumnos.filter(function(alumno) {
            return alumno.nombre.toLowerCase() === nombre.toLowerCase();
        });
    }

    buscarPorApellido(apellido) {
        return this.alumnos.filter(function(alumno) {
            return alumno.apellido.toLowerCase() === apellido.toLowerCase();
        });
    }

    ordenarPorCalificacion(ascendente = true) {
        return this.alumnos.slice().sort(function(a, b) {
            const promedioA = a.obtenerPromedio();
            const promedioB = b.obtenerPromedio();
            return ascendente ? promedioA - promedioB : promedioB - promedioA;
        });
    }

    ordenarPorEdad(ascendente = true) {
        return this.alumnos.slice().sort(function(a, b) {
            return ascendente ? a.edad - b.edad : b.edad - a.edad;
        });
    }
}

// function guardarEnLocalStorage() {
//     console.log("Se guardo en storage la clase alumno");
//     const datos = {
//         alumnos: alumnos.map(alumno => ({
//             nombre: alumno.nombre,
//             apellido: alumno.apellido,
//             edad: alumno.edad,
//             materias: alumno.materias,
//             calificaciones: alumno.calificaciones
//         })),
//         grupos: grupos.map(grupo => ({
//             nombreGrupo: grupo.nombreGrupo,
//             alumnos: grupo.alumnos.map(alumno => alumno.nombre) // Guardamos solo los nombres para simplificar
//         }))
//     };
//     localStorage.setItem('datos', JSON.stringify(datos));










// Función para guardar en LocalStorage
function guardarEnLocalStorage() {
    console.log("Se guardó en storage la clase Alumno y Grupo");
    const datos = {
        alumnos: alumnos.map(alumno => ({
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            edad: alumno.edad,
            materias: alumno.materias,
            calificaciones: alumno.calificaciones
        })),
        grupos: grupos.map(grupo => ({
            nombreGrupo: grupo.nombreGrupo,
            alumnos: grupo.alumnos.map(alumno => alumno.nombre) // Guardamos solo los nombres para simplificar
        }))
    };
    localStorage.setItem('datos', JSON.stringify(datos));
}

// Función para cargar desde LocalStorage
function cargarDesdeLocalStorage() {
    const datos = JSON.parse(localStorage.getItem('datos'));
    if (datos) {
        datos.alumnos.forEach(dataAlumno => {
            const alumno = new Alumno(dataAlumno.nombre, dataAlumno.apellido, dataAlumno.edad);
            alumno.materias = dataAlumno.materias;
            alumno.calificaciones = dataAlumno.calificaciones;
            alumnos.push(alumno);
        });

        datos.grupos.forEach(dataGrupo => {
            const grupo = new Grupo(dataGrupo.nombreGrupo);
            dataGrupo.alumnos.forEach(nombreAlumno => {
                const alumno = alumnos.find(al => al.nombre === nombreAlumno);
                if (alumno) grupo.agregarAlumno(alumno);
            });
            grupos.push(grupo);
        });
    }
}

// Array para almacenar los objetos de tipo Alumno
const alumnos = [];
const materias = [];
// Declarar el array global para almacenar los grupos
const grupos = [];

function darDeAltaAlumno(){
    //! Obtención de los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);

    //todo Creación de una nueva instancia de Alumno y adición al array alumnos
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    console.log(alumnos);
    //! para el local storage
    
    
    guardarEnLocalStorage();
    //!
    // mostrarAlumnos();

    // Reseteo del formulario (limpiar los campos)
    document.getElementById('form-alta-alumno').reset();

    actualizarOpcionesAlumnosGrupos()

}
//! Grupo

function actualizarOpcionesAlumnosGrupos() {
    const selectAlumnoGrupo = document.getElementById('alumno-grupo');
    selectAlumnoGrupo.innerHTML = ''; // Limpiar las opciones actuales

    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.nombre;
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumnoGrupo.appendChild(option);
    });
}

function asignarAlumnoAlGrupo() {
    // Obtener el grupo seleccionado
    const nombreGrupo = document.getElementById('grupo').value;
    // Obtener el nombre del alumno seleccionado
    const nombreAlumno = document.getElementById('alumno-grupo').value;
    
    // Buscar el grupo seleccionado
    let grupo = grupos.find(grp => grp.nombreGrupo === nombreGrupo);
    
    // Si no existe el grupo, crearlo
    if (!grupo) {
        grupo = new Grupo(nombreGrupo);
        grupos.push(grupo);
    }
    
    // Buscar al alumno seleccionado por nombre
    const alumno = alumnos.find(al => al.nombre === nombreAlumno);
    
    // Si el alumno existe, asignarlo al grupo
    if (alumno) {
        grupo.agregarAlumno(alumno);
    }

    // Actualizar la visualización de grupos y alumnos
    actualizarListaDeGrupos();
    guardarEnLocalStorage();  // Guardar cambios en localStorage
}

function actualizarListaDeGrupos() {
    const listaGrupos = document.getElementById('grupos-lista');
    listaGrupos.innerHTML = '';  // Limpiar la lista actual
    
    grupos.forEach(grupo => {
        const liGrupo = document.createElement('li');
        liGrupo.textContent = `Grupo: ${grupo.nombreGrupo}`;
        
        const ulAlumnos = document.createElement('ul');
        grupo.alumnos.forEach(alumno => {
            const liAlumno = document.createElement('li');
            liAlumno.textContent = `${alumno.nombre} ${alumno.apellido}`;
            ulAlumnos.appendChild(liAlumno);
        });
        
        liGrupo.appendChild(ulAlumnos);
        listaGrupos.appendChild(liGrupo);
    });
}



//!
//? Materia
function crearMateria() {
    // Obtener el nombre de la materia del input
    const nombreMateria = document.getElementById('nombre-materia').value;

    // Verificar que el campo no esté vacío
    if (nombreMateria.trim() === "") {
        alert("Por favor, ingresa un nombre para la materia.");
        return;
    }

    // Crear una nueva instancia de Materia
    const nuevaMateria = new Materia(nombreMateria);

    // Añadir la materia al array de materias
    materias.push(nuevaMateria);

    // Actualizar la lista de materias en la interfaz
    actualizarListaDeMaterias();

    // Guardar en localStorage
    guardarEnLocalStorage();

    // Limpiar el formulario
    document.getElementById('form-alta-materia').reset();

    actualizarOpcionesAlumnosMateria() 
    actualizarOpcionesMaterias()
}


function actualizarListaDeMaterias() {
    const listaMaterias = document.getElementById('lista-materias');
    listaMaterias.innerHTML = '';  // Limpiar la lista actual

    materias.forEach(materia => {
        const li = document.createElement('li');
        li.textContent = materia.name;  // Mostrar el nombre de la materia
        listaMaterias.appendChild(li);
    });
}



//?


//todo
function actualizarOpcionesAlumnosMateria() {
    const selectAlumno = document.getElementById('alumno-materia');
    selectAlumno.innerHTML = ''; // Limpiar opciones previas

    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = `${alumno.nombre} ${alumno.apellido}`;
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumno.appendChild(option);
    });
}

// Función para agregar opciones de materias al select
function actualizarOpcionesMaterias() {
    const selectMateria = document.getElementById('lista-materias2');
    selectMateria.innerHTML = ''; // Limpiar opciones previas

    materias.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.name;
        option.textContent = materia.name;
        selectMateria.appendChild(option);
    });


}

function asignarMateria() {
    const nombreAlumno = document.getElementById('alumno-materia').value;
    const nombreMateria = document.getElementById('lista-materias2').value;

    const alumno = alumnos.find(a => `${a.nombre} ${a.apellido}` === nombreAlumno);
    const materia = materias.find(m => m.name === nombreMateria);

    if (alumno && materia) {
        materia.agregarAlumno(alumno);  // Agrega el alumno a la materia y viceversa
        mostrarMateriasAlumno(alumno);
        console.log(`Materia ${nombreMateria} asignada a ${nombreAlumno}`);
    } else {
        console.error('Alumno o Materia no encontrada.');
    }
    actualizarOpcionesAlumnosCalificacion();
    actualizarOpcionesMateriasCalificacion()
}

// Función para mostrar las materias asignadas al alumno
function mostrarMateriasAlumno(alumno) {
    const section = document.getElementById('Materia-lista');
    section.innerHTML = ''; // Limpiar lista previa

    alumno.materias.forEach(materia => {
        const p = document.createElement('p');
        p.textContent = `Materia: ${materia}`;
        section.appendChild(p);
    });
}

//todo
//!
function actualizarOpcionesAlumnosCalificacion() {
    const selectAlumno = document.getElementById('alumno-calificacion');
    selectAlumno.innerHTML = ''; // Limpiar opciones previas

    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.nombre; // Puede usar un identificador único si es necesario
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumno.appendChild(option);
    });
}
function actualizarOpcionesMateriasCalificacion() {
    const selectMateria = document.getElementById('materia-calificacion');
    selectMateria.innerHTML = ''; // Limpiar opciones previas

    materias.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.name;
        option.textContent = materia.name;
        selectMateria.appendChild(option);
    });
}

function asignarCalificaciont() {
    const nombreAlumno = document.getElementById('alumno-calificacion').value;
    const nombreMateria = document.getElementById('materia-calificacion').value;
    const calificacion = parseFloat(document.getElementById('calificacion').value);

    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    const materia = materias.find(m => m.name === nombreMateria);
    
    if (alumno && materia) {
        if (alumno.materias.includes(materia.name)) {
            alumno.asignarCalificacion(materia.name, calificacion);
            console.log(`Calificación de ${calificacion} asignada a ${nombreAlumno} en ${nombreMateria}`);
            alert(`Calificación de ${calificacion} asignada a ${nombreAlumno} en ${nombreMateria}`);
        } else {
            console.error(`El alumno ${nombreAlumno} no está inscrito en la materia ${nombreMateria}.`);
        }
    } else {
        console.error('Alumno o materia no encontrados.');
    }

    actualizarOpcionesAlumnosPromedio()
}





//!

//?

// Función para actualizar el select de alumnos en la sección de promedio
function actualizarOpcionesAlumnosPromedio() {
    const selectAlumno = document.getElementById('alumno-promedio');
    selectAlumno.innerHTML = ''; // Limpiar opciones previas

    alumnos.forEach(alumno => {
        const option = document.createElement('option');
        option.value = alumno.nombre; // Puede usar un identificador único si es necesario
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumno.appendChild(option);
    });
}

// Función para obtener y mostrar el promedio de un alumno
function obtenerPromedio() {
    const nombreAlumno = document.getElementById('alumno-promedio').value;
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);

    if (alumno) {
        const promedio = alumno.obtenerPromedio();
        document.getElementById('resultado-promedio').textContent = `El promedio de ${alumno.nombre} ${alumno.apellido} es: ${promedio.toFixed(2)}`;
    } else {
        document.getElementById('resultado-promedio').textContent = 'Alumno no encontrado.';
    }
}

//?

//todo
function ordenarAlumnos(criterio) {
    let listaOrdenada = [];

    switch(criterio) {
        case 'nombre':
            listaOrdenada = alumnos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'apellido':
            listaOrdenada = alumnos.slice().sort((a, b) => a.apellido.localeCompare(b.apellido));
            break;
        case 'calificacion-asc':
            listaOrdenada = alumnos.slice().sort((a, b) => a.obtenerPromedio() - b.obtenerPromedio());
            break;
        case 'calificacion-desc':
            listaOrdenada = alumnos.slice().sort((a, b) => b.obtenerPromedio() - a.obtenerPromedio());
            break;
        case 'edad':
            listaOrdenada = alumnos.slice().sort((a, b) => a.edad - b.edad);
            break;
    }

    mostrarAlumnosOrdenados(listaOrdenada);
}

function mostrarAlumnosOrdenados(lista) {
    const listaAlumnos = document.getElementById('lista-alumnos');
    listaAlumnos.innerHTML = '';  // Limpiar lista actual

    lista.forEach(alumno => {
        const li = document.createElement('li');
        const promedio = alumno.obtenerPromedio().toFixed(2); // Calcula el promedio del alumno
        li.textContent = `${alumno.nombre} ${alumno.apellido} (Edad: ${alumno.edad}, Promedio: ${promedio})`;
        listaAlumnos.appendChild(li);
    });
}



//todo


// Cargar los datos al iniciar la página
cargarDesdeLocalStorage();
// cargarDesdeLocalStorage();  // Cargar los datos desde LocalStorage si existennos

const alumno1 = new Alumno("Oscar", "Orozco", "30");
const alumno2 = new Alumno("Juan", "Perez", "31");
const alumno3 = new Alumno("Yolo", "Oloy", "32");
alumnos.push(alumno1);
alumnos.push(alumno2);
alumnos.push(alumno3);
console.log(alumnos);

// Matematicas1.agregarAlumno(alumnos[0]);

const Matematicas1 = new Materia("Matematicas1");

Matematicas1.agregarAlumno(alumnos[0]);
Matematicas1.agregarAlumno(alumnos[1]);

const Español = new Materia("Español");
Español.agregarAlumno(alumnos[0])

alumno1.asignarCalificacion("Matematicas1", 90);
alumno1.asignarCalificacion("Español", 95);
alumno2.asignarCalificacion("Matematicas1", 80);

console.log(alumno1.obtenerPromedio());


const grupoA = new Grupo("Grupo A");
grupoA.agregarAlumno(alumno1);
grupoA.agregarAlumno(alumno2);
grupoA.agregarAlumno(alumno3);

grupoA.obtenerAlumnos();
grupoA.obtenerPromedioGrupo();


// Buscar por nombre
const encontradosPorNombre = grupoA.buscarPorNombre("Oscar");
console.log("Resultados de búsqueda por nombre: ", encontradosPorNombre);

// Buscar por apellido
const encontradosPorApellido = grupoA.buscarPorApellido("Perez");
console.log("Resultados de búsqueda por apellido: ", encontradosPorApellido);

// Ordenar por calificación ascendente
const alumnosOrdenadosAsc = grupoA.ordenarPorCalificacion(true);
console.log("Alumnos ordenados por calificación ascendente: ", alumnosOrdenadosAsc);

// Ordenar por calificación descendente
const alumnosOrdenadosDesc = grupoA.ordenarPorCalificacion(false);
console.log("Alumnos ordenados por calificación descendente: ", alumnosOrdenadosDesc);

// Ordenar por edad (Parámetro extra)
const alumnosOrdenadosPorEdad = grupoA.ordenarPorEdad(true);
console.log("Alumnos ordenados por edad ascendente: ", alumnosOrdenadosPorEdad);








///////////////////////////////////////////////////////////

// Manejador de eventos para limpiar la lista de alumnos
document.getElementById('btn-limpiar-lista').addEventListener('click', function() {
    // Vaciar el array de alumnos
    alumnos.length = 0;
    grupos.length = 0;
    // Limpiar el localStorage
    localStorage.removeItem('datos');

    // Actualizar la interfaz de usuario
    actualizarOpcionesAlumnosGrupos();
    mostrarAlumnosOrdenados([]);

    console.log("La lista de alumnos ha sido limpiada.");
});




// // Función para actualizar las opciones de alumnos en los formularios
// function actualizarOpcionesAlumnosGrupos() {
//     const selectAlumnoGrupo = document.getElementById('alumno-grupo');
//     const selectAlumnoMateria = document.getElementById('alumno-materia');
//     const selectAlumnoPromedio = document.getElementById('alumno-promedio');

//     selectAlumnoGrupo.innerHTML = '';
//     selectAlumnoMateria.innerHTML = '';
//     selectAlumnoPromedio.innerHTML = '';

//     alumnos.forEach(alumno => {
//         const optionGrupo = document.createElement('option');
//         const optionMateria = document.createElement('option');
//         const optionPromedio = document.createElement('option');

//         optionGrupo.value = alumno.nombre;
//         optionMateria.value = alumno.nombre;
//         optionPromedio.value = alumno.nombre;

//         optionGrupo.textContent = alumno.nombre;
//         optionMateria.textContent = alumno.nombre;
//         optionPromedio.textContent = alumno.nombre;

//         selectAlumnoGrupo.appendChild(optionGrupo);
//         selectAlumnoMateria.appendChild(optionMateria);
//         selectAlumnoPromedio.appendChild(optionPromedio);
//     });
// }


// Función para mostrar los alumnos ordenados en una lista
function mostrarAlumnosOrdenados(lista) {
    const listaAlumnos = document.getElementById('lista-alumnos');
    listaAlumnos.innerHTML = '';  // Limpiar lista actual
    lista.forEach(alumno => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} ${alumno.apellido} (Edad: ${alumno.edad})`;
        listaAlumnos.appendChild(li);
    });
}



window.onload = function() {
    cargarDesdeLocalStorage();  // Cargar los datos guardados si existen
    actualizarOpcionesAlumnosGrupos();  // Actualizar las opciones de alumnos en el select
    actualizarListaDeGrupos();  // Mostrar los grupos y sus alumnos
    actualizarListaDeMaterias();  // Mostrar las materias existentes
    //inicializarCalificaciones(); // Si esta función no se ha llamado antes
    //inicializarPromedio();
};
