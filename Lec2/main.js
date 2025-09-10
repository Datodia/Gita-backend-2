

// const str = "Hello world test test2 test3"

// const res = str.includes('d t')
// console.log(res, "res")

// const userName = "ramerameramerame"
// const newName = userName.replaceAll('r', "-")
// console.log(newName)



// let word = "hello world test test test"
// console.log(word.split(''))


// let userName = "Giogi"
// let userSurname = "Giorgadze"
// const spaceWord = '   word.  '

// // const fullName = userName.concat(' ', userSurname, " test")
// const fullName = `${userName} ${userSurname}`
// console.log(spaceWord.trim(), "fullNanme")


// const res = userName.slice(-5)
// const searched = userName.toLowerCase().startsWith('mo'.toLowerCase())
// console.log(searched, "searched")
// const res2 = userName[0]
// console.log(res2)

// console.log(userName.length)
// console.log(userName[userName.length - 1])

// userName[0] = 'L'

// console.log(userName)


// console.log(0.7 + 0.2)

// for(let i = 0; i < 10; i++){
//     if(i % 2 === 0 && i !== 0 && i !== 2){
//         console.log(i)
//     }
// }

let r = 3
r = r + 2
r += 2

// თუ რიცხვი იყოფა 3 ზე დალოგეთ Fizz
// თუ რიცხვი იყოფა 5 ზე დალოგეთ Buzz
// თუ რიცხვი იყოფა 3ზე და 5 ზე დალოგეთ FizzBuzz
// თუ არადა დალოგეთ რიცხვი

// for(let i = 1; i <= 100; i++){
//     if(i % 15 === 0){
//         console.log("FizzBuzz")
//     } else if(i % 3 === 0){
//         console.log('Fizz')
//     }else if(i % 5 === 0){
//         console.log('Buzz')
//     }else{
//         console.log(i)
//     }
// }

function swapCapitalLetters(str){
    let result = ''
    for(let i = 0; i < str.length; i++){
        const char = str[i]
        if(char === str[i].toUpperCase()){
            result+=char.toLowerCase()
        }else{
            result+=char.toUpperCase()
        }
    }
    return result
}
const result = swapCapitalLetters('HeLLo WoRld')
console.log(result, "result")
// hEllO wOrLD

// Find longest word in the sentneces
// function getLongestWord(str){
//     const words = str.split(' ')
//     let longestWord = words[0]
//     for(let i = 0; i < words.length; i++){
//         if(words[i].length > longestWord.length){
//             longestWord = words[i]
//         }
//     }

//     return longestWord
// }
// const res = getLongestWord('Tetri tritina tetr trtvilze trttodaggggg')
// asdasdadasda
// console.log(res)