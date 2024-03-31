import * as net from "node:net"
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { port } from "./port";
import { objectToJson } from "./helper/objetToJson";

function app(): any {
  const rl = readline.createInterface({ input, output });
  
  const socket = net.createConnection(port, "localhost", () => {
    socket.write(objectToJson({
      username: "Lauta",
      message: "na"
    }))
  })

  socket.on("data", (data) =>
    console.log(`[SERVER]: ${data.toString()}`)
  )

  console.log("Leyendo linea por linea, si quiere sali pulse CRTL-d o s")
  rl.on("line", (input) => {
    if (input === "s") {
      socket.end()
      rl.close()
      return
    }

    socket.write(JSON.stringify({
      username: "Lauta",
      message: input
    }))
  })
}

app()
