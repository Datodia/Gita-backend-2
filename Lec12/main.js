
// console.log(__dirname, "dirName")
// console.log(__filename, "filename")

// await fs.appendFile('result.json', JSON.stringify({name: "nika"}))
// await fs.rmdir('test2')
// await fs.rename('second.txt', 'second.html')
// await fs.copyFile('second.html', path.join(__dirname, 'test', 'copy.html'))

const fs = require('fs/promises')
const path = require('path')

// function factorial(n){
//     if(n === 0 || n === 1){
//         return 1
//     }

//     return n * factorial(n - 1)
// }

// console.log(factorial(4))

async function main(filePath) {
    try {
        const dirs = await fs.readdir(filePath)
        for (let dir of dirs) {
            const fullPath = path.join(filePath, dir)
            const stat = await fs.stat(fullPath)
            if (stat.isDirectory()){
                await main(fullPath)
            }
            const ext = path.extname(fullPath)
            if (ext === '.txt') {
                await fs.unlink(fullPath)
            }
        }
    } catch (e) {
        console.log('Cound not find any file', e)
    }
}

main(__dirname)