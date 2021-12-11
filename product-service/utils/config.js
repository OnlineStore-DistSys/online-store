/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.LOCAL_PS
let SUBNET = process.env.LOCAL_SUBNET
let SERVER1 = process.env.REDIS_HOST + ':' + process.env.LOCAL_PS
let SERVER2 = process.env.REDIS_HOST + ':' + process.env.LOCAL_PS_R1
let SERVER3 = process.env.REDIS_HOST + ':' + process.env.LOCAL_PS_R2
let REDIS_PORT = process.env.REDIS_PORT
let REDIS_HOST = process.env.REDIS_HOST

if (process.env.NODE_ENV === 'production') {
  SUBNET = process.env.PROD_SUBNET
  SERVER1 = process.env.PROD_PS
  SERVER2 = process.env.PROD_PS_R1
  SERVER3 = process.env.PROD_PS_R2
  REDIS_PORT = process.env.PROD_REDIS_PORT
  REDIS_HOST = process.env.PROD_REDIS_HOST
}

module.exports = {
  PORT,
  SUBNET,
  SERVER1,
  SERVER2,
  SERVER3,
  REDIS_HOST,
  REDIS_PORT
}