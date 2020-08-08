const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// hablitar cors
app.use(cors());

// Habilitar exoress.json
app.use(express.json({ extended: true }))

// creo un puerto de la app
const PORT = process.env.PORT || 4000;


// importar rutas
app.use('/api/usuarios', require('./router/usuarios'));
app.use('/api/auth', require('./router/auth'));
app.use('/api/proyectos', require('./router/proyectos'));
app.use('/api/tareas', require('./router/tareas'));

// Definir la pagina principal para probar
// app.get('/', (req, res)=>{
//     res.send('hola mundo');
// });


// Arranco el app
app.listen(PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})

// /OMciCaQU5UwtRRs8

