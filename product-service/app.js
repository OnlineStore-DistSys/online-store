const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const productRouter = require('./routers/productRouter')
app.use('/', productRouter)


module.exports = app