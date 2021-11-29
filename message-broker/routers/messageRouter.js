const productRouter = require('express').Router()
const redis = require('redis')
const publisher = redis.createClient()

const channel = 'online store'

const publish = async ( message, product ) => {
  const { id, name, quantity, price } = product

  switch(message) {
    case "new":
      publisher.publish(channel, `${message} ${id} ${name} ${quantity} ${price}`)
      break
    case "sold": //tba endpoint + front 
      publisher.publish(channel, `${message} ${id} ${quantity}`)
      break
    default:
       console.log(`All good, but nothing to publish`)
  } 
}

productRouter.post('/product', async (request, response) => {
  const body = request.body

  const new_product = {
    id: Date.now(),
    name: body.name,
    quantity: body.quantity,
    price: body.price
  }

  publish('new', new_product)
  response.json(new_product)
})

module.exports = productRouter