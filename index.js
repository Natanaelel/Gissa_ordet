let serverAdress = "1d7f4ca53b27.ngrok.io"
// serverAdress = "drawline.herokuapp.com"
const ws = new WebSocket("wss://" + serverAdress)

ws.onmessage = message => {
  msg = JSON.parse(message.data);

  console.log(msg)
  if(msg.method == "connect"){
    const name = prompt("What do you want to be called?")
    send("connect", name)
  }
  if(msg.method == "text"){
    console.log(msg.data)
  }
  if(msg.method == "points"){
    drawData(msg.data)
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