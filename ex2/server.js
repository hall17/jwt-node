const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created!',
                authData
            })

        }
    })
})

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'halil',
        email: 'halil@gmail.com'
    }

    let token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})

    res.json({
        token
    })
})

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server started on port 5000'))