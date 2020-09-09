const db = require('../../config/db')

module.exports = {
    // all(callback) {
    //     db.query(`
    //     SELECT *
    //     FROM recipes`, (err, results) => {
    //         if(err) throw `Database error ${err}`

    //         callback(results.rows)
    //     })        
    // },

    show(id) {
        return db.query(`SELECT *
            FROM recipes
            WHERE id = $1`, [id])
    },

    // recipesAndChefName(callback) {
    //     db.query(`
    //     SELECT recipes.*, chefs.name AS chef_name
    //     FROM recipes
    //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, (err, results) => {
    //         if(err) throw `Database error: ${err}`

    //         callback(results.rows)
    //     })
    // },

    TotalRecipesByChefs() {
        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
        `
        return db.query(query)
    },

    searchRecipes(params) {
        const { search, limit, offset } = params

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

        return db.query(query, [limit, offset])
    }
}