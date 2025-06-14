const usuario = require('../models/users.js');

exports.createUser = async (req, res) => {
    try {
        const newUser = new usuario(req.body);
        const userSaved = await newUser.save();
        res.status(201).json({
            message: 'Usuario creado con éxito',
            user: userSaved,
        });
        
    }catch (error) {
        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await usuario.find();
        res.status(200).json({
            message: 'Usuarios obtenidos con éxito',
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await usuario.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            message: 'Usuario obtenido con éxito',
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el usuario',
            error: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userUpdated = await usuario.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!userUpdated) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            message: 'Usuario actualizado con éxito',
            user: userUpdated,
        });
    }catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userDeleted = await usuario.findByIdAndDelete(req.params.id);
        if (!userDeleted) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            user: userDeleted,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el usuario',
            error: error.message,
        });
    }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo
    const user = await usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Comparar contraseña directamente (solo para pruebas)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Éxito
    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

