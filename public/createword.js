var randomword
var randomchar
var word_length = 3
function createWords(word_length = 2 ){
    let randomword = ""
    while(randomword.length <= word_length){
        randomword = words[Math.floor(Math.random()*words.length)]
    }
    return randomword
}
function createChars(word_length = 2, randomword){
    let randomchar
    randomint = Math.floor(Math.random()*(randomword.length-word_length))
    randomchar = randomword.slice(randomint,randomint+word_length)
    return randomchar
}
randomword = createWords(word_length)
randomchar = createChars(word_length, randomword)