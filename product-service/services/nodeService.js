const axios = require('axios')

const reportFailure = async (target, failedNode) => {
  const response = await axios.post('http://' + target + ':3001/node/remove', failedNode)
  console.log('Reporting failure')
  console.log('Addr: ', 'http://' + target + ':3001/node/remove')
  console.log('Rm: ', failedNode)
  console.log('Res: ', response.data)
  return response.data
}

module.exports = { reportFailure }