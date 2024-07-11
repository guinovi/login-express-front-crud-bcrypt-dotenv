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

// Crear la conexión
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }

    console.log('Conectado a la base de datos.');
});

module.exports = connection;
