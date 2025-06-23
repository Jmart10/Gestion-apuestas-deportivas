// Verificar Token
 const jwt = require('jsonwebtoken');
 const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log('Token recibido:', token);
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Aquí podrías agregar la lógica para verificar el token, por ejemplo, usando JWT
    // Si el token es válido, llama a next(), de lo contrario, responde con un error

    try {
        // Simulación de verificación de token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}
module.exports = verifyToken;