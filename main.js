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
        //console.log(`El promedio del grupo ${this.nombreGrupo} es de: ${promedioGrupo}`);
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
// }

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





}
//!!!!!!! Array para almacenar los objetos de tipo Alumno
const alumnos = [];
//!!!! Declarar el array global para almacenar los grupos
const grupos = [];
//!!!
const materias = [];
//////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
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

// Actualizar la función para guardar en LocalStorage
function guardarEnLocalStorageMaterias() {
    const datosMaterias = materias.map(materia => ({
        nombre: materia.name,
        alumnos: materia.alumnos.map(alumno => alumno.nombre) // Guardamos solo los nombres de los alumnos para simplificar
    }));
    localStorage.setItem('materias', JSON.stringify(datosMaterias));
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

function cargarMateriasDesdeLocalStorage() {
    const datosMaterias = JSON.parse(localStorage.getItem('materias'));
    if (datosMaterias) {
        datosMaterias.forEach(dataMateria => {
            const materia = new Materia(dataMateria.nombre);
            materias.push(materia);

            dataMateria.alumnos.forEach(nombreAlumno => {
                const alumno = alumnos.find(al => al.nombre === nombreAlumno);
                if (alumno) materia.agregarAlumno(alumno);
            });
        });
    }

    // Actualizar la interfaz con las materias cargadas
    actualizarListaMaterias();
}


//todo qutar todo esto hay que usar om clik
// Manejador de eventos para el envío del formulario de alta de alumnos
document.getElementById('form-alta-alumno').addEventListener('submit1', function(event) {
    event.preventDefault();  // Evita el comportamiento predeterminado del formulario (recargar la página)

    //! Obtención de los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);
    //todo creo que esto es lo unico que se quedaria 
    //todo Creación de una nueva instancia de Alumno y adición al array alumnos
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    console.log(alumnos);
    //! para el local storage
    
    
    guardarEnLocalStorage();
    //!
    // mostrarAlumnos();

    // Reseteo del formulario (limpiar los campos)
    this.reset();
});

// Manejador de eventos para el envío del formulario de alta de materias
document.getElementById('form-alta-materia').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el comportamiento predeterminado del formulario (recargar la página)

    // Obtener el valor del formulario
    const nombreMateria = document.getElementById('nombre-materia').value;

    // Crear una nueva instancia de Materia y añadirla al array de materias
    const nuevaMateria = new Materia(nombreMateria);
    materias.push(nuevaMateria);

    // Actualizar la lista de materias en la interfaz
    actualizarListaMaterias();

    // Guardar en localStorage
    guardarEnLocalStorageMaterias();

    // Reseteo del formulario (limpiar los campos)
    this.reset();
});
//!Tengo que cambiar esto
function actualizarListaGrupos() {
    // const listaGruposElement = document.getElementById('nombre-grupo');
    // listaGruposElement.innerHTML = ''; // Limpiar la lista actual

    grupos.forEach(function(grupo) {
        // Crear un elemento de lista para el grupo
        const liGrupo = document.createElement('li');
        liGrupo.textContent = `Grupo: ${grupo.nombreGrupo}`;

        // Crear una sublista para los alumnos del grupo
        const ulAlumnos = document.createElement('ul');

        grupo.alumnos.forEach(function(alumno) {
            const liAlumno = document.createElement('li');
            liAlumno.textContent = `${alumno.nombre} ${alumno.apellido} (Edad: ${alumno.edad})`;
            ulAlumnos.appendChild(liAlumno);
        });

        liGrupo.appendChild(ulAlumnos); // Añadir la sublista de alumnos al grupo
        listaGruposElement.appendChild(liGrupo); // Añadir el grupo a la lista
    });
}
//!


function agregarNuevoGrupo(nombreGrupo) {
    const nuevoGrupo = new Grupo(nombreGrupo);
    grupos.push(nuevoGrupo);
    actualizarListaGrupos();  // Actualizar la lista de grupos en la interfaz
    guardarEnLocalStorage();  // Guardar los cambios en localStorage
}

// Ejemplo: Al agregar un alumno a un grupo
function agregarAlumnoAGrupo(alumno, nombreGrupo) {
    const grupo = grupos.find(g => g.nombreGrupo === nombreGrupo);
    if (grupo) {
        grupo.agregarAlumno(alumno);
        actualizarListaGrupos();  // Actualizar la lista de grupos en la interfaz
        guardarEnLocalStorage();  // Guardar los cambios en localStorage
    }
    nombreGrupo.obtenerAlumnos();
}


//

function actualizarListaMaterias() {
    const listaMateriasElement = document.getElementById('lista-materias');
    listaMateriasElement.innerHTML = '';

    materias.forEach(function(materia) {
        const li = document.createElement('li');
        li.textContent = materia.name;
        listaMateriasElement.appendChild(li);
    });
}

// Manejador de eventos para asignar materia a un alumno
document.getElementById('form-asignar-materia').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreMateria = document.getElementById('nombre-materia').value;
    const alumnoSeleccionado = document.getElementById('alumno-materia').value;

    const alumno = alumnos.find(a => a.nombre === alumnoSeleccionado);
    if (alumno) {
        const materia = new Materia(nombreMateria);
        materia.agregarAlumno(alumno);
        guardarEnLocalStorage();
    }

    this.reset();
});
// Función para actualizar las opciones de alumnos y materias en el formulario de calificación
function actualizarOpcionesCalificacion() {
    const selectAlumno = document.getElementById('alumno-calificacion');
    const selectMateria = document.getElementById('materia-calificacion');

    selectAlumno.innerHTML = '';
    selectMateria.innerHTML = '';

    alumnos.forEach(alumno => {
        const optionAlumno = document.createElement('option');
        optionAlumno.value = alumno.nombre;
        optionAlumno.textContent = alumno.nombre;
        selectAlumno.appendChild(optionAlumno);
    });

    materias.forEach(materia => {
        const optionMateria = document.createElement('option');
        optionMateria.value = materia.name;
        optionMateria.textContent = materia.name;
        selectMateria.appendChild(optionMateria);
    });
}


