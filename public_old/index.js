let serverAdress = "585f55e08f51.ngrok.io"
// serverAdress = "drawline.herokuapp.com"
const ws = new WebSocket("wss://" + serverAdress)

ws.onmessage = message => {
  msg = JSON.parse(message.data);

  console.log(msg)
  if(msg.method == "connect"){
    const name = prompt("What do you want to be called?") || unnamed()
    const room = prompt("ID of room to connect") || "default"
    send("connect", {
      name: name,
      room_id: room
    })
  }
  if(msg.method == "text"){
    console.log(msg.data)
  }
  if(msg.method == "eval"){
    eval(msg.data)
  }

}
function send(method, data){
  const payLoad = {
    "method": method,
    "data": data
  }
  if(ws.readyState==1){
    ws.send(JSON.stringify(payLoad))
  }else{
    console.log("disconnected form server!")
  }
}
function unnamed(){
  return "Unnamed_"+Math.floor(Math.random()*10000).toString().padStart(4,"0")
}