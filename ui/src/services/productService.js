import axios from 'axios'

export const getProducts = async () => {
  const products = await axios.get('http://localhost:3002')
  return products.data
}

export const createProduct = async newObject => {
  const response = await axios.post('http://localhost:3001/product', newObject)
  return response.data
}