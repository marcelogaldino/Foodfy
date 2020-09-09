const { date } = require('../../libs/utils')

const db = require('../../config/db')

module.exports = {
    all() {
        return db.query(`
            SELECT * 
            FROM recipes
        `)
    },

    // show(id, callback) {
    //     db.query(`SELECT *
    //     FROM recipes
    //     WHERE id = $1`, [id], (err, results) => {
    //         if(err) throw `Database error ${err}`

    //         callback(results.rows[0])
    //     })
    // },

    create(data) {
        const query = `
            INSERT INTO recipes(
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7 )
            RETURNING id
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.created_at = date(Date.now())
        ]

        return db.query(query, values)
    },

    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id) {
        return db.query(`
            DELETE FROM recipes 
            WHERE id = $1`, [id])
    },

    recipesAndChefName(id) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
    },

    chefs() {
        return db.query(`
            SELECT *
            FROM chefs
        `)
    }
}