import { Link } from 'react-router-dom'
import ContainerStyles from '../../styles/ContainerStyles'


/**
 * Navigation bar on top of the page for easier navigation
 * @returns {any}
 */
const NavBarComponent = () => {
  return (
    <div>
      <Link to='/' style={ContainerStyles.NavBarItem}>Products</Link>
      <Link to='/cart' style={ContainerStyles.NavBarItem}>Shopping cart</Link>
    </div>
  )
}

export default NavBarComponent