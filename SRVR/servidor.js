const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// El siguiente es el enlace, la comunicación hacia el servidor.
app.get('/api/greet', (req,res)=>{
	res.json({message: 'Esta es la primer API!'});
})

// Inicia el servidor
app.listen(PORT,() =>{
    console.log('Servidor corriendo en http://localhost:$PORT');
})

app.use(express.json()); // Solicitudes que vengan en formato json.
let estudiantes=[ // Estamos creando listas en formato de arreglo. Estamos declarando una base de datos temporal (llamada estudiantes)
    { id:1,nombre:'José Esparza' }, // Son arreglos.
    { id:2,nombre:'Mónica Gómez' },
    { id:3,nombre:'Juan Ruiz' },
];

// GET: Obtener todos los estudiantes
// Con el res estamos creando una respuesta a la petición de estudiantes.
// Estamos haciendo un llamado a todos nuestros estudiantes.
app.get('/estudiantes', (req,res)=>{ // Estamos definiendo una ruta a estudiantes. Cuando haga una solicitud get a esta ruta el servidor regresara todos los estudiantes.
    res.json(estudiantes); // La respuesta.
});

// Get: Obtener un estudiante por ID.
// parseInt (Palabra reservada) sirve para convertir un dato de texto en númerico.
app.get('/estudiantes/:id', (req,res)=>{ // Estamos definiendo una ruta con el id.
    const id=parseInt(req.params.id) // Convertimos el parametro id a un número entero.
    const estudiante = estudiantes.find(e=> e.id===id); // Estamos haciendo una busqueda al id del estudiante por el arreglo. 
    if (estudiante) {
        res.json(estudiante);
    } else {
        res.status(404).send ('Estudiante no encontrado');
    }
});


//POST Crear un nuevo estudiante
app.post('/estudiantes', (req,res)=>{ // Estamos definiendo una ruta para crear un estudiante en el arreglo estudiantes.
    const nuevoEstudiante={ // Creamos una variable
        id:estudiantes.length+1,
        nombre:req.body.nombre // En el body voy a observar como se hace la actualizacion en el postman.
    };
    estudiantes.push(nuevoEstudiante); // Estamos agregando un nuevo estudiante en mi arreglo estudiantes. Push (Agregar)
    res.status(201).json(nuevoEstudiante); // 
})


//metodo put
app.put('/estudiantes/:id',(req, res)=>{//define la ruta put que permite actualizar un estudiante con su req y res
    const id=parseInt(req, params.id);//define la variable id para hacer la busqueda y localizar lo que se busca
    const estudiante=estudiantes.find(e=>e.id==id)//busca si el id esta en la lista de estudiantes
    if(estudiante){
        estudiante.name=req.body.nombre;//ve si se enconttro un estudiante 
        res.json(estudiante);
    }else{
        res.status(404).send('estudiante no encontrado')//si no encuentra estudiante mandara esta linea 
    }
} )

//delete: eliminar un item por id

app.delete('/estudiante/:id',(req,res)=>{//define una ruta que permite borrar un estudiante por su id 
    const id=parseint(req.params.id);//define la variable id para eliminar al estudiante 
    const index=estudiantes.findindex(e=>e.id===id);//busca si el id esta en la lista de estudiantes 
    if(index!==-1){
        estudiantes.splice(index,1)//elimina al estudiante 
        res.send('estudiante eliminado');//notifica que el estudiante se elimino
    }else{
        res.status(404).send('estudiante no encontrado')//si no encuentra estudiante mandara esta linea 
    }
})