const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config()


// Configuración de la conexión a la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
};

// Leer el archivo createDbConfig
const createDbConfig = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'create_database.sql'), 'utf8');

// Crear la conexión
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }

    console.log('Conectado a la base de datos.');

    // Ejecutar el script createDbConfig
    connection.query(createDbConfig, (err, results) => {
        if (err) {
            console.error('Error ejecutando el script SQL createDbConfig:', err.stack);
        } 
        console.log('Base de datos configurada y lista.');

    });
});


module.exports = connection;