import { useState, useEffect } from 'react'
import { getProducts } from '../../services/productService'

const HomeComponent = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const initProducts = async () => {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    }

    initProducts()
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 && (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name}<br />
              In stock: {product.quantity} pcs<br />
              Price: {product.price}€<br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomeComponent