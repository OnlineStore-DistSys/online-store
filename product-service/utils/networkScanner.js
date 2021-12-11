const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const config = require('./config')
const { reportFailure } = require('../services/nodeService')

let nodes = [ config.SERVER1, config.SERVER2, config.SERVER3 ]

const handleFailed = ( { host, ip_address, status } ) => {
    removeNode(ip_address)
    nodes.forEach((address) => {
        const newList = reportFailure(address, ip_address)
        console.log(address + ' has the following list of nodes after removal: ' + newList)
    })
}

const pingCluster = () => {
    netScan.clusterPing(nodes, servers => {
    servers.map((n) => n.status === 'offline' ? handleFailed(n) : 
    console.log(n.ip_address, 'is online'))
    })
}

const getSubnet = async () => {
    const subnet = await netScan.getSubnet('' + config.SUBNET) 
    console.log(subnet)
    netScan.ipScan(subnet.host_range, host => {
        console.log(host)
    })
}

const removeNode = (IP) => {
    const index = nodes.indexOf(IP);
    if (index !== -1) {
        nodes.splice(index, 1);
    }
    return nodes
}

const communicate = () => {
    pingCluster()
    //getSubnet()
    setTimeout(communicate, 30000)
}

communicate()

module.exports = { communicate, removeNode }

