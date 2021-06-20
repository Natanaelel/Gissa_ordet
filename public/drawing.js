var heart
var input
var xmid
var ymid
var timer = 0
var gameData = {
  players: {
    id1: {
      hearts: 3,
      status: "Active"
    },
    id2: {
      hearts: 3,
      status: "Active"
    },
    id3: {
      hearts: 3,
      status: "Active"
    },
    id4: {
      hearts: 3,
      status: "Active"
    }
  },
  playerId: ["id1","id2","id3","id4"],
  timer: 10,
  round: 0,
  totalPlayers: 4
}

var temp_hearts
const playerImg = [device, kennys, simple, stefan, konfig, greta].reverse()
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
  
  fill("blue")
  background(25)
  rect(xmid, ymid, (width*height)**(1/2)/5, (width*height)**(1/2)/5)
  
  fill(0)
  textSize(128)
  textAlign(CENTER, CENTER)
  text(randomchar, width/2, height/2)

  fill(10)
  drawPlayers()
  
  fill(255)
  textAlign(LEFT, TOP)
  text(timer, 310, 10)
  drawClock()
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
    // rect(x, y, size, size)
    image(players[i], x, y, size, size)
    const playerList = Object.keys( gameData["players"] )
    for(let h=0; h < gameData["players"][playerList[i]]["hearts"]; h++){ // draw Hearts
      image(heart, x + (-20+20*h), y-150, 50, 50)
    }      
  }
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

  if(millis() > timer_) {
    timer_ ++
    timer ++
    
  }
}


function drawGuesses() {}
window.onresize = ()=>{
  resizeCanvas(windowWidth, windowHeight);
  xmid = width/2
  ymid = height/2
}