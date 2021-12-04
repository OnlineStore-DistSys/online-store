import axios from 'axios'
import { MB, SERVER_1 } from '../utils/config'

export const getProducts = async () => {
  const products = await axios.get(SERVER_1)
  return products.data
}

export const createProduct = async newObject => {
  const response = await axios.post(MB + '/product', newObject)
  return response.data
}