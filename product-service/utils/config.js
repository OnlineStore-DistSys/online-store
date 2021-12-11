/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.LOCAL_PS
let SUBNET = process.env.LOCAL_SUBNET
let SERVER = process.env.REDIS_HOST + ':' + process.env.LOCAL_PS
let REDIS_PORT = process.env.REDIS_PORT
let REDIS_HOST = process.env.REDIS_HOST

if (process.env.NODE_ENV === 'production') {
  SUBNET = process.env.PROD_SUBNET
  SERVER = process.env.PROD_PS
  REDIS_PORT = process.env.PROD_REDIS_PORT
  REDIS_HOST = process.env.PROD_REDIS_HOST
}

module.exports = {
  PORT,
  SUBNET,
  SERVER,
  REDIS_HOST,
  REDIS_PORT
}