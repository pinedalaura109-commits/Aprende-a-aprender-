/**
 * Servidor Principal de la Aplicación - Aprende a Aprender
 * Desarrollado para el proyecto SENA (Análisis y Desarrollo de Software)
 */

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '241225', // Contraseña de tu usuario root de MySQL
    database: 'aprende_a_aprender_db'
});

db.connect((error) => {
    if (error) {
        console.error('Error al conectar con la base de datos MySQL:', error);
        return;
    }
    console.log('¡Conexión exitosa a la base de datos MySQL!');
});

// Endpoint de Registro
app.post('/api/registro', (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ 
            exito: false, 
            mensaje: 'Todos los campos son obligatorios.' 
        });
    }

    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    
    db.query(query, [nombre, email, password], (error, resultados) => {
        if (error) {
            console.error("Error detallado en el registro (MySQL):", error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ 
                    exito: false, 
                    mensaje: 'El correo electrónico ya se encuentra registrado.' 
                });
            }
            return res.status(500).json({ 
                exito: false, 
                mensaje: 'Error en el servidor al registrar el usuario.',
                detalles: error.message 
            });
        }

        res.status(201).json({
            exito: true,
            mensaje: '¡Registro exitoso en MySQL!',
            idUsuario: resultados.insertId
        });
    });
});

// Endpoint de Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            exito: false, 
            mensaje: 'Debe ingresar el correo y la contraseña.' 
        });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (error, resultados) => {
        if (error) {
            console.error("Error detallado en el login (MySQL):", error);
            return res.status(500).json({ 
                exito: false, 
                mensaje: 'Error interno en el servidor.',
                detalles: error.message 
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ 
                exito: false, 
                mensaje: 'Correo o contraseña incorrectos.' 
            });
        }

        const usuario = resultados[0];
        res.status(200).json({
            exito: true,
            mensaje: 'Autenticación satisfactoria',
            usuario: {
                id: usuario.id_usuarios,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});