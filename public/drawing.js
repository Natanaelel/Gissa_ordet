var heart
var input
function preload(){
  heart = createImg('https://i.imgur.com/X81l5ZC.png','heart')
  heart.hide()
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('canvas')
  canvas.style("display","block")
  imageMode(CENTER)
}

function draw(){
  fill("blue")
  background(200,200,200)
  circle(width/2,height/2,(width*height)**(1/2)/5)
  fill("black")
  textSize(128)
  textAlign(CENTER,CENTER)
  text(randomchar,width/2,height/2)
  fill("blue")


}

function drawPlayers(){
  for(let i=0; i<players["players"].length; i++){ // draw Players
    circle(width/2,height-height/5,(width*height)**(1/2)/7)
    for(let i=0 i<players["hearts"] i++){ // draw Hearts
      image(heart, width/2, (height-height/5)+((width*height)**(1/2)/7), 50, 50)
    }
  }
}

window.onresize = ()=>resizeCanvas(windowWidth, windowHeight)
