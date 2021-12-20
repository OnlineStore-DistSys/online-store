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
 * Pings the IP that's given as a parameter, and returns the node's status
 * @param {any} ip
 * @returns {any}
 */
const ping = async ( ip ) => {
    const poll = await netScan.poll(ip, conf)
    return poll.status
}

/**
 * Publishes the news that a node has failed, into the Redis channel
 * @param {any} {ip_address}
 * @param {any} publishNet
 * @returns {any}
 */
const handleFailed = ({ ip_address }, publishNet) => {
    console.log('Reporting crash of node ', ip_address)
    publishNet('crash', ip_address)
}

/**
 * Pings all the other nodes to check whether they're all alive (if not, calls handleFailed)
 * @param {any} publishNet
 * @returns {any}
 */
const pingCluster = (publishNet) => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'production') {
    netScan.clusterPing(nodes, servers => {
        servers.map((n) => n.status === 'offline' ? handleFailed(n, publishNet) :
            console.log(n.ip_address, 'is online'))
        })
    }
}
/**
 * If a new node joins the network, add it to list of IPs and respond with a join message
 * to the channel (in order to let the new node receive everyone's IP as well)
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
 * Remove a failed node's IP from the IP list
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