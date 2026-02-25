//30. En este paso ya tenemos el servidor funcionando y la conexion a la base de datos, ahora vamos a crear el modelo de datos para los proyectos que vamos a guardar en la base de datos. Para ello creamos un archivo llamado projects.js en la carpeta models. Si salimos y entramos al programa MongoDB compass aun no se ve la base de datos del proyecto de portfolio, es que nuestra base de datos en el archivo connection.js que se llama bd-portfolio aun no tiene ninguna coleccion ni ningun documento, para que se cree la base de datos tenemos que crear un modelo de datos y guardar algun documento en la coleccion de proyectos. Vamos a crear el modelo de datos en este archivo projects.js. Losr achivos dentro del folder models son una capa que va a conectar nuestro proyecto con la base de datos mongodb, estos modelos van a definir la estructura de los documentos que vamos a guardar en la base de datos. Cada modelo va a tener un esquema que va a definir los campos que va a tener cada documento y el tipo de dato de cada campo. Vamos a crear el modelo de datos para los proyectos.

//Como ya sabemos un objeto puede representar un elemento de la vida real, del proyecto etc, en este caso vamos a crear un modelo de datos para los proyectos que vamos a guardar en la base de datos. Cada proyecto va a tener los siguientes campos:
//name: nombre del proyecto (String)
//description: descripcion del proyecto (String)
//state: estado del proyecto (String)
//image: imagen del proyecto (String)
//create_at: fecha de creacion del proyecto (Date)

// 31 importar la libreria de mongoose, odm (Object Data Modeling) que nos permite interactuar con mongodb desde nodejs. Schema nos permite definir la estructura de los documentos y model nos permite crear el modelo a partir del esquema definido.
const  {Schema, model} = require("mongoose");

//32 crear esquema (estructura de cada documento de tipo poyecto ) Mongoose usa esquemas para definir la estructura de los documentos en una coleccion de mongodb, en su documentacion podemos ver todos los tipos de datos que podemos usar en un esquema de mongoose https://mongoosejs.com/docs/schematypes.html, si buscas la parte de validation en la documentacion de mongoose veras todas las validaciones que podemos usar en los esquemas de mongoose. A partir de la version 6 de mongoogse no es necesario definir el new Schema, pero es buena practica hacerlo para tener el control total del esquema.

const ProjectSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type:String,
        default: "default.png"
    },
    create_at: {
        type: Date,
        default : Date.now
    }   
})
// crear el modelo, indocarle la conexion donde se van a guardar los documentos

//exportar el modelo, indicarle la coleccion donde se van a guardar los docs

//33. exportar el modelo ,  para exportar hacemos un module.exports y usamos el metodo model de mongoose, este metodo recibe tres parametros, el primero es el nombre del modelo en singular con la primera letra en mayuscula(este lo puedo usar fuera del propio modelo en algun nuevo protyecto, le colocare new Project ), el segundo es el esquema que hemos creado y el tercero es el nombre de la coleccion en plural donde se van a guardar los documentos de este modelo. Si la coleccion no existe mongoose la crea automaticamente al guardar el primer documento.

module.exports = model("Project", ProjectSchema, "projects");


//Nota a traves de este modelo ya podemos crear, leer, actualizar y eliminar documentos de la coleccion projects en la base de datos bd-portfolio que hemos creado en el archivo connection.js. Para ello usaremos los metodos que nos proporciona mongoose para interactuar con la base de datos a traves de este modelo. Veremos como hacerlo en los siguientes pasos.