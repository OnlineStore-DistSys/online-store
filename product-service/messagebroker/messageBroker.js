/* eslint-disable no-case-declarations */
const config = require('../utils/config')
const redis = require('redis')
let { pingCluster, nodes, joinNode, removeNode } = require('../api/networkScanner')
let { apiCall } = require('../api/apihandler')

let products = [{
  id: 1234567890,
  name: 'Chair',
  quantity: 100,
  price: 99.95
}]

/**
 * Description
 * @returns {any}
 */
const updateProducts = async () => {
  return products 
}

/**
 * Description
 * @returns {any}
 */
const getData = async () => {
    products = await apiCall()
    console.log(products)
    return products
}

/**
 * Description
 * @param {any} publishNet
 * @returns {any}
 */
const communicate = async (publishNet) => {
  console.log(nodes)
  if (nodes.length === 0) {
    publishNet('join', config.SERVER)
    setTimeout(()=> { if (nodes.length > 1) {
      products = getData()
     } else {
      console.log('Im the only one')
     }}, 5000 )
  } 
  pingCluster(publishNet) 
  setTimeout(()=> communicate(publishNet), 5000)
}

let subscriber = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)
let publisher = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)

const channel = 'online store'

/**
 * Description
 * @param {any} channel
 * @param {any} (error
 * @param {any} channel
 * @returns {any}
 */
subscriber.subscribe(channel, (error, channel) => {
  if (error) {
      throw new Error(error);
  }
  console.log(`Subscribed to ${channel} channel. Listening for updates on the ${channel} channel...`)
});

/**
 * Description
 * @param {any} message
 * @param {any} object
 * @returns {any}
 */
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

/**
 * Description
 * @param {any} 'message'
 * @param {any} (channel
 * @param {any} message
 * @returns {any}
 */
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
      console.log(products)
      products = products.concat(new_product)
      console.log('new', products)
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

communicate(publishNet)

module.exports = { publishNet, products, updateProducts }