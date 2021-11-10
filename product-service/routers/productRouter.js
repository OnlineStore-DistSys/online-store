const productRouter = require('express').Router()

const products = [
    {
        id: 12345,
        name: "tuote",
        quantity: 100,
        price: 99.9
    }
]

productRouter.get('/', async (request, response) => {
  response.json(products.map(p => p))
  })


module.exports = productRouter