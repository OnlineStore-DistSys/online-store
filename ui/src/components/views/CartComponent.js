import { Button } from "../StyledComponents"
import { buyProducts } from "../../services/productService"

const CartComponent = (props) => {

  const removeProduct = (cartItem) => {
    props.setCartItems(props.cartItems.filter((item) => { return item != cartItem }))
  }

  const purchase = async () => {
    const res = await buyProducts({ items: props.cartItems })
    if (res.status === 'OK') {
      props.setCartItems([])
      alert('Purchase was successful.')
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
