// HOF
// push, pop, shift, unshift, splice
// const arr = [14, 10, 15, 44, 62, 33, 12]
// const arr2 = arr.filter((el) => {
//     if(el % 3 === 0 && el % 2 === 0){
//         return el
//     }
// })

// const arr2 = arr.filter(el => el % 3 === 0)


// const fruis = ['Pear', "Banana", "apple", "watermelon"]
// const fruitsWithSmallNames = fruis.filter(el => el.length > 4)
// console.log(fruitsWithSmallNames)

// const nums = [1,2,3,4]
// const doubleNum = nums.map(el => el * 2)

// const names = ['test', 'tes', 'te']
// // const namesWithCapitalLetters = names.map(el => el.slice(0, el.length - 1) + el[el.length - 1].toUpperCase())
// const namesWithCapitalLetters = names.map(el => {
//     return el.slice(0, el.length - 1) + el[el.length - 1].toUpperCase()
// })
// console.log(namesWithCapitalLetters)

// const names = ['giorgi', 'nika', 'davit', 'nika']
// const nums = [11, 14, 15, 18, 20]
// const arr2 = nums.filter(el => el % 2 === 0)
// const arr3 = nums.map(el => {
//     if(el % 2 === 0){
//         return el
//     }else{
//         return 'Odd'
//     }
// })
// console.log(arr2, "arr2")
// console.log(arr3, "arr3")
// const evenNum = nums.find((el) => el % 2 === 0)
// console.log(evenNum)
//Create, Read, Update, Detele
// const names = ['giorgi', 'nika', 'davit', 'nika']
// const longNames = []
// const shortNames = []
// const uniqueNames = []
// names.forEach(el => {
//     if(!uniqueNames.includes(el)){
//         uniqueNames.push(el)
//     }
//     if(el.length > 4){
//         longNames.push(el)
//         console.log(el, "Lengh is more than 4")
//     }
//     if(el.length < 5){
//         shortNames.push(el)
//     }
// })

// console.log(longNames,"longNames")
// console.log(uniqueNames,"uniqueNames")
// console.log(shortNames,"shortNames")

// const nikasIndex = names.findIndex((el) => el === 'nika')

// // names.splice(nikasIndex, 1)
// // console.log(names[nikasIndex])
// console.log(names, "names")
// console.log(nikasIndex, "nikaIndes")
const names = [1,2,3,4,5,6]
// const isAllEvenNums = names.some((el) => el % 2 === 0)
// console.log(isAllEvenNums)
const user = {
    name: "giorgi",
    age: 21,
    isMerried: false,
    sayHello(){
        console.log("hello")
    }
}

// const colors = ['a', 'blue', 'g', 'ab', 'e', 'd', 'red']
// const numbers = [22, 1, 102, 33, 55, 123]

// // colors.sort() do not recomend
// numbers.sort((a, b) => b - a)

// console.log(numbers, "numbers")

// {red: 3, blue: 1, green: 2, purple: 1}

// const result = colors.reduce((prev, curr) => {
//     if(!prev[curr]){
//         // {red: 1}
//         prev[curr] = 1
//     }else{
//         // {red: 2}
//         prev[curr] += 1
//     }

//     return prev
// }, {})
// console.log(result)

// const result = names.reduce((prevVal, currentVal) => {
//     console.log(prevVal + currentVal)
//     return prevVal + currentVal
// }, 0)


// function getDouble(nums){
//     if(!Array.isArray(nums)) nums = [nums]

//     return nums.map(el => el * 2)
// }

// const doubles = getDouble(2)
// console.log(doubles, "doubles")

// const a = [1, 2, [3, [4, [5, 6]], 7], [8], [9,[10]]] 
// log total sum of this array using reduce
// console.dir(a.flat(Number.MAX_SAFE_INTEGER).reduce((prev, cur) => prev + cur, 0), {depth: null})



// const nums = [-20,14,-4,11,12,-2]
// // return total sum of positive ones
// const sum = nums.filter(el => el > 0).reduce((prev, cur) => prev + cur, 0)
// console.log(sum, "sum")

// const res1 = nums.filter(el => el % 3 === 0).map(el => el * 2).reduce((prev, cur) => prev + cur, 0)


// console.log(res1, "res1")

//input ["apple","banana","apple","orange","banana","apple"] => 
// { apple: 3, banana: 2, orange: 1 }


const fruits = ["apple","banana","apple","orange","banana","apple"]

const result = fruits.reduce((prev, cur) => {
    if(!prev[cur]){
        prev[cur] = 1
    }else{
        prev[cur] += 1 
    }
    return prev
}, {})

console.log(result)