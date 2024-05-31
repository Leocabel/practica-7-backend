

// forma antigua de llamar libreria
// const express = require('express')

// forma actual con ECMAScript 6 de llamar librerias
import express from 'express'
import bodyParser from 'body-parser'
import client from './db.js'
import { ObjectId } from 'mongodb'
//import {  } from "mongodb"

const app = express()
const port = 3000


app.use(bodyParser.json())

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
app.get('/api/v1/usuarios', async (req, res) => {

    console.log(req.query)

//1 conectarnos a la base de datos
await client.connect()

// 2 seleccionar la base de datos que vamos a utilizar
const dbSampleMflix = client.db("sample_mflix")

//3 seleccionar la coleccion
const userCollection = dbSampleMflix.collection("users")

// 4 hacer la consulta (query)obtener insertar modificar datos

const userList = await userCollection.find({}).toArray()

console.log(userList)
await client.close()
console.log(userList)


    // const respuesta = {
    //     mensajne: "hola"
    // }

    // res.json(respuesta)

    res.json({
        mensaje: 'lista de usuarios',
        data: userList 
    })
})
// obtener un usuario
app.get('/api/v1/usuarios/:id', async (req, res) => {

    console.log(req.params)
    let id = req.params.id

//1 conectarnos a la base de datos
await client.connect()

// 2 seleccionar la base de datos que vamos a utilizar
const dbSampleMflix = client.db("sample_mflix")

//3 seleccionar la coleccion
const userCollection = dbSampleMflix.collection("users")

id = new ObjectId(id)

const user = await userCollection.findOne({
   _id: id 
})

await client.close()

    res.json({
        mensaje: "usuario obtenido con el id:",
        data: user
    })
})

// post: crear datos
app.post('/api/v1/usuarios', async (req, res) => {

    const userData = req.body
//1 conectarnos a la base de datos
await client.connect()

// 2 seleccionar la base de datos que vamos a utilizar
const dbSampleMflix = client.db("sample_mflix")

//3 seleccionar la coleccion
const userCollection = dbSampleMflix.collection("users")

// 4 hacer la consulta (query)obtener insertar modificar datos

//const userList = await userCollection.find({}).toArray()

await userCollection.insertOne({
     nombre: userData.nombre,
     apellido: userData.apellido,
     email: userData.email,
     edad: userData.edad
     


})
// 5 cerrar coneccion
await client.close()
    res.json({
        mensaje: 'usuario guardado'
    })
})

// put: actualizar todos los
// datos de un elemento
app.put('/api/v1/usuarios/:id', async(req, res) => {

    let id = req.params.id
    const userData = req.body

    //1 conectarnos a la base de datos
await client.connect()

// 2 seleccionar la base de datos que vamos a utilizar
const dbSampleMflix = client.db("sample_mflix")

id = new ObjectId(id)

//3 seleccionar la coleccion
const userCollection = dbSampleMflix.collection("users")

await userCollection.updateOne(
    { _id: id },
    {
        $set: {
            name: userData.name
        }
    }
)
await client.close()

    res.json({
        mensaje: `usuario con id ${id} actualizado`
    })
})

// patch: actualiza algunos campos
// de nuestro elemetno
app.patch('/api/v1/usuarios/:id', (req, res) => {

    const id = req.params.id

    res.json({
        mensaje: `edad del usuario con id ${id} actualizada`
    })
})

// delete: eliminar un elemento
app.delete('/api/v1/usuarios/:id', async(req, res) => {

    let id = req.params.id

    //1 conectarnos a la base de datos
    await client.connect()
    
    // 2 seleccionar la base de datos que vamos a utilizar
    const dbSampleMflix = client.db("sample_mflix")
    
    //3 seleccionar la coleccion
    const userCollection = dbSampleMflix.collection("users")

    id = new ObjectId(id)

    //id = new ObjectId(id)
    await userCollection.deleteOne({
         _id: id 
    })
    await client.close()
    
 


    res.json({
        mensaje: `usuario con el id ${id} eliminado`
    })
})

// Le indicamos a nuesta API que empiece a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API esta escuchando en el puerto ${port}`)
})