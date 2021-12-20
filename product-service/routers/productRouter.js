/* eslint-disable no-case-declarations */
const productRouter = require('express').Router()
let { publishNet, products, updateProducts } = require('../messagebroker/messageBroker')

/**
 * Fetches products from local message-broker module
 */
const update = async () => {
  products = await updateProducts() 
  setTimeout(()=> update(), 1000)
}

update()

/**
 * The root endpoint returns all products when requested
 * @param {any} request
 * @param {any} response
 */
productRouter.get('/', async (request, response) => {
  console.log("Nginx chose me")
  response.json(products.map(p => p))
})

/**
 * The product endpoint accepts new products
 * @param {any} '/product'
 * @param {any} request
 * @param {any} response
 */
productRouter.post('/product', async (request, response) => {
  console.log("Nginx chose me!")
  const body = request.body

  if (body.name == "" || !body.name) {
    return response.json({ Error: "Name can not be empty"})
  }

  const newProduct = {
    id: Date.now(),
    name: body.name,
    quantity: body.quantity,
    price: body.price
  }

  publishNet('new', newProduct)
  response.json(newProduct)
})


/**
 * Description
 * @param {any} '/buy'
 * @param {any} async(request
 * @param {any} response
 * @returns {any}
 */
productRouter.post('/buy', async (request, response) => {
  console.log("Nginx chose me nro1!")
  const body = request.body

  let notInStock = []

  //adds each item, that's being requested more than we have in store, into notInStock array 
  body.items.forEach((requestedProduct) => {
    const storedProduct = products.find(i => i.id === requestedProduct.id)
    if (storedProduct.quantity - requestedProduct.quantity < 0) {
      notInStock.push(storedProduct)
    }
  })


  //if we have enough quantities of all of the requested items, publish the sold items into redis
  if (notInStock.length === 0) {
    let message = ""
    body.items.map((requestedProduct) => {
      message = `${message} ${requestedProduct.id} ${requestedProduct.quantity}`
    })
    publishNet('sold', message)
    response.json({ status: 'OK' })

  //else send the list of the items (including their current storage quantity) which we had less of than requested
  } else {
    response.json({
      status: 'FAIL',
      items: notInStock
    })
  }
})

module.exports = productRouter