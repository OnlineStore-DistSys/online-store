/* eslint-disable no-undef */
const axios = require('axios')

/**
 * Description
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