// Manejador de eventos para el envío del formulario de asignación de calificación
document.getElementById('form-asignar-calificacion').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreAlumno = document.getElementById('alumno-calificacion').value;
    const nombreMateria = document.getElementById('materia-calificacion').value;
    const calificacion = parseInt(document.getElementById('calificacion').value);

    const alumno = alumnos.find(a => a.nombre === nombreAlumno);

    if (alumno) {
        alumno.asignarCalificacion(nombreMateria, calificacion);
        guardarEnLocalStorage(); // Guardar la actualización en localStorage
    }

    this.reset();
});

// Manejador de eventos para obtener promedio de un alumno
document.getElementById('btn-obtener-promedio').addEventListener('click', function() {
    const alumnoSeleccionado = document.getElementById('alumno-promedio').value;

    const alumno = alumnos.find(a => a.nombre === alumnoSeleccionado);
    if (alumno) {
        const promedio = alumno.obtenerPromedio();
        document.getElementById('resultado-promedio').textContent = `El promedio de ${alumno.nombre} es ${promedio}`;
    }
});

// Manejadores de eventos para ordenar la lista de alumnos
document.getElementById('ordenar-nombre').addEventListener('click', function() {
    const listaOrdenada = alumnos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarAlumnosOrdenados(listaOrdenada);
});

document.getElementById('ordenar-apellido').addEventListener('click', function() {
    const listaOrdenada = alumnos.sort((a, b) => a.apellido.localeCompare(b.apellido));
    mostrarAlumnosOrdenados(listaOrdenada);
});

document.getElementById('ordenar-calificacion-asc').addEventListener('click', function() {
    console.log("!!!!!!!!!!!!!!Calificacion-asc!!!!!!!!!!!!!!!")
    const listaOrdenada = alumnos.sort((a, b) => a.obtenerPromedio() - b.obtenerPromedio());
    console.log("Lista:")
    mostrarAlumnosOrdenados(listaOrdenada);
});

document.getElementById('ordenar-calificacion-desc').addEventListener('click', function() {
    console.log("!!!!!!!!!!!!!!Calificacion-desc!!!!!!!!!!!!!!!")
    const listaOrdenada = alumnos.sort((a, b) => b.obtenerPromedio() - a.obtenerPromedio());
    mostrarAlumnosOrdenados(listaOrdenada);
});

document.getElementById('ordenar-edad').addEventListener('click', function() {
    const listaOrdenada = alumnos.sort((a, b) => a.edad - b.edad);
    mostrarAlumnosOrdenados(listaOrdenada);
});

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

// Función para actualizar las opciones de alumnos en los formularios
function actualizarOpcionesAlumnos() {
    const selectAlumnoGrupo = document.getElementById('alumno-grupo');
    const selectAlumnoMateria = document.getElementById('alumno-materia');
    const selectAlumnoPromedio = document.getElementById('alumno-promedio');

    selectAlumnoGrupo.innerHTML = '';
    selectAlumnoMateria.innerHTML = '';
    selectAlumnoPromedio.innerHTML = '';

    alumnos.forEach(alumno => {
        const optionGrupo = document.createElement('option');
        const optionMateria = document.createElement('option');
        const optionPromedio = document.createElement('option');

        optionGrupo.value = alumno.nombre;
        optionMateria.value = alumno.nombre;
        optionPromedio.value = alumno.nombre;

        optionGrupo.textContent = alumno.nombre;
        optionMateria.textContent = alumno.nombre;
        optionPromedio.textContent = alumno.nombre;

        selectAlumnoGrupo.appendChild(optionGrupo);
        selectAlumnoMateria.appendChild(optionMateria);
        selectAlumnoPromedio.appendChild(optionPromedio);
    });
}

document.getElementById('btn-limpiar-lista').addEventListener('click', function() {
    // Vaciar el array de alumnos
    alumnos.length = 0;
    materias.length = 0;
    grupos.length = 0; // Limpiar los grupos también

    // Limpiar el localStorage
    localStorage.removeItem('datos');
    localStorage.removeItem('materias');
    // Actualizar la interfaz de usuario
    actualizarOpcionesAlumnos();
    mostrarAlumnosOrdenados([]);
    actualizarListaMaterias(); // Limpiar la lista de materias en la interfaz
    actualizarOpcionesCalificacion(); // Limpiar las opciones en el formulario de calificaciones
    


    console.log("La lista de alumnos ha sido limpiada.");
});


// // Cargar los datos al iniciar la página
// cargarDesdeLocalStorage();
// actualizarOpcionesAlumnos();
// cargarMateriasDesdeLocalStorage();



// Cargar los datos al iniciar la página
//cargarDesdeLocalStorage();

const alumno1 = new Alumno("Oscar", "Orozco", "30");
const alumno2 = new Alumno("Juan", "Perez", "31");
const alumno3 = new Alumno("Yolo", "Yolo", "32");
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
//alumno[i].asignarCalificacion("X,100")
console.log(alumno1.obtenerPromedio());


const grupoA = new Grupo("Grupo A");
// const grupoB = new Grupo("Grupo B");
// const grupoC = new Grupo("Grupo C");

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


// Cargar los datos al iniciar la página

cargarDesdeLocalStorage();
actualizarOpcionesAlumnos();
 // Mostrar la lista de grupos y alumnos en la interfaz
cargarMateriasDesdeLocalStorage();
actualizarOpcionesCalificacion();
actualizarListaGrupos(); 