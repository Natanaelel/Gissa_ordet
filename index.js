require("./js_qol.js")

const fs = require("fs")

const express = require("express")
const http = require("http")
const websocketServer = require("websocket").server

const app = express()


const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))

app.listen(port, () => console.log("App listening on "+port))



const ServerPort = 3030

const httpServer = http.createServer();

httpServer.listen(ServerPort, () => console.log("Server listening on "+ServerPort));


const wsServer = new websocketServer({
  "httpServer": httpServer
})



const swedishWords = JSON.parse(fs.readFileSync("./words.json"))
console.log(swedishWords)

var rooms = {}

var clients = {}


// "start server"

wsServer.on("request", request => {
  //on connect
  const connection = request.accept(null, request.orgin)
  const client = new Client(connection, "none", guid(), "none")

  console.log("New connection")
  console.log(client)

  clients[client.id] = client

  // console.log(clients)

  connection.on("open", () => console.log("opened"))
  connection.on("close", (req, res) => {
    console.log(`${client.name} (${client.id}) disconnected`)

    console.log(clients)

    let room = rooms[client.room_id]
    if(room){
      room.broadcast("text", `${client.name} disconnected!`, [client.id])
      room.leave(client)
    }

    delete(clients[client.id])
  })
  // message handling
  connection.on("message", msg => {
    // console.log(msg)
    handleMessage(client, JSON.parse(msg.utf8Data))
  })


  send(connection, "connect", null)

})

// message handling
function handleMessage(client, msg){
  console.log(msg)
  const method = msg.method
  const data = msg.data

  if(method == "connect"){
    /*
    {
      method: "connect"
      data: {
        name: "example_name"
        room: "room_id"
      }
    */
    client.name = data.name
    client.room_id = data.room_id
    joinRoom(client, data.room_id)
    // broadcast("text", `${client.name} connected`, client.id)
    send(client.connection, "gameData", getGameData(client))
    return
  }
  if(method == "serverEval"){
    try{
      let result = eval(data)
      console.log(result)
      send(client.connection, "evalResult", result || "empty string")
    }catch(err){
      console.error("%cERROR","background:#f00;color:#000")
      console.error(err)
      send(client.connection, "evalResult", "Fatal error lol noob")
    }
  }

  if(method == "playerGuess"){
    let playerRoom = rooms[client.room_id]
    playerRoom.game.guess(client, data)
  }
  if(method == "startGame"){
    rooms[client.room_id].game.startGame()
  }

}

function getGameData(client){
  let room = rooms[client.room_id]
  let gameData = room.game.getGameData()
  return(gameData)
}

function send(connection, method, data){
  const payLoad = {
    "method": method,
    "data": data
  }
  connection.send(JSON.stringify(payLoad))
}
function broadcast(method, data, senderId){
  for(key in clients){
    if(senderId == key)continue
    send(clients[key], method, data)
  }
}

function joinRoom(client, room_id){
  console.log(`%cTrying to join room %c${room_id}`,"color:#fa0", "color:#fff")

  if(!rooms[room_id]){
    console.log("created a new Room")
    room = new Room(room_id)
    rooms[room_id] = room
  }else{
    console.log("joined existing room")
  }
  rooms[room.id].join(client)
  
  console.log("%cJoined!","color:#5f5")
  console.log(rooms[room_id])
}





function guid(){
  const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1)
  return((S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase())
}




class Client{
  constructor(connection, name, id, room_id){
    this.connection = connection
    this.name = name
    this.id = id
    this.room_id = room_id
  }
}

class Room{
  constructor(id){
    this.clients = {}
    this.id = id
    // this.game = new Game(hintLength, roundTime (millis))
    this.game = new Game(2, 10000)
    this.game.broadcast = (method, data)=>{
      this.broadcast(method, data, [])
    }
  }
  broadcast(method, data, ignore){
    for(let client_id in this.clients){
      if(ignore.includes(client_id))continue

      let client = this.clients[client_id]
      let connection = client.connection

      console.log(client)

      console.log(`sending ${method} to %c${client.name}`, "color:#fff")
      try{
      send(connection, method, data)

      console.log(`sent ${method} to %c${client.name}`, "color:#fff")
      }catch(err){
        console.error(err)

      }
    }
    console.log(`send ${method} to `)
  }
  join(client){
    this.clients[client.id] = client
    client.room_id = this.id
    this.game.join(client)
  }
  leave(client){
    delete this.clients[client.id]
    this.game.leave(client)
  }

}

class Game{
  constructor(hintLength = 2, roundTime = 10000){
    this.players = {}
    /*
    {
      client_id: {
        client: Client,
        points: 0
        playing: true
      },
      {...},
      {...}
    }

    */


    this.hintLength = hintLength
    this.shorsestLength = 3
    this.roundTime = roundTime
    this.word = "abc"
    this.hint = "ab"
    this.timeout = null
    this.ongoing = false
    this.broadcast = ()=>{}
  }
  getGameData(){
    let data = {}
    data.players = Object.keys(this.players).map(key=>{
      let player = this.players[key]
      return {
        id: key,
        name: player.client.name,
        points: player.points,
        playing: true
      }
    })
    data.hint = this.hint
    // data.room_id = this.
    return data
  }
  guess(client, word){
    let isCorrect = this.validateGuess(word)

    console.log(`${client.name} guessed %c${word}`, "color:#fff")
    console.log(`it was ${isCorrect ? "Right" : "Wrong"}!`)
    
    let player = this.players[client.id]
    
    if(this.ongoing && isCorrect){
      player.points += 1
      console.log(`one point to %c${client.name}`, "color:#fff")

      this.broadcast("roundResult", {
        winner: player.client.name,
        score: player.points,
        exampleWord: this.word,
        players: Object.keys(this.players).map(id=>{
          return({
            id: this.players[id].client.id,
            name: this.players[id].client.name,
            points: this.players[id].points
          })
        })
      })

      this.endRound()
    }
  }
  validateGuess(word){
    if(word.includes(this.hint) && swedishWords.includes(word) && word.length >= this.shorsestLength){
      return true
    }
    return false
  }
  join(client){
    this.players[client.id] = {
      client: client,
      points: 0,
      playing: true
    }
  }
  leave(client){
    delete this.players[client.id]
  }
  startGame(){
    this.startRound()
  }
  startRound(){
    this.ongoing = true
    this.hint = this.createHint()
    console.log(`New round, hint is %c${this.hint}`, "color:#fff")
    this.timeout = setTimeout(this.noOneGuessed, this.roundTime)

    
    // this.broadcast("hint", this.hint)
    this.broadcast("gameData", this.getGameData())

  }
  noOneGuessed=()=>{
    this.broadcast("roundResult", {
      winner: null,
      score: null,
      exampleWord: this.word,
      players: Object.keys(this.players).map(id=>{
        return({
          id: this.players[id].client.id,
          name: this.players[id].client.name,
          points: this.players[id].points
        })
      })
    })
    this.endRound()
  }
  endRound(){
    console.log("Round ended")
    clearTimeout(this.timeout)
    this.ongoing = false
    this.startRound()
  }
  createHint(){
    this.word = this.selectWord()
    let randomint = Math.floor(Math.random()*(this.word.length-this.hintLength))
    let hint = this.word.slice(randomint,randomint+this.hintLength)
    return hint
  }
  selectWord(){
    this.hintLength = Math.min(this.hintLength, 8)
    let randomword = ""
    while(randomword.length <= this.hintLength){
      randomword = swedishWords.sample
    }
    return randomword
  }
}