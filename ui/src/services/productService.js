import axios from "axios"

//axios request to nginx (load balancer) to fetch all products
export const getProducts = async () => {
  const products = await axios.get("http://localhost/")
  return products.data
}

//axios request to nginx (load balancer) post a new product
export const createProduct = async (newObject) => {
  const response = await axios.post("http://localhost/product", newObject)
  return response.data
}

//axios request to nginx (load balancer) to purchase a set of products
export const buyProducts = async (newObject) => {
  const response = await axios.post("http://localhost/buy", newObject)
  return response.data
}