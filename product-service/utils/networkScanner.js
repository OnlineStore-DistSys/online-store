const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const config = require('./config')
const redis = require('redis')
const publisher = redis.createClient(config.REDIS_PORT, config.REDIS_HOST)
const channel = 'online store'

// let nodes = [config.SERVER1, config.SERVER2, config.SERVER3]
let nodes = []

const publish = async (message, id) => {
    publisher.publish(channel, `${message} ${id}`)
}

const handleFailed = ({ host, ip_address, status }) => {
    console.log('Reporting crash of node ', ip_address)
    publish('crash', ip_address)
}

const pingCluster = () => {
    if (process.env.NODE_ENV === 'production') {
    netScan.clusterPing(nodes, servers => {
        servers.map((n) => n.status === 'offline' ? handleFailed(n) :
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

const joinNode = (IP) => {
    if (!nodes.includes(IP)) {
        nodes.push(IP)
        console.log('Added node ', IP)
        publish('join', config.SERVER)
    }
    return nodes
}

const removeNode = (IP) => {
    const index = nodes.indexOf(IP);
    if (index !== -1) {
        nodes.splice(index, 1);
        console.log('Removed node ', IP)
    }
    return nodes
}

const communicate = () => {
    if (nodes.length === 0) {
        publish('join', config.SERVER)
    }
    setTimeout(pingCluster, 10000)
    //getSubnet()
    setTimeout(communicate, 30000)
}

communicate()

module.exports = { communicate, joinNode, removeNode }

