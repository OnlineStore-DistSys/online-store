import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBarComponent from './NavBarComponent'
import HomeComponent from '../views/HomeComponent'
import CartComponent from '../views/CartComponent'

/**
 * Description
 * @returns {any}
 */
const RouterComponent = () => {
  return (
    <Router>
      <NavBarComponent />
      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/cart' element={<CartComponent />} />
      </Routes>
    </Router>
  )
}

export default RouterComponent