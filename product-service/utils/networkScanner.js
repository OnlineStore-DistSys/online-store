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

const conf = {
    repeat:4, //Specifies how many pings to send to the host, if null default is 1
    size:56, //Size of bytes in each packet sent, if null default is 32
    timeout:1 //Specifies the timeout of each ping in seconds, if null default is 1
  }

const ping = async ( ip ) => {
    const poll = await netScan.poll(ip, conf)
    return poll.status
}

 
const handleFailed = ({ ip_address }) => {
    console.log('Reporting crash of node ', ip_address)
    publish('crash', ip_address)
}

const pingCluster = () => {
    // eslint-disable-next-line no-undef
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

module.exports = { communicate, joinNode, removeNode, ping }

