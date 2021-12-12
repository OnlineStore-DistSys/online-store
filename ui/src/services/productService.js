import axios from 'axios'

export const getProducts = async () => {
  const products = await axios.get('http://localhost/')
  return products.data
}

export const createProduct = async newObject => {
  const response = await axios.post('http://localhost/product', newObject)
  return response.data
}