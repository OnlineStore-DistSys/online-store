import axios from "axios"

/**
 * Description
 * @returns {any}
 */
export const getProducts = async () => {
  const products = await axios.get("http://localhost/")
  return products.data
}

/**
 * Description
 * @param {//localhost/product'} 'http
 * @param {any} newObject
 * @returns {any}
 */
export const createProduct = async (newObject) => {
  const response = await axios.post("http://localhost/product", newObject)
  return response.data
}

export const createCart = async (newObject) => {
  const response = await axios.post("http://localhost/cart", newObject)
  return response.data
}

export const getCartItems = async (newObject) => {
  const cartProducts = await axios.get("http://localhost/")
  return cartProducts.data
}
