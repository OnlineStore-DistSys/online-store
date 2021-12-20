import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBarComponent from './NavBarComponent'
import HomeComponent from '../views/HomeComponent'
import CartComponent from '../views/CartComponent'

/**
 * Description
 * @returns {any}
 */
const RouterComponent = () => {
  const [cartItems, setCartItems] = useState([])

  return (
    <Router>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomeComponent cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/cart' element={<CartComponent cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  )
}

export default RouterComponent