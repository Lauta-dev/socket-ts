import { createServer } from "node:net"
import { objectToJson } from "./helper/objetToJson"
import { jsonToObject } from "./helper/jsonToObject"
import { Data } from "./interface/Message"
import { port } from "./port"

const USERS_BANED = ["mauro"]

const server = createServer(c => {
  c.on("data", (data) => {
    const { username, message }: Data = jsonToObject(data.toString())

    if (message.length === 2)
      return c.write(objectToJson({ message: "No podes agregar caracteres vacios" }))

    if (USERS_BANED.includes(username.toLowerCase()))
      return c.write(objectToJson({ message: "Esta baneado", baned: true }))

    console.log(`[${username}]: ${message}`)
    c.write(`Hola ${username}, mensaje recibido`)

    c.on("end", () => console.log(`El usuario: ${username} dejo el chat`))
  })
})

server.on("error", error => console.error(error))
server.on("close", () => console.log("El servidor cerro"))
server.on("connection", (socket) => {
  let msg = "[CONNECT] El usuario se conecto"
  socket.on("data", (c) => msg = c.toString())
  console.log(msg)
})

server.listen(port, () => console.log(`Server on port: ${port}`))
