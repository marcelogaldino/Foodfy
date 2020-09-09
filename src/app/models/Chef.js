const { date } = require('../../libs/utils')

const db = require('../../config/db')

module.exports = {
    all() {
        return db.query(`
            SELECT *
            FROM chefs
        `)
    },

    show(id) {
        return db.query(`
            SELECT * 
            FROM chefs
            WHERE id = $1`, [id])
    },

    chefRecipes(id) {
        return db.query(`
            SELECT *
            FROM recipes
            WHERE chef_id = $1`, [id])
    },

    create(data) {
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

        return db.query(query, values)
    },

    update(data) {
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

        return db.query(query, values)
    },

    delete(id, callback) {
        return db.query(`
            DELETE
            FROM chefs
            WHERE id = $1`, [id])
    },

    TotalRecipesByChefs(id) {
        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `
       return db.query(query, [id])
    }
}