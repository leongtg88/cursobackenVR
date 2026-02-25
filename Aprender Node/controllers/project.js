// 34.El controlador se encarga de gestionar las peticiones y respuestas, tiene una seria de acciones, validar datos, devolver objetos o un html, recibir datos del usuario y devolverlos. Cada controlador seran mini acciones. Debemos importar el modelo para poder usarlo en las acciones.

const Project = require("../models/projects.js");

//35.Crear el objeto del controlador con sus acciones,el siguente se llama save, con req y res, cada una de las acciones tendra una solicitud y una respuesta tendra, la req sera lo que mande el usario a traves de la api y res sera la respuesta que tendra el metodo.

const save = (req, res) => {
  //53 tenemos nuestro metodo save que esta vinculado a nuestra ruta en el folder rutas/project.js, pasamos y aqui creamos una constante body donde recibimos los datos que nos envia el usuario por el body de la peticion. Podemos ver estos datos en postman en la pestaña body seleccionando la opcion raw y json y enviando un objeto json con los datos del proyecto que queremos guardar en la base de datos.
  let body = req.body;

  //54 validar datos: comprobar que llegan los datos obligatorios haciendo una validacion sencilla si no llegan devolvemos un error 400 bad request, en el return usamos res.status(400) para indicar el codigo de estado http 400 bad request y con .send enviamos un objeto json con el mensaje de error y dentro del objeto indicamos que es un error y el mensaje correspondiente.
  if (!body.name || !body.description || !body.state) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // 55 crear objeto a guardar creamos una nueva instancia del modelo Project y le pasamos el body que contiene los datos del proyecto que queremos guardar en la base de datos.
  let projectToSave = new Project(body);

  //56guardar el objeto en la base de datos
  projectToSave
    .save()
    .then((project) => {
      //59 Validar que el proyecto se haya guardado correctamente
      if (!project) {
        return res.status(400).send({
          status: "error",
          message: "No se pudo crear el proyecto",
        });
      }

      //58 Si todo va bien, devolver respuesta exitosa
      return res.status(201).send({
        status: "success",
        message: "Proyecto guardado correctamente",
        project,
      });
    })
    .catch((error) => {
      //57 Log del error para debugging y devolver respuesta de error
      console.error("Error al guardar:", error);
      return res.status(500).send({
        status: "error",
        message: "Error al guardar el proyecto",
        error: error.message,
      });
    });
};

//------------60 Creacion de nueva ruta------- Esta ruta es para otra tarea, queremos hacer una accion especifica para buscar los proyectos y devolverlos
const projects = (req, res) => {
  // 61 lo que me permite esta funcion es llamar, hacer un select en la base de datos, sacar un listado de cosas dependiedno  de lo que coloque en las llaves o cualquier condicion que quiera
  Project.find()
    .then((projects) => {
      if (!projects) {
        return res.status(404).send({
          status: "error",
          message: "No hay proyectos para mostrar",
        });
      }

      //62 si todo esto anterior esta bien hacemos un return 200
      return res.status(200).send({
        status: "success",
        projects,
      });
    })
    .catch((error) => {
      console.error("Error al guardar:", error);
      return res.status(500).send({
        status: "error",
        message: "Error al listar los proyectos",
        error: error.message,
      });
    });
};

//65 Ya hemos visto como crear una ruta para enlistar todos los proyectos que tenemos en la aplicacion, pero ahora quiero hacer una accion especifica para sacar un solo proyecto especifico
const item = (req, res) => {
  let id = req.params.id;
  //66 hago un console log y creo una ruta en el folder de rutas
  console.log(id);
  //67 con la siguiente estructura en tonces se puede buscar el proyecto deseado
  Project.findById(id)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          status: "error",
          message: "No se encontró el proyecto",
        });
      }

      return res.status(200).send({
        status: "success",
        project,
      });
    })
    .catch((error) => {
      console.error("Error al buscar proyecto:", error);
      return res.status(500).send({
        status: "error",
        message: "Error al obtener el proyecto",
        error: error.message,
      });
    });
};

//68 Ahora vamos a hacer la accion para borrar un elemento, lo cual es muy parecido a los pasos anteriores
const deleteProject = (req, res) => {
  let id = req.params.id;
  Project.findByIdAndDelete(id)
    //69 Se usa el metodo deleteOne y luego hacemos la ruta
    .deleteOne()
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          status: "error",
          message: "No se encontró el proyecto",
        });
      }

      return res.status(200).send({
        status: "success",
        project,
      });
    })
    .catch((error) => {
      console.error("Error al buscar proyecto:", error);
      return res.status(500).send({
        status: "error",
        message: "Error al eliminar el proyecto",
        error: error.message,
      });
    });
};

//71 Ahora vamos a actualizar una accion
const update = (req, res) => {
  //73 debemos sacar los datos que llegan de la petcion, comprobat si no estan vacios y luego ejecutar un metodo findbyidAndupdate para actualizar en base al id del objeto

  const id = req.params.id; // tomar id de la URL
  const updateData = req.body; // campos a actualizar

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).send({
      status: "error",
      message: "No has enviado datos para actualizar",
    });
  }
  Project.findByIdAndUpdate(id, updateData, { new: true })
    .then((projectUpdate) => {
      if (!projectUpdate) {
        return res.status(404).send({
          status: "error",
          message: "No se ha encontrado ningún proyecto con ese id",
        });
      }

      return res.status(200).send({
        status: "success",
        project: projectUpdate,
      });
    })
    .catch((error) => {
      console.error("Error al actualizar:", error);
      return res.status(500).send({
        status: "error",
        message: "Error al actualizar el proyecto",
        error: error.message,
      });
    });
};
//77 Con esto podemos definir que es lo que vamos a hacer con la imgen que recibimos
const upload = (req, res) => {
  return res.status(200).send({
    status: "succes",
    message: "metodo de subida",
    file: req.file,
  });
};

//36.De esta manera temos un metodo save que devuelve un mensaje de prueba. Ahora debemos exportar el controlador para poder usarlo en las rutas. Esto lo hacemos haciendo un lo siguiente:

module.exports = {
  save,
  //63 devuelvo mi accion para poder usarla en mi fichero de rutas pasamos al punto 64 en el archivo de rutas
  projects,
  item,
  deleteProject,
  update,
  upload,
};
//37.Con esto ya tenemos el controlador listo para ser usado en las rutas. Dentro de la carpeta de rutas, crearemos un archivo llamado porject.js donde definieremos las rutas para los proyectos.

//notas Qué hace: comprueba que haya datos para actualizar antes de llamar a la BD. Si no hay, devuelve un 400 (Bad Request).
// Desglose:
// updateData = req.body → datos enviados por el cliente.
// !updateData → true si req.body es null/undefined.
// Object.keys(updateData).length === 0 → true si req.body es un objeto vacío ({}).
// Si alguna condición es cierta, se responde con status 400 y un JSON con el error.
// Por qué es importante: evita intentar actualizar con datos vacíos y protege la lógica del servidor (no hacer findByIdAndUpdate con datos inválidos).
// Qué revisar si falla:
// Asegúrate de tener app.use(express.json()) en index.js.
// En Postman envía raw → JSON y el header Content-Type: application/json.
// Mejora opcional (ejemplo más explícito):
// const updateData = req.body;
// if (!updateData || Object.keys(updateData).length === 0) {
//   return res.status(400).send({ status: "error", message: "No has enviado datos para actualizar" });
// }
