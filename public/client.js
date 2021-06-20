let serverAdress = "585f55e08f51.ngrok.io"
// serverAdress = "drawline.herokuapp.com"
const ws = new WebSocket("wss://" + serverAdress)

ws.onmessage = message => {
    const msg = JSON.parse(message.data);
    const method = msg.method
    const data = msg.data

    console.log(msg)
    if (method == "connect") {
        const name = (prompt("What do you want to be called?") || unnamed()).slice(0,1000)
        const room = (prompt("ID of room to connect", "default") || "default").slice(0,1000)
        send("connect", {
            name: name,
            room_id: room
        })
    }
    if (method == "text") {
        console.log(msg.data)
    }
    if (method == "eval") {
        eval(data)
    }
    if (method == "gameData") {
        // updateGameData(data)
        gameData = data
    }

}

function send(method, data) {
    const payLoad = {
        "method": method,
        "data": data
    }
    if (ws.readyState == 1) {
        ws.send(JSON.stringify(payLoad))
    } else {
        console.log("disconnected form server!")
    }
}

function unnamed() {
    return "Unnamed_" + Math.floor(Math.random() * 10000).toString().padStart(4, "0")
}