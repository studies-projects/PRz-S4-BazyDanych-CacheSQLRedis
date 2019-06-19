const redis = require('redis')
const client = redis.createClient(6379, '192.168.0.224')

client.on('connect', function(){
    console.log('Redis client connected')
})
client.on('error', err => {
    console.log('Something went wrong ' + err)
})


var queryToKey = (query) => {
    console.log(`Given query: ${query}`)
    var r = query.replace(/\s+/g, ''); //remove white spacing
    r = r.toUpperCase()
    console.log(`Parsed query: ${r}`)
    r = Buffer.from(r).toString('Base64') //string to Base64
    console.log(`Query to Base64 ${r}`)
    return r
}

var getFromRedis = (key) => {
    client.get(key, (error, result) => {
        if(error) {
            console.log(error)
            throw error
        } 
        console.log("RESPONSE in get: " + result)
        
        return result
    })
    console.log("RESPONSE outside get: " + result)

}

module.exports = {
    queryToKey,
    getFromRedis,
    client,
    redis
}

// client.set('my-key','VALUES123', redis.print)
// client.get('my-key', (error, result) => {
//     if(error) {
//         console.log(error)
//         throw error
//     }
//     console.log('Get results ->' + result)
// })