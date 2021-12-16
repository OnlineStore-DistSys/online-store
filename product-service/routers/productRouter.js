/* eslint-disable no-case-declarations */
const productRouter = require('express').Router()
const config = require('../utils/config')
const redis = require('redis')
const { communicate, joinNode, removeNode } = require('../api/networkScanner')

let { APIcall } = require('../api/apihandler')

let products = []

const getData = async () => {
  products = await APIcall()
  console.log(products)
}

getData()

let subscriber = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)
let publisher = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)

const channel = 'online store'

subscriber.subscribe(channel, (error, channel) => {
  if (error) {
      throw new Error(error);
  }
  console.log(`Subscribed to ${channel} channel. Listening for updates on the ${channel} channel...`)
});

const publishNet = ( message, object ) => {
  const { id, name, quantity, price } = object

  switch(message) {
    case 'new':
      publisher.publish(channel, `${message} ${id} ${name} ${quantity} ${price}`)
      break
    case 'sold':
      publisher.publish(channel, `${message} ${object}`)
      break
    case 'crash':
      publisher.publish(channel, `${message} ${object}`)
      break
    case 'join':
      publisher.publish(channel, `${message} ${object}`)
      break
    default:
       console.log(`All good, but nothing to publish`)
  } 
}

subscriber.on('message', (channel, message) => {
  const parts = message.split(' ') // splitting the message parts
  const [ msg, id, ...rest ] = parts

  switch(msg) {
    case 'new':
    const strLength = rest.length
    const name = rest.slice(0, strLength-2)
    const quantity = rest[rest.length - 2] 
    const price = rest[rest.length - 1]  
    const new_product = {
        id: parseInt(id),
        name: name,
        quantity: parseInt(quantity),
        price: parseFloat(price)
      }
      products = products.concat(new_product)
     
      console.log(products)
      break
    case 'sold':
      let soldItem = {}
      console.log('Before: ', products)
      rest.map((n, index) => index % 2 === 0 ? 
      soldItem = n : 
      products = products.map(item => item.id == soldItem ? 
        {...item, quantity: item.quantity - n} 
        : item))
      console.log('After: ', products)
      break
    case 'join':
      joinNode(id, publishNet)
      break
    case 'crash':
      removeNode(id)
      break
    default:
       console.log(`All good, but nothing to publish`)
  } 
})

productRouter.get('/', async (request, response) => {
  console.log("Nginx chose me!")
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
  console.log("Nginx chose me!")
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

communicate(publishNet)

// module.exports = { productRouter, publishNet }
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