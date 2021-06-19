var heart
var input
var xmid
var ymid
var timer = 10
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
const playerImg = [device, kennys, simple, stefan, konfig, greta_].reverse()
var players = []
function preload(){
  heart = createImg('https://i.imgur.com/X81l5ZC.png', 'heart')
  heart.hide()
  for(i=0; i<playerImg.length; i++){
    players.push(createImg(playerImg[i],`player${i}`))
    players[i].hide()
  }
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
  text(timer, 10, 10)
}

function drawPlayers(){
  let currentPlayers = gameData["totalPlayers"]
  let circleRad = 225
  let circleDist = circleRad*2

  for(let i=0; i< currentPlayers; i++){ // draw Players
    let angle = (360/currentPlayers) * i
    let x = xmid + sin(angle) * circleDist
    let y = ymid + cos(angle) * circleDist
    // rect(x, y, circleRad, circleRad)
    image(players[i], x, y, circleRad, circleRad)
    const playerList = Object.keys( gameData["players"] )
    for(let h=0; h < gameData["players"][playerList[i]]["hearts"]; h++){ // draw Hearts
      image(heart, x + (-20+20*h), y-150, 50, 50)
    }      
  }
}

function drawGuesses() {}

// +(-10+10*0)
window.onresize = ()=>{
  resizeCanvas(windowWidth, windowHeight);
  xmid = width/2
  ymid = height/2
}