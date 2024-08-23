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





// Array para almacenar los objetos de tipo Alumno
const alumnos = [];

// Manejador de eventos para el envío del formulario de alta de alumnos
document.getElementById('form-alta-alumno').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el comportamiento predeterminado del formulario (recargar la página)

    //! Obtención de los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);

    //todo Creación de una nueva instancia de Alumno y adición al array alumnos
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    console.log(alumnos);
    // mostrarAlumnos();

    // Reseteo del formulario (limpiar los campos)
    this.reset();
});

const alumno1 = new Alumno("Oscar", "Orozco", "30");
const alumno2 = new Alumno("Juan", "Perez", "31");
const alumno3 = new Alumno("x", "O", "31");
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