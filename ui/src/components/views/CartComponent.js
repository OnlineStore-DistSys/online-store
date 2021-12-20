import { Button } from "../StyledComponents"

const CartComponent = (props) => {

  const removeProduct = (cartItem) => {
    props.setCartItems(props.cartItems.filter((item) => { return item != cartItem }))
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
    </div>
  )
}

export default CartComponent
