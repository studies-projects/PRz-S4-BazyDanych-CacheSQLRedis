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


    sequelize.run(function (err) {
        if (err) throw err;
      
        console.log(sequelize.tables); // table list
        console.log(sequelize.foreignKeys); // foreign key list
      });