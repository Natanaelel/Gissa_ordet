var heart
function preload(){
  heart = createImg('https://i.imgur.com/X81l5ZC.png')
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
  circle(width/2,height-height/5,(width*height)**(1/2)/7)

  image(heart, width/2, (height-height/5)+((width*height)**(1/2)/7), 50, 50)
}


function drawData(data){

}

window.onresize = ()=>resizeCanvas(windowWidth, windowHeight)
