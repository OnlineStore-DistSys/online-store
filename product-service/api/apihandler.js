const axios = require('axios')
let { nodes } = require('./networkScanner')

const APIcall = async () => {
    let products = []
    nodes = ['server1', 'server2']
    console.log(nodes.length)
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
        try {
            const res = await axios.get("http://localhost/")
            products = res.data
            return products
        } catch (err) {
            console.log(err)
        }
        
    }
}



module.exports = { APIcall }