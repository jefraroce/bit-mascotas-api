// Express es el marco de trabajo, que nos permite comunicarnos via HTTP
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Mongoose es una libreria que me permite comunicarme con un servidor de MongoDB
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Creamos conexión con el servidor de MongoDB
mongoose.connect('mongodb://localhost:27017/mascotas', {useNewUrlParser: true, useUnifiedTopology: true})

// Definimos el modelo para interactuar con una colección "perros"
const Perro = mongoose.model('perros', { nombre: String, raza: String, edad: Number, comeCarne: Boolean })

// Arquitectura REST

// Consultar
app.get('/perros', (request, response) => {
  Perro.find((error, datos) => {
    console.error('error ', error)
    response.send(datos)
  })
})

// Consultar Perro Por ID
app.get('/perros/:id', (request, response) => {
  Perro.findById(request.params.id, (error, perroEncontrado) => {
    console.error('error ', error)
    response.send(perroEncontrado)
  })
})

// Registar
app.post('/perros', (request, response) => {
  const nuevoPerrito = new Perro(request.body)
  nuevoPerrito.save((error, nuevoPerro) => {
    console.error('error ', error)
    response.send(nuevoPerro)
  })
})

// Actualizar
app.put('/perros/:id', (request, response) => {
  Perro.updateOne({ _id: request.params.id }, request.body, (error, perroActualizado) => {
    if (error) {
      response.status(500).send(error)
    } else {
      response.send('¡El perro ha sido actualizado!')
    }
  })
})

// Eliminar
app.delete('/perros/:id', (request, response) => {
  response.send('Perro eliminado')
})

app.listen(5000)
