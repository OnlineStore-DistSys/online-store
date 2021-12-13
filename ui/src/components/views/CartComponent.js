import { useState, useEffect } from "react"
import { getCartItems } from "../../services/productService"
import { Button } from "../StyledComponents"

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const initCartItems = async () => {
      let fetchedCartItems = []

      try {
        fetchedCartItems = await getCartItems()
      } catch (error) {
        console.log(error)
      }

      setCartItems(fetchedCartItems)
    }

    initCartItems()
  }, [])

  function removeProduct() {
    alert("You clicked me!")
  }

  return (
    <div>
      <h1>Shopping cart</h1>
      {cartItems.length > 0 && (
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.name}
              <br />
              Price: {cartItem.price}€<br />
              <br />
              Selected: {cartItem.quantity} pcs
              <br />
              <Button onClick={removeProduct}>Remove</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartComponent
