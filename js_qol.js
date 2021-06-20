Object.defineProperty(Number.prototype,"chr",{get:function(){return(String.fromCharCode(this))}}) // ascii char from code
Object.defineProperty(Number.prototype,"s",{get:function(){return(this.toString())}}) // string
Object.defineProperty(Number.prototype,"digits",{get:function(){return(this.toString().match(/\d/g).map(c=>parseInt(c)).reverse())}}) // array of digits

Object.defineProperty(Number.prototype,"abs",{get:function(){return(Math.abs(this))}}) // absolute value

Object.defineProperty(Number.prototype,"fl",{get:function(){return(Math.floor(this))}}) // floor
Object.defineProperty(Number.prototype,"ce",{get:function(){return(Math.ceil(this))}}) // ceil
Object.defineProperty(Number.prototype,"rd",{get:function(){return(Math.round(this))}}) // round
Object.defineProperty(Number.prototype,"i",{get:function(){return(parseInt(this))}}) // int

Object.defineProperty(Number.prototype,"bin",{get:function(){return(this.toString(2))}}) // binary string
Object.defineProperty(Number.prototype,"oct",{get:function(){return(this.toString(8))}}) // octal string
Object.defineProperty(Number.prototype,"hex",{get:function(){return(this.toString(16))}}) // hexadecimal string -> "ffaa90"
Object.defineProperty(Number.prototype,"Hex",{get:function(){return(this.toString(16).toUpperCase())}}) //hexadecimal string -> "FFAA90"

Object.defineProperty(Number.prototype,"prime",{
    get:function(){
        if(this <= 1){return(false)}
        if(this == 2){return(true)}
        for(let i = Math.ceil(Math.sqrt(this)); i > 1; i--){
            if(this%i==0)return(false)
        }
        return(true)
    }
}) // check if number is prime


Object.defineProperty(Array.prototype,"sum",{get:function(){if(this.every(e=>e+0==e)){return(this.reduce((a,b)=>a+b,0))};return(this.join("").split("").map(c=>c.charCodeAt()).reduce((a,b)=>a+b,0))}})
Object.defineProperty(Array.prototype,"prc",{get:function(){return(this.reduce((a,b)=>a*b))}})

Object.defineProperty(Array.prototype,"avg",{get:function(){return(this.reduce((a,b)=>a+b,0)/this.length)}})
Object.defineProperty(Array.prototype,"med",{get:function(){arr=this.sort([(a,b)=>a-b,a=>a][this.some(e=>e+0!=e)]);return([(arr[arr.length/2-1]+arr[arr.length/2])/2,arr[Math.floor(arr.length/2)]][arr.length%2])}})

Object.defineProperty(Array.prototype,"first",{get:function(){return(this[0])}})
Object.defineProperty(Array.prototype,"last",{get:function(){return(this[this.length-1])}})


Object.defineProperty(Array.prototype,"max",{get:function(){return(this.reduce((a,b)=>Math.max(a,b)))}})
Object.defineProperty(Array.prototype,"min",{get:function(){return(this.reduce((a,b)=>Math.min(a,b)))}})


Object.defineProperty(Array.prototype,"sample",{get:function(){return(this[Math.floor(Math.random()*this.length)])}})


Array.prototype.count=function(func=x=>x){
    let count = 0
    for(let element of [...this]){
        if(func(element))count++
    }
    return(count)
}

Array.prototype.sort_by=function(func=x=>x){return([...this].sort((a,b)=>func(a)-func(b)))}

Array.prototype.each_slice=function(len){let ans=[];for(let i=0;i<this.length;i+=len){ans.push(this.slice(i,i+len))};return(ans)}

Array.prototype.rotate = function (len) {
    len = (len%this.length+this.length)%this.length
    return this.slice(len).concat(this.slice(0,len))
}


Object.defineProperty(Array.prototype,"uniq",{
    get:function(){
        let arr = []
        this.forEach(e => {
            if(!arr.includes(e)){
                arr.push(e)
            }
        });
        return(arr)
    }
})


Array.prototype.min_by=function(func=x=>x){
    let min = this[0]
    let minval = func(this[0])
    this.slice(1).forEach(e=>{
        let val = func(e)
        if(val < minval){
            min = e
            minval = val
        }
    })
    return(min)
}

