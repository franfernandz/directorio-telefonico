require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path')

const app = express();
const port = process.env.PORT || 3001 ;

//Permitir CORS
app.use(cors());

//Analizar solicitudes JSON
app.use(express.json());

//Servir archivos desde la carpeta BUILD
app.use(express.static(path.join(__dirname, 'build')));




const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


app.get('/api/telefonos', async (req, res) => {
    try {
        const query = `
            SELECT 
                t_persona.*, 
                t_areas.descripcion AS area,
                t_ubicacion.edificio AS ubicacion
            FROM dirtel.t_persona
            INNER JOIN dirtel.t_areas ON t_persona.id_area = t_areas.id_area
            INNER JOIN dirtel.t_ubicacion ON t_persona.id_ubicacion = t_ubicacion.id_ubicacion
            ORDER BY apellido ASC, nombre ASC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving contacts');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  // logs the server's port number to the console
});
