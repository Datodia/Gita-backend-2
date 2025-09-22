


const transactions = [
    {id: 1, currency: "USD", amount: 200},
    {id: 2, currency: "GEL", amount: 100},
    {id: 3, currency: "USD", amount: 300},
]

function groupedByCurrency(data){
    return data.reduce((prev, cur) => {
        const key = cur.currency
        if(!prev[key]){
            prev[key] = []
        }
        
        prev[key].push(cur)
        return prev
    }, {})
}

console.log(groupedByCurrency(transactions))



// const sales = [
//   { item: "Laptop", category: "Electronics", price: 1200 },
//   { item: "Phone",  category: "Electronics", price: 800 },
//   { item: "Shirt",  category: "Clothes",     price: 40  },
//   { item: "Pants",  category: "Clothes",     price: 50  }
// ]; 


// function groupedByCategory(data){
//     return data.reduce((prev, curr) => {
//         const category = curr.category
//         prev[category] = (prev[category] || 0) + curr.price
//         return prev

//     }, {})
// }
// console.log(groupedByCategory(sales))

// {"electornics": 2000, "clothes": 90}



// const students = [
//   { name: "Ana", scores: [80, 90, 100] },
//   { name: "Nika", scores: [70, 60, 75] },
//   { name: "Luka", scores: [95, 85, 90] }
// ];

// function getHighestAverageScoreStudent(data){
//     const max = {averaege: 0}
//     for(let student of data){
//         const average = student.scores.reduce((prev, cur) => prev + cur, 0) / student.scores.length
//         if(average >= max.averaege){
//             max.name = student.name
//             max.averaege = average
//         }
//     }

//     return max

// }

// console.log(getHighestAverageScoreStudent(students))


// => {name: "Luka", average: 87}

// const users = [
//     { id: 1, name: "nika nika", age: 22 },
//     { id: 2, name: "mariami", age: 23 },
//     { id: 3, name: "giorgi", age: 22 },
//     { id: 4, name: "luka", age: 24 },
// ]

// function groupedByAge(data) {
//     return data.reduce((prev, cur) => {
//         const age = cur.age
//         if (!prev[age]) {
//             prev[age] = []
//         }
//         prev[age].push(cur.name)
//         return prev
//     }, {})
// }

// console.log(groupedByAge(users))

// {22: ["nika", "giorgi"], 23: ["mariami"], 24: ["luka"]}


// function getTotalPrice(data){
//     return data.filter(el => el.price > 400).reduce((tot, cur) => tot + cur.price, 0)
// }

// console.log(getTotalPrice(products))


// const a = {
//     c: "1",
//     d: {
//         e: {
//             f: "1"
//         },
//          g: "1"
//     }
// }
// const b = {
//     c: "1",
//     d: {
//         e: {
//             f: "1"
//         },
//         g: "1"
//     }
// }

// console.log(JSON.stringify(a) === JSON.stringify(b))


// const person = {
//     name: "giorgi",
//     age: 22,
//     password: '123',
//     "last name": "giorgadze",
//     hobbies: ['sport', 'reading', 'listening'],
//     "12b": "rame",
//     sayHello(){
//         console.log("Hello wrold")
//     }
// }

// const res = ['test', 'test1', 'test2']
// const [a, ...rest] = res
// console.log(rest, "rest")

// const keys = Object.keys(person)
// const values = Object.values(person)

// const keyValue = Object.entries(person)
// for(let [key,value] of Object.entries(person)){
//     console.log(key, "key")
//     console.log(value, "value")
// }
// console.log(keyValue, 'keyValue')

// for(let key in person){
//     console.log(key, "key")
//     console.log(person[key], "value")
// }

// if('isSmoker' in person && !person.isSmoker){
//     console.log("rame")
// }



// Object.freeze(person)

// delete person.name
// console.log(person)

// const calculator = {
//     value: 0,
//     add(number){
//         this.value += number
//         return this
//     },
//     sub(number){
//         this.value -= number
//         return this
//     },
//     getValue(){
//         return this.value
//     }
// }

// const res = calculator.add(10).sub(5).getValue()
// console.log(res)


// const person2 = {
//     ...person,
//     favFoods: [],
//     name: "Mariami"
// }

// console.log(person2)

// function getUserInfo(){
//     const {password, ...rest} = person

//     return rest
// }

// console.log(getUserInfo())


// delete person.age

// person['middleName'] = 'test'
// person.sayHello()
// console.log(person)
// person.name = 'nika'

// console.log(person)


// console.log(person.age)
// console.log(person['12b'])
// console.log(person['last name'])
// console.log(person['name'])