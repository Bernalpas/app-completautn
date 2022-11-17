const express = require('express');
const app = express();
const mysql = require('mysql2');
//Motor de plantilla
const hbs = require('hbs');
//Encontrar archivos
const path = require('path');
//Para enviar mails
const nodemailer = require('nodemailer');
//Variables de entorno
require('dotenv').config();

//Configuramos el Puerto
const PORT = process.env.PORT || 9000; 

//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Configuramos el motor de plantillas de HBS
app.set('view engine', 'hbs');
//Configuramos la ubicación de las plantillas
app.set('views', path.join(__dirname, 'views'));
//Configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Conexión a la Base de Datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) =>{
    if(err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`);
})

//Rutas de la Aplicación
app.get('/', (req, res) => {
    res.send('Bienvenido a la App Completa');
})


//Servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el Puerto: ${PORT}`);
})












