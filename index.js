// Requiere paquetes
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar conexión a MySQL con variables de entorno de Railway
const db = mysql.createConnection({
  host: 'tramway.proxy.rlwy.net',
  user: 'root',
  password: 'aKBpRQTCnVnkNJXfIXUYvdRFDtTpyAoE',
  database: 'railway',
  port: 58229
});

// Verificar conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos MySQL exitosa ✅');
  }
});

// Ruta POST /registro
app.post('/registro', (req, res) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ mensaje: 'Faltan datos: nombre y correo son obligatorios.' });
  }

  const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(query, [nombre, correo], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base:', err);
      return res.status(500).json({ mensaje: 'Error del servidor al registrar usuario.' });
    }
    res.status(201).json({ mensaje: 'Usuario registrado correctamente ✅' });
  });
});

// Ruta raíz para probar que el backend funciona
app.get('/', (req, res) => {
  res.send('🚀 API de Registro funcionando correctamente');
});

// Iniciar servidor en Railway (usa su variable de entorno PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
