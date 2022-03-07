require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const posts = [
    {
        username: 'Kyle',
        title: 'Post 1',
    },
    {
        username: 'Jim',
        title: 'Post 2',
    }
]

app.use(express.json())

app.get('/posts',authenticateToken ,(req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    console.log(req)
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)

        req.user = user

        next()
    })
}


app.listen(3000, () => {
    console.log('server is running on port 3000')
})