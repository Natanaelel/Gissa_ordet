var heart
var input
var xmid
var ymid
var game = "off"
var timer = 0
var gameData = {
  players: {
    id1: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id2: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id3: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id4: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id5: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id6: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    },
    id7: {
      name: "tempname",
      hearts: 3,
      status: "Active"
    }
  },
  timer: 10,
  round: 0,
  totalPlayers: 7,
  roundTime: 10
}

var temp_hearts
const playerImg = [device, kennys, simple, stefan, konfig, greta, putin]
var players = []
function preload(){
  heart = createImg('https://i.imgur.com/X81l5ZC.png', 'heart')
  heart.hide()

  for(i=0; i<playerImg.length; i++){
    players.push(createImg(playerImg[i],`player${i}`))
    players[i].hide()
  }

  clock = createImg(clockImg, "clock")
  clock.hide()
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('canvas')
  canvas.style("display", "block")
  imageMode(CENTER)
  angleMode(DEGREES)
  rectMode(CENTER)
  xmid = width/2
  ymid = height/2
  timeNow = 1000
  
}

function draw(){
  background(25)
  if (game == "off"){
    menu()
  }

  else{
  fill("#1E3C00")
  let size = 128*1.5
  rect(xmid, ymid, size, size)
  
  fill(0)
  textSize(128)
  textAlign(CENTER, CENTER)
  text(randomchar, width/2, height/2)

  fill(10)
  drawPlayers()
  
  fill(255)
  textAlign(LEFT, TOP)
  //text(timer, 310, 10)
  
  drawClock()
  }
}

function drawPlayers(){
  imageMode(CENTER)
  angleMode(DEGREES)
  rectMode(CENTER)
  let currentPlayers = gameData["totalPlayers"]
  let size = ymid/3
  let circleDist = size*2

  for(let i=0; i< currentPlayers; i++){ // draw Players
    let angle = (360/currentPlayers) * i
    let x = xmid + sin(angle) * circleDist
    let y = ymid + cos(angle) * circleDist
    const playerList = Object.keys( gameData["players"] )
    fill("#414042")
    circle(x, y, size*1.5)
    fill("#231F20")
    rect(x, y, size, size)
    image(players[i], x, y, size, size)
    fill(255)
    textSize(25) 
    text(gameData["players"][playerList[i]]["name"], x, y-size/1.65, size, size)
    
    for(let h=0; h < gameData["players"][playerList[i]]["hearts"]; h++){ // draw Hearts
      image(heart, x + (-20+20*h), y+size/1.65, 50, 50)
    }      
  }
}

var button
function menu(){
  //Button
  if (!button){
  button = createButton("Ready")
  button.position(width/2, height/2)
  button.size(width/4, height/10)
  button.mousePressed(changeBG)
  }
}
function changeBG(){
  game = "on"
  button.remove()

}

var timer_ = 0
function drawClock(){
  let angle = (360/1000) * timer
  let size = 210
  let cx = size/2+20
  let cy = size/2+20
  let len = size/3
  let x = (cx + cos(angle-90) * len)
  let y = (cy + sin(angle-90) * len)

  fill(255)
  circle(cx, cy, size)
  image(clock, cx, cy, size, size)
  strokeWeight(8)
  line(cx, cy, x, y)

}


window.onresize = ()=>{
  setTimeout(()=>{
    resizeCanvas(windowWidth, windowHeight);
    xmid = width/2
    ymid = height/2
  }, 1)

}