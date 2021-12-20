import { Button } from "../StyledComponents"
import { buyProducts } from "../../services/productService"

const CartComponent = (props) => {

  //removes the item from the shopping cart
  const removeProduct = (cartItem) => {
    props.setCartItems(props.cartItems.filter((item) => { return item != cartItem }))
  }

  //handles the purchasing event
  const purchase = async () => {

    //send the purchase request into a product-service
    const res = await buyProducts({ items: props.cartItems })

    //let the user know that the purchase was successful
    if (res.status === 'OK') {
      props.setCartItems([])
      alert('Purchase was successful.')

    //let the user know if the purchase failed and show the items which were less in quantity than requested
    //(so that the user knows to remove/reduce those items from their shopping cart)
    } else {
      const failedItems = res.items.map(f => f.name)
      console.log(failedItems)
      alert(`Request failed because this items were not in stock: ${failedItems}`)
    }
  }

  return (
    <div>
      <h1>Shopping cart</h1>
      {props.cartItems.length > 0 && (
        <ul>
          {props.cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.name}
              <br />
              Price: {cartItem.price}€<br />
              <br />
              Selected: {cartItem.quantity} pcs
              <br />
              <Button onClick={() => { removeProduct(cartItem) }}>Remove</Button>
            </li>
          ))}
        </ul>
      )}
      <Button onClick={() => { purchase() }}>Buy</Button>
    </div>
  )
}

export default CartComponent
