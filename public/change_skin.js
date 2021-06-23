current_skin = 0
// playerImg

function plusDivs(arg=0){
    getID("skinchoice").selectedIndex = current_skin+1
    current_skin += arg
    current_skin %= playerImg.length
    if (current_skin < 0) current_skin = playerImg.length-1
    for(let i = 0; i < playerImg.length; i++){
        if (i == current_skin){
            getID(i).style.display = "block"
        } else {
            getID(i).style.display = "none"
        }
    }
}

function changeSkin(){
    current_skin = getID("skinchoice").value-1
    plusDivs()
}
