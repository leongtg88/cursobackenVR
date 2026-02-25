//22. Ya creado este archivo vamos a hacer un require en el folder de index.js para conectarnos a la base de datos


//24. Importar mongoose
const mongoose = require('mongoose');

//25. Crear una constante con una funcion de conexion asincorna
const connection = async()=>{
    //28. Usar un try catch para capturar errores
    try{
          //29. Hacemos un await para que espere a que se conecte a la base de datos con el metodo connect de mongoose mongodb://127.0.0.1:27017 es la direccion local de nuestro servidor de mongodb y bd-portfolio es el nombre de la base de datos a la que nos queremos conectar
        await mongoose.connect("mongodb://127.0.0.1:27017/bd-portfolio");

        //30. Si la conexion es correcta mostramos un mensaje por consola
         console.log("Conectado a la base de datos bd:portfolio" );

    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
        throw error;
    }
};
//26. Exportar la conexion
module.exports = connection;