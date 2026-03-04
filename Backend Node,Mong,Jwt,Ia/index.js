//14.Importar dependencias
const express = require('express');
const cors = require('cors');


//19.Conectarme a la bd
const connection = require('./database/conecction');
connection();

// 20.Crear el servidor de node
const app = express();
const port = 3907;


//21. Configurar el cors
app.use(cors());

//22. Converir los datos del body a objetos de js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar configuracion de rutas



//23 Ruta de prueba
app.get("/prubitas", (req, res)=>{
return res.status(200).json({
    "titulo": "Man to the moon",
    "descripcion" : "Plicula de Jim Carrey"
})
});
//24.Poner el sevidor a escuchar peticiones http
app.listen(port, ()=> {
    console.log("Servidor de node escuchando en el puerto"+ port);
});