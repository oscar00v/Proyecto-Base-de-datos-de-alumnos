Set de instrucciones para el codigo (introducir en consola):

//para ver el arreglo de los alumnos introducidos ya sea por consola o con el html

console.log(alumnos);

// crear una nueva clase para el codigo, esta linea es solo para la consola
//sustituir X por la posicion del arreglo siguiente 

const alumnoX = new Alumno("Name", "LastName", "Age");

// Crear una nueva materia, cambiar el Materia name por el nombre que tu quieras de la materia agregar

const MateriaName = new Materia("MateriaName");

//agregar 1 alumno a la materia, cambiar X por el alumno que quieres agregar(la posicion de este en el arreglo ) y cambiar MateriaName por el nombre de la materia agregado en la linea aterior

MateriaName.agregarAlumno(alumnos[X]);

//Asignar calificacion de un alumno 

alumnoX.asignarCalificacion("MateriaName", promedioNum);

//Obtener promedio del alumno(cambiar x por un numero del arreglo)

console.log(alumnoX.obtenerPromedio());

//crear un grupo

const grupoA = new Grupo("Grupo A");

//agregar alumno al grupo(x por un num del arreglo)

grupoA.agregarAlumno(alumnoX);

// imprimir los alumnos del grupo

grupoA.obtenerAlumnos();

//obtener promedio del grupo

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
