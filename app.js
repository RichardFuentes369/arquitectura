const express = require('express')

require('dotenv').config();

const routes = require('./routes/pqrs.route');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT

// Usa las rutas
app.use('/', routes);

// Inicia el servidor
app.listen(port, () => {

  console.log(`
    Servidor corriendo en 
    http://localhost:${port}
  `);

});