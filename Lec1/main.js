
// var, let, const

// console.log(userName1)
var userName1 = 'Giorgi'
userName1 = "Nika"


let userName = "Giorgi"
const userAge = 20
userName = "Nika"

const isSmoker = false

let userLastName = null

let user

if(userAge >= 21){
    const userName = "giorgi"
    console.log(userName, "inside of block")
}else if(userName === "giorgi"){
   console.log("else") 
}


const members = 15
const girls = "10" //number
const boys = 10 //string

// ===

if(girls === boys){
    console.log("sheva?")
}

// if((members > 10 || boys > 4) && girls > 8){
//     console.log("shemovida")
// }


// for(let i = 0; i < 10; i++){
//     console.log('hello')
// }

// let num = 0;
// while(num < 100){
//     console.log("hello")
//     num++
// }


// main2()
// main()

// function main(){
//     console.log(1, this)
// }

// const main2 = () => {
//     console.log(2, this)
// }

// main2()
// const main3 = function(){
//     console.log(3)
// }


// main3()



function greeting(userName){
    console.log('Hello ' + userName)
} 

greeting('nika')
greeting('giorgi')


function sum(a,b){
    return a + b
}

function a(){
    b()
    console.log(1)
}

function b(){
    c()
    console.log(2)
}
function c(){
    console.log(3)
}
// 1,2,3
// 1
// 3,2,1
a()

// const resp = sum(10, 20)
// console.log(resp)


function test(){
    test()
}
test()