const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *
        FROM recipes`, (err, results) => {
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })        
    },

    show(id, callback) {
        db.query(`SELECT *
        FROM recipes
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error ${err}`
            
            callback(results.rows[0])
        })
    },

    recipesAndChefName(callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

    TotalRecipesByChefs(callback) {
        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
        `
        db.query(query, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

    searchRecipes(params) {
        const { search, limit, offset, callback } = params

        let query = '',
            searchQuery = ''
            totalQuery = `(
            SELECT count(*) FROM recipes
            ) AS total
        `

        if(search) {
            searchQuery = `
                WHERE recipes.title ILIKE '%${search}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes
                ${searchQuery}
                ) AS total
            `
        }

        query = `
            SELECT recipes.*, chefs.name AS chef_name, ${totalQuery}
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${searchQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    }
}