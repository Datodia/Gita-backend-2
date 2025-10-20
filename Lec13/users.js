#!/usr/bin/env node

import { Command } from 'commander'
import readFile from './utils/readFile.js'
import writeFile from './utils/writeFile.js'


const program = new Command()


program
    .name('Users Cli')
    .description('Random Users CRUD')
    .version('1.0.0')


program
    .command('show')
    .option('-s --smoker <smoker>', 'smoker filters only smoker users')
    .action(async (opts) => {
        const users = await readFile('users.json', true)

        if (opts.hasOwnProperty('smoker') && opts.smoker === 'false') {
            console.log(users.filter(el => !el.isSmoker))
            return
        }

        if (opts.smoker) {
            console.log(users.filter(el => el.isSmoker))
            return
        }

        console.log(users)
    })

program
    .command('getById')
    .argument('<id>')
    .action(async (id) => {
        const userId = Number(id)
        const users = await readFile('users.json', true)

        const user = users.find(el => el.id === userId)
        if (!user) {
            console.log('user not found')
            return
        }
        console.log(user)
    })

program
    .command('addUser')
    .argument('<name>')
    .argument('<age>')
    .argument('<isSmoker>')
    .action(async (name, age, isSmoker) => {
        const users = await readFile('users.json',true)
        const lastId = users[users.length - 1]?.id || 0
        const newUser = {
            id: lastId + 1,
            name,
            age: Number(age), 
            isSmoker: Boolean(isSmoker)
        }
        users.push(newUser)
        await writeFile('users.json', users)
    })

program.parse()
