const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '192.168.0.224',
    database: 'chinook',
    password: 'docker',
    port: 5432,
})

const getActors = (request, response) => {
    pool.query('SELECT * FROM actor ORDER BY actor_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getActors,
}