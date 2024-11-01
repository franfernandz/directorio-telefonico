import React, { useState } from 'react';
import HeaderDir from './HeaderDir';


const Admin_Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía la solicitud de inicio de sesión al servidor
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Inicio de sesión fallido');
      }

      // Redirige al usuario al panel de administración
      window.location.href = '/admin-panel';
    } catch (error) {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
  <div>
    <div className="container-fluid">
      <HeaderDir />
        <h2>Iniciar sesión</h2>
          {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Nombre de usuario:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button type="submit">Iniciar sesión</button>
            </form>
    </div>
  </div>
  );
};

export default Admin_Login;
