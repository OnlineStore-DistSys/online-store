import { useState, useEffect } from "react"
import { getProducts } from "../../services/productService"
import ProductForm from "./ProductForm"
import { Button } from "../StyledComponents"
import { createCart } from "../../services/productService"

const HomeComponent = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const initProducts = async () => {
      let fetchedProducts = []

      try {
        fetchedProducts = await getProducts()
      } catch (error) {
        console.log(error)
      }

      setProducts(fetchedProducts)
    }

    initProducts()
  }, [])

  function buyProduct() {
    alert("You clicked me!")
  }

  return (
    <div>
      <h1>Products</h1>
      <ProductForm />
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
              <br />
              In stock: {product.quantity} pcs
              <br />
              Price: {product.price}€<br />
              <br />
              <Button onClick={buyProduct}>Buy</Button>
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomeComponent
