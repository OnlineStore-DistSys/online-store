const express = require('express')
const app = express()
const cors = require('cors')
const productRouter = require('./routers/productRouter')
const { communicate } = require('./utils/networkScanner')

app.use(cors())
app.use(express.json())

app.use('/', productRouter)
app.use(communicate)

module.exports = app