//. Importaciones


//27. Acciones
    const register = (req, res) => {
        return res.status(200).json({
            status: 200,
            message: "Acción para registrar usuario"
    });
    }
    
    const login = (req, res) => {
        return res.status(200).json({
            status:200,
            message: "Acción para identificar el usuario"
        });
    }

      const profile = (req, res) => {
        return res.status(200).json({
            status:200,
            message: "Acción para ver los datos del perfil de un usuario"
        });
    }

      const update = (req, res) => {
        return res.status(200).json({
            status:200,
            message: "Acción para editar y actualizar  los datos de un usuario "
        });
    }

      const upload = (req, res) => {
        return res.status(200).json({
            status:200,
            message: "Acción para subir avatar o imagen de usuario"
        });
    }

      const avatar = (req, res) => {
        return res.status(200).json({
            status:200,
            message: "Acción para sacar la imagen de avatar del usuario"
        });
    }



// 29.Exportaciones
module.exports = {
    register,
    login,
    profile,
    update,
    upload,
    avatar
}