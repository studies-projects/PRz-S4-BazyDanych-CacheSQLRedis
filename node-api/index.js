const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

var Sequelize = require('sequelize'),
    sequelize = new Sequelize('chinook', 'postgres', 'docker', {
        dialect: 'postgres',
        host: '192.168.0.224',
        port: 5432,

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established succesfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postres API'})
})
app.get('/actors', db.getActors)

app.listen(port, () => {
    console.log(`App Running on port ${port}.`)
})