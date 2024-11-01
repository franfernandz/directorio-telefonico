const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(express.json());

const users = JSON.parse(fs.readFileSync('users.json'));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario por nombre de usuario
  const user = users.find(user => user.username === username);

  // Verificar credenciales
  if (user && user.password === password) {
    // Generar token de sesión
    const token = jwt.sign({ username: user.username }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

app.get('/api/data', verifyToken, (req, res) => {
  // Ruta protegida: solo se puede acceder si el token es válido
  res.json({ data: 'Información protegida' });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de sesión' });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token de sesión no válido' });
    }
    req.username = decoded.username;
    next();
  });
}

app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
