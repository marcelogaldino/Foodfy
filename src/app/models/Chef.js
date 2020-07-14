const { date } = require('../../libs/utils')

const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *
        FROM chefs`, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

    show(id, callback) {
        db.query(`
        SELECT * 
        FROM chefs
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },

    chefRecipes(id, callback) {
        db.query(`
        SELECT *
        FROM recipes
        WHERE chef_id = $1`, [id], (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO chefs(
                name,
                avatar_url,
                created_at
            ) VALUES ( $1, $2, $3 )
        `

        const values = [
            data.name,
            data.avatar_url,
            data.created_at = date(Date.now())
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback()
        })
    },

    update(data, callback) {
        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3`

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`
        DELETE
        FROM chefs
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error: ${err}`

            callback()
        })
    },

    TotalRecipesByChefs(id, callback) {
        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `
        db.query(query, [id], (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    }
}