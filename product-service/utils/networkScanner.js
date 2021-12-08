const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()

const handleFailed = ( { host, ip_address, status } ) => {
    console.log('Failed node:')
    console.log('HOST:', host)
    console.log('IP_ADDRESS:', ip_address)
    console.log('STATUS:', status)
}

const pingCluster = () => {
    var array = ['localhost']
    netScan.clusterPing(array, nodes => {
    nodes.map((n) => n.status === 'offline' ? handleFailed(n) : 
    console.log(n.ip_address, 'is online'))
    })
}

const getSubnet = async () => {
    const subnet = await netScan.getSubnet('192.168.0.1/24') 
    console.log(subnet)
    netScan.ipScan(subnet.host_range, host => {
        console.log(host)
    })
}

const communicate = () => {
    pingCluster()
    getSubnet()
    setTimeout(communicate, 60000)
}
//communicate()
module.exports = { communicate }
