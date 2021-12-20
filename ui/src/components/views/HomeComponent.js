import { useState, useEffect } from "react"
import { getProducts } from "../../services/productService"
import ProductForm from "./ProductForm"
import { Button } from "../StyledComponents"

const HomeComponent = (props) => {
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

  const buyProduct = (product) => {
    const addedProduct = { ...product, quantity: 1 } //add one instance of the product
    const alreadyAdded = props.cartItems.find((item) => item.id === addedProduct.id)

    //if shopping cart doesn't have this item, add it there
    if (!alreadyAdded) {
      props.setCartItems(props.cartItems.concat(addedProduct))

    //if shopping cart has this item, increase the quantity by one
    } else {
      let modifiedProducts = props.cartItems
      let modifiedProduct = alreadyAdded
      modifiedProduct.quantity = modifiedProduct.quantity + 1
      let index = modifiedProducts.indexOf(alreadyAdded)
      if (index !== -1) {
        modifiedProducts[index] = modifiedProduct
      }
      props.setCartItems(modifiedProducts)
    }

    alert(`Added the following product to shopping cart: ${addedProduct.name}`)
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
              <Button onClick={() => { buyProduct(product) }}>Buy</Button>
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomeComponent
