require('dotenv').config()

let PORT = process.env.LOCAL_MESSAGEBROKER
let REDIS_PORT = process.env.REDIS_PORT
let REDIS_HOST = process.env.REDIS_HOST

if (process.env.NODE_ENV === 'production') {
  REDIS_PORT = process.env.PROD_REDIS_PORT
  REDIS_HOST = process.env.PROD_REDIS_HOST
}

module.exports = {
  PORT,
  REDIS_HOST,
  REDIS_PORT
}