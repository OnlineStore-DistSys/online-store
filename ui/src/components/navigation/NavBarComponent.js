import { Link } from 'react-router-dom'
import ContainerStyles from '../../styles/ContainerStyles'

const NavBarComponent = () => {
  return (
    <div>
      <Link to='/' style={ContainerStyles.NavBarItem}>Products</Link>
      <Link to='/cart' style={ContainerStyles.NavBarItem}>Shopping cart</Link>
    </div>
  )
}

export default NavBarComponent