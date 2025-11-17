import express, { Request, Response } from 'express'
import LogMiddleware from './middlewares/log.middleware'

const app = express()

app.get('/', LogMiddleware, (req: Request, res: Response) => {
    res.send('hello from ts 1234')
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})