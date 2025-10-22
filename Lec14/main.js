#!/usr/bin/env node

import { Command } from 'commander'
import { readFile, writeFile } from './utils.js'

const program = new Command()

program
    .name('Movie Cli')
    .description('Simple movie CLI tools')
    .version('1.0.0')

program
    .command('show')
    .option('-r, --random', 'return random movie')
    .option('-s, --sort <sort>', 'return sorted movies by rating', '')
    .option('-p, --page <page>', 'describe page', '1')
    .option('-t, --take <take>', 'describe take', '10')
    .description('This returns list of movies')
    .action(async (opts) => {
        const movies = await readFile('movies.json', true)
        if(opts.random){
            const random = Math.floor(Math.random() * movies.length)
            console.log(movies[random])
            return
        }
        if(opts.sort){
            if(opts.sort === 'asc'){
                movies.sort((a,b) => a.rating - b.rating)
            }else{
                movies.sort((a,b) => b.rating - a.rating)
            }
        }
        const page = Number(opts.page)
        const take = Math.min(Number(opts.take), 10)
        console.log(movies.slice((page - 1) * take, take * page))
    })

program
    .command('add')
    .description('This action adds new movie')
    .argument('<name>', 'movie name field')
    .argument('<genre>', 'movie genre field')
    .argument('<rating>', 'movie rating field')
    .action(async (name, genre, rating) => {
        const movies = await readFile('movies.json', true)
        const lastId = movies[movies.length - 1]?.id || 0

        const newMovie = {
            id: lastId + 1,
            name,
            genre,
            rating: Number(rating)
        }
        movies.push(newMovie)
        await writeFile('movies.json', movies)

    })

program
    .command('delete')
    .description('This command deletes movie')
    .argument('<id>', 'unique movie id')
    .action(async (id) => {
        const movies = await readFile('movies.json', true)
        const index = movies.findIndex(el => el.id === Number(id))
        if (index === -1) {
            console.log("Could not deleted movie")
            return
        }
        movies.splice(index, 1)
        await writeFile('movies.json', movies)
        console.log('Deleted successfully')
    })

program
    .command('update')
    .description('this command update movie')
    .argument('<id>', 'unique movie id')
    .option('-n, --name <name>', 'name property', '')
    .option('-g, --genre <genre>', 'genre property', '')
    .option('-r, --rating <rating>', 'rating property', '')
    .action(async (id, opts) => {
        const movies = await readFile('movies.json', true)
        const index = movies.findIndex(el => el.id === Number(id))
        if (index === -1) {
            console.log("Could not update movie")
            return
        }

        const updateReq = {}
        if(opts.name){
            updateReq['name'] = opts.name
        }

        if(opts.rating){
            updateReq['rating'] = Number(opts.rating)
        }

        if(opts.genre){
            updateReq['genre'] = opts.genre
        }

        movies[index] = {
            ...movies[index],
            ...updateReq
        }

        await writeFile('movies.json', movies)
        console.log("Updated successfully", movies[index])
    })

program
    .command('price')
    .argument('<symbol>', 'Crytpo alias')
    .action(async (symbol) => {
        const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
        const data = await resp.json()

        console.log({price: data[symbol]['usd']})
    })

program.parse()