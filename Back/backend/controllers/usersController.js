const generateToken = require('../helpers/token.js');
const usuario = require('../models/users.js');
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    try {
        const { password, ...rest} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usuario({
            ...rest,
            password: hashedPassword
        });
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

    const formattedUsers = users.map(u => ({
      id: u._id,
      name: u.name || '(Sin nombre)',
      email: u.email,
      status: u.status || 'inactive',
      createdAt: u.createdAt || new Date(),
      betsCreated: u.betsCreated ?? 0,
      avatar: u.avatar || '',
      lastPayment: u.lastPayment || null
    }));

    res.status(200).json({
      message: 'Usuarios obtenidos con éxito',
      users: formattedUsers
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los usuarios',
      error: error.message
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

        const updates = { ...req.body};

        if (updates.password === '') {
            delete updates.password;
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const userUpdated = await usuario.findByIdAndUpdate(req.params.id, updates, {
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Correo o contraseña incorrectos' });

    const token = generateToken(user);
    // Éxito
    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        email: user.email,
        rol: user.rol, 
      },
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

