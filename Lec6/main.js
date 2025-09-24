
// console.log(1)

// setTimeout(() => {
//     for(let i = 0; i < 10000000000; i++){}
// })

// console.log(2)

const promise = new Promise((res) => {
    console.log(4)
    res()
})

console.log(1)

// Promise.resolve().then(() => {
//     for (let i = 0; i < 10000000000; i++) { }
//     console.log(3)
// })
promise.then((res) => {
    for(let i = 0; i < 10000000000; i++){}
    console.log("rame")
})
console.log(2)

// 1 2 3


// function a(n){
//     if(n === 0) return
//     console.log(n)
//     a(n - 1)
// }

// a(5) // 5,4,3,2,1

// function factorial(n){
//     if(n === 1 || n === 0) return 1
//     return factorial(n - 1) * n
// }

// console.log(factorial(5)) // 120


// function getUser(callBack){
//     setTimeout(() => {
//         console.log('user')
//         callBack()
//     }, 2000)
// }

// function log1(){
//     console.log(1)
// }

// getUser(log1)


// function calculator(x, y, cb){
//     return cb(x,y)
// }

// function add(a,b){
//     return a + b
// }

// function sub(a,b){
//     return a - b
// }

// console.log(calculator(10, 20, add))
// console.log(calculator(40, 20, sub))


// [].filter((el) => el % 2)

// function filter(arr, cb){
//     const result = []
//     for(let item of arr){
//         if(cb(item)){
//             result.push(item)
//         }
//     }

//     return result
// }

// console.log(filter(['test', 'test1', 'test123'], (el) => el.length > 4))

// let count = 0
// let interval

// interval = setInterval(() => {
//     count++
//     console.log(count)

//     if (count === 5) {
//         clearInterval(interval)
//     }
// }, 1000)

// console.log(1)


// for(let i = 0; i < 10000000000; i++){}

// console.log(3)



const myPromise = new Promise((resolve, reject) => {
    const success = true
    if (success) {
        resolve('success')
    } else {
        reject('error')
    }
})

// console.log(1)

// myPromise.then((res) => console.log(res)).catch(e => console.log(e))

// console.log(2)

// async function test(){
//     console.log(1)
//     const res = await myPromise
//     console.log(res)
//     console.log(2)
// }

// test()


async function foo() {
    return new Promise((res) => {
        res(2)
    })
}

// async function main(){
//     const res = await foo()
//     console.log(res)
//     console.log(1)
// }

// foo().then(res => console.log(res))

// console.log(1)

