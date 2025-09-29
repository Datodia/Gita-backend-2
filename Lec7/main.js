

// const promise1 = new Promise((resolve, reject) => {
//     const success = false
//     if (success) {
//         resolve('Resoled successfully')
//     } else {
//         reject('Rejected successfully')
//     }
// })

// console.log(1)

// promise1
//     .then(res => console.log(res))
//     .catch(e => console.log(e))
//     .finally(() => {
//         console.log("finally")
//     })

// console.log(2)

// async function main(){
//     try{
//         console.log(1)
//         const res = await promise1
//         console.log(res)
//         console.log(2)
//     }catch(e){
//         console.log(e)
//     }finally{
//         console.log('finally')
//     }
// }

// main()

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(5)
//     }, 4000)
// })

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(10)
//     }, 3000)
// })

// async function main() {
//     try {
//         console.time()
//         const promise1 = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(5)
//             }, 4000)
//         })
//         // const res1 = await promise1
//         // console.log(res1)
//         const promise2 = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 reject('error')
//             }, 3000)
//         })
//         // const res2 = await promise2
//         // console.log(res2)
//         const res1 = await Promise.allSettled([promise1, promise2])
//         console.log(res1)
//         console.timeEnd()
//     } catch (e) {
//         console.log(e)
//     }
// }

// main()

// Promise.all([pmise1, prmise2]).then(([res1, res2]) => {
//     res1, res2
// })



// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })

// console.log("test")
async function main(){
    console.time()
    const res = await Promise.allSettled([
        fetch('https://catfact.ninja/fact'),
        fetch('https://catfact.ninj/fact'),
        fetch('https://catfact.ninja/fact'),
        fetch('https://catfact.ninja/fact'),
        fetch('https://catfact.ninja/fact'),
        fetch('https://catfact.ninja/fact'),
    ])
    const success = res.filter(el => el.status === 'fulfilled').map(el => el.value.json())
    const result = await Promise.all(success)
    result.forEach(el => console.log(el))
    console.log(success, "success")
    // const resp = await fetch('https://catfact.ninja/fact')
    // const resp1= await fetch('https://catfact.ninja/fact')
    // const resp2 = await fetch('https://catfact.ninja/fact')
    // const resp3 = await fetch('https://catfact.ninja/fact')
    // const resp4 = await fetch('https://catfact.ninja/fact')
    // const resp5 = await fetch('https://catfact.ninja/fact')
    console.timeEnd()
}

main()