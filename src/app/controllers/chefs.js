const Chef = require('../models/Chef')

exports.index = async (req, res) => {
    try {
        let results = await Chef.all()
        const chefs = results.rows

        return res.render('admin/chefs/index', { chefs })
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.show = async (req, res) => {
    const { id } = req.params

    try {
        let results = await Chef.show(id)
        const chef = results.rows[0]

        results = await Chef.chefRecipes(id)
        const recipes = results.rows

        results = await Chef.TotalRecipesByChefs(id)
        const recipesByChef = results.rows[0]

        return res.render('admin/chefs/detail', { chef, recipes, recipesByChef })
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params

    try {
        let results = await Chef.show(id)
        const chef = results.rows[0]

        return res.render('admin/chefs/edit', { chef })
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }
}

exports.post = async (req, res) => {
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if( req.body[key] === '') {
            return res.send("Please fill all the fields!")
        }
    }

    try {
        await Chef.create(req.body)
        
        return res.redirect('/admin/chefs')
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }

}

exports.put = async (req, res) => {
    try {
        await Chef.update(req.body)

        return res.redirect(`/admin/chefs/${req.body.id}`)
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }
}

exports.delete = async (req, res) => {
    const { id } = req.body

    try {
        let results = await Chef.TotalRecipesByChefs(id)
        const chef = results.rows[0]
        let { total_recipes } = chef

        total_recipes = Number(total_recipes)

        if (chef.total_recipes <= 0) {
            try {
                await Chef.delete(id)

                return res.redirect('/admin/chefs')
            } catch (error) {
                throw new Error(`Database error: ${error}`)
            }
        } else {
            return res.send("You cannot delete a chef that has recipes!!")
        }
    } catch (error) {
        throw new Error(`Database error: ${error}`)
    }
}

