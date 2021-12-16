const axios = require('axios')
const { nodes } = require('./networkScanner')

const APIcall = async () => {
    let products = []
    console.log(nodes)
    if (nodes.length == 0) {
        products = [
        {
            id: 1234567890,
            name: 'Chair',
            quantity: 100,
            price: 99.95
        },
        {
            id: 5432109876,
            name: 'Couch',
            quantity: 20,
            price: 399.95
        },
        {
            id: 1524367890,
            name: 'Lamp',
            quantity: 50,
            price: 39.95
        },
        ]
        return products
    } else {
        const res = await axios.get("http://localhost/")
        products = res.data
        return products
    }
}



module.exports = { APIcall }