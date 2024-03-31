import * as net from "node:net"
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { objectToJson } from "./helper/objetToJson";
import { port } from "./port";
import { jsonToObject } from "./helper/jsonToObject";

function app() {
  const rl = readline.createInterface({ input, output });

  const socket = net.createConnection(port)

  socket.on("data", (data) => {
    const message = jsonToObject(data.toString())
    console.log(`[SERVER]: ${message.message}`)
    if (message.baned) {
      socket.end()
      rl.close()
      return
    }
    })

  console.log("Leyendo linea por linea, si quiere sali pulse CRTL-d o s")
  rl.on("line", (input) => {
    if (input === "s") {
      socket.end()
      rl.close()
      return
    }

    socket.write(objectToJson({
      username: "Mauro",
      message: input
    }))
  })
}

app()
