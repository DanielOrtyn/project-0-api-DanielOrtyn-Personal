import express from "express"
import bodyParser from 'body-parser'
import { userRouter } from "./controller/user-router";
import { sessionMiddleware } from "./middleware/session.middleware";

const app = express()

app.use((req, res, next) => {
    console.log(`req processed with url: ${req.url} and method: ${req.method}.`)
    next()
})

app.use(bodyParser.json())
app.use(sessionMiddleware)

app.get(`/test`, (req, res) => {
    console.log('req processed.')
    res.send(`Here is the response data`)
})

userRouter.post(`/login`, (req, res) => {
    console.log(`login request made`)
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
        req.session.user = user
        res.end()
    }
    else {
        res.sendStatus(401)
    }
})

/**
 * Register Routers
 */
app.use(`/users`, userRouter)
app.listen(8080);
console.log(`end of file`)
