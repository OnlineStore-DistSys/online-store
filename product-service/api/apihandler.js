/* eslint-disable no-undef */
const axios = require('axios')

/**
 * This function calls nginx (load balancer) to return up-to-date list of products from some other node.
 * @returns {any}
 */
const apiCall = async () => {
    let products = []
    try {
        const res = await axios.get(`http://localhost/`)
        products = res.data
        return products
    } catch (err) {
        console.log(err)
    }
}

module.exports = { apiCall }