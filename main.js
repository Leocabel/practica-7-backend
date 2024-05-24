console.log("hola mundo con node JS")

const express = require("express")
const app = express()
const port = 3000 

// con get le indicamos que nuestra APi acepta el method GET
// el primer parametro establece el path o ruta de nuestra 
// el codigo que queremos ejecutar
// el segundo parametro establece el codigo a ejecutar
// en forma de callback
// el callback recibe 2 parametros
// -req: request o peticion
// -res: response o la respuesta
app.get("/", (req, res) => {
    res.send("Hola mundo!")

})

// le indicamos a nuestra API que comience a escuchar peticiones
// en el puerto 3000 y cuando se encienda nos muestre el mensaje
// que hay en el console.log
app.listen(port, () => {
    console.log(`La API esta escuchando en el puerto ${port}`)

})