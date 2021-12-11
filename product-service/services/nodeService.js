const axios = require('axios')

const reportFailure = async (target, failedNode) => {
  const response = await axios.post('http://' + target + ':3001/node/remove', failedNode)
  return response.data
}

module.exports = { reportFailure }