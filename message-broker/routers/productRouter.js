const productRouter = require('express').Router()
const redis = require('redis');
const publisher = redis.createClient();

const channel = 'online store';

const publish = async ( chair ) => {
  console.log(`Started ${channel} channel publisher...`)
  const { id, quantity } = chair
  publisher.publish(channel, `${id} ${quantity}`);
}

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

//publish here 5 chairs sold => another subscribers 
productRouter.get('/', async (request, response) => {
  const chair = { id: 12345, quantity: 5} //purchase, now "chair", but can be anything
  publish(chair)
  response.json(products.map(p => p))
})

module.exports = productRouter