#!/usr/bin/env node

import { Command } from 'commander'


const program = new Command()


program
    .name('Test Cli')
    .description('Random info about your CLI')
    .version('1.0.0')

program
    .command('addContact')
    .argument('<num>')
    .argument('<name>')
    .option('--geo')
    .action(async (num, name, opts) => {

        const newUser = {
            name, 
            number: opts.geo ? `+995-${num}` : num
        }

        console.log(newUser)
    })


program
    .command('hello')
    .description('this command returns hello world')
    .action(() => {
        console.log(`Hello world`)
    })    

program
    .command('sum')
    .argument('<num1>')
    .argument('<num2>')
    .action((num1, num2) => {
        console.log(Number(num1) + Number(num2))
    })

program
    .command('add-phone')
    .argument('<name>')
    .option('-s, --stock <stock>', 'this is stock', 10)
    .action((name, opts) => {
        console.log(name, "name")
        console.log(opts, "opts")
    })



program.parse()





// import { sub, sum } from "./utils.js";
// import mimateba from "./utils/sum.js";
// import chalk from 'chalk';
// import nodeFetch from 'node-fetch'



// console.log(mimateba(10, 25))
// console.log(sub(40, 20))

// nodeFetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(data => console.log('data', data)) 

// console.log(chalk.blue('hello world'))
// console.log(chalk.yellow('hello world'))
// console.log(chalk.red('hello world'))
// console.log(chalk.bgBlue('hello world'))