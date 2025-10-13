
const fs = require('fs/promises')
// read all numbers from file calculate sum of all 
// this number and then write it into retult.txt file
// const readData = await fs.readFile('second.txt', 'utf-8')
//     const result = readData.split(' ').map(el => Number(el)).reduce((tot, cur) => tot + cur, 0)
//     await fs.writeFile('result.txt', JSON.stringify(result))
//     console.log('writed successfully')

//read text from one file 
// reverse it and write it into reverse.txt file
// const readData = await fs.readFile('test.txt', 'utf8')
//     const reversedWord = readData.trim().split('').reverse().join('')
//     await fs.writeFile('reverse.txt', reversedWord)
//     console.log('writed successfully')


// create users cli tool
// node main.js add nika 22 => should add users.json new object
// {name: nika, age: 22}
// node main.js show => users.json
// node main.js add giorgi 23
// node main.js add mamuka 34

// node main.js show => [{name: nika, age: 22}, ]
const [,,command, name, age] = process.argv
async function main() {
    const readData = await fs.readFile('users.json', 'utf8')
    const users = JSON.parse(readData)
    if(command === 'add'){
        const newUser = {
            name,
            age
        }
        users.push(newUser)
        await fs.writeFile('users.json', JSON.stringify(users))
        console.log('added successfully')
    }

    if(command === 'show'){
        console.log(users)
    }
}

main()




// console.log(2)

// async function main() {
//     // const data = await fs.readFile('test.txt', 'utf-8')
//     // console.log(data, "data")
//     const readData = await fs.readFile('users.json', 'utf8')

//     const parsedData = JSON.parse(readData)
//     const result = parsedData.filter(el => el.age >=25)
//     console.log(result)
// }

// main()

// fs.readFile('test.txt', 'utf8').then(res => console.log(res))

// console.log(1)
// const data = fs.readFileSync('test.txt', 'utf8')
// console.log(data, "data")
// fs.readFile('test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(data, "readData")
//     fs.readFile('second.txt', 'utf-8', (err, data) => {
//         if (err) {
//             console.log(err)
//             return
//         }

//         console.log(data, "readData 2")
//     })
// })


// const [, , operation, num1, num2] = process.argv

// if(operation === 'add'){
//     console.log(Number(num1) + Number(num2))
// }

// if(operation === 'sub'){
//     console.log(Number(num1) - Number(num2))
// }

// process.on('exit', () => {
//     console.log("finish job")
// })

// console.log(1)

// process.exit(1)

// setTimeout(() => {
//     console.log(2)
// }, 1000)

// console.log(3)


