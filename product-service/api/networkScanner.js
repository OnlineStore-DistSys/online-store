const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const config = require('../utils/config')

let nodes = []

const conf = {
    repeat:4,
    size:56, 
    timeout:1 
  }

/**
 * Description
 * @param {any} ip
 * @returns {any}
 */
const ping = async ( ip ) => {
    const poll = await netScan.poll(ip, conf)
    return poll.status
}

/**
 * Description
 * @param {any} {ipAddress}
 * @param {any} publishNet
 * @returns {any}
 */
const handleFailed = ({ ipAddress }, publishNet) => {
    console.log('Reporting crash of node ', ipAddress)
    publishNet('crash', ipAddress)
}

/**
 * Description
 * @param {any} publishNet
 * @returns {any}
 */
const pingCluster = (publishNet) => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'production') {
    netScan.clusterPing(nodes, servers => {
        servers.map((n) => n.status === 'offline' ? handleFailed(n, publishNet) :
            console.log(n.ipAddress, 'is online'))
        })
    }
}
/**
 * Description
 * @param {any} ip
 * @param {any} publishNet
 * @returns {any}
 */

const joinNode = (ip, publishNet)  => {
    if (!nodes.includes(ip)) {
        nodes.push(ip)
        console.log('Added node ', ip)
        publishNet('join', config.SERVER)
    }
    return nodes
}

/**
 * Description
 * @param {any} ip
 * @returns {any}
 */
const removeNode = (ip) => {
    const index = nodes.indexOf(ip)
    if (index !== -1) {
        nodes.splice(index, 1); 
        console.log('Removed node ', ip)
    }
    return nodes
}

module.exports = { pingCluster, joinNode, removeNode, ping, nodes }