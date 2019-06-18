var Sequelize = require('sequelize'),
    sequelize = new Sequelize('chinook', 'postgres', 'docker', {
        dialect: 'postgres',
        host: '192.168.0.224',
        port: 5432,

        additional: {
            timestamps: false
        },
    });

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection from Sequelize has been established succesfully.');
    }, function (err) {
        console.log('Unable to connect to the database from Sequelize:', err);
    });

/////////////////////////////////////////////////////////////////////////////////////

const doQuery = (req, res) => {
    sequelize.query(req.query.qu, {
        type: Sequelize.QueryTypes.SELECT
    }).then(answer => {
        console.log("Answer from doQuery: " + JSON.stringify(answer))
        res.json(answer)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
}

module.exports = {
    doQuery,
    sequelize,
    Sequelize
}