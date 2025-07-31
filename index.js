const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conexión con Railway con tus datos reales
const db = mysql.createConnection({
  host: 'tramway.proxy.rlwy.net',
  user: 'root',
  password: 'aKBpRQTCnVnkNJXfIXUYvdRFDtTpyAoE',
  database: 'railway',
  port: 58229
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Base de datos conectada');
});

app.post('/registro', (req, res) => {
  const { nombre, correo } = req.body;
  const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(query, [nombre, correo], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Usuario registrado');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
