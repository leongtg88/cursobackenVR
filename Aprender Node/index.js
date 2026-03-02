//Creando mi primer servidor con NodeJS


//12. Importar dependencias
const connection = require ('./database/connection.js'); // c 23. tercera linea, importamos la conexion a la base de datos del archivo connection.js que creamos en la carpeta database 
const express = require('express');                      // a esta será la primera linea del codigo.
const cors = require('cors');                            // b  segunda linea,  este paquete permite que cualquier cliente pueda consumir nuestra API, esto va a funcionar como un middleware, se va a ejecutar antes de que se ejecuten las rutas


//Conexion a la base de datos  
        // 20 . Para conectarnos a la base de datos, primero debemos arrancar nuestro servidor de MongoDB, de esa manera nos  conectamos a la base de datos que tenemos corriendo en segundo plano. Para eso abrimos cmd nuevo y nos vamos a la carpeta donde tenemos instalado Program Files/MongoDB/Server/8.2/bin y ejecutamos el comando    mongod.exe --dbpath "C:/data/db"   esto inicia el servidor de MongoDB. Luego volvemos a la terminal donde tenemos nuestro proyecto y ejecutamos npm start para iniciar el servidor de Node, y en este paso se va a conectar a la base de datos. Estos dos pasos son necesarios para que la conexion a la base de datos funcione correctamente.
        //21. Para terminar de conectarnos a la base de datos, nos vamos a la carpeta de database y creamos/abrimos el archivo connection.js, la secuencia de la numeracion continua ahi...verems el paso 22 en el archivo connection.js y el paso 23 aqui en index.js


//27. Ejecutar la conexion a la base de datos que realizamos en el paso 29  ------------------Paso 30 Creacion de archivo projects.js en la carpeta models-----------------
connection();


//13.Crear el servidor
const app = express(); // con esto se crea el servidor
const port = 3977;     //aqui definimos el puerto en el que va a correr nuestro puerto de nuestro backend


//14.Configurar el cors
app.use(cors()); //este middleware se va aplicar a toda ruta que se cree en el servidor


//15.Convertir los datos del body a objetos
app.use(express.json());    //con esto convertimos los datos que nos lleguen en el body a objetos json, este nos permite analizar las solicitudes que nos lleguen en formato json, por post  o put
app.use(express.urlencoded({extended:true})); //nos va a permitir a acceder a los datos en el body de las peticiones que nos lleguen por post o put, si nos envian datos desde un formulario, nos va a permitir convertir esos datos en un objeto accesible desde req.body


// 50.Cargar rutas
const projectRoutes = require ("./rutas/project.js"); 

//51. Usar las rutas
app.use('/api/project', projectRoutes); //con esto le decimos que todas las rutas que empiecen por /api/project usen las rutas definidas en el archivo project.js de la carpeta rutas.

//52. Llegado a este paso, podemos probar las rutas que hemos creado en postman haciendo peticiones a la ruta localhost:3977/api/project/save con el metodo post, esto nos devolvera el mensaje de prueba que hemos definido en el folder de controllers project.js


// 17.Crear endpoints de prueba .Para crear rutas puedo hacer app.get, app.post, app.put, app.delete dependiendo del tipo de peticion que quiera hacer. En el primer parametro va la ruta y en el segundo una funcion callback que recibe dos parametros req y res. La req es la peticion que nos llega del cliente y res es la respuesta que le vamos a dar al cliente


app.get("/", (req, res)=>{    //19.creamos un endpoint principal en la raiz "/" del servidor, es decir localhost:3977/

    console.log("Se ha ejecutado el endpoint principal"); //estpa linea se va a ver en la consola del servidor, no por la del navegador

    return res.status(200).json([          //20. luego con esto devolvemos una respuesta al cliente, usamos res.status para definir el codigo de estado http, en este caso 200 que signifca que todo ha esta bien y  luego con .json enviamios un json como respuesta. //21 estos datos estan dentro de un array de objetos 
        {
        curso:"Master en css3 avanzado",
        url:"victorroblesweb.es",
        profe: "Victor Robles"
    },
    {    
        curso:"Master en css3 avanzado",
        url:"victorroblesweb.es",
        profe: "Victor Robles"
    }
]);
    
    
});

app.get("/pruebitas", (req, res)=>{

console.log("Se ha ejecutado mi endpoint de prueba");
                                                            //18.en el metodo send podemos enviar texto plano, html, json, etc
    return res.status(200).send(`        
        <section>
            <h1>Estoy aprendiendo Node</h1>
            <h2>con mi profe Victor</h2>
            <p>Esto es una prueba de una ruta</p>
        </section>
    `);  // 18. ya con esto podemos escribir en el navegador localhost:3977/pruebitas y ver el resultado

});



//16.Poner a escuchar el servidor  //usamos el metodo listen para poner a escuchar el servidor en un puerto concreto, podemos pasarle una funcion callback que se va a ejecutar cuando el servidor este corriendo
//ya en este paso se debe ejecutar npm start para iniciar el servidor con nodemon, en este no se va a poder hacer nada mas que iniciar el servidor
app.listen(port, ()=>{
console.log("Servidor esta corriendo correctamente en el puerto " + port);
});
    
