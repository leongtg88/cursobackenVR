//37.Cargar express y el router
const express = require("express");
const router = express.Router();

//38. importar el controlador
const ProjectController = require("../controllers/project.js");

//73 Configurar las rutas con Multer: vamos hacer la funcionalidad de subir archivos a nuestro backend
const multer = require("multer");
// 74 la siguiente variable se crea con un metodo de MUlter que es diskStorage que tiene 2 propiedades, destination y filename. req, file, cb()que es un metodo  que tiene el primer parametro null y el siguiente es un destino que guarde (ahi se guardan las imagenes que suba) se debe crear en este paso la carpeta upload/images. En file lleva el null, el nombre del archivo y se le concatena con la fecha y el nombre original del archivo.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, "project-" + Date.now() + "-" + file.originalname);
  },
});

//75 con esta constante se termina de configurar Multer donde ya sabe donde va a guardar los archivos, y esto se convierte en um Midelware que se ejecuta antes de los controladores
const upload = multer({ storage });

//------------------------------AQUI VAN LAS RUTAS--------------------------------
//39. Definir las rutas
router.post("/save", ProjectController.save); //ruta para guardar un proyecto, usamos el metodo post porque vamos a enviar datos al servidor. Esta tiene dos parametros, el primero es la ruta "/save" y el segundo es la accion del controlador que se va a ejecutar cuando se acceda a esta ruta, en este caso la accion save del ProjectController
//64 creamos otra ruta que va sacar datos del servidor, por tanto va a ser un get, o puede ingresar por un cliente rest etc
router.get("/projects", ProjectController.projects);

//65
router.get("/item/:id", ProjectController.item);
//70 Ruta del delete
router.delete("/delete/:id", ProjectController.deleteProject);
//72 Ruta de Update
router.put("/update/:id", ProjectController.update);
//76 Ruta de Multer ---- paso antes o despues de este es crear la accion del controlador
router.put("/upload/:id", upload.single("file0"), ProjectController.upload);

//40. Exportar las rutas
module.exports = router;

//vamos al paso 50 en el archivo index.js para cargar las rutas en el servidor
