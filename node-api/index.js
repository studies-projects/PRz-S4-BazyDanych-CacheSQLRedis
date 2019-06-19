const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries.js')
const orm = require('./orm.js')
const cache = require('./redis.js')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/queryORM', orm.doQuery)

app.get('/queryRedis', (req, res) => {
    let query = req.query.qu
    let time = req.query.time
    let key = cache.queryToKey(query) //parse sql query to key
    cache.client.get(key, (error, result) => { 
        if(error) {
            console.log(error)
            throw error
        }
        if (result != null) { //if key exist return from redit
            console.log('Results from REDIS')
            res.json(JSON.parse(result))
        } else {
            orm.sequelize.query(query, {
                type: orm.Sequelize.QueryTypes.SELECT
            }).then(answer => {                
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

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postres API'})
})

app.get('/actors', db.getActors)

app.listen(port, () => {
    console.log(`App Running on port ${port}.`)
})