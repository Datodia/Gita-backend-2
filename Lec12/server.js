

const http = require('http')
const url = require('url')

const users = [
    { id: 1, name: "giorgi", age: 22 },
    { id: 2, name: "NIka", age: 25 },
]

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    if (req.method === 'GET' && parsedUrl.path === '/') {
        res.writeHead(200, { "content-type": 'text/html' })
        return res.end('Home Page')
    }

    if (req.method === 'GET' && parsedUrl.path === '/users') {
        res.writeHead(200, { "content-type": 'application/json' })
        return res.end(JSON.stringify(users))
    }

    if (req.method === 'GET' && parsedUrl.path === '/random') {
        res.writeHead(200, { 'content-type': 'application/json' })
        const random = Math.floor(Math.random() * 100)
        return res.end(JSON.stringify({ random }))
    }

    if (req.method === 'POST' && parsedUrl.path === '/users') {
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
            const userInfo = JSON.parse(body)
            const lastId = users[users.length - 1]?.id || 0

            const newUser = {
                id: lastId + 1,
                name: userInfo.name,
                age: userInfo.age
            }
            users.push(newUser)

            res.writeHead(201, { 'content-type': 'application/json' })
            return res.end(JSON.stringify({ success: true, message: 'created successfully' }))
        })
    }

    if (req.method === 'DELETE' && parsedUrl.path.startsWith('/users')) {
        const id = parsedUrl.path.split('/').pop()
        const index = users.findIndex((el) => el.id === Number(id))
        if(index === -1){
            res.writeHead(400, {'content-type':"application/json"})
            return res.end(JSON.stringify({success: false, error: 'cannot find user'}))
        }
        const detedUser = users.splice(index, 1)
        res.writeHead(200, {'content-type':"application/json"})
        return res.end(JSON.stringify({success: true, data: detedUser[0]}))
    }

})


server.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})