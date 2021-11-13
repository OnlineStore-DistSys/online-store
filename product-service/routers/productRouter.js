const productRouter = require('express').Router()

const products = [
  {
    id: 12345,
    name: 'Chair',
    quantity: 100,
    price: 99.95
  },
  {
    id: 54321,
    name: 'Couch',
    quantity: 20,
    price: 399.95
  },
  {
    id: 15243,
    name: 'Lamp',
    quantity: 50,
    price: 39.95
  },
]

productRouter.get('/', async (request, response) => {
  response.json(products.map(p => p))
})

module.exports = productRouter