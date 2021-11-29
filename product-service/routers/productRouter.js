const productRouter = require('express').Router()

const redis = require('redis');
const subscriber = redis.createClient();

const channel = 'online store';

subscriber.subscribe(channel, (error, channel) => {
  if (error) {
      throw new Error(error);
  }
  console.log(`Subscribed to ${channel} channel. Listening for updates on the ${channel} channel...`);
});

let products = [
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

subscriber.on('message', (channel, message) => {
  console.log(`Received message from ${channel} channel: ${message}`)
  const parts = message.split(' ')
  const [ msg, id, name, quantity, price ] = parts
  let product = products.find((p) => p.id == id)
  switch(msg) {
    case "new":
      if (!product) {
        const new_product = {
          id: parseInt(id),
          name: name,
          quantity: parseInt(quantity),
          price: parseFloat(price)
        }
        products = products.concat(new_product)
      }
      console.log(products)
      break
    case "sold":
      break
    default:
       console.log(`All good, but nothing to publish`)
  } 
  // these are for product purchase messaging
  //console.log('before', product)
  //product = { ...product, quantity: product.quantity - parts[1]}
  //console.log('now', product)
})

productRouter.get('/', async (request, response) => {
  response.json(products.map(p => p))
})

module.exports = productRouter