import axios from 'axios'

export const getProducts = async () => {
  const products = await axios.get('http://localhost:3001')
  return products.data
}