const db = require('../../config/db')

module.exports = {
    create({filename, path}) {
        const query =`
            INSERT INTO FILES (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING ID
        `

        const values = [
            filename, 
            path
        ]

        return db.query(query, values)
    }
}