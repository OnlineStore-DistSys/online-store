const express = require('express')
const app = express()
const cors = require('cors')
const messageRouter = require('./routers/messageRouter')

app.use(cors())
app.use(express.json())

app.use('/', messageRouter)

module.exports = app