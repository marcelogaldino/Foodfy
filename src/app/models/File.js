const db = require('../../config/db')
const fs = require('fs')

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
    },
    createFileInsert(file_id, recipeId) {
        const query = `
            INSERT INTO recipe_files(
            recipe_id,
            file_id
            )VALUES ($1, $2)
            RETURNING id
      `
      const values = [
        recipeId,
        file_id
      ]
    
      return db.query(query, values)
    },

    async delete(id) {

        try {
            let result = await db.query(`SELECT file_id FROM recipe_files WHERE id = $1`, [id])
            const recipeFileId = result.rows[0].file_id

            result = await db.query(`SELECT * FROM files where id = ${recipeFileId}`)
            const file = result.rows[0]

            fs.unlinkSync(file.path)

            await db.query(`DELETE FROM recipe_files WHERE id = $1`, [id])

            return db.query(`DELETE FROM files WHERE id = ${recipeFileId}`)
        } catch (error) {
            console.error(error)
        }


        return db.query = `

        `
    }
}