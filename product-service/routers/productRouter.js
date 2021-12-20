/* eslint-disable no-case-declarations */
const productRouter = require('express').Router()
let { publishNet, products, updateProducts } = require('../messagebroker/messageBroker')

const update = async () => {
  products = await updateProducts() 
  setTimeout(()=> { update()
    console.log('productRouter', products)} , 1000)
}

update()


productRouter.get('/', async (request, response) => {
  console.log("Nginx chose me 1!")
  
  response.json(products.map(p => p))
})

productRouter.post('/product', async (request, response) => {
  console.log("Nginx chose me!")
  const body = request.body

  if (body.name == "" || !body.name) {
    return response.json({ Error: "Name can not be empty"})
  }

  const new_product = {
    id: Date.now(),
    name: body.name,
    quantity: body.quantity,
    price: body.price
  }

  publishNet('new', new_product)
  response.json(new_product)
})


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


//redis servers below
/*
subscriber.on('error', () => {
    console.log('Are we here?')
    subscriber = redis.createClient(config.REDIS_PORT, config.REDIS_HOST_R1)
    subscriber.on('error', () => {
      subscriber = redis.createClient(config.REDIS_PORT, config.REDIS_HOST_R2)
      
    })
  })

  publisher.on('error', () => {
    console.log('Are we here?')
    publisher = redis.createClient(config.REDIS_PORT, config.REDIS_HOST_R1)
    publisher.on('error', () => {
      publisher = redis.createClient(config.REDIS_PORT, config.REDIS_HOST_R2)
      
    })
  })
*/