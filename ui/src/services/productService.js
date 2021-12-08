import axios from 'axios'
import { SERVER_1, SERVER_2, SERVER_3 } from '../utils/config'

const balanceLoad = () => {
  let servers = [ SERVER_1, SERVER_2, SERVER_3 ] // tähän servereiden haku
  const randomNumber = Math.floor(Math.random()*servers.length)
  return servers[randomNumber]
}

export const getProducts = async () => {
  const server = balanceLoad()
  console.log(server)
  const products = await axios.get(server)
  return products.data
}

export const createProduct = async newObject => {
  const server = balanceLoad()
  console.log(server)
  const response = await axios.post(server + '/product', newObject)
  return response.data
}