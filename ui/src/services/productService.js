import axios from "axios"

export const getProducts = async () => {
  const products = await axios.get("http://localhost/")
  return products.data
}

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
