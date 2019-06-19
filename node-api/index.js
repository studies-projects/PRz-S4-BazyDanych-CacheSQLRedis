const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries.js')
const orm = require('./orm.js')
const cache = require('./redis.js')


// var query = "SELECT * FROM actor LIMIT 1"
// cache.queryToKey(query)
// var time = new Date()
// var time2 = new Date()
// time2.setMinutes(time.getMinutes() + 1)
// var re = time2-time
// console.log(`Time1: ${time} \nTime2: ${time2}`)
// console.log(`Difference: ${re}`)

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/queryORM', orm.doQuery)

app.get('/queryRedis', (req, res) => {
    let key = cache.queryToKey(req.query.qu) //parse sql query to key
    cache.client.get(key, (error, result) => { 
        if(error) {
            console.log(error)
            throw error
        }
        if (result != null) { //if key exist return from redit
            console.log('Results from REDIS')
            res.json(JSON.parse(result))
        } else {
            orm.sequelize.query(req.query.qu, {
                type: orm.Sequelize.QueryTypes.SELECT
            }).then(answer => {
                var time = req.query.time;
                console.log('Results from Postgres')
                cache.client.set(key,JSON.stringify(answer), 'EX', time, cache.redis.print) //add key to Redis
                res.json(answer)
            }).catch(err => {
                console.log(err)
                res.send(err)
            })
        }
    })
})

// app.get('/queryRedis', (req, res) => {
//     var k = cache.queryToKey(req.query.qu)
//     cache.client.get(k, (error, result) => {
//         if(error) {
//             console.log(error)
//             throw error
//         }
//         if (result != null){
//             console.log('Results from REDIS')
//             res.json(JSON.parse(result))
//         } else {
//             orm.sequelize.query(req.query.qu, {
//                 type: orm.Sequelize.QueryTypes.SELECT
//             }).then(answer => {
//                 var min2 = req.query.time;
//                 console.log('Results from Postgres')
//                 cache.client.set(k,JSON.stringify(answer), 'EX', min2, cache.redis.print)
//                 console.log(`TEST Key: ${k}`)
//                 //cache.client.expireat(k, min2)
//                 res.json(answer)
//             }).catch(err => {
//                 console.log(err)
//                 res.send(err)
//             })
//         }
//     })
// })

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postres API'})
})

app.get('/actors', db.getActors)

app.listen(port, () => {
    console.log(`App Running on port ${port}.`)
})