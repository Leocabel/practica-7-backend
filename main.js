

// forma antigua de llamar libreria
// const express = require('express')

// forma actual con ECMAScript 6 de llamar librerias
import express from 'express'


const app = express()
const port = 3000

// ---------------- Endpoint -------------------
// con 'get' le indicamos que nuestra API acepta
// el method GET.
// El primer parametro establece el path (ruta) del
// codigo que queremos ejecutar
// El segundo parametro establece el codigo a ejecutar
// en forma de callback
// - el callback recibe 2 parametros:
// - req: request o la peticion
// - res: response o la respuesta
app.get('/api/v1/usuarios', (req, res) => {
    // const respuesta = {
    //     mensaje: "hola"
    // }

    // res.json(respuesta)

    res.json({
        mensaje: 'lista de usuarios',
    })
})

app.get('/api/v1/usuarios/:cedula', (req, res) => {

    console.log(req.params)
    const cedula = req.params.cedula

    res.json({
        mensaje: `usuario obtenido con la cedula: ${cedula}`
    })
})

// post: crear datos
app.post('/api/v1/usuarios', (req, res) => {

    res.json({
        mensaje: 'usuario guardado'
    })
})

// put: actualizar todos los
// datos de un elemento
app.put('/api/v1/usuarios/:cedula', (req, res) => {

    const cedula = req.params.cedula

    res.json({
        mensaje: `usuario con cedula ${cedula} actualizado`
    })
})

// patch: actualiza algunos campos
// de nuestro elemetno
app.patch('/api/v1/usuarios/:cedula', (req, res) => {

    const cedula = req.params.cedula

    res.json({
        mensaje: `edad del usuario con cedula ${cedula} actualizada`
    })
})

// delete: eliminar un elemento
app.delete('/api/v1/usuarios/:cedula', (req, res) => {

    const cedula = req.params.cedula

    res.json({
        mensaje: `usuario con cedula ${cedula} eliminado`
    })
})

// Le indicamos a nuesta API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API esta escuchando en el puerto ${port}`)
})