var heart
var input
var xmid
var ymid

var timer = 0
var hint
var gameData
var gameActive = false

var guesses = []

var temp_hearts
const playerImg = [device, kennys, simple, stefan, konfig, greta, putin]
var players = []

getID = id => document.getElementById(id)
var input = getID("word")
var form = getID("loginform")
var logo = getID("logoimage")

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
  input.style.display = "none"
}

function draw(){
  if (!gameActive)return
  background(25)
  fill("#080")

  rect(xmid, ymid, (width*height)**(1/2)/5, (width*height)**(1/2)/5)

  fill(0)
  textSize(128)
  textAlign(CENTER, CENTER)
  text(gameData?.hint || "", width/2, height/2)

  fill(10)
  drawPlayers()
  
  fill(255)
  textAlign(LEFT, TOP)
  //text(timer, 310, 10)
  
  drawClock()
}


function drawPlayers(){
  imageMode(CENTER)
  angleMode(DEGREES)
  rectMode(CENTER)
  let currentPlayers = Object.keys(gameData?.players||[]).length
  let size = ymid/3
  let circleDist = size*2

  for(let i=0; i< currentPlayers; i++){ // draw Players
    let angle = (360/currentPlayers) * i
    let x = xmid + sin(angle) * circleDist
    let y = ymid + cos(angle) * circleDist

    fill("#414042")
    circle(x, y, size*1.5)
    fill("#231F20")
    rect(x, y, size, size)

    image(players[i], x, y, size, size)

    fill(255)
    textSize(25)
    let playerList = gameData.players
    let player = playerList[i]
    text(player.name, x, y-size/1.65, size, size)
    text(player.points, x, y+size/1.65, size, size)

    for(let h=0; h < 3; h++){ // draw Hearts
      image(heart, x + (-20+20*h), y-size/1.5+size, 50, 50)
    }
    if(guesses.length) drawGuess();
  }
}

function drawGuess(){ return

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

window.onresize = ()=>{
  setTimeout(()=>{
    resizeCanvas(windowWidth, windowHeight);
    xmid = width/2
    ymid = height/2
  }, 10)
}

function submit(player_guess){
    guesses.push(player_guess)
    send("playerGuess", player_guess)
}

input.addEventListener("keyup",e=>{
    if (e.keyCode == 13) {
        e.preventDefault()
        submit(input.value)
        input.value = null
    }
})

function formSubmit(){
  let menu = getID("menu")
  let game = getID("game")

  menu.style.display = "none"
  game.style.display = "block"

  form.style.display = "none"
  input.style.display = "block"
  logo.style.display = "none"
  gameActive = true
  loginform = index => getID("loginform").elements[index].value
  let name = loginform(0).slice(0,1000) || unnamed()
  let room_id = loginform(1).slice(0,1000)
  send("connect", {
    name: name,
    room_id: room_id
})
}