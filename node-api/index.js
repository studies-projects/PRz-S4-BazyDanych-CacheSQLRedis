const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries.js')
const orm = require('./orm.js')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/query', orm.doQuery)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postres API'})
})

app.get('/actors', db.getActors)

app.listen(port, () => {
    console.log(`App Running on port ${port}.`)
})