
// const fruits = 'Apple'

// const fruits = ['Apple', 'Pear', 'Banana']

// console.log(fruits.length)
// console.log(fruits[fruits.length - 1])


// let userName = 'nika'
// let userName2 = userName
// userName2 = 'giorgi'

// console.log(userName)

// let arr1 = [1,2,3]
// let arr2 = arr1
// arr2[0] = 99

// console.log(arr1)


//split() string => array
//join() array => string
// const todos = []
// const res = todos.join('')
// console.log(res)

// const arr = fruits.slice(-1)
// console.log(arr, "arr")
// console.log(fruits, "fruits")


// fruits.push('Pear', 'second', 'third')
// fruits.pop()
// fruits.pop()

// fruits.unshift('Watermelon')
// // O(1)
// fruits.shift()


// for(let i = 0; i < fruits.length; i++){
//     console.log(fruits[i])
// }



// const nums = [10, 20, 15, 18]
// // 10, 20, 18

// const deletedArr = nums.splice(2, 2,'nika', 'nika' )
// console.log(nums, "nums")
// console.log(deletedArr, "deletedArr")

// const nums = [-50, -150, -12, -11]
// find min number

// function test(...args){
//     console.log(args, "args")
//     // for()
// }

// test([1,2,3])

// const max = Math.max([1,2,3,4,5])
// console.log(max)
// let max = nums[0]

// for(let i = 1; i < nums.length; i++){
//     if(nums[i] > max){
//         max = nums[i]
//     }
// }

// console.log(max) //[1,..., 10]



// const arr = ['test', 10, '20', true, undefined, [1], {}, () => {}, 50]
// const numsArr = []
// // 10, 50

// const nums = ['test', 'test2', 'test3']

// for(let item of arr){
//     if(typeof item === 'number'){
//         numsArr.push(item)
//     }
// }

// console.log(numsArr)

const nums = [12, 11, 12, 25, 24, 22, 11, 25]
const unique = []
let totalUniqueNumsSum = 0

for(let i = 0; i < nums.length; i++){
    if(!unique.includes(nums[i])){
        unique.push(nums[i])
        totalUniqueNumsSum += nums[i]
    }
}

// for(let i = 0; i < unique.length; i++){
//     totalUniqueNumsSum+=unique[i]
// }

console.log(totalUniqueNumsSum, "total")


// for(let num of nums){
//     if(num % 2 === 0){
//         evens.push(num)
//     }else{
//         odds.push(num)
//     }
// }

// console.log(evens, "evens")
// console.log(odds, "odds")
// const unique = [] // 10, 12, 11, 9, 8

// const unq = Array.from(new Set(nums))
// console.log(unq)

// for(let i = 0; i < nums.length; i++){
//     if(!unique.includes(nums[i])){
//         unique.push(nums[i])
//     }
// }

// console.log(unique)
