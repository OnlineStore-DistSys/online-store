import React, { useState } from 'react'
import { Input, Button } from '../StyledComponents'
import { createProduct } from '../../services/productService'


const ProductForm = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')

    //function to add a new product
    const addProduct = async (event) => {
        event.preventDefault()

        //construct the product from the input fields
        const newProduct = {
            name: name,
            quantity: quantity,
            price: price,
        }

        //post the product into a product-service
        try {
            await createProduct(newProduct)
        } catch (error) {
            console.log(error)
        }

        //refresh the form
        setName('')
        setQuantity('')
        setPrice('')
        window.location.reload()
    }
    
    return (
    <div>
        <h3>Add a new product</h3>
            <form onSubmit={addProduct}>
                <div>
                    Name: <Input value={name} 
                    onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    Quantity: <Input value={quantity} type="number"
                    onChange={(e) => setQuantity(e.target.value)} required/>
                </div>
                <div>
                <div>
                    Price: <Input value={price} type="number"
                    onChange={(e) => setPrice(e.target.value)} required/>
                </div>
                <Button type="submit">Create</Button>
                </div>
            </form>
    </div>
    
    )
}

export default ProductForm