Array.prototype.max_by=function(func=x=>x){
    let max = this[0]
    let maxval = func(this[0])
    this.slice(1).forEach(e=>{
        let val = func(e)
        if(val > maxval){
            max = e
            maxval = val
        }
    })
    return(max)
}
Object.defineProperty(Array.prototype,"chr",{get:function(){return(this.map(c=>String.fromCharCode(c)))}})
Object.defineProperty(Array.prototype,"s",{get:function(){return(this.map(c=>String.fromCharCode(c)).join(""))}})

Object.defineProperty(Array.prototype,"i",{get:function(){return(this.map(e=>parseInt(e)))}})
Object.defineProperty(Array.prototype,"f",{get:function(){return(this.map(e=>parseFloat(e)))}})




Object.defineProperty(String.prototype,"sum",{get:function(){return(this.split("").map(c=>c.charCodeAt()).reduce((a,b)=>a+b,0))}}) // sum of ascii codes
Object.defineProperty(String.prototype,"chars",{get:function(){return(this.split(""))}}) // array with every char
Object.defineProperty(String.prototype,"ord",{get:function(){return(this.charCodeAt())}}) // ascii code of first char

Object.defineProperty(String.prototype,"i",{get:function(){return(parseInt(this))}}) // int
Object.defineProperty(String.prototype,"f",{get:function(){return(parseFloat(this))}}) // float

Object.defineProperty(String.prototype,"fl",{get:function(){return(Math-floor(parseFloat(this)))}}) // floor
Object.defineProperty(String.prototype,"ce",{get:function(){return(Math.ceil(parseFloat(this)))}}) // ceil

Object.defineProperty(String.prototype,"bin",{get:function(){return(Math.ceil(parseInt(this,2)))}}) // binary string to decimal
Object.defineProperty(String.prototype,"oct",{get:function(){return(Math.ceil(parseInt(this,8)))}}) // octal string to decimal
Object.defineProperty(String.prototype,"hex",{get:function(){return(Math.ceil(parseInt(this,16)))}}) // hex string to decimal



Object.defineProperty(String.prototype,"reverse",{get:function(){return(this.split("").reverse().join(""))}}) // reverse string

String.prototype.rotate = function (len) {// rotates string
  len = (len%this.length+this.length)%this.length
  return this.slice(len).concat(this.slice(0,len))
}



String.prototype.tr = function(rep, sub=""){return(this.split("").map(c=>rep.includes(c)?sub[Math.min(rep.indexOf(c),sub.length-1)]:c).join(""))} // string translate

Object.defineProperty(String.prototype,"bytes",{get:function(){return(this.split("").map(c=>c.charCodeAt()))}}) // array of ascii codes

Object.defineProperty(String.prototype,"squeeze",{get:function(){return(this.replace(/(.)\1+/g, m=>m[0]))}}) // string with consecutive identical chars reduced to one

Object.defineProperty(String.prototype,"ucase",{get:function(){return(this.replace(/./g, m=>m.toUpperCase()))}}) // uppercase string
Object.defineProperty(String.prototype,"dcase",{get:function(){return(this.replace(/./g, m=>m.toLowerCase()))}}) // lowercase string
Object.defineProperty(String.prototype,"swcase",{get:function(){return(this.replace(/./g, m=>m==m.toUpperCase()?m.toLowerCase():m.toUpperCase()))}}) // swapcase string


Object.defineProperty(String.prototype,"esc",{get:function(){return(this.replace(/[\.\\\/\+\*\?\!\[\]\(\)\{\}]/g,"\\"+"$&"))}}) // escape regex special chars
Object.defineProperty(String.prototype,"unesc",{get:function(){return(this.replace(/\\(.)/g,"$1"))}}) // unescape all backslashes


Object.defineProperty(String.prototype,"log",{get:function(){console.log(this.valueOf());return(this.valueOf())}})
Object.defineProperty(Array.prototype,"log",{get:function(){console.log(this.valueOf());return(this.valueOf())}})
Object.defineProperty(Number.prototype,"log",{get:function(){console.log(this.valueOf());return(this.valueOf())}})