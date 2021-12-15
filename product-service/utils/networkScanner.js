const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const config = require('./config')

let nodes = []

const conf = {
    repeat:4,
    size:56, 
    timeout:1 
  }

const ping = async ( ip ) => {
    const poll = await netScan.poll(ip, conf)
    return poll.status
}

const handleFailed = ({ ip_address }, publishNet) => {
    console.log('Reporting crash of node ', ip_address)
    publishNet('crash', ip_address)
}

const pingCluster = (publishNet) => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'production') {
    netScan.clusterPing(nodes, servers => {
        servers.map((n) => n.status === 'offline' ? handleFailed(n, publishNet) :
            console.log(n.ip_address, 'is online'))
        })
    }
}

const getSubnet = async () => {
    const subnet = await netScan.getSubnet('' + config.SUBNET)
    console.log(subnet)
    netScan.ipScan(subnet.host_range, host => {
        console.log(host)
    })
}

const joinNode = (IP, publishNet)  => {
    if (!nodes.includes(IP)) {
        nodes.push(IP)
        console.log('Added node ', IP)
        publishNet('join', config.SERVER)
    }
    return nodes
}

const removeNode = (IP) => {
    const index = nodes.indexOf(IP)
    console.log('index', index)
    console.log('IP', IP)
    if (index !== -1) {
        nodes.splice(index, 1); 
        console.log('Removed node ', IP)
    }
    return nodes
}

const communicate = (publishNet) => {
    if (nodes.length === 0) {
            publishNet('join', config.SERVER)
        }
    pingCluster(publishNet) 
}

module.exports = { communicate, joinNode, removeNode, ping }