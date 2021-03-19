const { date } = require('../../libs/utils')

const db = require('../../config/db')

module.exports = {
    all() {
        return db.query(`
            SELECT * 
            FROM recipes
        `)
    },

    create(data) {
        const query = `
            INSERT INTO recipes(
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6 )
            RETURNING id
        `

        const values = [
            data.chef_id,
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
                title = ($2),
                ingredients = ($3),
                preparation = ($4),
                information = ($5)
            WHERE id = $6
        `

        const values = [
            data.chef_id,
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

    // colocar os files nesta query
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
    },

    files(id) {
        return db.query(`
            SELECT recipe_files.*,
            files.name AS name, files.path AS path, files.id AS file_id
            FROM recipe_files
            LEFT JOIN files ON (recipe_files.file_id = files.id)
            WHERE recipe_files.recipe_id = $1
        `, [id])
    }
}